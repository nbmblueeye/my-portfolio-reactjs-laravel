<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebSetting extends Model
{
    use HasFactory;
    protected $table = 'web_settings';
    
    protected $fillable = [
        'logo',
        'websiteName',
        'websiteUrl',
        'websiteDescription',
        'pageTitle',
        'metaKeywords',
        'metaDes',
        'address',
        'phoneNo1',
        'phoneNo2',
        'emailNo1',
        'emailNo2',
        'facebook',
        'linkedin',
        'instagram',
        'youtube',
    ];

    protected $visible = [
        'logo',
        'websiteName',
        'websiteUrl',
        'websiteDescription',
        'pageTitle',
        'metaKeywords',
        'metaDes',
        'address',
        'phoneNo1',
        'phoneNo2',
        'emailNo1',
        'emailNo2',
        'facebook',
        'linkedin',
        'instagram',
        'youtube',
    ];
}
