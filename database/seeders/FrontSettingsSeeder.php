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
            ['key' => 'contact_address', 'value' => 'Jl. Indragiri No. 4, Babakan, Bogor Tim., Kota Bogor, Jawa Barat 16128', 'type' => 'text'],
            ['key' => 'contact_phone', 'value' => '+62 251 8312xxx', 'type' => 'text'],
            ['key' => 'contact_phone_link', 'value' => '+622518312xxx', 'type' => 'text'],
            ['key' => 'contact_email', 'value' => 'info@sbh.ac.id', 'type' => 'text'],
            ['key' => 'contact_email_link', 'value' => 'mailto:info@sbh.ac.id', 'type' => 'text'],
            ['key' => 'footer_links', 'value' => json_encode([
                ['title' => 'Tentang Kami', 'url' => '/about'],
                ['title' => 'Akademik', 'url' => '/akademik'],
                ['title' => 'PMB', 'url' => '/pmb'],
            ]), 'type' => 'json'],
            ['key' => 'social_links', 'value' => json_encode([
                ['name' => 'Facebook', 'url' => 'https://www.facebook.com/StikesBogorHusada'],
                ['name' => 'Instagram', 'url' => 'https://www.instagram.com/stikesbogorhusada/'],
                ['name' => 'YouTube', 'url' => 'https://www.youtube.com/channel/UCxxxxxx'],
            ]), 'type' => 'json'],
            ['key' => 'copyright_text', 'value' => '© ' . date('Y') . ' STIKes Bogor Husada. All rights reserved.', 'type' => 'text'],
        ]);
    }
}
