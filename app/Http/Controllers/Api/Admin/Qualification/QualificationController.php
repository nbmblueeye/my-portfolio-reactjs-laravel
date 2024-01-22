<?php

namespace App\Http\Controllers\Api\Admin\Qualification;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;
use App\Models\Qualification\Qualification;
use App\Http\Requests\Admin\Qualification\QualificationRequest;

class QualificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $qualifications = Qualification::select('id', 'title', 'description', 'image', 'created_at' )->get();
        $response = [
            'data' =>  $qualifications,
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(QualificationRequest $request)
    {
        $validated = $request->validated();
        $image = "";
        if(!empty($validated['image'])){
            $base64_pos = strpos($validated['image'], ";base64");
            if($base64_pos){
                $base64_sub = substr($validated['image'],0 , $base64_pos);
                $file_ext   = explode('/', $base64_sub);
                $file_name  = time().'_qualification'.'.'.$file_ext[1];

                $folder     = public_path()."/images/qualifications";
                $new_image  = Image::make($validated['image']);

                $new_image->save($folder."/".$file_name);
                $image      =  $file_name;

            }else{
                $image = null;
            }
        }else{
            $image = null;
        }

        $qualification = Qualification::create([
            'title'         => $validated['title'],
            'description'   => $validated['description'],
            'image'         => $image,
        ]);

        $response = [
            'message' => 'A New Qualification is added',
            'data'    => $qualification,
        ];
        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($qualification_id)
    {
        $qualification = Qualification::where('id', $qualification_id)->select('title', 'description','image')->first();
        if(!empty($qualification)){
            $response = [
                'data' => $qualification,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'error' => 'Qualification not found',
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(QualificationRequest $request, string $qualification_id)
    {
        $validated = $request->validated();
        $qualification = Qualification::find($qualification_id);
        if(!empty($qualification)){
            $image = "";
            if(!empty($validated['image'])){
                $base64_pos = strpos($validated['image'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['image'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_qualification'.'.'.$file_ext[1];
                    $folder     = public_path()."/images/qualifications";
                    if(!empty($qualification->image)){
                        if(file_exists($folder."/".$qualification->image)){
                            unlink($folder."/".$qualification->image);
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
                'message' => 'Selected Qualification is updated!',
            ];

            if(!empty($image)){
                $qualification->update([
                    'title'         => $validated['title'],
                    'description'   => $validated['description'],
                    'image'         => $image,
                ]);
                $response['data']   = $qualification;
            }else{
                $qualification->update([
                    'title'         => $validated['title'],
                    'description'   => $validated['description'],
                ]);
                $response['data']   = $qualification;
            }
           
            return response()->json($response, 202);
        }else{
            $response = [
                'error' => 'Qualification not found',
                'data'  => null
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $qualification_id)
    {
        $qualification = Qualification::findOrFail($qualification_id);
        if(!empty($qualification)){
            $folder     = public_path()."/images/qualifications";
            if(!empty($qualification->image)){
                if(file_exists($folder."/".$qualification->image)){
                    unlink($folder."/".$qualification->image);
                }
            }
            $qualification->delete();
            return response()->json('', 204);
        }
    }
}
