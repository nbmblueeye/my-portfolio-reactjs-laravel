<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'sub_title',
        'description',
        'image',
    ];

    public function portfolioButton(){
        return $this->hasOne(PortfolioButton::class, 'portfolio_id', 'id');
    }

    protected $casts = [
        'created_at'        => 'date:Y-m-d'
    ];
}
