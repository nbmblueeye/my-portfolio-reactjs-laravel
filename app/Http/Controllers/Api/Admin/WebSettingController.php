<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\WebSetting;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\WebSettingRequest;

class WebSettingController extends Controller
{
    public function Setting(WebSettingRequest $request){

        $validated = $request->validated();
        $settings = WebSetting::first();
        if(empty($settings)){
            $image = "";
            if(!empty($validated['logo'])){
                $base64_pos = strpos($validated['logo'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['logo'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_logo'.'.'.$file_ext[1];
                    $folder     = public_path()."/images/settings";
                    $new_image  = Image::make($validated['logo']);
                    $new_image->save($folder."/".$file_name);
                    $image      =  $file_name;
                }else{
                    $image = null;
                }
            }else{
                $image = null;
            }

            $data = WebSetting::create([
                'logo'          => $image ,
                'websiteName'   => $validated['websiteName'],
                'websiteUrl'    => $validated['websiteUrl'],
                'websiteDescription' => $validated['websiteDescription'],
                'pageTitle'     => $validated['pageTitle'],
                'metaKeywords'  => $validated['metaKeywords'],
                'metaDes'       => $validated['metaDes'],
                'address'       => $validated['address'],
                'phoneNo1'      => $validated['phoneNo1'],
                'phoneNo2'      => $validated['phoneNo2'],
                'emailNo1'      => $validated['emailNo1'],
                'emailNo2'      => $validated['emailNo2'],
                'facebook'      => $validated['facebook'],
                'linkedin'      => $validated['linkedin'],
                'instagram'     => $validated['instagram'],
                'youtube'       => $validated['youtube'],
            ]);
            $response = [
                'settings_' => $data,
                'message' => 'New Setting created successfully', 
            ];
            return response()->json($response, 201);
        }else{
            $image = "";
            if(!empty($validated['logo'])){
                $base64_pos = strpos($validated['logo'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['logo'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_logo'.'.'.$file_ext[1];

                    $folder     = public_path()."/images/settings";
                    if(!empty($settings->logo)){
                        if(file_exists($folder."/".$settings->logo)){
                            unlink($folder."/".$settings->logo);
                        }
                    }
                    $new_image  = Image::make($validated['logo']);
                    $new_image->save($folder."/".$file_name);
                    $image      =  $file_name;
                }else{
                    if(!empty($settings->logo)){                 
                        $image  =  $settings->logo;                      
                    }
                }
            }else{
                $image = null;
            }

            $settings->update([
                'logo'          => $image ,
                'websiteName'   => $validated['websiteName'],
                'websiteUrl'    => $validated['websiteUrl'],
                'websiteDescription' => $validated['websiteDescription'],
                'pageTitle'     => $validated['pageTitle'],
                'metaKeywords'  => $validated['metaKeywords'],
                'metaDes'       => $validated['metaDes'],
                'address'       => $validated['address'],
                'phoneNo1'      => $validated['phoneNo1'],
                'phoneNo2'      => $validated['phoneNo2'],
                'emailNo1'      => $validated['emailNo1'],
                'emailNo2'      => $validated['emailNo2'],
                'facebook'      => $validated['facebook'],
                'linkedin'      => $validated['linkedin'],
                'instagram'     => $validated['instagram'],
                'youtube'       => $validated['youtube'],
            ]);
           
            $response = [
                'settings_' => $settings,
                'message' => 'Setting is updated successfully', 
            ];
            return response()->json($response, 201);
        }
    }

    public function Index(){
        $settings = WebSetting::first();
        $response = [
            'settings_' => $settings,
        ];
        return response()->json($response, 200);
    }
}
