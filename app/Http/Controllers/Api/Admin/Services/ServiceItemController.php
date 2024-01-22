<?php

namespace App\Http\Controllers\Api\Admin\Services;

use Illuminate\Http\Request;
use App\Models\Service\Service;
use App\Models\Service\ServiceItem;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;
use App\Http\Requests\Admin\Services\ServiceItemRequest;

class ServiceItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services       = Service::select('id', 'title')->get();
        $serviceItems   = ServiceItem::select('id', 'service_id', 'title', 'link', 'description','image', 'created_at')->get();
        $response = [
            'services' => $services,
            'data'    => $serviceItems,
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ServiceItemRequest $request)
    {
        $validated = $request->validated();
        $service = Service::where('id', $validated['service_id'])->first();

        if(!empty($service)){
            $image = "";
            if(!empty($validated['image'])){
                $base64_pos = strpos($validated['image'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['image'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_service_item'.'.'.$file_ext[1];

                    $folder     = public_path()."/images/services/service-items";
                    $new_image  = Image::make($validated['image'])->resize(100,100);
                    $new_image->save($folder."/".$file_name);

                    $image      =  $file_name;
                }else{
                    $image = null;
                }
            }else{
                $image = null;
            }

            $data = $service->serviceItem()->create([
                'service_id'    => $validated['service_id'],
                'title'         => $validated['title'],
                'link'          => $validated['link'],
                'description'   => $validated['description'],
                'image'         => $image,
            ]);

            $response = [
                'message' => 'A Service_Item is added',
                'data' => $data,
            ];
            return response()->json($response, 201);
        }else{
            $response = [
                'error' => 'Service not found',
                'data'  => null,
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $service_item_id)
    {
        $services = Service::all();
        $service_item = ServiceItem::where('id', $service_item_id)->first();
        if(!empty($service_item)){
            $response = [
                'services' =>  $services,
                'data'     => $service_item,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'error' => 'Service not found',
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ServiceItemRequest $request, string $service_item_id)
    {
        $validated = $request->validated();
        $service = Service::where('id', $validated['service_id'])->first();
        if($service){

            $service_item = ServiceItem::where('id', $service_item_id)->first();

            if($service_item){

                $image = "";
                if(!empty($validated['image'])){

                    $base64_pos = strpos($validated['image'], ";base64");
                    if($base64_pos){
                        $base64_sub = substr($validated['image'],0 , $base64_pos);
                        $file_ext   = explode('/', $base64_sub);
                        $file_name  = time().'_service_item'.'.'.$file_ext[1];

                        $folder     = public_path()."/images/services/service-items";
                        if(!empty($service_item->image)){
                            if(file_exists($folder."/".$service_item->image)){
                                unlink($folder."/".$service_item->image);
                            }
                        }
                        $new_image  = Image::make($validated['image'])->resize(100,100);
                        $new_image->save($folder."/".$file_name);
                        $image      =  $file_name;
                    }

                }else{
                    $image = null;
                }

                $response = [
                    'message' => 'Selected Service_Item is updated!',
                ];

                if(!empty($image)){

                    $service_item->update([
                        'service_id'    => $validated['service_id'],
                        'title'         => $validated['title'],
                        'link'          => $validated['link'],
                        'description'   => $validated['description'],
                        'image'         => $image,
                    ]);

                    $response['data'] = $service_item;

                }else{

                    $service_item->update([
                        'service_id'    => $validated['service_id'],
                        'title'         => $validated['title'],
                        'link'          => $validated['link'],
                        'description'   => $validated['description'],
                    ]);

                    $response['data'] = $service_item;
                }

                return response()->json($response, 202);
                
            }else{
                $response = [
                    'error' => 'Service Item not found',
                    'data' => null,
                ];
                return response()->json($response, 404);
            }
        }else{
            $response = [
                'error' => 'Service not found',
                'data' => null,
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $service_item_id)
    {
        $service_item = ServiceItem::findOrFail( $service_item_id );
        if(!empty( $service_item )){
            $folder     = public_path()."/images/services/service-items";
            if(!empty($service_item->image)){
                if(file_exists($folder."/".$service_item->image)){
                    unlink($folder."/".$service_item->image);
                }
            }
            $service_item->delete();
            return response()->json('', 204);
        }
    }
}
