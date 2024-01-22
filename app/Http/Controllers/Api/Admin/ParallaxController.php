<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Parallax;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;
use App\Http\Requests\Admin\ParallaxRequest;

class ParallaxController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $parallax = Parallax::first();
        $response = [
            'data' => $parallax,
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ParallaxRequest $request)
    {
        $validated = $request->validated();

        $parallax = Parallax::first();
        if(empty($parallax)){         
            $image = "";
            if(!empty($validated['image'])){
                $base64_pos = strpos($validated['image'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['image'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_parallax'.'.'.$file_ext[1];

                    $folder     = public_path()."/images/parallaxs";
                    $new_image  = Image::make($validated['image']);

                    $new_image->save($folder."/".$file_name);
                    $image      =  $file_name;
                }
            }
            Parallax::create([
                'title'         => $validated['title'],
                'sub_title'     => $validated['sub_title'],
                'description'   => $validated['description'],
                'image'         => $image,
            ]);
            $response = [
                'message' => 'A New Parallax is added',
            ];
            return response()->json($response, 201);
           
        }else{
            $image = "";
            if(!empty($validated['image'])){
                $base64_pos = strpos($validated['image'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['image'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_parallax'.'.'.$file_ext[1];

                    $folder     = public_path()."/images/parallaxs";
                    if(!empty($parallax->image)){
                        if(file_exists($folder."/".$parallax->image)){
                            unlink($folder."/".$parallax->image);
                        }
                    }
                    $new_image  = Image::make($validated['image']);
                    $new_image->save($folder."/".$file_name);
                    $image      =  $file_name;
                }else{
                    $image      =  null;
                }
            }

            if(!empty($image)){
                $parallax->update([
                    'title'         => $validated['title'],
                    'sub_title'     => $validated['sub_title'],
                    'description'   => $validated['description'],
                    'image'         => $image,
                ]);
            }else{
                $parallax->update([
                    'title'         => $validated['title'],
                    'sub_title'     => $validated['sub_title'],
                    'description'   => $validated['description'],
                ]);
            }
            
            $response = [
                'message' => 'Selected Parallax is updated!',
            ];
            return response()->json($response, 202);
        }
    }

}
