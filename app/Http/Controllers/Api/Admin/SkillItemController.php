<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SkillItemRequest;
use App\Models\Skill\Skill;
use App\Models\Skill\SkillItem;
use Illuminate\Http\Request;

class SkillItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $skills = Skill::select('id', 'title')->get();
        $skillItems = SkillItem::select('id', 'skill_id','title','description','percent', 'created_at')->get();
        $response = [
            'skills'    => $skills,
            'data'      =>  $skillItems,
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SkillItemRequest $request)
    {
        $validated  = $request->validated();
        $skill      = Skill::where('id', $validated['skill_id'])->first();
        if(!empty($skill)){
            $data = $skill->skillItem()->create([
                    'skill_id'    => $validated['skill_id'],
                    'title'       => $validated['title' ], 
                    'description' => $validated['description'],
                    'percent'     => $validated['percent'],
                ]);
    
            $response = [
                'message' => 'A New SkillItem is added',
                'data'    =>  $data
            ];
            return response()->json($response, 201);
        }else{
            $response = [
                'error' => 'Skill not found',
                'data'  => null
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($skill_item_id)
    {
        $skills = Skill::all();
        $skillItem = SkillItem::where('id', $skill_item_id)->first();
        if(!empty($skillItem)){
            $response = [
                'skills' => $skills,
                'data' => $skillItem,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'error' => 'SkillItem not found',
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
    public function update(SkillItemRequest $request, $skill_item_id)
    {
        $validated = $request->validated();
        $skill      = Skill::where('id', $validated['skill_id'])->first();
        if(!empty($skill)){
            $skillItem = SkillItem::where('id', $skill_item_id)->first();
            if($skillItem){
                $skillItem->update([
                    'skill_id'    => $validated['skill_id'],
                    'title'       => $validated['title' ], 
                    'description' => $validated['description'],
                    'percent'     => $validated['percent'],
                ]);
                $response = [
                    'message' => 'Selected SkillItem is updated!',
                    'data'    =>  $skillItem
                ];
                return response()->json($response, 202);
            }else{
                $response = [
                    'error' => 'SkillItem not found',
                    'data'  => null
                ];
                return response()->json($response, 404);
            }
        }else{
            $response = [
                'error' => 'Skill not found',
                'data'  => null
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
    public function destroy($skill_item_id)
    {
        $skill_item = SkillItem::findOrFail($skill_item_id);
        if(!empty($skill_item)){
            $skill_item->delete();
            return response()->json('', 204);
        }
       
    }
}
