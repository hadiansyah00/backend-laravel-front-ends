<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FrontSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('front_settings')->insert([
    ['key' => 'logo_main', 'value' => 'assets/img/icon/logo_sbh_persegi.png', 'type' => 'image'],
    ['key' => 'logo_sticky', 'value' => 'assets/img/icon/logo_sbh_persegi.png', 'type' => 'image'],
    ['key' => 'site_favicon', 'value' => 'assets/img/icon/favicon.png', 'type' => 'image'],
    ['key' => 'meta_title', 'value' => 'STIKes Bogor Husada', 'type' => 'text'],
    ['key' => 'meta_description', 'value' => 'Website resmi STIKes Bogor Husada untuk informasi akademik, PMB, dan kegiatan kampus.', 'type' => 'text'],
    ['key' => 'meta_keywords', 'value' => 'STIKes, Bogor Husada, PMB, Kampus Kesehatan, Pendidikan Kesehatan', 'type' => 'text'],
    ['key' => 'og_title', 'value' => 'STIKes Bogor Husada - Kampus Kesehatan Unggul', 'type' => 'text'],
    ['key' => 'og_description', 'value' => 'Tempat belajar dan berkembang di bidang kesehatan bersama STIKes Bogor Husada.', 'type' => 'text'],
    ['key' => 'og_image', 'value' => 'assets/img/icon/og_image.png', 'type' => 'image'],
    ['key' => 'twitter_card', 'value' => 'summary_large_image', 'type' => 'text'],
    ['key' => 'google_analytics', 'value' => null, 'type' => 'text'],
]);

    }
}