<?php

namespace Database\Seeders;

use App\Models\MetaSettings;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MetaSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $meta = [
            [
                'page_slug' => 'beranda',
                'title' => 'Selamat Datang di Website Resmi Kami',
                'meta_description' => 'Ini adalah halaman utama website company profile Anda.',
                'keywords' => 'beranda, home, company profile',
                'og_title' => 'Beranda - Company Name',
                'og_description' => 'Website resmi yang menyajikan informasi tentang kami.',
                'og_image' => 'https://example.com/images/og-home.jpg',
            ],
            [
                'page_slug' => 'default',
                'title' => 'Company Profile Website',
                'meta_description' => 'Website resmi perusahaan.',
                'keywords' => 'profil perusahaan, layanan, kontak',
            ],
        ];

        foreach ($meta as $data) {
            MetaSettings::create($data);
        }
    }
}