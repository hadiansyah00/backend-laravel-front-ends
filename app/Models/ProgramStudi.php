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
        'image',
        'link',
        'is_active',
    ];
}
