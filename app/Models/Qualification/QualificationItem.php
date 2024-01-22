<?php

namespace App\Models\Qualification;

use Illuminate\Database\Eloquent\Model;
use App\Models\Qualification\QualificationDetail;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class QualificationItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'qualification_id',
        'title',
        'description', 
        'image',
    ];

    protected $casts = [
        'created_at'        => 'date:Y-m-d'
    ];

    public function qualificationDetail(){
        return $this->hasMany(QualificationDetail::class, 'qualification_item_id', 'id');
    }
}
