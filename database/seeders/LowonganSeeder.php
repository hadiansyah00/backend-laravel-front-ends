<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lowongan;
use Illuminate\Support\Str;
use Carbon\Carbon;

class LowonganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'title' => 'Fullstack Laravel Developer',
                'slug' => Str::slug('Fullstack Laravel Developer ' . Str::random(5)),
                'company' => 'PT Teknologi Inovasi Nusantara',
                'location' => 'Jakarta Selatan (Hybrid)',
                'type' => 'full-time',
                'description' => 'Kami mencari Fullstack Developer yang berpengalaman menggunakan ekosistem TALL (Tailwind, Alpine, Laravel, Livewire) atau Inertia React.',
                'requirements' => "- Minimal S1 Teknik Informatika / Sistem Informasi\n- Pengalaman minimal 2 tahun menggunakan Laravel\n- Memahami RESTful API dan Git\n- Mampu bekerja dalam tim",
                'salary_range' => 'Rp 8.000.000 - Rp 12.000.000',
                'deadline' => Carbon::now()->addDays(30),
                'contact_info' => 'hr@tekinovasi.co.id',
                'is_active' => true,
            ],
            [
                'title' => 'UI/UX Designer',
                'slug' => Str::slug('UI UX Designer ' . Str::random(5)),
                'company' => 'Creative Studio Jkt',
                'location' => 'Bandung, Jawa Barat (WFO)',
                'type' => 'kontrak',
                'description' => 'Mencari desainer yang kreatif untuk merancang antarmuka aplikasi mobile dan web yang user-friendly.',
                'requirements' => "- Menguasai Figma dan Adobe Illustrator\n- Memiliki portfolio desain yang menarik\n- Paham prinsip dasar UX/UI dan Wireframing",
                'salary_range' => 'Rp 6.000.000 - Rp 9.000.000',
                'deadline' => Carbon::now()->addDays(14),
                'contact_info' => 'career@creativestudio.id',
                'is_active' => true,
            ],
            [
                'title' => 'Digital Marketing Intern',
                'slug' => Str::slug('Digital Marketing Intern ' . Str::random(5)),
                'company' => 'Startup Maju Bersama',
                'location' => 'Remote',
                'type' => 'magang',
                'description' => 'Kesempatan magang untuk mahasiswa tingkat akhir yang tertarik di dunia digital marketing, SEO, dan manajemen sosial media.',
                'requirements' => "- Mahasiswa aktif minimal semester 6\n- Aktif di sosial media (TikTok, Instagram)\n- Memiliki kemauan belajar yang tinggi",
                'salary_range' => 'Rp 1.500.000 - Rp 2.500.000',
                'deadline' => Carbon::now()->addDays(7),
                'contact_info' => '0812-3456-7890 (WhatsApp)',
                'is_active' => false,
            ],
        ];

        foreach ($data as $item) {
            Lowongan::create($item);
        }
    }
}