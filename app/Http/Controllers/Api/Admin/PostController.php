<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PostRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::all();
        $response = [
            'data' => $posts,
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $request)
    {   
        $validated = $request->validated();
        $image = "";
        if(!empty($validated['thumbnail'])){
            $base64_pos = strpos($validated['thumbnail'], ";base64");
            if($base64_pos){
                $base64_sub = substr($validated['thumbnail'],0 , $base64_pos);
                $file_ext   = explode('/', $base64_sub);
                $file_name  = time().'_thumbnail'.'.'.$file_ext[1];
                $folder     = public_path()."/images/thumbnails";
                $new_image  = Image::make($validated['thumbnail']);
                $new_image->save($folder."/".$file_name);
                $image      =  $file_name;
            }else{
                $image = null;
            }
        }else{
            $image = null;
        }

        $slug = Str::slug($validated['title'])."-".time();

        $post = Post::create([
            'title'         => $validated['title'],
            'thumbnail'     => $image,
            'description'   => $validated['description'],
            'slug'          => $slug
        ]);

        $response = [
            'message' => 'A new Post is added',
            'data' => $post
        ];

        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($post_id)
    {
        $post = Post::where('id', $post_id)->first();
        if(!empty($post)){
            $response = [
                'data' => $post,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'error' => 'Post not found',
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
    public function update(PostRequest $request, $post_id)
    {
        $validated = $request->validated();
        $post = Post::find($post_id);
        if($post){
            
            $image = "";
            if(!empty($validated['thumbnail'])){

                $base64_pos = strpos($validated['thumbnail'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['thumbnail'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_thumbnail'.'.'.$file_ext[1];
                    $folder     = public_path()."/images/thumbnails";
                   
                    if(!empty($post->thumbnail)){
                        if(file_exists($folder."/".$post->thumbnail)){
                            unlink($folder."/".$post->thumbnail);
                        }
                    }

                    $new_image  = Image::make($validated['thumbnail']);
                    $new_image->save($folder."/".$file_name);
                    $image      =  $file_name;
    
                }

            }else{
                $image = null;
            }

            $response = [
                'message' => 'Selected Post is updated!',
            ];

            if(!empty( $image )){

                $post->update([
                    'title'         => $validated['title'],
                    'thumbnail'     => $image,
                    'description'   => $validated['description'],
                ]);

                $response['data'] = $post;
            }else{

                $post->update([
                    'title'         => $validated['title'],
                    'description'   => $validated['description'],
                ]);

                $response['data'] = $post;
            }

            return response()->json($response, 202);

        }else{

            $response = [
                'error' => 'About-Item not found',
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
    public function destroy($post_id)
    {
        $post = Post::findOrFail($post_id);
        if(!empty( $post )){
            $post -> delete();
            return response()->json('', 204);
        }
    }
}
