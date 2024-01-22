<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UserRequest;
use App\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = Role::select('id','name')->get();
        $users = User::select('id','name', 'email', 'user_role', 'created_at')->get();
        $response = [
            'roles' => $roles,
            'data'  => $users
        ];

        return response()->json($response, 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        $validated = $request->validated();

        $role = Role::where('name', $validated['user_role'])->first();
        if(!empty($role)){
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'user_role' => $validated['user_role'],
                'password' => bcrypt($validated['password']),
            ]);
    
            $response = [
                'message' => 'A new User is added',
                'data'    => $user
            ];
            return response()->json($response, 201);
        }else{
            $response = [
                'error' => 'Role not found',
                'data'    => null,
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
    public function show($user_id)
    {
        $user = User::where('id', $user_id)->select('name', 'email', 'user_role')->first();
        $roles = Role::select('name')->get();
        if($user){
            $response = [
                'user' => $user,
                'roles' => $roles,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'error' => 'User not found',
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
    public function update(Request $request, $user_id)
    {
        $validated = $request->validate([
            'name'          => 'required|string',
            'email'         => 'required|email',
            'user_role'     => 'required',
            'password'      => 'required|min:8',
        ]);

        $role = Role::where('name', $validated['user_role'])->first();

        if(!empty($role)){

            $user = User::find($user_id);

            if($user){
                $response = [
                    'message' => 'User was updated',
                ];
                if( !empty($validated['password'] )){
                    $user->update([
                        "name"      => $validated['name'],
                        "email"     => $validated['email'],
                        "user_role" => $validated['user_role'],
                        "password"  => bcrypt($validated['password']),
                    ]);
                    $response['data']  = $user;
                }else{
                    $user->update([
                        "name"      => $validated['name'],
                        "email"     => $validated['email'],
                        "user_role" => $validated['user_role'],
                    ]);
                    $response['data']  = $user;
                }
                return response()->json($response, 202);
            }else{
                $response = [
                    'error' => 'User not found',
                    'data'  => null,
                ];
                return response()->json($response, 404);
            }
        }else{
            $response = [
                'error' => 'User not found',
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
    public function destroy($user_id)
    {
        $user = User::findOrFail($user_id);
        $user->delete();
        return response()->json('', 204);
    }
}
