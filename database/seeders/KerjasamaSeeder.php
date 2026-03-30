<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Kerjasama;
class KerjasamaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Contoh Data Statis (Partner Asli)
        $data = [
            [
                'name' => 'Rumah Sakit Bakti Husada',
                'logo' => 'logos/rs-bh.png',
                'url' => 'https://rsbh.co.id',
                'is_active' => true,
            ],
            [
                'name' => 'Kementerian Kesehatan',
                'logo' => 'logos/kemenkes.png',
                'url' => 'https://kemkes.go.id',
                'is_active' => true,
            ],
            [
                'name' => 'Partner Non-Aktif',
                'logo' => 'logos/old-partner.png',
                'url' => 'https://example.com',
                'is_active' => false,
            ],
        ];

        foreach ($data as $item) {
            Kerjasama::create($item);
        }
    }
}
