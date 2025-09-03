<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProgramStudi;

class ProgramStudiSeeder extends Seeder
{
    public function run(): void
    {
        ProgramStudi::truncate();

        ProgramStudi::create([
            'name' => 'Kebidanan',
            'description' => 'Program Studi Kebidanan STIKes Bogor Husada berfokus pada pendidikan bidan profesional yang kompeten di bidang kesehatan ibu dan anak.',
            'image' => 'programs/kebidanan.jpg',
            'link' => 'https://stikesbogor.ac.id/kebidanan',
        ]);

        ProgramStudi::create([
            'name' => 'Farmasi',
            'description' => 'Program Studi Farmasi menghasilkan tenaga profesional di bidang farmasi klinis, industri, dan penelitian.',
            'image' => 'programs/farmasi.jpg',
            'link' => 'https://stikesbogor.ac.id/farmasi',
        ]);

        ProgramStudi::create([
            'name' => 'Gizi',
            'description' => 'Program Studi Gizi mempersiapkan lulusan yang kompeten dalam pelayanan gizi masyarakat, klinis, dan penelitian.',
            'image' => 'programs/gizi.jpg',
            'link' => 'https://stikesbogor.ac.id/gizi',
        ]);
    }
}
