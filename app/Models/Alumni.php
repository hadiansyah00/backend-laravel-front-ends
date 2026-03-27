<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alumni extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'nim',
        'program_studi_id', // 🔥 ganti ke relasi
        'tahun_lulus',
        'tempat_kerja',
        'jabatan',
        'testimonial',
        'photo',
        'is_featured',
        'is_active',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'tahun_lulus' => 'integer',
    ];

    // 🔥 RELASI KE PROGRAM STUDI
    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class);
    }

    // 🔥 HELPER: URL FOTO
    public function getPhotoUrlAttribute()
    {
        return $this->photo
            ? asset('storage/' . $this->photo)
            : asset('images/default-user.png');
    }

    // 🔥 SCOPE AKTIF
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // 🔥 SCOPE FEATURED
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}