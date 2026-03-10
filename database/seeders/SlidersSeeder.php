<?php

namespace Database\Seeders;

use App\Models\Slider;
use Illuminate\Database\Seeder;

class SlidersSeeder extends Seeder
{
    public function run(): void
    {
        Slider::truncate();

        Slider::create([
            'title' => 'Selamat Datang di Website Kami',
            'subtitle' => 'STIKes Bogor Husada',
            'image' => 'sliders/slider1.jpg',
            'link' => 'https://sbh.ac.id',
            'order' => 1,
        ]);

        Slider::create([
            'title' => 'Penerimaan Mahasiswa Baru',
            'subtitle' => 'Ayo daftar sekarang juga!',
            'image' => 'sliders/slider2.jpg',
            'link' => 'https://pmb.sbh.ac.id',
            'order' => 2,
        ]);
    }
}
