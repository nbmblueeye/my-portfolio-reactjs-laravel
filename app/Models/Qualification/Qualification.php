<?php

namespace App\Models\Qualification;

use Illuminate\Database\Eloquent\Model;
use App\Models\Qualification\QualificationItem;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Qualification extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description', 
        'image',
    ];

    protected $casts = [
        'created_at'        => 'date:Y-m-d'
    ];

    public function qualificationItem(){
        return $this->hasMany(QualificationItem::class, 'qualification_id', 'id');
    }

}
