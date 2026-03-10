<?php

namespace Database\Seeders;

use App\Models\KalenderAkademik;
use Illuminate\Database\Seeder;

class KalenderSeeder extends Seeder
{
    public function run(): void
    {
        KalenderAkademik::truncate();

        // SEMESTER GANJIL
        $ganjil = [
            ['kegiatan' => 'Pendaftaran Semester Ganjil', 'mulai' => 'Juli 2023', 'selesai' => 'Agustus 2023', 'keterangan' => 'Registrasi mahasiswa baru & HEREG.'],
            ['kegiatan' => 'Perkuliahan Semester Ganjil', 'mulai' => 'September 2023', 'selesai' => 'Januari 2024', 'keterangan' => 'Aktif akademik.'],
            ['kegiatan' => 'Ujian Tengah Semester (UTS)', 'mulai' => 'Oktober 2023', 'selesai' => 'November 2023', 'keterangan' => 'Syarat keuangan.'],
            ['kegiatan' => 'Ujian Akhir Semester (UAS)', 'mulai' => 'Januari 2024', 'selesai' => null, 'keterangan' => 'Evaluasi akhir.'],
        ];

        foreach ($ganjil as $index => $item) {
            KalenderAkademik::create([
                'semester' => 'Ganjil',
                'tahun_akademik' => '2023/2024',
                'kegiatan' => $item['kegiatan'],
                'mulai' => $item['mulai'],
                'selesai' => $item['selesai'],
                'keterangan' => $item['keterangan'],
                'order' => $index,
                'is_active' => true,
            ]);
        }

        // SEMESTER GENAP
        $genap = [
            ['kegiatan' => 'Pendaftaran Semester Genap', 'mulai' => 'Februari 2024', 'selesai' => 'Februari 2024', 'keterangan' => 'Pendaftaran KRS.'],
            ['kegiatan' => 'Perkuliahan Semester Genap', 'mulai' => 'Maret 2024', 'selesai' => 'Juni 2024', 'keterangan' => 'Aktif akademik genap.'],
            ['kegiatan' => 'Ujian Tengah Semester (UTS)', 'mulai' => 'April 2024', 'selesai' => null, 'keterangan' => 'Tengah semester prodi.'],
            ['kegiatan' => 'Ujian Akhir Semester (UAS)', 'mulai' => 'Juli 2024', 'selesai' => null, 'keterangan' => 'Akhir tahun akademik.'],
        ];

        foreach ($genap as $index => $item) {
            KalenderAkademik::create([
                'semester' => 'Genap',
                'tahun_akademik' => '2023/2024',
                'kegiatan' => $item['kegiatan'],
                'mulai' => $item['mulai'],
                'selesai' => $item['selesai'],
                'keterangan' => $item['keterangan'],
                'order' => $index,
                'is_active' => true,
            ]);
        }
    }
}
