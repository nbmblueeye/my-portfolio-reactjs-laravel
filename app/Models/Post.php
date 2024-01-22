<?php

namespace App\Models;

use App\Models\Views;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'thumbnail',
        'description',
        'slug'
    ];

    public function postView(){
        return $this->hasMany(Views::class, 'post_id', 'id');
    }

    public function postComments(){
        return $this->hasMany(Comment::class, 'post_id', 'id');
    }

    protected $casts = [
        'created_at'        => 'date:l, d M Y, H:i:s'
    ];
    
}
