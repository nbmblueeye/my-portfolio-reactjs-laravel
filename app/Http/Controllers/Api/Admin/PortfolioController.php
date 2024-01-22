<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;
use App\Http\Requests\Admin\PortfolioRequest;

class PortfolioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $portfolios = Portfolio::select('id', 'title', 'sub_title', 'description', 'image', 'created_at')->get();
        $response = [
            'data' => $portfolios,
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PortfolioRequest $request)
    {
        $validated = $request->validated();

        $image = "";
        if(!empty($validated['image'])){
            $base64_pos = strpos($validated['image'], ";base64");
            if($base64_pos){
                $base64_sub = substr($validated['image'],0 , $base64_pos);
                $file_ext   = explode('/', $base64_sub);
                $file_name  = time().'_portfolio'.'.'.$file_ext[1];

                $folder     = public_path()."/images/portfolios";
                $new_image  = Image::make($validated['image']);

                $new_image->save($folder."/".$file_name);
                $image      =  $file_name;

            }else{
                $image = null;
            }
        }else{
            $image = null;
        }

        $portfolios = Portfolio::create([
            'title'         => $validated['title'],
            'sub_title'     => $validated['sub_title'],
            'description'   => $validated['description'],
            'image'         => $image,
        ]);

        $response = [
            'message' => 'A New Portfolio is added',
            'data'    => $portfolios,
        ];
        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $portfolio_id)
    {
        $portfolios = Portfolio::where('id', $portfolio_id)->select('title', 'sub_title', 'description', 'image')->first();
        if(!empty($portfolios)){
            $response = [
                'data' => $portfolios,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'error' => 'Portfolio not found',
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PortfolioRequest $request, string $portfolio_id)
    {
        $validated  = $request->validated();
        $portfolio = Portfolio::find( $portfolio_id );
        
        if(!empty( $portfolio )){
            $image = "";
            if(!empty($validated['image'])){
                $base64_pos = strpos($validated['image'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['image'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_portfolio'.'.'.$file_ext[1];
                    $folder     = public_path()."/images/portfolios";
                    if(!empty($portfolio->image)){
                        if(file_exists($folder."/".$portfolio->image)){
                            unlink($folder."/".$portfolio->image);
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
                'message' => 'Selected Portfolio is updated!',
            ];

            if(!empty($image)){
                $portfolio->update([
                    'title'         => $validated['title'],
                    'sub_title'     => $validated['sub_title'],
                    'description'   => $validated['description'],
                    'image'         => $image,
                ]);

                $response['data'] = $portfolio;
            }else{
                $portfolio->update([
                    'title'         => $validated['title'],
                    'sub_title'     => $validated['sub_title'],
                    'description'   => $validated['description'],
                ]);

                $response['data'] = $portfolio;
            }
            
            return response()->json($response, 202);

        }else{
            $response = [
                'error' => 'Portfolio not found',
                'data'  => null,
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $portfolio_id)
    {
        $portfolio = Portfolio::findOrFail($portfolio_id);
        if(!empty($portfolio)){
            $folder = public_path()."/images/portfolios";
            if(!empty($portfolio->image)){
                if(file_exists($folder."/".$portfolio->image)){
                    unlink($folder."/".$portfolio->image);
                }
            }  
            $portfolio->delete();
            return response()->json('', 204);
        }
    }
}
