<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Skill\Skill;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;
use App\Http\Requests\Admin\SkillRequest;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $skills = Skill::select('id', 'title', 'description', 'image', 'created_at')->get();
        $response = [
            'data' =>  $skills,
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SkillRequest $request)
    {
        $validated = $request->validated();

        $image = "";
        if(!empty($validated['image'])){
            $base64_pos = strpos($validated['image'], ";base64");
            if($base64_pos){
                $base64_sub = substr($validated['image'],0 , $base64_pos);
                $file_ext   = explode('/', $base64_sub);
                $file_name  = time().'_skill'.'.'.$file_ext[1];

                $folder     = public_path()."/images/skills";
                $new_image  = Image::make($validated['image']);
                $new_image->save($folder."/".$file_name);
                $image      =  $file_name;

            }else{
                $image = null;
            }
        }else{
            $image = null;
        }
        
        $skill = Skill::create([
            'title'         => $validated['title'],
            'description'   => $validated['description'],
            'image'         => $image,
        ]);

        $response = [
            'message' => 'A New Skill is added',
            'data'    => $skill
        ];

        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($skill_id)
    {
        $skill = Skill::where('id', $skill_id)->first();
        if(!empty($skill)){
            $response = [
                'data' => $skill,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'error' => 'Skill not found',
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(SkillRequest $request, $skill_id)
    {    
        $validated = $request->validated();
        $skill = Skill::find($skill_id);
        if(!empty($skill)){
            $image = "";
            if(!empty($validated['image'])){
                $base64_pos = strpos($validated['image'], ";base64");
                if($base64_pos){
                    $base64_sub = substr($validated['image'],0 , $base64_pos);
                    $file_ext   = explode('/', $base64_sub);
                    $file_name  = time().'_skill'.'.'.$file_ext[1];
                    $folder     = public_path()."/images/skills";
                    if(!empty($skill->image)){
                        if(file_exists($folder."/".$skill->image)){
                            unlink($folder."/".$skill->image);
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
                'message' => 'Selected Skill is updated!',
            ];

            if(!empty($image)){
                $skill->update([
                    'title'         => $validated['title'],
                    'description'   => $validated['description'],
                    'image'         => $image,
                ]);

                $response['data']  = $skill;
            }else{
                $skill->update([
                    'title'         => $validated['title'],
                    'description'   => $validated['description'],
                ]);
                $response['data']  = $skill;
            }

            return response()->json($response, 202);
        }else{
            $response = [
                'error' => 'Skill not found',
                'data'    => null
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($skill_id)
    {
        $skill = Skill::findOrFail($skill_id);
        if(!empty($skill)){
            $folder     = public_path()."/images/skills";
            if(!empty($skill->image)){
                if(file_exists($folder."/".$skill->image)){
                    unlink($folder."/".$skill->image);
                }
            }
            $skill->delete();
            return response()->json('', 204);
        }
      
    }
}
