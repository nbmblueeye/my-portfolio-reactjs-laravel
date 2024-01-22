<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthRequest;
use App\Http\Requests\Auth\UserLoginRequest;
use App\Mail\UserConfirmationMailable;
use App\Mail\UserVerification;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function Register(AuthRequest $request){

        $validated = $request->validated();

        $user = User::create([
            'name'      => $validated['name'],
            'email'     => $validated['email'],
            'user_role' => 'Visitor',
            'password'  => bcrypt($validated['password']),
        ]);

        if($user){
            $token = $user->createToken("user_".$validated['email'])->plainTextToken;
            try {
                Mail::mailer('smtp')->to($validated['email'])->send(new UserConfirmationMailable($user));
                $response = [
                    'message' => 'Please confirm your registered email to login!',
                ];
                return response()->json($response, 200);
            } catch (\Exception $error) {
                $user->delete();
                $response = [
                    'error' => 'Can not send email confirmation to '.$validated['email'],
                ];
                return response()->json($response, 500);
            }
        }
    }

    public function Login(UserLoginRequest $request){

        $validated = $request->validated();

        if(Auth::attempt(['email' => $validated['email'], 'password' => $validated['password']], $request->remember)){

            $user = Auth::user();
            if(!$user->email_verified_at){

                $response = [
                    'error' => 'Please verify your email to login.',
                ];
        
                return response()->json($response, 403);
            }

            if($user->user_role == 'Admin' ||$user->user_role == 'Visitor'){
                $token = $user->createToken("admin_".$validated['email'], ['server:Admin'])->plainTextToken;
            }else{
                $token = $user->createToken("visitor_".$validated['email'], [''])->plainTextToken;
            }

            $response = [
                'user'  => $user,
                'token' => $token,
                'message' => 'Login successfully',
            ];
    
            return response()->json($response, 202);

        }else{
            $response = [
                'error' => 'Wrong email or password',
            ];
    
            return response()->json($response, 401);
        }
    }

    public function Logout(Request $request){

        $request->user()->currentAccessToken()->delete();
        return response()->json('', 204);

    }
}
