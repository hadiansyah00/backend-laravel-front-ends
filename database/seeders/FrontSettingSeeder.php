<?php

namespace Database\Seeders;

use App\Models\FrontSetting;
use Illuminate\Database\Seeder;

class FrontSettingSeeder extends Seeder
{
    /**
     * Seed default front settings.
     * Menggunakan updateOrCreate agar aman dijalankan berulang kali
     * tanpa menimpa data yang sudah diisi admin.
     */
    public function run(): void
    {
        $settings = [
            // ========== BRANDING ==========
            ['key' => 'site_name', 'value' => 'STIKes Bogor Husada', 'type' => 'text'],
            ['key' => 'logo_main', 'value' => null, 'type' => 'image'],
            ['key' => 'logo_sticky', 'value' => null, 'type' => 'image'],
            ['key' => 'site_logo', 'value' => null, 'type' => 'image'],
            ['key' => 'site_favicon', 'value' => null, 'type' => 'image'],

            // ========== CONTACT ==========
            ['key' => 'contact_email', 'value' => 'info@sbh.ac.id', 'type' => 'text'],
            ['key' => 'contact_email_link', 'value' => 'mailto:info@sbh.ac.id', 'type' => 'text'],
            ['key' => 'contact_phone', 'value' => '081110111560', 'type' => 'text'],
            ['key' => 'contact_phone_link', 'value' => '081110111560', 'type' => 'text'],
            ['key' => 'contact_address', 'value' => 'Jl. Sholeh Iskandar No.4, Kedungbadak, Kec. Tanah Sereal, Kota Bogor, Jawa Barat 16164', 'type' => 'text'],
            ['key' => 'copyright_text', 'value' => '© ' . date('Y') . ' STIKes Bogor Husada. All rights reserved.', 'type' => 'text'],

            // ========== SEO META ==========
            ['key' => 'meta_title', 'value' => 'STIKes Bogor Husada', 'type' => 'text'],
            ['key' => 'meta_description', 'value' => 'Website resmi STIKes Bogor Husada untuk informasi akademik, PMB, dan kegiatan kampus.', 'type' => 'text'],
            ['key' => 'meta_keywords', 'value' => 'STIKes, Bogor Husada, PMB, Kampus Kesehatan, Pendidikan Kesehatan', 'type' => 'text'],

            // ========== OPEN GRAPH ==========
            ['key' => 'og_title', 'value' => 'STIKes Bogor Husada - Kampus Kesehatan Unggul', 'type' => 'text'],
            ['key' => 'og_description', 'value' => 'Tempat belajar dan berkembang di bidang kesehatan bersama STIKes Bogor Husada.', 'type' => 'text'],
            ['key' => 'og_image', 'value' => null, 'type' => 'image'],

            // ========== TWITTER ==========
            ['key' => 'twitter_card', 'value' => 'summary_large_image', 'type' => 'text'],

            // ========== ANALYTICS ==========
            ['key' => 'google_analytics', 'value' => null, 'type' => 'text'],
            ['key' => 'google_analytics_id', 'value' => null, 'type' => 'text'],

            // ========== SOCIAL MEDIA (Individual) ==========
            ['key' => 'social_facebook', 'value' => 'https://www.facebook.com/stikesboda', 'type' => 'text'],
            ['key' => 'social_instagram', 'value' => 'https://www.instagram.com/stikesbogorhusada/', 'type' => 'text'],
            ['key' => 'social_youtube', 'value' => 'https://www.youtube.com/channel/UCLVS17eZrNYWgiAuMCYkkXA', 'type' => 'text'],
            ['key' => 'social_twitter', 'value' => null, 'type' => 'text'],
            ['key' => 'social_tiktok', 'value' => 'https://www.tiktok.com/@stikesbogorhusada', 'type' => 'text'],

            // ========== JSON FIELDS ==========
            [
                'key' => 'footer_links',
                'value' => json_encode([
                    [
                        'title' => 'Tentang Kampus',
                        'links' => [
                            ['text' => 'Sejarah Singkat', 'url' => '/sejarah'],
                            ['text' => 'Profil STIkes', 'url' => '/profil-stikes'],
                            ['text' => 'Visi & Misi', 'url' => '/visi-misi'],
                            ['text' => 'Sambutan Ketua SBH', 'url' => '/sambutan-ketua'],
                            ['text' => 'Struktur Organisasi', 'url' => '/struktur-organisasi'],
                            ['text' => 'Kontak & Lokasi', 'url' => '/kontak'],
                        ]
                    ],
                    [
                        'title' => 'Akademik & Pendaftaran',
                        'links' => [
                            ['text' => 'S1 Farmasi', 'url' => '/s1-farmasi'],
                            ['text' => 'S1 Gizi', 'url' => '/s1-gizi'],
                            ['text' => 'D3 Kebidanan', 'url' => '/d3-kebidanan'],
                            ['text' => 'Pendaftaran Mahasiswa Baru', 'url' => 'https://pmb.sbh.ac.id/'],

                        ]
                    ],
                    [
                        'title' => 'Kehidupan Kampus',
                        'links' => [
                            ['text' => 'Portal Mahasiswa', 'url' => 'https://students-portal.sbh.ac.id/'],
                            ['text' => 'E-Learning', 'url' => 'https://lmsstikes.sbh.ac.id/'],
                            ['text' => 'Perpustakaan', 'url' => 'https://library.sbh.ac.id/'],

                        ]
                    ],
                    [
                        'title' => 'Informasi & Layanan',
                        'links' => [
                            ['text' => 'Berita & Agenda', 'url' => '/artikel'],
                            ['text' => 'Karier & Lowongan', 'url' => '/lowongan'],
                            ['text' => 'Alumni', 'url' => '/alumni'],
                            ['text' => 'Pusat Bantuan', 'url' => '/kontak'],
                        ]
                    ],
                ]),
                'type' => 'json'
            ],

            [
                'key' => 'social_links',
                'value' => json_encode([
                    ['name' => 'Instagram', 'url' => 'https://www.instagram.com/stikesbogorhusada/', 'icon' => 'fab fa-instagram'],
                    ['name' => 'TikTok', 'url' => 'https://www.tiktok.com/@stikesbogorhusada', 'icon' => 'fab fa-tiktok'],
                    ['name' => 'YouTube', 'url' => 'https://www.youtube.com/channel/UCLVS17eZrNYWgiAuMCYkkXA', 'icon' => 'fab fa-youtube'],
                    ['name' => 'Facebook', 'url' => 'https://www.facebook.com/stikesboda', 'icon' => 'fab fa-facebook-f'],
                ]),
                'type' => 'json'
            ],
        ];

        foreach ($settings as $setting) {
            FrontSetting::updateOrCreate(
                ['key' => $setting['key']],
                // Hanya set value & type jika row BELUM ADA.
                // Jika sudah ada, biarkan data admin yang sudah diisi.
                array_filter([
                    'value' => FrontSetting::where('key', $setting['key'])->exists()
                        ? FrontSetting::where('key', $setting['key'])->value('value')
                        : $setting['value'],
                    'type' => $setting['type'],
                ])
            );
        }

        $this->command->info('✅ FrontSetting seeder berhasil! ' . count($settings) . ' key telah di-sync.');
    }
}
