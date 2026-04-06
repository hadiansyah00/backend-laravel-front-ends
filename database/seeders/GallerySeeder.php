<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $galleries = [
            [
                'title' => 'Wisuda Angkatan 2025',
                'description' => 'Prosesi wisuda lulusan terbaik STIKes Bogor Husada angkatan 2025.',
                'image' => 'galleries/wisuda-2025.jpg',
                'category' => 'Kegiatan Akademik',
                'is_active' => true,
            ],
            [
                'title' => 'Laboratorium Farmasi',
                'description' => 'Fasilitas laboratorium farmasi modern dengan peralatan lengkap.',
                'image' => 'galleries/lab-farmasi.jpg',
                'category' => 'Fasilitas',
                'is_active' => true,
            ],
            [
                'title' => 'Seminar Kesehatan Nasional',
                'description' => 'Seminar kesehatan nasional dengan pembicara dari berbagai institusi kesehatan.',
                'image' => 'galleries/seminar-kesehatan.jpg',
                'category' => 'Kegiatan Akademik',
                'is_active' => true,
            ],
            [
                'title' => 'Gedung Utama Kampus',
                'description' => 'Tampak depan gedung utama STIKes Bogor Husada.',
                'image' => 'galleries/gedung-utama.jpg',
                'category' => 'Fasilitas',
                'is_active' => true,
            ],
            [
                'title' => 'Praktikum Kebidanan',
                'description' => 'Mahasiswa melakukan praktikum di laboratorium kebidanan.',
                'image' => 'galleries/praktikum-kebidanan.jpg',
                'category' => 'Kegiatan Akademik',
                'is_active' => true,
            ],
            [
                'title' => 'Perpustakaan Kampus',
                'description' => 'Ruang perpustakaan yang nyaman dengan koleksi buku lengkap.',
                'image' => 'galleries/perpustakaan.jpg',
                'category' => 'Fasilitas',
                'is_active' => true,
            ],
            [
                'title' => 'Lomba Cerdas Cermat Antar Prodi',
                'description' => 'Kompetisi cerdas cermat antar program studi dalam rangka Dies Natalis.',
                'image' => 'galleries/lomba-cermat.jpg',
                'category' => 'Prestasi',
                'is_active' => true,
            ],
            [
                'title' => 'Upacara Hari Sumpah Pemuda',
                'description' => 'Peringatan Hari Sumpah Pemuda oleh civitas akademika STIKes Bogor Husada.',
                'image' => 'galleries/sumpah-pemuda.jpg',
                'category' => 'Kegiatan Kampus',
                'is_active' => true,
            ],
            [
                'title' => 'Workshop Penelitian Ilmiah',
                'description' => 'Workshop penulisan dan penelitian ilmiah bagi dosen dan mahasiswa.',
                'image' => 'galleries/workshop-penelitian.jpg',
                'category' => 'Kegiatan Akademik',
                'is_active' => true,
            ],
            [
                'title' => 'Ruang Kelas Modern',
                'description' => 'Ruang kelas dilengkapi fasilitas multimedia untuk pembelajaran interaktif.',
                'image' => 'galleries/ruang-kelas.jpg',
                'category' => 'Fasilitas',
                'is_active' => true,
            ],
            [
                'title' => 'Tim Basket Juara Regional',
                'description' => 'Tim basket STIKes Bogor Husada meraih juara di kompetisi basket regional.',
                'image' => 'galleries/basket-juara.jpg',
                'category' => 'Prestasi',
                'is_active' => true,
            ],
            [
                'title' => 'Bakti Sosial di Desa',
                'description' => 'Kegiatan bakti sosial dan penyuluhan kesehatan di desa binaan.',
                'image' => 'galleries/baksos-desa.jpg',
                'category' => 'Kegiatan Kampus',
                'is_active' => true,
            ],
        ];

        foreach ($galleries as $gallery) {
            Gallery::updateOrCreate(
                ['title' => $gallery['title']],
                $gallery
            );
        }
    }
}
