<?php

namespace Database\Seeders;

use Str;
use App\Models\Tags;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            'STIKes Bogor Husada',
            'Mahasiswa',
            'Kesehatan',
            'Farmasi',
            'Gizi',
            'Kebidanan',
            'Prestasi',
            'Pengabdian Masyarakat',
            'Seminar',
            'Workshop',
            'Beasiswa'
        ];

        foreach ($tags as $tag) {
            Tags::updateOrCreate(
                ['slug' => \Str::slug($tag)],
                ['name' => $tag]
            );
        }
    }
}
