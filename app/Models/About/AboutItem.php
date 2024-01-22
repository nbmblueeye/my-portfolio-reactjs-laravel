<?php

namespace App\Models\About;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutItem extends Model
{
    use HasFactory;
    protected $fillable = [
        'about_id',
        'title',
        'description',
        'image',
    ];

    protected $casts = [
        'created_at' => 'date:Y-m-d',
    ];
}
