<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Home extends Model
{
    use HasFactory;
    protected $table='homes';

    protected $fillable = [
        'title',
        'sub_title',
        'message',
        'image',
        'facebook_url',
        'linkedin_url',
        'instagram_url',
        'youtube_url',
        'button_text',
        'button_url',
    ];

    protected $casts = [
        'created_at'        => 'date:Y-m-d'
    ];
    
}
