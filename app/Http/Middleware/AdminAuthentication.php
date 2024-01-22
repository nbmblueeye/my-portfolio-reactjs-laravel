<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
       
        if(Auth::user()){

            if (auth()->user()->tokenCan('server:Admin')) {
                return $next($request);
            }else{
                $response = [
                    'error' => 'Access delied,...',
                ];
                return response()->json($response, 403);
            }

        }else{
            $response = [
                'error' => 'Please login',
            ];
            return response()->json($response, 401);
        }

    }
}
