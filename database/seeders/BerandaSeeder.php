<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BerandaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('berandas')->insert([
            // Hero
            [
                'type' => 'hero',
                'title' => 'Slider Utama',
                'content' => json_encode([
                    'sliders' => [
                        [
                            'image' => 'assets/img/hero-fallback.png',
                            'subtitle' => 'Selamat Datang',
                            'title' => 'Mencetak Tenaga Kesehatan Profesional',
                            'description' => 'Kampus terbaik untuk masa depan karir dunia kesehatan. Fasilitas lengkap, dosen berpengalaman, dan kurikulum standar industri.',
                            'link' => '/pmb',
                            'link_text' => 'Daftar Sekarang'
                        ]
                    ]
                ]),
                'image' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Quick Action
            [
                'type' => 'quick_action',
                'title' => 'Penerimaan Mahasiswa Baru',
                'content' => json_encode([
                    'subtitle' => 'Mari bergabung dan kembangkan potensi Anda di bidang kesehatan bersama fasilitas modern dan pengajar profesional.',
                    'button_text' => 'Daftar Sekarang',
                    'button_link' => 'https://pmb.sbh.ac.id',
                    'info_title' => 'Butuh Informasi Lengkap?',
                    'info_subtitle' => 'Dapatkan brosur pendaftaran digital dan rincian biaya studi kami dengan mendaftarkan email Anda.',
                    'info_link_text' => 'Unduh Brosur PMB',
                    'info_link' => '/pendaftaran-email/create'
                ]),
                'image' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Program Studi
            [
                'type' => 'program_studi',
                'title' => 'Program Studi Pilihan',
                'content' => json_encode([
                    'badge' => 'Akademik',
                    'description' => 'Terakreditasi dan dirancang untuk mencetak tenaga ahli yang siap terjun ke dunia kerja kesehatan.',
                ]),
                'image' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Video Profil
            [
                'type' => 'video_profil',
                'title' => 'Mengenal Lebih Dekat STIKes Bogor Husada',
                'content' => json_encode([
                    'badge' => 'Company Profile',
                    'description' => 'Video profil ini memperkenalkan STIKes Bogor Husada, sebuah institusi pendidikan tinggi kesehatan yang berlokasi di Kota Bogor.',
                    'video_url' => 'https://www.youtube.com/watch?v=JKkfJVV4RHQ',
                ]),
                'image' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Testimoni
            [
                'type' => 'testimoni',
                'title' => 'Alumni STIKes Bogor Husada',
                'content' => json_encode([
                    'badge' => 'Suara Alumni',
                    'description' => 'Dengarkan cerita sukses dan pengalaman belajar dari para alumni kami yang kini telah berkarya di berbagai instansi kesehatan.',
                    'items' => [
                        [
                            'name' => 'Budi Santoso',
                            'role' => 'Perawat di RSUD Bogor',
                            'photo' => '',
                            'message' => 'Berkuliah di STIKes Bogor Husada memberikan saya pondasi yang kuat untuk melayani masyarakat.'
                        ],
                        [
                            'name' => 'Siti Aminah',
                            'role' => 'Bidan Praktik Mandiri',
                            'photo' => '',
                            'message' => 'Dosen-dosen yang kompeten dan fasilitas praktikum yang lengkap sangat membantu saya menguasai keterampilan klinis.'
                        ]
                    ]
                ]),
                'image' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
