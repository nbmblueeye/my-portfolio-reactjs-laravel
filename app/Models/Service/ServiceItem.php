<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'title',
        'link',
        'description',
        'image',
    ];

    protected $casts = [
        'created_at'        => 'date:Y-m-d'
    ];
}
