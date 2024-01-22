<?php

namespace App\Models\Service;

use App\Models\Service\ServiceItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description', 
        'image',
    ];

    public function serviceItem(){
        return $this->hasMany(ServiceItem::class, 'service_id', 'id');
    }

    protected $casts = [
        'created_at'        => 'date:Y-m-d'
    ];
}
