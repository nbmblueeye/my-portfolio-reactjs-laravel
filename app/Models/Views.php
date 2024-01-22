<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Views extends Model
{
    use HasFactory;

    protected $fillable = [
        "ip_address",
        "user_agent",
        "user_id",
        "post_id",
    ];

    public function userView(){
        return $this->belongsTo(User::class, "user_id", "id");
    }
}
