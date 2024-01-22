<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EmailVerificationController extends Controller
{
    public function verify($user_id ,Request $request){

        $user = User::findOrFail($user_id);

        if($user){  
            if(!$request->hasValidSignature(false)){
                $response = [
                    'error' => 'Invalid/Expired verification email link.',
                ];
                return response()->json($response, 403);

            }else{
                if(!$user->hasVerifiedEmail()){
                    $user->markEmailAsVerified();
                    $response = [
                        'message' => 'Email is verified successfully!',
                    ];
                    return response()->json($response, 202);
                }else{
        
                    $response = [
                        'warning' => 'Email was already verified.',
                    ];
                    return response()->json($response, 500);
                }
            }
        }
        
    }
}
