<?php

namespace App\Http\Controllers\Api\FrontEnd;

use App\Models\Home;
use App\Models\Post;
use App\Models\Views;
use App\Models\MyBlock;
use App\Models\Parallax;
use App\Models\Portfolio;
use App\Models\WebSetting;
use App\Models\About\About;
use App\Models\Skill\Skill;
use Illuminate\Http\Request;
use App\Models\CustomerComment;
use App\Models\Service\Service;
use App\Http\Controllers\Controller;
use App\Models\Qualification\Qualification;

class FrontEndController extends Controller
{
    public function index(){
        $portfolios = Portfolio::with('portfolioButton')->select('id','title', 'sub_title', 'description', 'image')->get();
        $services   = Service::with('serviceItem')->select('id','title', 'image')->get();
        $homes = Home::select('id', 'title', 'sub_title', 'message', 'image','facebook_url', 'linkedin_url', 'instagram_url', 'youtube_url', 'button_text','button_url',)->first();
        $about = About::with('aboutItem')->select('id', 'title', 'sub_title', 'introduction', 'image')->first();
        $skills = Skill::with('skillItem')->select('id', 'title', 'description', 'image')->get();
        $qualifications = Qualification::with('qualificationItem')->select('id', 'title', 'description', 'image')->get();
        $parallax = Parallax::select('id', 'title', 'sub_title', 'description', 'image')->first();
        $contact = WebSetting::select('phoneNo1', 'emailNo1', 'address')->first();
        $customers = CustomerComment::select('name', 'job', 'comment', 'image')->get();

        $response = [
            'portfolios_'     => $portfolios,
            'services_'       => $services,
            'homes_'          => $homes,
            'abouts_'         => $about,
            'skills_'         => $skills,
            'qualifications_' => $qualifications,
            'parallax_'       => $parallax,
            'contact_'        => $contact,
            'customers_'       => $customers
        ];
        return response()->json($response, 200);
    }


    public function myBlocks(){
        $myBlock  = MyBlock::select("title", "sub_title", "description", "image")->first();
        $posts    = Post::select("id", "title", "thumbnail", "description")->paginate(1);
        $latests  = Post::select("title","thumbnail","slug")->latest('created_at')->take(5)->get();

        $response = [
            'myBlock'   => $myBlock,
            'posts'     => $posts,
            'latests'   =>  $latests
        ];
        return response()->json($response, 200);
    }

    public function gePosts(){

        $posts    = Post::select("id", "title", "thumbnail", "description", "slug")->paginate(5);
        $response = [
            'posts' => $posts,
        ];
        return response()->json($response, 200);

    }

    public function gePost($post_slug){
        
        $post = Post::where("slug", $post_slug)->with('postView')->first();

        $postCounts = Post::withCount('postView')->orderBy('post_view_count', 'desc')->take(3)->get();
        
     
        if(!empty($post)){

            $response = [
                'post' => $post,
                'postViews' =>  $postCounts,
            ];
            return response()->json($response, 200);
            
        }else{
            $response = [
                'error' => "Post not found"
            ];
            return response()->json($response, 404);
        } 
    }

    public function addView(Request $request, $post_slug){
        
        $post = Post::where("slug", $post_slug)->first();
        $user = auth('sanctum')->user();

        if(!empty($post)){
            $checkView = Views::where("post_id", $post->id)->where("ip_address", $request->ip())->where("user_agent", $request->userAgent())->get();
           
            $view = $post->postView()->create([
                "ip_address"  => $request->ip(),
                "user_agent"  => $request->userAgent(),
                "user_id"     => $user?->id,
                "post_id"     => $post->id
            ]);

            $response = [
                'post' => $view,
            ];
            return response()->json($response, 201);
            
        }
    }
   
}
