<?php

namespace App\Models;

use App\Models\Like;
use App\Models\User;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "post_id",
        "parent_id",
        "comment",
    ];

    public function userComment(){
        return $this->belongsTo(User::class, "user_id", "id");
    }

    public function replies(){
        return $this->hasMany(Comment::class, "parent_id", "id");
    }

    public function comments(){
        return $this->belongsTo(Comment::class, "parent_id", "id");
    }

    public function commentLikes(){
        return $this->hasMany(Like::class, 'comment_id', 'id');
    }

    protected function serializeDate(DateTimeInterface $date): string
    {
        return $date->diffForHumans();
    }
}
