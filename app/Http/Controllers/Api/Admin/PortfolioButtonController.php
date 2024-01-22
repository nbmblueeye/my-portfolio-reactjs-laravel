<?php

namespace App\Http\Controllers\Api\Admin;

use Illuminate\Http\Request;
use App\Models\PortfolioButton;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PortfolioButtonRequest;
use App\Models\Portfolio;

class PortfolioButtonController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $portfolios        = Portfolio::select('id', 'title')->get();
        $portfolio_buttons = PortfolioButton::select('id', 'portfolio_id', 'text', 'link', 'created_at')->get();
        $response = [
            'portfolios' => $portfolios,
            'data'       => $portfolio_buttons,
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PortfolioButtonRequest $request)
    {
        $validated  = $request->validated();
        $portfolio  = Portfolio::where('id', $validated['portfolio_id'])->first();

        if(!empty($portfolio)){

            $data = $portfolio->portfolioButton()->create([
                'portfolio_id' => $validated['portfolio_id'],
                'text'         => $validated['text'],
                'link'         => $validated['link'],
            ]);

            $response = [
                'message'   => 'A Portfolio Button is added',
                'data'      => $data,
            ];
            return response()->json($response, 201);

        }else{
            $response = [
                'error' => 'Portfolio not found',
                'data'  => null,
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $portfolio_item_id)
    {
        $portfolios        = Portfolio::all();
        $portfolio_button  = PortfolioButton::where('id', $portfolio_item_id)->first();
        if(!empty( $portfolio_button )){
            $response = [
                'portfolios' =>  $portfolios,
                'data'       =>  $portfolio_button,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'error' => 'Portfolio Button not found',
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PortfolioButtonRequest $request, string $portfolio_button_id)
    {
        $validated      = $request->validated();
        $portfolios     = Portfolio::where('id', $validated['portfolio_id'])->first();

        if($portfolios){

            $portfolio_button = PortfolioButton::where('id', $portfolio_button_id)->first();

            if( $portfolio_button ){

                $portfolio_button->update([
                    'portfolio_id' => $validated['portfolio_id'],
                    'text'         => $validated['text'],
                    'link'         => $validated['link'],
                ]);
                
                $response = [
                    'message' => 'Selected Portfolio Button is updated!',
                    'data' => $portfolio_button
                ];
                return response()->json($response, 202);

            }else{

                $response = [
                    'error' => 'Portfolio Button not found',
                    'data'  => null,
                ];
                return response()->json($response, 404);

            }

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
    public function destroy(string $portfolio_button_id)
    {
        $portfolio_button = PortfolioButton::findOrFail($portfolio_button_id);
        if(!empty( $portfolio_button )){
            $portfolio_button->delete();
            return response()->json('', 204);
        }
    }
}
