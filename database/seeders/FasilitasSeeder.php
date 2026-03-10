<?php

namespace Database\Seeders;

use App\Models\Fasilitas;
use Illuminate\Database\Seeder;

class FasilitasSeeder extends Seeder
{
    public function run(): void
    {
        Fasilitas::truncate();

        // Laboratorium
        Fasilitas::create([
            'name' => 'Laboratorium Terpadu',
            'type' => 'Laboratorium',
            'description' => "Laboratorium STIKes Bogor Husada dirancang untuk memberikan pengalaman belajar yang komprehensif bagi mahasiswa. Dilengkapi dengan perangkat medis modern, fasilitas kami mensimulasikan lingkungan klinis dan rumah sakit profesional.\n\nKami terus berupaya memfasilitasi kebutuhan praktikum mahasiswa agar mampu bersaing secara global setelah terjun ke dunia kerja sesungguhnya.",
            'facilities' => [
                ['name' => 'Laboratorium Keperawatan dan Kebidanan Terpadu'],
                ['name' => 'Laboratorium Farmakologi dan Farmasetika'],
                ['name' => 'Laboratorium Dietetik dan Kuliner Gizi'],
                ['name' => 'Laboratorium Komputer dan Bahasa'],
            ],
            'image' => null,
            'order' => 0,
            'is_active' => true,
        ]);

        // Perpustakaan
        Fasilitas::create([
            'name' => 'Perpustakaan STIKes Bogor Husada',
            'type' => 'Perpustakaan',
            'description' => "Perpustakaan STIKes Bogor Husada menyediakan koleksi literatur kesehatan yang komprehensif untuk mendukung kegiatan belajar dan penelitian civitas akademika. Kami menyediakan buku teks, jurnal, akses database ilmiah, dan fasilitas belajar yang nyaman.\n\nPerpustakaan kami juga menyediakan akses e-resources dan database jurnal internasional untuk mendukung penelitian mahasiswa dan dosen.",
            'facilities' => [
                ['name' => 'Ruang Baca Umum'],
                ['name' => 'Ruang Diskusi Kelompok'],
                ['name' => 'Koleksi Buku, Jurnal, dan Referensi Ilmiah'],
                ['name' => 'Akses E-Resources dan Database Jurnal'],
                ['name' => 'Layanan Peminjaman dan Pengembalian'],
            ],
            'image' => null,
            'order' => 1,
            'is_active' => true,
        ]);

        // UPPM
        Fasilitas::create([
            'name' => 'Unit Penelitian dan Pengabdian kepada Masyarakat (UPPM)',
            'type' => 'UPPM',
            'description' => "UPPM STIKes Bogor Husada didirikan dengan tujuan menjadi wadah dinamis bagi seluruh sivitas akademika dalam mengembangkan Ilmu Pengetahuan, Teknologi, dan Seni (IPTEKS) di bidang kesehatan.\n\nKami memfasilitasi setiap ide riset cemerlang dari dosen dan mahasiswa agar dapat diwujudkan dalam bentuk penelitian aplikatif. Tidak berhenti pada publikasi jurnal, hasil dari penelitian tersebut kemudian direalisasikan dalam bentuk program-program pengabdian kepada masyarakat (PKM) yang berfokus pada pencegahan penyakit menular dan tidak menular, stunting, hingga pemberdayaan gizi komplementer di desa binaan.",
            'facilities' => [
                ['name' => 'Hibah Riset Internal & Eksternal'],
                ['name' => 'Publikasi Jurnal Terakreditasi'],
                ['name' => 'Hak Kekayaan Intelektual (HKI)'],
                ['name' => 'Desa Binaan & Pengabdian Tematik'],
            ],
            'image' => null,
            'order' => 2,
            'is_active' => true,
        ]);

        // UPMI
        Fasilitas::create([
            'name' => 'Unit Penjaminan Mutu Internal (UPMI)',
            'type' => 'UPMI',
            'description' => "UPMI STIKes Bogor Husada adalah pilar utama dalam menjaga kredibilitas dan keunggulan institusi. Kami bertanggung jawab untuk memastikan bahwa seluruh aktivitas akademik dan non-akademik di kampus selaras dengan Standar Nasional Pendidikan Tinggi (SN-Dikti).\n\nMelalui siklus Penetapan, Pelaksanaan, Evaluasi, Pengendalian, dan Peningkatan (PPEPP), UPMI mengaudit mutu manajemen kampus secara periodik. Layanan pendidikan yang bermutu tidak hanya memberikan pengalaman belajar terbaik bagi mahasiswa, namun juga menjadi pondasi utama akreditasi LAM-PTKes yang \"Baik Sekali\".",
            'facilities' => [
                ['name' => 'Audit Mutu Internal (AMI)'],
                ['name' => 'Evaluasi Dosen oleh Mahasiswa (EDOM)'],
                ['name' => 'Survei Kepuasan Pengguna'],
                ['name' => 'Tracer Study Luaran'],
            ],
            'image' => null,
            'order' => 3,
            'is_active' => true,
        ]);
    }
}
