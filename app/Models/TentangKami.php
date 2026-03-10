<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TentangKami extends Model
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
     * Define the predefined types for Tentang Kami sections
     */
    public const TYPES = [
        'profil' => 'Profil STIKes',
        'sambutan' => 'Sambutan Ketua',
        'visi_misi' => 'Visi & Misi',
        'sejarah' => 'Sejarah Institusi',
        'struktur' => 'Struktur Organisasi',
    ];
}
