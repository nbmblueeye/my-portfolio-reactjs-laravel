<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notification;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VisitorMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'messageTitle',
        "message",
        "user_id",
        "notification_id"
    ];

    public function userMessages(){
        return $this->belongsTo(User::class, "user_id", "id");
    }

    public function notifications(){
        return $this->hasOne(Notification::class, "notification_id", "id");
    }

    protected $casts = [
        'created_at'        => 'date:Y-m-d H:i:s'
    ];
}
