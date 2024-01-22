<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\About\About;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;
use App\Http\Requests\Admin\AboutRequest;

class AboutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $abouts = About::select('id', 'title','sub_title', 'introduction', 'image', 'created_at')->get();
        $response = [
            'data' => $abouts,
        ];
        return response()->json($response, 200);
    }
   
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AboutRequest $request)
    {  
        $validated = $request->validated();

        $image = "";
        if(!empty($validated['image'])){
            $base64_pos = strpos($validated['image'], ";base64");
            if($base64_pos){
                $base64_sub = substr($validated['image'],0 , $base64_pos);
                $file_ext   = explode('/', $base64_sub);
                $file_name  = time().'_about'.'.'.$file_ext[1];
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
        $about = About::create([
            'title'         => $validated['title'],
            'sub_title'     => $validated['sub_title'],
            'introduction'   => $validated['introduction'],
            'image'         => $image,
        ]);
        $response = [
            'message' => 'A New About is added',
            'data'    => $about,
        ];
        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($about_id)
    {
        $about = About::where('id', $about_id)->first();
        if($about){
            $response = [
                'data' => $about,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'error' => 'About not found',
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
    public function update(AboutRequest $request, $about_id)
    {
        $validated = $request->validated();   
        $about = About::find($about_id); 

        if(!empty( $about )){
            $image = "";
            if(!empty($validated['image'])){
                $base64_pos = strpos($validated['image'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['image'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_about'.'.'.$file_ext[1];
                    $folder     = public_path()."/images/abouts";
                    if(!empty( $about->image )){
                        if(file_exists( $folder."/".$about->image )){
                            unlink( $folder."/".$about->image );
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
                'message' => 'Selected About is updated!',
            ];

            if(!empty($image)){
                $about->update([
                    'title'         => $validated['title'],
                    'sub_title'     => $validated['sub_title'],
                    'introduction'   => $validated['introduction'],
                    'image'         => $image,
                ]);

                $response['data'] = $about;
            }else{
                $about->update([
                    'title'         => $validated['title'],
                    'sub_title'     => $validated['sub_title'],
                    'introduction'   => $validated['introduction'],
                ]);
                $response['data'] = $about;
            }
            return response()->json($response, 202);
        }else{
            $response = [
                'error' => 'About not found',
                'data'  => null,
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
    public function destroy($about_id)
    {
        $about = About::findOrFail($about_id);
        if(!empty( $about )){
            $folder = public_path()."/images/abouts";
            if(!empty( $about->image )){
                if(file_exists( $folder."/".$about->image )){
                    unlink( $folder."/".$about->image );
                }
            }
            $about->delete();
            return response()->json('', 204);
        }
    }
}
