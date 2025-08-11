<?php

namespace Database\Seeders;

use App\Models\Pages;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

        public function run()
    {
        $pages = [
            ['title' => 'Beranda', 'slug' => 'beranda', 'type' => 'modular'],
            ['title' => 'Tentang Kami', 'slug' => 'tentang-kami', 'type' => 'editor', 'content' => '<p>Ini adalah halaman Tentang Kami.</p>'],
            ['title' => 'Layanan', 'slug' => 'layanan', 'type' => 'editor', 'content' => '<ul><li>Layanan A</li><li>Layanan B</li></ul>'],
            ['title' => 'Kontak', 'slug' => 'kontak', 'type' => 'editor', 'content' => '<p>Hubungi kami di sini.</p>'],
        ];

        foreach ($pages as $page) {
            Pages::create($page);
        }
    }

}
