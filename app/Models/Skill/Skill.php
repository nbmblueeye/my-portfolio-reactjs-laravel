<?php

namespace App\Models\Skill;

use App\Models\Skill\SkillItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Skill extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description', 
        'image',
    ];

    public function skillItem(){
        return $this->hasMany(SkillItem::class, 'skill_id', 'id');
    }

    protected $casts = [
        'created_at'        => 'date:Y-m-d'
    ];
}
