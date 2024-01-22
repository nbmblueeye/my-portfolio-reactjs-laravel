<?php

namespace App\Http\Controllers\Api\FrontEnd;

use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    
    public function checkUser(){

        $user = auth()->user();

        if($user){
            $response = [
                'data' => $user
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'data' => null
            ];
            return response()->json($response, 401);
        }

    }
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $post_id)
    {
        $post = Post::where('id',$post_id)->first();
        $user = auth('sanctum')->user();

        if( !empty($post) ){

            $comments = $post->postComments()->where("parent_id", null)->with("userComment", "comments", "replies", "replies.userComment", "replies.replies", "replies.replies.userComment" )->orderBy("created_at", "desc")->get();
            
            $response = [
                'data' => $comments,
                'user_'=> $user
            ];
            return response()->json($response, 200);
        }
       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function saveComment(Request $request)
    {
        $validated = $request->validate([
            'comment' => 'required|string',
            'post_id' => 'required|integer',
        ]);

        if(!auth()->check()){
            $response = [
                'error' => 'Please login to post your comment!',
            ];
            return response()->json($response, 401);

        }else{
            $post = Post::findOrFail($validated['post_id']);
            $user = auth('sanctum')->user();
            if($post){
                if(empty($request->comment_id)){

                    $comment = $post->postComments()->create(
                        [
                            'user_id'   => $user->id,
                            'post_id'   => $validated['post_id'],
                            'comment'   => $validated['comment'],
                        ]
                    );

                    $response = [
                        'message'   => 'Thank you for your Comment!',
                        'comment'      => $comment->load("userComment")
                    ];
                    return response()->json($response, 201);
                }else{
                    $reply = $post->postComments()->create(
                        [
                            'user_id'   => $user->id,
                            'post_id'   => $validated['post_id'],
                            'parent_id' => $request->comment_id ?? null,
                            'comment'   => $validated['comment'],
                        ]
                    );
                    $response = [
                        'message'   => 'Thank you for your Information!',
                        'comment' => $reply->load("userComment"),
                    ];
                    return response()->json($response, 201);
                }
                
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function setUpvoted(Request $request)
    {
        if(!auth()->check()){
            $response = [
                'error' => 'Please login to post your comment!',
            ];
            return response()->json($response, 401);
        }else{
           
            $user = auth('sanctum')->user();
            $upVoted = $user->upvotes()->where('comment_id',"=",$request->comment_id)->get();
            if(count($upVoted) > 0){
                if($request->boolean('is_upvoted')){
                    if($upVoted[0]->is_upvoted){
                        $upVoted[0]->delete();

                    }else{
                        $upVoted[0]->update([
                            'is_upvoted' => $request->boolean('is_upvoted'),
                        ]);
                    }
                }else{
                    if(!$upVoted[0]->is_upvoted){
                        $upVoted[0]->delete();
                    }else{
                        $upVoted[0]->update([
                            'is_upvoted' => $request->boolean('is_upvoted'),
                        ]);
                    }
                }
                $response = [
                    'data' => $upVoted[0],
                ];
                return response()->json($response, 201);
            }else{

                $data = $user->upvotes()->create([
                    'is_upvoted' => $request->boolean('is_upvoted'),
                    'comment_id' => $request->comment_id,
                    'user_id'    => $user->id,
                ]);

                $response = [
                    'data' =>  $data,
                ];
                return response()->json($response, 201);
            } 
        }
    }

     /**
     * Display the specified resource.
     */
    public function getUpvoted(string $comment_id)
    {
        $user = auth('sanctum')->user();
        $comment = Comment::where('id', $comment_id)->first();
        $likes = $comment->commentLikes()->get();

       if($user){
            $data = $user->upvotes()->where('comment_id', $comment_id)->get();
            $response = [
                'data' => $data,
                'likes_' => $likes,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'data' => [],
                'likes_' => $likes,
            ];
            return response()->json($response, 200);
        }         
            
    }

  
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request , string $comment_id)
    {
        $comment = Comment::findOrFail($comment_id);
        if( $comment ){
            $comment -> delete();
            return response()->json('', 204);
        }
    }
}
