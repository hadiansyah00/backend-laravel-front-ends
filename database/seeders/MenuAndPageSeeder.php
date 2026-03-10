<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\Pages;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuAndPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Matikan cek foreign key agar aman saat truncate
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // 2. Kosongkan tabel menus & bersihkan halaman yang dibuat oleh seeder sebelumnya (jika ada)
        Menu::truncate();

        // Catatan: kita tidak me-truncate Pages agar data lama tidak hilang,
        // tapi kita bisa melakukan updateOrCreate berdasarkan slug.

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $structure = [
            [
                'name' => 'Tentang',
                'slug' => 'tentang',
                'type' => 'page',
                'children' => [
                    ['name' => 'Profil STIKes', 'slug' => 'profil-stikes', 'type' => 'page'],
                    ['name' => 'Sambutan Ketua', 'slug' => 'sambutan-ketua', 'type' => 'page'],
                    ['name' => 'Visi Misi', 'slug' => 'visi-misi', 'type' => 'page'],
                    ['name' => 'Sejarah', 'slug' => 'sejarah', 'type' => 'page'],
                    ['name' => 'Struktur Organisasi', 'slug' => 'struktur-organisasi', 'type' => 'page'],
                ],
            ],
            [
                'name' => 'Akademik',
                'slug' => 'akademik',
                'type' => 'page',
                'children' => [
                    ['name' => 'S1 Farmasi', 'slug' => 'farmasi', 'type' => 'page'],
                    ['name' => 'S1 Gizi', 'slug' => 'gizi', 'type' => 'page'],
                    ['name' => 'D3 Kebidanan', 'slug' => 'kebidanan', 'type' => 'page'],
                    ['name' => 'Dosen', 'slug' => 'dosen', 'type' => 'link', 'url' => '/dosen'],
                    ['name' => 'Kalender Akademik', 'slug' => 'kalender-akademik', 'type' => 'page'],
                ],
            ],
            [
                'name' => 'Unit Lembaga',
                'slug' => 'unit-lembaga',
                'type' => 'page',
                'children' => [
                    ['name' => 'UPPM', 'slug' => 'uppm', 'type' => 'page'],
                    ['name' => 'UPMI', 'slug' => 'uppmi', 'type' => 'page'],
                    ['name' => 'Laboratorium', 'slug' => 'laboratorium', 'type' => 'page'],
                    ['name' => 'Perpustakaan', 'slug' => 'perpustakaan', 'type' => 'page'],
                ],
            ],
            [
                'name' => 'Informasi',
                'slug' => 'informasi',
                'type' => 'page',
                'children' => [
                    ['name' => 'Berita & Artikel', 'slug' => 'artikel', 'type' => 'link', 'url' => '/berita'],
                    ['name' => 'Pengumuman', 'slug' => 'pengumuman', 'type' => 'link', 'url' => '/pengumuman'],
                    ['name' => 'Event', 'slug' => 'event', 'type' => 'link', 'url' => '/event'],
                    ['name' => 'Galeri', 'slug' => 'galeri', 'type' => 'link', 'url' => '/galeri'],
                    ['name' => 'Dokumen', 'slug' => 'dokumen', 'type' => 'link', 'url' => '/dokumen'],
                ],
            ],
            [
                'name' => 'Mahasiswa & Alumni',
                'slug' => 'mahasiswa-alumni',
                'type' => 'page',
                'children' => [
                    ['name' => 'Alumni', 'slug' => 'alumni', 'type' => 'link', 'url' => '/alumni'],
                    ['name' => 'Lowongan', 'slug' => 'lowongan', 'type' => 'link', 'url' => '/lowongan'],
                    ['name' => 'Kerjasama', 'slug' => 'kerjasama', 'type' => 'page'],
                ],
            ],
            [
                'name' => 'PMB',
                'slug' => 'pmb',
                'type' => 'link',
                'url' => 'https://pmb.sbh.ac.id/',
                'children' => [],
            ],
            [
                'name' => 'Kontak',
                'slug' => 'kontak',
                'type' => 'page',
                'children' => [],
            ],
        ];

        $order = 1;
        foreach ($structure as $main) {
            // 1. Buat Header Parent Menu
            $parentMenu = Menu::create([
                'name' => $main['name'],
                'slug' => $main['slug'] ?? null,
                'url' => $main['url'] ?? null,
                'type' => $main['type'],
                'parent_id' => null,
                'order' => $order++,
                'is_active' => true,
            ]);

            // Jika dia bertipe page, kita pastikan ada Page header yang sepadan
            if ($main['type'] === 'page' && isset($main['slug'])) {
                Pages::firstOrCreate(
                    ['slug' => $main['slug']],
                    [
                        'title' => $main['name'],
                        'type' => 'editor',
                        'content' => json_encode([
                            'time' => time(),
                            'blocks' => [
                                [
                                    'type' => 'paragraph',
                                    'data' => [
                                        'text' => 'Halaman utama untuk '.$main['name'].'.',
                                    ],
                                ],
                            ],
                            'version' => '2.28.0',
                        ]),
                        'is_published' => true,
                        'template' => 'default',
                    ]
                );
            }

            // 2. Buat Sub Menu-nya jika ada
            if (isset($main['children']) && count($main['children']) > 0) {
                $subOrder = 1;
                foreach ($main['children'] as $child) {
                    Menu::create([
                        'name' => $child['name'],
                        'slug' => $child['slug'] ?? null,
                        'url' => $child['url'] ?? null,
                        'type' => $child['type'],
                        'parent_id' => $parentMenu->id,
                        'order' => $subOrder++,
                        'is_active' => true,
                    ]);

                    // Jika child ini tipe page, kita generate Page kosongannya
                    if ($child['type'] === 'page' && isset($child['slug'])) {
                        Pages::firstOrCreate(
                            ['slug' => $child['slug']],
                            [
                                'title' => $child['name'],
                                'type' => 'editor',
                                'content' => json_encode([
                                    'time' => time(),
                                    'blocks' => [
                                        [
                                            'type' => 'paragraph',
                                            'data' => [
                                                'text' => 'Konten untuk halaman '.$child['name'].' sedang dalam tahap pengembangan.',
                                            ],
                                        ],
                                    ],
                                    'version' => '2.28.0',
                                ]),
                                'is_published' => true,
                                'template' => 'default',
                            ]
                        );
                    }
                }
            }
        }
    }
}
