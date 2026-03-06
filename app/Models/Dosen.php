<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
    /** @use HasFactory<\Database\Factories\DosenFactory> */
    use HasFactory;

    protected $fillable = [
        'nip',
        'nidn',
        'name',
        'position',
        'prodi',
        'photo',
        'bio',
        'linkedin_url',
        'email',
        'order',
        'is_active',
    ];
}
