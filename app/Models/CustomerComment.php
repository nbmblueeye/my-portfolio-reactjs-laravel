<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerComment extends Model
{
    use HasFactory;

    use HasFactory;
    protected $table = 'customer_comments';

    protected $fillable = [
        'name',
        'job',
        'comment',
        'image',
    ];

    protected $casts = [
        'created_at'        => 'date:Y-m-d'
    ];
    
}
