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
            'name' => 'Budi',
            'role' => 'Alumni',
            'message' => 'Belajar di sini sangat menyenangkan dan bermanfaat untuk karir saya.',
            'photo' => 'testimonials/budi2.jpg',
        ]);

        Testimonial::create([
            'name' => 'Siti ',
            'role' => 'Mahasiswa',
            'message' => 'Dosen-dosen sangat ramah dan profesional!',
            'photo' => 'testimonials/siti2.jpg',
        ]);
        Testimonial::create([
            'name' => 'Andi Pratama',
            'role' => 'Alumni',
            'message' => 'Lingkungan kampus sangat mendukung pengembangan diri.',
            'photo' => 'testimonials/andi.jpg',
        ]);

        Testimonial::create([
            'name' => 'Dewi Lestari',
            'role' => 'Mahasiswa',
            'message' => 'Fasilitas kampus lengkap dan nyaman untuk belajar.',
            'photo' => 'testimonials/dewi.jpg',
        ]);

        Testimonial::create([
            'name' => 'Rizky Nugroho',
            'role' => 'Mahasiswa',
            'message' => 'Kegiatan organisasi di kampus sangat membantu softskill saya.',
            'photo' => 'testimonials/rizky.jpg',
        ]);

        Testimonial::create([
            'name' => 'Nur Aisyah',
            'role' => 'Alumni',
            'message' => 'Ilmu yang saya dapat di sini sangat bermanfaat di dunia kerja.',
            'photo' => 'testimonials/aisyah.jpg',
        ]);

        Testimonial::create([
            'name' => 'Fajar Ramadhan',
            'role' => 'Mahasiswa',
            'message' => 'Teman-teman sekelas kompak dan suasana belajar menyenangkan.',
            'photo' => 'testimonials/fajar.jpg',
        ]);
    }
}
