<?php

namespace App\Models;

use App\Models\User;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Like extends Model
{
    
    use HasFactory;
    
    protected $fillable = [
        'is_upvoted',
        'comment_id',
        'user_id',
    ];

    public function userUpvoted(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function commentUpvoted(){
        return $this->belongsTo(Comment::class, 'comment_id', 'id');
    }
}
