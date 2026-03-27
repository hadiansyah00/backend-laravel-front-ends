<?php

namespace Database\Seeders;

use App\Models\Tags;
use Illuminate\Database\Seeder;

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
            'Beasiswa',
        ];

        foreach ($tags as $tag) {
            Tags::updateOrCreate(
                ['slug' => \Str::slug($tag)],
                ['name' => $tag]
            );
        }
    }
}
