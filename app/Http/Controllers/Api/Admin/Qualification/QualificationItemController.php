<?php

namespace App\Http\Controllers\Api\Admin\Qualification;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;
use App\Models\Qualification\Qualification;
use App\Models\Qualification\QualificationItem;
use App\Http\Requests\Admin\Qualification\QualificationItemRequest;

class QualificationItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $qualifications = Qualification::select('id', 'title')->get();
        $qualification_items = QualificationItem::select('id', 'qualification_id','title','description','image', 'created_at')->get();
        $response = [
            'qualifications' => $qualifications,
            'data' =>  $qualification_items,
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(QualificationItemRequest $request)
    {
        $validated = $request->validated();
        $qualification = Qualification::where('id', $validated['qualification_id'])->first();
        if(!empty($qualification)){
            $image = "";
            if(!empty($validated['image'])){
                $base64_pos = strpos($validated['image'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['image'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_qualification_item'.'.'.$file_ext[1];
                 
                    $folder     = public_path()."/images/qualifications/qualification-items";
                    $new_image  = Image::make($validated['image'])->resize(100,100);
                    $new_image->save($folder."/".$file_name);

                    $image      =  $file_name;
                }else{
                    $image = null;
                }
            }else{
                $image = null;
            }

            $data = $qualification->qualificationItem()->create([
                'qualification_id'  => $validated['qualification_id'],
                'title'             => $validated['title'],
                'description'       => $validated['description'],
                'image'             => $image,
            ]);

            $response = [
                'message' => 'A Qualification_Item is added',
                'data'    => $data,
            ];
            return response()->json($response, 201);
        }else{
            $response = [
                'error' => 'Qualification not found',
                'data'  => null,
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $qualification_item_id)
    {
        $qualifications = Qualification::all();
        $qualificationItem = QualificationItem::where('id', $qualification_item_id)->first();
        if(!empty($qualificationItem)){
            $response = [
                'qualifications' =>  $qualifications,
                'data'           => $qualificationItem,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'error' => 'Qualification-Item not found',
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(QualificationItemRequest $request, string $qualification_item_id)
    {
        $validated = $request->validated();
        $qualification =  Qualification::where('id', $validated['qualification_id'])->first();
        
        if(!empty($qualification)){
            $qualification_item = $qualification->qualificationItem()->where('id', $qualification_item_id)->first();
            if($qualification_item){
                $image = "";
                if(!empty($validated['image'])){
                    $base64_pos = strpos($validated['image'], ";base64");
                    if($base64_pos){
                        $base64_sub = substr($validated['image'],0 , $base64_pos);
                        $file_ext   = explode('/', $base64_sub);
                        $file_name  = time().'_qualification_item'.'.'.$file_ext[1];
                 
                        $folder     = public_path()."/images/qualifications/qualification-items";
                        if(!empty($qualification_item->image)){
                            if(file_exists($folder."/".$qualification_item->image)){
                                unlink($folder."/".$qualification_item->image);
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
                    'message' => 'Selected Qualification-Item is updated!',
                ];

                if(!empty( $image )){
                    $qualification_item->update([
                        'qualification_id'  => $validated['qualification_id'],
                        'title'             => $validated['title'],
                        'description'       => $validated['description'],
                        'image'             => $image,
                    ]);
                    $response['data'] = $qualification_item;
                }else{
                    $qualification_item->update([
                        'qualification_id'  => $validated['qualification_id'],
                        'title'             => $validated['title'],
                        'description'       => $validated['description'],
                    ]);
                    $response['data'] = $qualification_item;
                }
                
                return response()->json($response, 202);
            }else{
                $response = [
                    'error' => 'Qualification-Item not found',
                    'data'  => null,
                ];
                return response()->json($response, 404);
            }
        }else{
            $response = [
                'error' => 'Qualification not found',
                'data'  => $qualification,
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $qualification_item_id)
    {
        $qualification_item = QualificationItem::findOrFail($qualification_item_id);
        if(!empty($qualification_item)){
            $folder = public_path()."/images/qualifications/qualification-items";
            if(!empty($qualification_item->image)){
                if(file_exists($folder."/".$qualification_item->image)){
                    unlink($folder."/".$qualification_item->image);
                }
            }
            $qualification_item->delete();
            return response()->json('', 204);
        }
    }
}
