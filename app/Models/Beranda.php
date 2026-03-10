<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beranda extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'title',
        'content',
        'image',
        'is_active',
    ];

    /**
     * Define the predefined types for Beranda sections
     */
    public const TYPES = [
        'hero' => 'Hero Banner (Slider)',
        'quick_action' => 'Pendaftaran MB (Banner)',
        'program_studi' => 'Program Studi',
        'video_profil' => 'Video Profil',
        'testimoni' => 'Testimoni Alumni',
    ];
}
