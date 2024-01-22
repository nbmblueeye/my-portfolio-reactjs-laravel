<?php

namespace App\Models\About;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'sub_title',
        'introduction',
        'image',
    ];

    protected $casts = [
        'created_at' => 'date:Y-m-d',
    ];

    public function aboutItem(){
        return $this->hasMany(AboutItem::class, 'about_id', 'id');
    }
    
}
