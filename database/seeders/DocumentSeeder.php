<?php

namespace Database\Seeders;

use App\Models\Document;
use App\Models\User;
use Illuminate\Database\Seeder;

class DocumentSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $documents = [

            [
                'title' => 'Panduan Akademik STIKes Bogor Husada',
                'description' => 'Dokumen panduan akademik yang berisi peraturan akademik, sistem perkuliahan, dan ketentuan studi bagi mahasiswa.',
                'file_path' => 'documents/panduan-akademik.pdf',
                'category' => 'Akademik',
                'is_active' => true,
                'user_id' => $admin->id,
            ],

            [
                'title' => 'Kalender Akademik Tahun Ajaran 2026/2027',
                'description' => 'Kalender akademik yang berisi jadwal kegiatan akademik selama satu tahun ajaran.',
                'file_path' => 'documents/kalender-akademik-2026.pdf',
                'category' => 'Akademik',
                'is_active' => true,
                'user_id' => $admin->id,
            ],

            [
                'title' => 'Brosur Penerimaan Mahasiswa Baru',
                'description' => 'Brosur informasi mengenai program studi, fasilitas, dan persyaratan pendaftaran mahasiswa baru.',
                'file_path' => 'documents/brosur-pmb.pdf',
                'category' => 'PMB',
                'is_active' => true,
                'user_id' => $admin->id,
            ],

            [
                'title' => 'Formulir Pengajuan Cuti Akademik',
                'description' => 'Formulir yang digunakan mahasiswa untuk mengajukan cuti akademik.',
                'file_path' => 'documents/form-cuti-akademik.pdf',
                'category' => 'Administrasi',
                'is_active' => true,
                'user_id' => $admin->id,
            ],

            [
                'title' => 'Formulir Pengajuan Surat Aktif Kuliah',
                'description' => 'Dokumen formulir untuk pengajuan surat keterangan aktif kuliah.',
                'file_path' => 'documents/form-surat-aktif.pdf',
                'category' => 'Administrasi',
                'is_active' => true,
                'user_id' => $admin->id,
            ],

            [
                'title' => 'Pedoman Penulisan Skripsi',
                'description' => 'Panduan lengkap penulisan skripsi bagi mahasiswa tingkat akhir.',
                'file_path' => 'documents/pedoman-skripsi.pdf',
                'category' => 'Akademik',
                'is_active' => true,
                'user_id' => $admin->id,
            ],

            [
                'title' => 'Panduan Praktik Klinik Mahasiswa Kebidanan',
                'description' => 'Panduan pelaksanaan praktik klinik untuk mahasiswa program studi Kebidanan.',
                'file_path' => 'documents/panduan-praktik-klinik.pdf',
                'category' => 'Program Studi',
                'is_active' => true,
                'user_id' => $admin->id,
            ],

            [
                'title' => 'Standar Operasional Prosedur (SOP) Akademik',
                'description' => 'Dokumen SOP terkait proses akademik di lingkungan STIKes Bogor Husada.',
                'file_path' => 'documents/sop-akademik.pdf',
                'category' => 'Kampus',
                'is_active' => true,
                'user_id' => $admin->id,
            ],

        ];

        foreach ($documents as $document) {
            Document::create($document);
        }
    }
}