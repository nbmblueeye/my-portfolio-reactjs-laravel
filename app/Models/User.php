<?php

namespace App\Models;

//use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\Like;
use App\Models\VisitorMessage;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'user_role',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $visible = [
        'id',
        'profiles',
        'name',
        'email',
        'user_role',
        'created_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at'        => 'date:Y-m-d'
    ];

    protected $with = ['profiles'];
    public function profiles(){
        return $this->hasOne(UserProfile::class, 'user_id', 'id');
    }

    public function messages(){
        return $this->hasMany(VisitorMessage::class, 'user_id', 'id');
    }

    public function upvotes(){
        return $this->hasMany(Like::class, 'user_id', 'id');
    }
}
