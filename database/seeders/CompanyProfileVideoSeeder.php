<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CompanyProfileVideo;

class CompanyProfileVideoSeeder extends Seeder
{
    public function run(): void
    {
        CompanyProfileVideo::truncate();

        CompanyProfileVideo::create([
            'title' => 'Profil Kampus STIKes Bogor Husada',
            'description' => 'Video company profile resmi STIKes Bogor Husada.',
            'video_url' => 'https://www.youtube.com/watch?v=XXXXXXX',
            'is_active' => true,
        ]);

        CompanyProfileVideo::create([
            'title' => 'Kegiatan Mahasiswa',
            'description' => 'Dokumentasi kegiatan mahasiswa selama perkuliahan.',
            'video_url' => 'https://www.youtube.com/watch?v=YYYYYYY',
            'is_active' => false,
        ]);
    }
}
