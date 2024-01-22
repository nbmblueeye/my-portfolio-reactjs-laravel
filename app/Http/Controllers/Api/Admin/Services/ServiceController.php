<?php

namespace App\Http\Controllers\Api\Admin\Services;

use Illuminate\Http\Request;
use App\Models\Service\Service;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;
use App\Http\Requests\Admin\Services\ServiceRequest;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::select('id', 'title', 'description','image', 'created_at')->get();
        $response = [
            'data' => $services,
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ServiceRequest $request)
    {
        $validated = $request->validated();
        $image = "";
        if(!empty($validated['image'])){
            $base64_pos = strpos($validated['image'], ";base64");
            if($base64_pos){
                $base64_sub = substr($validated['image'],0 , $base64_pos);
                $file_ext   = explode('/', $base64_sub);
                $file_name  = time().'_service'.'.'.$file_ext[1];

                $folder     = public_path()."/images/services";
                $new_image  = Image::make($validated['image'])->resize(100,100);

                $new_image->save($folder."/".$file_name);
                $image      =  $file_name;

            }else{
                $image = null;
            }
        }else{
            $image = null;
        }
        $service = Service::create([
            'title'         => $validated['title'],
            'description'   => $validated['description'],
            'image'         => $image,
        ]);
        $response = [
            'message' => 'A New Service is added',
            'data' => $service
        ];
        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $service_id)
    {
        $service = Service::where('id', $service_id)->select('title', 'description','image')->first();
        if(!empty( $service)){
            $response = [
                'data' => $service,
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
    public function update(ServiceRequest $request, string $service_id)
    {
        $validated = $request->validated();
        $service = Service::find($service_id);
        if(!empty($service)){
            $image = "";
            if(!empty($validated['image'])){
                $base64_pos = strpos($validated['image'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['image'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_service'.'.'.$file_ext[1];

                    $folder     = public_path()."/images/services";
                    if(!empty($service->image)){
                        if(file_exists($folder."/".$service->image)){
                            unlink($folder."/".$service->image);
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
                'message' => 'Selected Service is updated!',
            ];

            if(!empty($image)){
                $service->update([
                    'title'         => $validated['title'],
                    'description'   => $validated['description'],
                    'image'         => $image,
                ]);

                $response['data'] = $service;
            }else{
                $service->update([
                    'title'         => $validated['title'],
                    'description'   => $validated['description'],
                ]);

                $response['data'] = $service;
            }
            
            return response()->json($response, 202);

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
    public function destroy(string $service_id)
    {
        $service = Service::findOrFail($service_id);
        if(!empty($service)){

            $folder     = public_path()."/images/services";
            if(!empty($service->image)){
                if(file_exists($folder."/".$service->image)){
                    unlink($folder."/".$service->image);
                }
            }
            $service->delete();
            return response()->json('', 204);
        }
    }
}
