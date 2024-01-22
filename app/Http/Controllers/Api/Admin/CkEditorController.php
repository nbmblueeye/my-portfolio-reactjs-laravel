<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CkEditorController extends Controller
{
    public function uploadFile(Request $request){

        if ($request->hasFile('upload')) {

            $file = $request->file('upload');
            $name = time();
            $extension = $file->extension();
            $fileName = $name.".".$extension;
            
            $request->file('upload')->move(public_path("images/media"), $fileName);
      
            $url = asset("images/media/".$fileName);
            
            return response()->json(['fileName' => $fileName, 'uploaded'=> 1, 'url' => $url]);
        }

    }
}
