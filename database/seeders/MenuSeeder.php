<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menus = [
            ['name' => 'Beranda', 'slug' => 'beranda', 'type' => 'page', 'order' => 1],
            ['name' => 'Tentang Kami', 'slug' => 'tentang-kami', 'type' => 'page', 'order' => 2],
            ['name' => 'Layanan', 'slug' => 'layanan', 'type' => 'page', 'order' => 3],
            ['name' => 'Kontak', 'slug' => 'kontak', 'type' => 'page', 'order' => 4],
        ];

        foreach ($menus as $menu) {
            Menu::create($menu);
        }
    }
}
