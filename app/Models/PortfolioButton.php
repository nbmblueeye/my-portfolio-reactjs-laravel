<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortfolioButton extends Model
{
    use HasFactory;

    protected $fillable = [
        'portfolio_id',
        'text',
        'link',
    ];

    protected $casts = [
        'created_at'        => 'date:Y-m-d'
    ];
}
