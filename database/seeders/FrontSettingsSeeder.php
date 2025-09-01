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
            ['key' => 'site_logo', 'value' => null, 'type' => 'image'],
            ['key' => 'site_favicon', 'value' => null, 'type' => 'image'],
            ['key' => 'meta_title', 'value' => 'STIKes Bogor Husada', 'type' => 'text'],
            ['key' => 'meta_description', 'value' => 'Website resmi STIKes Bogor Husada.', 'type' => 'text'],
            ['key' => 'meta_keywords', 'value' => 'stikes, bogor, keperawatan, kebidanan', 'type' => 'text'],
            ['key' => 'google_analytics', 'value' => null, 'type' => 'text'],
            ['key' => 'google_search_console', 'value' => null, 'type' => 'text'],
        ]);
    }
}