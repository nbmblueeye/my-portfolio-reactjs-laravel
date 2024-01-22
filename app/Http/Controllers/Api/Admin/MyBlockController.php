<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\MyBlock;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;
use App\Http\Requests\Admin\MyBlockRequest;

class MyBlockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $myBlock = MyBlock::first();
        $response = [
            'data' => $myBlock,
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MyBlockRequest $request)
    {
        $validated = $request->validated();
        $myBlock   = MyBlock::first();

        if(empty($myBlock)){         
            $image = "";
            if(!empty($validated['image'])){
                $base64_pos = strpos($validated['image'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['image'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_my_block'.'.'.$file_ext[1];

                    $folder     = public_path()."/images/myblocks";
                    $new_image  = Image::make($validated['image']);

                    $new_image->save($folder."/".$file_name);
                    $image      =  $file_name;
                }
            }
            MyBlock::create([
                'title'         => $validated['title'],
                'sub_title'     => $validated['sub_title'],
                'description'   => $validated['description'],
                'image'         => $image,
            ]);

            $response = [
                'message' => 'A New My Block is added',
            ];
            return response()->json($response, 201);
           
        }else{
            $image = "";
            if(!empty($validated['image'])){
                $base64_pos = strpos($validated['image'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['image'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_my_block'.'.'.$file_ext[1];

                    $folder     = public_path()."/images/myblocks";
                    if(!empty($myBlock->image)){
                        if(file_exists($folder."/".$myBlock->image)){
                            unlink($folder."/".$myBlock->image);
                        }
                    }
                    $new_image  = Image::make($validated['image']);
                    $new_image->save($folder."/".$file_name);
                    $image      =  $file_name;
                }
            }else{
                $image = null;
            }

            if(!empty($image)){
                $myBlock->update([
                    'title'         => $validated['title'],
                    'sub_title'     => $validated['sub_title'],
                    'description'   => $validated['description'],
                    'image'         => $image,
                ]);
            }else{
                $myBlock->update([
                    'title'         => $validated['title'],
                    'sub_title'     => $validated['sub_title'],
                    'description'   => $validated['description'],
                ]);
            }

            $response = [
                'message' => 'Selected My Block is updated!',
            ];
            return response()->json($response, 202);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(MyBlock $myBlock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MyBlock $myBlock)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MyBlock $myBlock)
    {
        //
    }
}
