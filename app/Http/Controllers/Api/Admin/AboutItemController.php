<?php

namespace App\Http\Controllers\Api\Admin;

use Illuminate\Http\Request;
use App\Models\About\AboutItem;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;
use App\Http\Requests\Admin\AboutItemRequest;
use App\Models\About\About;

class AboutItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $aboutItems = AboutItem::select('id', 'about_id', 'title', 'description', 'image', 'created_at')->get();
        $abouts     = About::select('id', 'title')->get();
        $response = [
            'abouts' =>  $abouts,
            'data' => $aboutItems,
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AboutItemRequest $request)
    {
        $validated = $request->validated();
        $about = About::where('id', $validated['about_id'])->first();
        if(!empty($about)){
            $image = "";
            if(!empty($validated['image'])){
                $base64_pos = strpos($validated['image'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['image'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_about_item'.'.'.$file_ext[1];

                    $folder     = public_path()."/images/abouts";
                    $new_image  = Image::make($validated['image']);
                    $new_image->save($folder."/".$file_name);

                    $image      =  $file_name;
                }else{
                    $image = null;
                }
            }else{
                $image = null;
            }
            $data = $about->aboutItem()->create([
                'about_id'      => $validated['about_id'],
                'title'         => $validated['title'],
                'description'   => $validated['description'],
                'image'         => $image,
            ]);
            $response = [
                'message' => 'A About Item is added',
                'data'    =>  $data
            ];
            return response()->json($response, 201);
        }else{
            $response = [
                'error' => 'About Item not found',
                'data'    => null,
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($about_item_id)
    {
        $abouts = About::all();
        $aboutItem = AboutItem::where('id', $about_item_id)->first();
        if(!empty($aboutItem)){
            $response = [
                'abouts' =>  $abouts,
                'data' => $aboutItem,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'error' => 'About-Item not found',
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AboutItemRequest $request, $about_item_id)
    {
        $validated = $request->validated();
        $about = About::where('id', $validated['about_id'])->first();
        if($about){
            $aboutItem = $about->aboutItem()->where('id', $about_item_id)->first();
            if($aboutItem){
                $image = "";
                if(!empty($validated['image'])){
                    $base64_pos = strpos($validated['image'], ";base64");
                    if($base64_pos){
                        $base64_sub = substr($validated['image'],0 , $base64_pos);
                        $file_ext   = explode('/', $base64_sub);
                        $file_name  = time().'_about_item'.'.'.$file_ext[1];
                        $folder     = public_path()."/images/abouts";
                        if(!empty($aboutItem->image)){
                            if(file_exists($folder."/".$aboutItem->image)){
                                unlink($folder."/".$aboutItem->image);
                            }
                        }
                        $new_image  = Image::make($validated['image']);
                        $new_image->save($folder."/".$file_name);
                        $image      =  $file_name;
        
                    }
                }else{
                    $image = null;
                }

                $response = [
                    'message' => 'Selected AboutItem is updated!',
                ];

                if(!empty($image)){
                    $aboutItem->update([
                        'about_id'      => $validated['about_id'],
                        'title'         => $validated['title'],
                        'description'   => $validated['description'],
                        'image'         => $image,
                    ]);

                    $response['data'] = $aboutItem;
                }else{
                    $aboutItem->update([
                        'about_id'      => $validated['about_id'],
                        'title'         => $validated['title'],
                        'description'   => $validated['description'],
                    ]);

                    $response['data'] = $aboutItem;
                }
               
                return response()->json($response, 202);
                
            }else{
                $response = [
                    'error' => 'AboutItem not found',
                    'data'    => null,
                ];
                return response()->json($response, 404);
            }
        }else{
            $response = [
                'error' => 'About not found',
                'data'    => null,
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($about_item_id)
    {
        $about_item = AboutItem::findOrFail($about_item_id);
        if(!empty($about_item)){
            $folder     = public_path()."/images/abouts";
            if(!empty($about_item->image)){
                if(file_exists($folder."/".$about_item->image)){
                    unlink($folder."/".$about_item->image);
                }
            }
            $about_item->delete();
            return response()->json('', 204);
        }
    }
}
