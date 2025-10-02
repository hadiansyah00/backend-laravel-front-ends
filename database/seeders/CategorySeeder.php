<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Berita Kampus',
                'slug' => 'berita-kampus',
            ],
            [
                'name' => 'Artikel Kesehatan',
                'slug' => 'artikel-kesehatan',
            ],
            [
                'name' => 'Pengumuman',
                'slug' => 'pengumuman',
            ],
            [
                'name' => 'Kegiatan Mahasiswa',
                'slug' => 'kegiatan-mahasiswa',
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
