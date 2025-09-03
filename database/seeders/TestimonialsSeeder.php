<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonial;

class TestimonialsSeeder extends Seeder
{
    public function run(): void
    {
        Testimonial::truncate();

        Testimonial::create([
            'name' => 'Budi Santoso',
            'role' => 'Alumni',
            'message' => 'Belajar di sini sangat menyenangkan dan bermanfaat untuk karir saya.',
            'photo' => 'testimonials/budi.jpg',
        ]);

        Testimonial::create([
            'name' => 'Siti Aminah',
            'role' => 'Mahasiswa',
            'message' => 'Dosen-dosen sangat ramah dan profesional!',
            'photo' => 'testimonials/siti.jpg',
        ]);
    }
}
