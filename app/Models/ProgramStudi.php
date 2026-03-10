<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgramStudi extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'visi',
        'misi',
        'akreditasi',
        'gelar',
        'lama_studi',
        'kaprodi_name',
        'kaprodi_photo',
        'kaprodi_profile',
        'peluang_kerja',
        'image',
        'link',
        'is_active',
    ];

    protected $casts = [
        'peluang_kerja' => 'array',
        'is_active' => 'boolean',
    ];
}
