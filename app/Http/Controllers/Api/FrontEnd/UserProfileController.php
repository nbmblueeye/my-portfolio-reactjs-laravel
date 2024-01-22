<?php

namespace App\Http\Controllers\Api\FrontEnd;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class UserProfileController extends Controller
{
    public function index(){
        if(auth('sanctum')->check()){
            $user = User::with('profiles')->where('id',auth('sanctum')->user()->id)->first();
            $response = [
                'data' => $user,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'error' => 'Please login first',
            ];
            return response()->json($response, 401);
        }
    }

    public function update(Request $request){
        $validated = $request->validate([
            'name'          => 'required|string',
            'email'         => 'required|email',
            'phone'         => 'required|digits_between:9,12',
            'pin_code'      => 'required|digits_between:5,10',
            "address"       => 'required|max:450',
            'avatar'        => 'nullable',
        ]);
        if(!auth('sanctum')->check()){
            $response = [
                'error' => 'Please login first!',
            ];
            return response()->json($response, 401);
        }else{
            $user = User::find(auth()->user()->id);
            $user->update([
                'name'  => $validated['name'],
                'email' => $validated['email'],
            ]);
            $avatar = "";
            if(!empty($validated['avatar'])){
                $base64_pos = strpos($validated['avatar'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['avatar'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_'.$validated['name'].'_avatar'.'.'.$file_ext[1];
                    $folder     = public_path()."/images/avatars";

                    if(!empty($user->profiles->avatar)){
                        if(file_exists($folder."/".$user->profiles->avatar)){
                            unlink($folder."/".$user->profiles->avatar);
                        }
                    }
                    $new_image  = Image::make($validated['avatar'])->resize(100,100);
                    $new_image->save($folder."/".$file_name);
                    $avatar     =  $file_name;
                    
                }else{
                    $avatar     =  $validated['avatar'];
                }
            }else{
                $avatar = null;
            }
            $user->profiles()->updateOrCreate(
                ['user_id' => auth()->user()->id],
                [
                    'phone'     => $validated['phone'],
                    'pin_code'  => $validated['pin_code'],
                    'address'   => $validated['address'],
                    'avatar'    => $avatar,
                ]
            );
            $response = [
                'message'   => 'Your Profile has been updated!',
                'data'      => $user->load('profiles')
            ];
            return response()->json($response, 202);
        }
    }

}
