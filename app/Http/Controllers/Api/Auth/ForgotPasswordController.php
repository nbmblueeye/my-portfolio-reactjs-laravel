<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Mail\ForgotPasswordMailable;
use Illuminate\Support\Facades\Mail;

class ForgotPasswordController extends Controller
{
    public function sendEmail(Request $request){

        $validated = $request->validate([
            'email' => 'required|email'
        ]);

        $user = DB::table('users')->where('email', '=', $validated['email'])->first();
    
        if(empty($user)){
            $response = [
                'error' => 'User not found by email address: '.$validated['email'],
            ];
            return response()->json($response, 403);
        }else{

            $password_reset = DB::table('password_resets')->where('email', '=', $validated['email'])->exists();
            if($password_reset){

                $response = [
                    'warning' => 'Reset Password Link already sent to : '.$validated['email'],
                ];
                return response()->json($response, 500);

            }else{

                $token      = Str::random(64);
                $created_at = Carbon::now();

                DB::table('password_resets')->insert([
                    'email'         => $validated['email'],
                    'token'         => $token,
                    'created_at'    => $created_at,
                ]);

                try {

                    $data = ['email' => $validated['email'], 'token' => $token];
                    $data = (object)$data;

                    Mail::mailer('smtp')->to($validated['email'])->send(new ForgotPasswordMailable($data));
                    $response = [
                        'message' => 'We just sent an email contain Reset Password Link to '.$validated['email'],
                    ];
                    return response()->json($response, 200);

                } catch (\Throwable $th) {

                    DB::table('password_resets')->where('email', '=', $validated['email'])->delete();
                    $response = [
                        'error' => 'Can not send email to '.$validated['email'],
                    ];
                    return response()->json($response, 403);
                }
  
            }
        }
    }

    public function showResetPasswordForm(Request $request, $token){

        if(!$request->hasValidSignature(false)){

            DB::table('password_resets')->where('token', '=',  $token)->delete();

            $response = [
                'error' => 'Invalid/Expired reset password link.',
            ];
            return response()->json($response, 403);

        }else{

            $response = [
                'message' => 'Please enter your new Password',
            ];
            return response()->json($response, 200);
        }
    }

    public function resetPassword(Request $request){

        $validated = $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6|confirmed',
        ]);

        $verify_password_resets = DB::table('password_resets')->where([
            ['email', '=' , $validated['email']], 
            ['token' , '=' , $validated['token']]
        ])->first();

        if(empty($verify_password_resets)){
            $response = [
                'error' => 'Invalid request is found!',
            ];
            return response()->json($response, 403);
        }else{

           $user = User::where('email', '=', $validated['email'])->update([
                'password' => bcrypt($validated['password']),
           ]);

           DB::table('password_resets')->where('email', '=', $validated['email'])->delete();

           $response = [
               'message' => 'Your password is updated successfully!',
           ];
           return response()->json($response, 200);
        }

    }
}
