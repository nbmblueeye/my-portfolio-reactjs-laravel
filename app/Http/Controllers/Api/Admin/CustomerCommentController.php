<?php

namespace App\Http\Controllers\Api\Admin;

use Illuminate\Http\Request;
use App\Models\CustomerComment;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;
use App\Http\Requests\Admin\CustomerCommentRequest;

class CustomerCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customer_comments = CustomerComment::select('id', 'name','job', 'comment', 'image', 'created_at')->paginate(3);
        $response = [
            'data' => $customer_comments,
        ];
        return response()->json($response, 200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(CustomerCommentRequest $request)
    {
        $validated = $request->validated();
        $image = "";
        if(!empty($validated['image'])){
            $base64_pos = strpos($validated['image'], ";base64");
            if($base64_pos){
                $base64_sub = substr($validated['image'],0 , $base64_pos);
                $file_ext   = explode('/', $base64_sub);
                $file_name  = time().'_customer_'.$validated['name'].'.'.$file_ext[1];

                $folder     = public_path()."/images/customers";
                $new_image  = Image::make($validated['image'])->resize(300,300);

                $new_image->save($folder."/".$file_name);
                $image      =  $file_name;
            }else{
                $image = null;
            }
        }else{
            $image = null;
        }
        $customer_comment = CustomerComment::create([
            'name'      => $validated['name'],
            'job'       => $validated['job'],
            'comment'   => $validated['comment'],
            'image'     => $image,
        ]);
        $response = [
            'message' => 'A New Customer Comment is added',
            'data' => $customer_comment
        ];
        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $customer_comment_id)
    {
        $customer_comment = CustomerComment::where('id', $customer_comment_id)->select('name', 'job', 'comment', 'image')->first();
        if(!empty( $customer_comment )){
            $response = [
                'data' => $customer_comment,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'error' => 'Customer Comment not found',
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CustomerCommentRequest $request, string $customer_comment_id)
    {
        $validated  = $request->validated();
        $customer_comment =  CustomerComment::find( $customer_comment_id );
        if(!empty( $customer_comment )){
            $image = "";
            if(!empty($validated['image'])){
                $base64_pos = strpos($validated['image'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['image'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_customer_'.$validated['name'].'.'.$file_ext[1];

                    $folder     = public_path()."/images/customers";
                    if(!empty( $customer_comment->image )){
                        if(file_exists($folder."/".$customer_comment->image)){
                            unlink($folder."/".$customer_comment->image);
                        }
                    }

                    $new_image  = Image::make($validated['image'])->resize(300,300);;
                    $new_image->save($folder."/".$file_name);
                    $image      =  $file_name;
                }
            }else{
                $image = null;
            }

            $response = [
                'message' => 'Selected Customer Comment is updated!',
            ];

            if(!empty($image)){
                $customer_comment->update([
                    'name'      => $validated['name'],
                    'job'       => $validated['job'],
                    'comment'   => $validated['comment'],
                    'image'     => $image,
                ]);

                $response['data'] = $customer_comment;
            }else{
                $customer_comment->update([
                    'name'      => $validated['name'],
                    'job'       => $validated['job'],
                    'comment'   => $validated['comment'],
                ]);

                $response['data'] = $customer_comment;
            }
            
            return response()->json($response, 202);
            
        }else{
            $response = [
                'error' => 'Customer Comment not found',
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $customer_comment_id)
    {
        $customer_comment = CustomerComment::findOrFail( $customer_comment_id );
        if(!empty( $customer_comment )){
           
            $folder     = public_path()."/images/customers";
            if(!empty( $customer_comment->image )){
                if(file_exists($folder."/".$customer_comment->image)){
                    unlink($folder."/".$customer_comment->image);
                }
            }

            $customer_comment->delete();
            return response()->json('', 204);
        }
    }
}
