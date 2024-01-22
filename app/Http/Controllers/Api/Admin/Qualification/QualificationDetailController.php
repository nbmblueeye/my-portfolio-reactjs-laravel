<?php

namespace App\Http\Controllers\Api\Admin\Qualification;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;
use App\Models\Qualification\QualificationItem;
use App\Models\Qualification\QualificationDetail;
use App\Http\Requests\Admin\Qualification\QualificationDetailRequest;

class QualificationDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $qualification_items = QualificationItem::select('id', 'title')->get();
        $qualification_details = QualificationDetail::select('id', 'qualification_item_id','title', 'link','description','image', 'created_at')->get();
        $response = [
            'qualification_items' => $qualification_items,
            'data' => $qualification_details,
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(QualificationDetailRequest $request)
    {
        $validated = $request->validated();
        $qualification_item = QualificationItem::where('id', $validated['qualification_item_id'])->first();

        if(!empty($qualification_item)){
            $image = "";
            if(!empty($validated['image'])){
                $base64_pos = strpos($validated['image'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['image'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_qualification_detail'.'.'.$file_ext[1];
                 
                    $folder     = public_path()."/images/qualifications/qualification-details";
                    $new_image  = Image::make($validated['image']);
                    $new_image->save($folder."/".$file_name);

                    $image      =  $file_name;
                }else{
                    $image = null;
                }
            }else{
                $image = null;
            }

            $data = $qualification_item->qualificationDetail()->create([
                'qualification_item_id' => $validated['qualification_item_id'],
                'title'                 => $validated['title'],
                'link'                  => $validated['link'],
                'description'           => $validated['description'],
                'image'                 => $image,
            ]);

            $response = [
                'message' => 'A Qualification_Detail is added',
                'data'    => $data,
            ];

            return response()->json($response, 201);

        }else{
            $response = [
                'error' => 'Qualification_Item not found',
                'data'  => null,
            ];
            return response()->json($response, 404);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $qualification_detail_id)
    {
        $qualification_items = QualificationItem::all();
        $qualification_detail = QualificationDetail::where('id', $qualification_detail_id)->first();
        if(!empty($qualification_detail)){
            $response = [
                'qualification_items' =>  $qualification_items,
                'data'           => $qualification_detail,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'error' => 'Qualification-Detail not found',
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(QualificationDetailRequest $request, string $qualification_detail_id)
    {
        $validated = $request->validated();
        $qualification_item = QualificationItem::where('id', $validated['qualification_item_id'])->first();
        if($qualification_item){
            $qualification_detail =  QualificationDetail::where('id', $qualification_detail_id)->first();
            if($qualification_detail){
                $image = "";
                if(!empty($validated['image'])){
                    $base64_pos = strpos($validated['image'], ";base64");
                    if($base64_pos){
                        $base64_sub = substr($validated['image'],0 , $base64_pos);
                        $file_ext   = explode('/', $base64_sub);
                        $file_name  = time().'_qualification_detail'.'.'.$file_ext[1];
                        $folder     = public_path()."/images/qualifications/qualification-details";
                        if(!empty($qualification_detail->image)){
                            if(file_exists($folder."/".$qualification_detail->image)){
                                unlink($folder."/".$qualification_detail->image);
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
                    'message' => 'Selected Qualification-Detail is updated!',
                ];

                if(!empty( $image )){
                    $qualification_detail->update([
                        'qualification_item_id' => $validated['qualification_item_id'],
                        'title'                 => $validated['title'],
                        'link'                  => $validated['link'],
                        'description'           => $validated['description'],
                        'image'                 => $image,
                    ]);

                    $response['data'] = $qualification_detail;
                }else{
                    $qualification_detail->update([
                        'qualification_item_id' => $validated['qualification_item_id'],
                        'title'                 => $validated['title'],
                        'link'                  => $validated['link'],
                        'description'           => $validated['description'],
                    ]);

                    $response['data'] = $qualification_detail;
                }

                return response()->json($response, 202);

            }else{
                $response = [
                    'error' => 'Qualification-Detail not found',
                    'data'  => null,
                ];
                return response()->json($response, 404);
            }
        }else{

            $response = [
                'error' => 'Qualification-Item not found',
                'data'  => null,
            ];
            return response()->json($response, 404);

        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $qualification_detail_id)
    {
        $qualification_detail = QualificationDetail::findOrFail( $qualification_detail_id );
        if(!empty( $qualification_detail )){
            $folder = public_path()."/images/qualifications/qualification-details";
            if(!empty($qualification_detail->image)){
                if(file_exists($folder."/".$qualification_detail->image)){
                    unlink($folder."/".$qualification_detail->image);
                }
            }
            $qualification_detail->delete();
            return response()->json('', 204);
        }
    }
}
