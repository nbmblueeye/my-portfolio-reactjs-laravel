<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RoleRequest;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = Role::all();

        $response = [
            'data' => $roles,
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RoleRequest $request)
    {
        $validated = $request->validated();

        $role = Role::create([
            'name' => $validated['name'],
        ]);

        $response = [
            'message' => 'A new Role was added',
            'data'    => $role
        ];

        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($role_id)
    {
        $role = Role::where('id',$role_id)->select('name')->first();

        if($role){
            $response = [
                'data' => $role,
            ];
    
            return response()->json($response, 200);
        }else{
            $response = [
                'error' => 'Role not found',
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
    public function update(RoleRequest $request, $role_id)
    {
        $validated = $request->validated();  

        $role = Role::find($role_id);
        if($role){
            $role->update([
                'name' => $validated['name'],
            ]);
            $response = [
                'message' => 'Role was updated',
                'data'    => $role
            ];
            return response()->json($response, 202);
        }else{
            $response = [
                'error' => 'Role not found',
                'data'  => null,
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
    public function destroy($role_id)
    {
        $role = Role::findOrFail($role_id);
        $role->delete();
        return response()->json('', 204);
    }
}
