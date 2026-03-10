<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Dosen;
use App\Models\User;
use Illuminate\Support\Str;

class DosenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dosens = [
            [
                'nip' => '198001012005011001',
                'nidn' => '0401018001',
                'name' => 'Dr. Ilham Maulana, M.Farm., Apt.',
                'position' => 'Ketua Program Studi S1 Farmasi',
                'prodi' => 'S1 Farmasi',
                'photo' => null, // Placeholder
                'bio' => 'Berpengalaman mendalami farmakologi klinis dan riset pengembangan obat herbal tradisional berbasis keanekaragaman hayati Indonesia.',
                'linkedin_url' => 'https://linkedin.com/in/ilhammaulana',
                'email' => 'ilham.maulana@sbh.ac.id',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'nip' => '198205152008122002',
                'nidn' => '0515058202',
                'name' => 'Siti Aminah, S.ST., M.Keb.',
                'position' => 'Dosen Tetap D3 Kebidanan',
                'prodi' => 'D3 Kebidanan',
                'photo' => null,
                'bio' => 'Aktif dalam penelitian asuhan kebidanan komunitas dan memiliki fokus tinggi terhadap penurunan angka kematian ibu (AKI) dan bayi baru lahir.',
                'linkedin_url' => 'https://linkedin.com/in/sitiaminah-mkeb',
                'email' => 'siti.aminah@sbh.ac.id',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'nip' => '198509202010011003',
                'nidn' => '0920098503',
                'name' => 'Dr. Rahmat Hidayat, S.Gz., M.Gizi.',
                'position' => 'Ketua Program Studi S1 Gizi',
                'prodi' => 'S1 Gizi',
                'photo' => null,
                'bio' => 'Ahli gizi klinik dan pencegahan stunting pada balita. Sering menjadi narasumber pada seminar gizi dan pola asuh anak tingkat nasional.',
                'linkedin_url' => 'https://linkedin.com/in/rahmathidayat-gizi',
                'email' => 'rahmat.hidayat@sbh.ac.id',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'nip' => '199011112020122004',
                'nidn' => '1111119004',
                'name' => 'Dian Permatasari, M.Farm., Apt.',
                'position' => 'Dosen Tetap S1 Farmasi',
                'prodi' => 'S1 Farmasi',
                'photo' => null,
                'bio' => 'Fokus kajian pada teknologi sediaan farmasi cair dan semi padat serta standarisasi mutu bahan baku kosmetik alami.',
                'linkedin_url' => 'https://linkedin.com/in/dian-permatasari',
                'email' => 'dian.permatasari@sbh.ac.id',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'nip' => '198802282015042005',
                'nidn' => '0228028805',
                'name' => 'Nurmala, S.ST., M.K.M.',
                'position' => 'Dosen Tetap D3 Kebidanan',
                'prodi' => 'D3 Kebidanan',
                'photo' => null,
                'bio' => 'Pengampu mata kuliah Kesehatan Reproduksi dan Pelayanan Keluarga Berencana. Terlibat aktif dalam edukasi remaja tentang kesehatan seksual sekunder.',
                'linkedin_url' => 'https://linkedin.com/in/nurmala-mkm',
                'email' => 'nurmala@sbh.ac.id',
                'order' => 5,
                'is_active' => true,
            ]
        ];

        foreach ($dosens as $dosen) {
            Dosen::create($dosen);
        }
    }
}
