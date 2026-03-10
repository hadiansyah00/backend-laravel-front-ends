<?php

namespace Database\Seeders;

use App\Models\Pengumuman;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PengumumanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $pengumumans = [
            [
                'title' => 'Pendaftaran Mahasiswa Baru Gelombang 1 Dibuka',
                'slug' => Str::slug('Pendaftaran Mahasiswa Baru Gelombang 1 Dibuka'),
                'content' => '<p>Pendaftaran mahasiswa baru STIKes Bogor Husada gelombang 1 tahun ajaran 2026/2027 telah resmi dibuka. Bagi calon pendaftar, silakan melengkapi berkas dan mendaftar melalui portal PMB.</p>',
                'attachment' => null,
                'is_active' => true,
                'user_id' => $admin->id,
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'title' => 'Jadwal Ujian Tengah Semester (UTS) Ganjil',
                'slug' => Str::slug('Jadwal Ujian Tengah Semester (UTS) Ganjil'),
                'content' => '<p>Diberitahukan kepada seluruh mahasiswa STIKes Bogor Husada bahwa Ujian Tengah Semester (UTS) Ganjil akan dilaksanakan mulai tanggal 15 Oktober hingga 25 Oktober. Jadwal detail dapat diunduh pada lampiran berikut.</p>',
                'attachment' => null, // Simulasi tanpa file attachment dulu
                'is_active' => true,
                'user_id' => $admin->id,
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(5),
            ],
            [
                'title' => 'Pengumuman Libur Nasional Idul Fitri',
                'slug' => Str::slug('Pengumuman Libur Nasional Idul Fitri'),
                'content' => '<p>Sehubungan dengan Hari Raya Idul Fitri, kegiatan akademik dan layanan administrasi kampus akan diliburkan mulai tanggal 10 April hingga 16 April. Aktivitas kembali normal pada 17 April.</p>',
                'attachment' => null,
                'is_active' => true,
                'user_id' => $admin->id,
                'created_at' => now()->subDays(10),
                'updated_at' => now()->subDays(10),
            ],
        ];

        foreach ($pengumumans as $pengumuman) {
            Pengumuman::create($pengumuman);
        }
    }
}
