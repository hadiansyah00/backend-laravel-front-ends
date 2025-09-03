<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyProfileVideo extends Model
{
    protected $fillable = [
        'title',
        'description',
        'video_url',
        'is_active',
    ];
}
