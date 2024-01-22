<?php

namespace App\Http\Controllers\Api\FrontEnd;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\VisitorMessage;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Notification;
use App\Notifications\VisitorMessageNotification;


class VisitorMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = DB::table('notifications')->paginate(10);
        $unreadMessage  = DB::table('notifications')->whereNull('read_at')->get();
        $response = [
            'data' => $messages,
            'unread' => $unreadMessage,
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'messageTitle'  => 'required|string',
            "message"       => 'required|string|max:450',
        ]);

        if(!auth('sanctum')->check()){
            $response = [
                'message' => 'Please login to leave your message!',
            ];
            return response()->json($response, 401);
        }else{

            $user = User::find(auth('sanctum')->user()->id);
            $information = [
                'user_name' => $user->name,
                'messageTitle'  => $validated['messageTitle'],  
                'message'       => $validated['message'],
            ];

            $notification = $user->notify(new VisitorMessageNotification($information));

            $response = [
                'message'   => '<p>Thank you for your message</p>
                                <p>We will get back to you soon</p>',
            ];
            return response()->json($response, 201); 

        }
    }

    /**
     * Display the specified resource.
     */
    public function getUnreadMessage()
    {
        $unreadMessage  = DB::table('notifications')->whereNull('read_at')->get();

        $response = [
            'unread' => $unreadMessage,
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function markAsRead(Request $request, string $mess_id)
    {
        
        $user = User::find($request->user_id);
        if($user){

            $data = $user->notifications()->where('id', $mess_id)->first();

            if(!$data->read_at){

                $user->notifications()->where('id', $mess_id)->update(['read_at' => now()]);
                $response = [
                    'message' => 'Message is read',
                    'data'  =>  $user->notifications()->where('id', $mess_id)->first()
                ];
                return response()->json($response, 202);

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
     */
    public function deleteMessage(string $user_id, string $mess_id)
    {
        $user = User::find($user_id);
        if($user){

            $data = $user->notifications()->where('id', $mess_id)->get();
            if($data){
               $user->notifications()->where('id', $mess_id)->delete();
                return response()->json("",204);
            }
           
        }else{
            $response = [
                'error' => 'User not found',
            ];
            return response()->json($response, 404);
        }
    }
}
