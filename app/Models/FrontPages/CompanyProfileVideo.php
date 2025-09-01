<?php

namespace App\Models\FrontPages;

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
