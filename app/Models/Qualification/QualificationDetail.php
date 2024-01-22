<?php

namespace App\Models\Qualification;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QualificationDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'qualification_item_id',
        'title',
        'link',
        'description',
        'image',
    ];

    protected $casts = [
        'created_at'        => 'date:Y-m-d'
    ];
    
}
