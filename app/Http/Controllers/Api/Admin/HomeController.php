<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Home;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;
use App\Http\Requests\Admin\HomeRequest;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $homes = Home::select('id','title', 'sub_title', 'message', 'image', 'facebook_url','linkedin_url', 'instagram_url', 'youtube_url', 'button_text', 'button_url', 'created_at' )->get();
        $response = [
            'data' =>  $homes,
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(HomeRequest $request)
    {
        $validated = $request->validated();
        $image = "";
        if(!empty($validated['image'])){
            $base64_pos = strpos($validated['image'], ";base64");
            if($base64_pos){
                $base64_sub = substr($validated['image'],0 , $base64_pos);
                $file_ext   = explode('/', $base64_sub);
                $file_name  = time().'_home'.'.'.$file_ext[1];

                $folder     = public_path()."/images/homes";
                $new_image  = Image::make($validated['image']);
                $new_image->save($folder."/".$file_name);

                $image      =  $file_name;
            }else{
                $image = null;
            }
        }else{
            $image = null;
        }
        
        $home = Home::create([
            'title'         => $validated['title'],
            'sub_title'     => $validated['sub_title'],
            'message'       => $validated['message'],
            'image'         => $image,
            'facebook_url'  => $validated['facebook_url'],
            'linkedin_url'  => $validated['linkedin_url'],
            'instagram_url' => $validated['instagram_url'],
            'youtube_url'   => $validated['youtube_url'],
            'button_text'   => $validated['button_text'],
            'button_url'    => $validated['button_url'],
        ]);

        $response = [
            'message' => 'A Home Page information is added',
            'data'    => $home,
        ];

        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($home_id)
    {
        $home = Home::where('id', $home_id)->first();
        if($home){
            $response = [
                'data' => $home ,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'error' => 'Home not found',
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Home  $home
     * @return \Illuminate\Http\Response
     */
    public function update(HomeRequest $request, $home_id)
    {
        $validated = $request->validated();
        $home = Home::find($home_id);
        if($home){
            $image = "";
            if(!empty($validated['image'])){
                $base64_pos = strpos($validated['image'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['image'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_home'.'.'.$file_ext[1];

                    $folder     = public_path()."/images/homes";
                    if(!empty($home->image)){
                        if(file_exists($folder."/".$home->image)){
                            unlink($folder."/".$home->image);
                        }
                    }
                    $new_image  = Image::make($validated['image']);
                    $new_image->save($folder."/".$file_name);
                    $image     = $file_name;
                    
                }
            }else{
                $image = null;
            }

            $response = [
                'message' => 'Selected Home is updated!',
            ];

            if(!empty($image)){
                $home->update([
                    'title'         => $validated['title'],
                    'sub_title'     => $validated['sub_title'],
                    'message'       => $validated['message'],
                    'image'         => $image,
                    'facebook_url'  => $validated['facebook_url'],
                    'linkedin_url'  => $validated['linkedin_url'],
                    'instagram_url' => $validated['instagram_url'],
                    'youtube_url'   => $validated['youtube_url'],
                    'button_text'   => $validated['button_text'],
                    'button_url'    => $validated['button_url'],
                ]);

                $response['data'] = $home;
            }else{
                $home->update([
                    'title'         => $validated['title'],
                    'sub_title'     => $validated['sub_title'],
                    'message'       => $validated['message'],
                    'facebook_url'  => $validated['facebook_url'],
                    'linkedin_url'  => $validated['linkedin_url'],
                    'instagram_url' => $validated['instagram_url'],
                    'youtube_url'   => $validated['youtube_url'],
                    'button_text'   => $validated['button_text'],
                    'button_url'    => $validated['button_url'],
                ]);
                
                $response['data'] = $home;
            }

            return response()->json($response, 202);
        }else{
            $response = [
                'error' => 'Home not found',
                'data'  => null,
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Home  $home
     * @return \Illuminate\Http\Response
     */
    public function destroy($home_id)
    {
        $home = Home::findOrFail($home_id);
        if(!empty($home)){
            $folder = public_path()."/images/homes";
            if(!empty($home->image)){
                if(file_exists($folder."/".$home->image)){
                    unlink($folder."/".$home->image);
                }
            }
            $home->delete();
            return response()->json('', 204);
        }
    }
}
