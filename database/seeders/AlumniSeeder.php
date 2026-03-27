<?php

namespace Database\Seeders;

use App\Models\Alumni;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AlumniSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $alumniData = [
            [
                'name' => 'Dr. Andi Prastowo',
                'nim' => '1029384756',
                'program_studi' => 'S1 Ilmu Keperawatan',
                'tahun_lulus' => '2019',
                'tempat_kerja' => 'RSUD Kota Bogor',
                'jabatan' => 'Kepala Ruang IGD',
                'testimonial' => 'Pendidikan di STIKes Bogor Husada sangat relevan dengan kebutuhan industri. Fasilitas yang lengkap dan dosen yang kompeten membuat saya siap langsung terjun ke dunia kerja profesi perawat.',
                'photo' => null,
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Siti Aminah, S.Tr.Keb.',
                'nim' => '3948572109',
                'program_studi' => 'D4 Kebidanan',
                'tahun_lulus' => '2021',
                'tempat_kerja' => 'Klinik Bersalin Bunda Kita',
                'jabatan' => 'Bidan Pelaksana',
                'testimonial' => 'Saya mendapatkan bekal ilmu yang luar biasa selama kuliah di program kebidanan STIKes Bogor Husada. Kurikulumnya up-to-date dan prakteknya sangat banyak, sehingga saya tidak canggung menghadapi pasien.',
                'photo' => null,
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Budi Santoso, S.Farm.',
                'nim' => '2847591032',
                'program_studi' => 'S1 Farmasi',
                'tahun_lulus' => '2020',
                'tempat_kerja' => 'Apotek K24 Pajajaran',
                'jabatan' => 'Apoteker Penanggung Jawab',
                'testimonial' => 'Lulusan Farmasi STIKes Bogor Husada dikenal siap kerja. Lab farmakologi dan teknologi farmasi disini merupakan salah satu yang terbaik di wilayah Bogor.',
                'photo' => null,
                'is_featured' => true,
                'is_active' => true,
            ]
        ];

        foreach ($alumniData as $alumni) {
            Alumni::create($alumni);
        }
    }
}
