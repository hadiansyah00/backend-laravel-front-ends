<?php

namespace Database\Seeders;

use App\Models\Pengumuman;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PengumumanSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $pengumumans = [

            [
                'title' => 'Pendaftaran Mahasiswa Baru Gelombang 1 Dibuka',
                'slug' => Str::slug('Pendaftaran Mahasiswa Baru Gelombang 1 Dibuka'),
                'content' => '<p>Pendaftaran mahasiswa baru STIKes Bogor Husada gelombang 1 tahun ajaran 2026/2027 telah resmi dibuka. Calon mahasiswa dapat melakukan pendaftaran melalui portal PMB dan melengkapi seluruh berkas yang diperlukan.</p>',
                'attachment' => null,
                'is_active' => true,
                'user_id' => $admin->id,
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],

            [
                'title' => 'Jadwal Ujian Tengah Semester (UTS) Semester Ganjil',
                'slug' => Str::slug('Jadwal Ujian Tengah Semester (UTS) Semester Ganjil'),
                'content' => '<p>Diberitahukan kepada seluruh mahasiswa bahwa Ujian Tengah Semester (UTS) akan dilaksanakan mulai tanggal 15 Oktober hingga 25 Oktober. Jadwal lengkap dapat dilihat melalui portal mahasiswa.</p>',
                'attachment' => null,
                'is_active' => true,
                'user_id' => $admin->id,
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(5),
            ],

            [
                'title' => 'Pengumuman Libur Nasional Idul Fitri',
                'slug' => Str::slug('Pengumuman Libur Nasional Idul Fitri'),
                'content' => '<p>Sehubungan dengan Hari Raya Idul Fitri, seluruh kegiatan akademik dan administrasi kampus diliburkan mulai tanggal 10 April hingga 16 April. Aktivitas perkuliahan akan kembali normal pada 17 April.</p>',
                'attachment' => null,
                'is_active' => true,
                'user_id' => $admin->id,
                'created_at' => now()->subDays(10),
                'updated_at' => now()->subDays(10),
            ],

            [
                'title' => 'Pembayaran UKT Semester Genap Dibuka',
                'slug' => Str::slug('Pembayaran UKT Semester Genap Dibuka'),
                'content' => '<p>Pembayaran Uang Kuliah Tunggal (UKT) semester genap telah dibuka mulai tanggal 1 Februari hingga 28 Februari. Mahasiswa diharapkan melakukan pembayaran tepat waktu melalui sistem pembayaran yang tersedia.</p>',
                'attachment' => null,
                'is_active' => true,
                'user_id' => $admin->id,
                'created_at' => now()->subDays(12),
                'updated_at' => now()->subDays(12),
            ],

            [
                'title' => 'Workshop Penulisan Karya Ilmiah Mahasiswa',
                'slug' => Str::slug('Workshop Penulisan Karya Ilmiah Mahasiswa'),
                'content' => '<p>STIKes Bogor Husada akan menyelenggarakan workshop penulisan karya ilmiah bagi mahasiswa tingkat akhir. Kegiatan ini bertujuan membantu mahasiswa dalam penyusunan skripsi dan karya tulis ilmiah.</p>',
                'attachment' => null,
                'is_active' => true,
                'user_id' => $admin->id,
                'created_at' => now()->subDays(15),
                'updated_at' => now()->subDays(15),
            ],

            [
                'title' => 'Pendaftaran Program Beasiswa Akademik',
                'slug' => Str::slug('Pendaftaran Program Beasiswa Akademik'),
                'content' => '<p>Kampus membuka pendaftaran program beasiswa akademik bagi mahasiswa berprestasi. Pendaftaran dapat dilakukan melalui bagian kemahasiswaan dengan melampirkan dokumen persyaratan.</p>',
                'attachment' => null,
                'is_active' => true,
                'user_id' => $admin->id,
                'created_at' => now()->subDays(18),
                'updated_at' => now()->subDays(18),
            ],

            [
                'title' => 'Pengumuman Wisuda Periode Tahun 2026',
                'slug' => Str::slug('Pengumuman Wisuda Periode Tahun 2026'),
                'content' => '<p>Pelaksanaan wisuda STIKes Bogor Husada periode tahun 2026 direncanakan berlangsung pada bulan September. Mahasiswa yang telah menyelesaikan seluruh kewajiban akademik dapat melakukan pendaftaran wisuda.</p>',
                'attachment' => null,
                'is_active' => true,
                'user_id' => $admin->id,
                'created_at' => now()->subDays(20),
                'updated_at' => now()->subDays(20),
            ],

            [
                'title' => 'Pengisian KRS Semester Baru Dibuka',
                'slug' => Str::slug('Pengisian KRS Semester Baru Dibuka'),
                'content' => '<p>Mahasiswa diharapkan segera melakukan pengisian Kartu Rencana Studi (KRS) melalui portal akademik sesuai dengan jadwal yang telah ditentukan oleh program studi masing-masing.</p>',
                'attachment' => null,
                'is_active' => true,
                'user_id' => $admin->id,
                'created_at' => now()->subDays(25),
                'updated_at' => now()->subDays(25),
            ],

        ];

        foreach ($pengumumans as $pengumuman) {
            Pengumuman::create($pengumuman);
        }
    }
}