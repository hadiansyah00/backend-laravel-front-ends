<?php

namespace Database\Seeders;

use App\Models\Pages;
use App\Models\PageSections;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PageSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $beranda = Pages::where('slug', 'beranda')->first();

        $sections = [
            [
                'type' => 'hero',
                'content' => json_encode([
                    'title' => 'Selamat Datang di Website Kami',
                    'subtitle' => 'Kami hadir memberikan solusi terbaik.',
                    'background' => '/images/banner.jpg'
                ]),
                'order' => 1,
            ],
            [
                'type' => 'feature',
                'content' => json_encode([
                    'items' => [
                        ['icon' => '🚀', 'title' => 'Cepat', 'desc' => 'Layanan cepat dan responsif.'],
                        ['icon' => '🔒', 'title' => 'Aman', 'desc' => 'Keamanan data terjamin.'],
                    ]
                ]),
                'order' => 2,
            ],
        ];

        foreach ($sections as $section) {
            PageSections::create([
                'page_id' => $beranda->id,
                ...$section
            ]);
        }
    }
}