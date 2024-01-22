<?php

namespace App\Models\Skill;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SkillItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'skill_id',
        'title',
        'description',
        'percent',
    ];

    protected $casts = [
        'created_at'        => 'date:Y-m-d'
    ];
}

