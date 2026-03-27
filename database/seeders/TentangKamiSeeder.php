<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\TentangKami;

class TentangKamiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'type' => 'profil',
                'title' => 'Profil STIKes Bogor Husada',
                'content' => json_encode([
                    'subtitle' => 'Mengenal lebih dekat institusi pencetak tenaga medis unggul dan profesional.',
                    'tentang_title' => 'Tentang Kami',
                    'tentang_content' => 'STIKES Bogor Husada merupakan institusi pendidikan tinggi kesehatan yang berdedikasi untuk mencetak tenaga kesehatan profesional, berkarakter, dan siap bersaing di tingkat nasional maupun global. Dengan lingkungan kampus yang kondusif, fasilitas modern, serta dukungan tenaga pengajar berpengalaman, kami berkomitmen memberikan pendidikan terbaik untuk menghasilkan lulusan yang unggul, inovatif, dan berintegritas tinggi.',
                    'tentang_image' => 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'features_title' => 'Mengapa STIKes Bogor Husada?',
                    'features' => [
                        [
                            'title' => 'Kurikulum Terstandar',
                            'description' => 'Kurikulum selalu diperbaharui mengikuti standar Kemenkes RI dan Asosiasi Profesi terkait.',
                            'icon' => 'fas fa-book-medical'
                        ],
                        [
                            'title' => 'Fasilitas Lab Lengkap',
                            'description' => 'Laboratorium modern yang dirancang menyerupai simulasi rumah sakit sesungguhnya.',
                            'icon' => 'fas fa-microscope'
                        ],
                        [
                            'title' => 'Dosen Berpengalaman',
                            'description' => 'Tenaga pengajar terdiri dari akademisi dan praktisi kesehatan berpengalaman (Perawat, Apoteker, Bidan).',
                            'icon' => 'fas fa-user-md'
                        ],
                        [
                            'title' => 'Kemitraan Luas',
                            'description' => 'Bekerjasama dengan RSUD dan RS Swasta terkemuka di Jabodetabek untuk praktek magang.',
                            'icon' => 'fas fa-handshake'
                        ]
                    ]
                ]),
                'image' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            ],
            [
                'type' => 'sambutan',
                'title' => 'Sambutan Ketua SBH',
                'content' => json_encode([
                    'subtitle' => 'Pesan selamat datang dan komitmen persembahan kami dari Ketua STIKes Bogor Husada.',
                    'content_title' => 'Bridging Technology for Humanity',
                    'image_align' => 'left',
                    'content_image' => '/assets/img/profil/ketua-sbh.jpg',
                    'content' => '<p class="mb-4">Selamat datang di Website Sekolah Tinggi Ilmu Kesehatan (STIKes) Bogor Husada, saya dengan senang hati memperkenalkan kampus kami kepada Anda. Melalui website ini, kami bertujuan untuk memberikan informasi yang komprehensif mengenai aktivitas pengajaran, penelitian, pengabdian kepada masyarakat, inovasi, fasilitas kampus, dan kehidupan di lingkungan kampus kami.</p>

                    <p class="mb-4">STIKes Bogor Husada terletak di Bogor, sebuah kota yang nyaman dan kondusif untuk belajar di wilayah Jawa Barat. Kami adalah salah satu perguruan tinggi swasta yang berfokus pada pengembangan ilmu pengetahuan di bidang kesehatan, dengan tiga program studi utama, yaitu D3 Kebidanan, S1 Farmasi, dan S1 Gizi. Kami sangat bangga karena seluruh program studi kami telah mendapatkan akreditasi "Baik Sekali" dari Lembaga Akreditasi Mandiri Perguruan Tinggi Kesehatan (LAM-PTKes) Indonesia.</p>

                    <p class="mb-4">STIKes Bogor Husada didirikan pada tahun 2007 dan sebelumnya dikenal sebagai Akademi Kebidanan Bogor Husada. Sejak kolaborasi dengan RS Azra pada tahun 2009, kami telah mengalami perubahan menjadi STIKes Bogor Husada, memperluas cakupan dan kapasitas kami dalam memberikan pendidikan kesehatan yang berkualitas dan berorientasi pada praktik.</p>

                    <p class="mb-4">Komitmen kami adalah untuk menjadi lembaga pendidikan yang inovatif, dapat dipercaya, berorientasi pada kerja tim, dan profesional. Kami berupaya untuk menghasilkan lulusan yang tidak hanya memiliki kompetensi tinggi dalam bidang kesehatan, tetapi juga mampu menciptakan inovasi yang bermanfaat bagi masyarakat dan memberikan kontribusi positif dalam peningkatan kesejahteraan masyarakat secara nasional.</p>

                    <p class="mb-6">Slogan kami, <strong>"STIKes Bogor Husada: Bridging Technology for Humanity"</strong>, mencerminkan visi kami dalam menerapkan teknologi untuk meningkatkan kesehatan dan kesejahteraan manusia. Kami berkomitmen untuk terus berusaha menjadi lembaga yang unggul dalam pengembangan ilmu pengetahuan berbasis teknologi informasi di bidang kesehatan, serta menerapkan pengetahuan ini untuk kebaikan masyarakat.</p>

                    <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <p class="text-xl font-bold text-gray-900 dark:text-white mb-1">Lussy Citra Resmi M.Pd</p>
                        <p class="text-orange-600 font-semibold text-sm uppercase tracking-wide">Ketua STIKes Bogor Husada</p>
                    </div>'
                ]),
                'image' => '/assets/img/hero-fallback.png',
            ],
            [
                'type' => 'visi_misi',
                'title' => 'Visi & Misi',
                'content' => json_encode([
                    'visi' => 'Menjadi institusi pendidikan kesehatan yang unggul, berkarakter, dan berdaya saing di tingkat nasional pada tahun 2030.',
                    'misi' => "1. Menyelenggarakan Tri Dharma Perguruan Tinggi secara profesional di bidang kesehatan.\n2. Mengembangkan kurikulum yang responsif terhadap kebutuhan masyarakat dan dunia kerja.\n3. Membangun jejaring kerjasama dengan institusi kesehatan, baik di dalam maupun di luar negeri untuk meningkatkan kualitas lulusan.\n4. Membina karakter mahasiswa agar memiliki etika profesi yang luhur dan empati tinggi terhadap pasien."
                ]),
                'image' => null,
            ],
            [
                'type' => 'sejarah',
                'title' => 'Sejarah Institusi',
                'content' => json_encode([
                    'subtitle' => 'Jejak langkah perjuangan kami membangun pendidikan kesehatan selama lebih dari satu dekade.',
                    'content' => '<h2>Menjadi institusi pendidikan kesehatan unggulan di Bogor dan sekitarnya</h2>
                    <p>STIKes Bogor Husada didirikan sebagai wujud komitmen dalam meningkatkan kualitas pendidikan di bidang kesehatan di Indonesia, khususnya di wilayah Bogor dan sekitarnya. Sejak awal berdirinya, institusi ini telah berfokus pada pengembangan sumber daya manusia yang profesional, beretika, dan berdaya saing tinggi di bidang kesehatan.</p>
                    
                    <p>Dengan dukungan tenaga pengajar yang kompeten dan fasilitas yang memadai, STIKes Bogor Husada terus berinovasi dalam memberikan pendidikan terbaik bagi mahasiswa. Seiring perjalanan waktu, institusi ini telah melahirkan lulusan-lulusan yang berkontribusi nyata dalam dunia kesehatan, baik di tingkat lokal maupun nasional.</p>
                    
                    <p>Hingga saat ini, STIKes Bogor Husada tetap berkomitmen untuk menjadi institusi pendidikan kesehatan unggulan yang mampu menjawab tantangan zaman dan kebutuhan masyarakat.</p>',
                    'timeline' => [
                        'title' => 'Roadmap STIKes Bogor Husada',
                        'icon' => 'fas fa-route',
                        'items' => [
                            [
                                'year' => '2007',
                                'title' => 'Pendirian Akademi Kebidanan Bogor Husada',
                                'description' => 'Akademi Kebidanan Bogor Husada berdiri di Kota Bogor dengan satu program studi yaitu D3 Kebidanan.'
                            ],
                            [
                                'year' => '2019',
                                'title' => 'Perubahan Bentuk Menjadi STIKes Bogor Husada',
                                'description' => 'Akademi Kebidanan Bogor Husada resmi berubah menjadi STIKes Bogor Husada berdasarkan SK Kemenristek Dikti Nomor B/2201/A41/HK.01.01/2019.'
                            ],
                            [
                                'year' => '2019',
                                'title' => 'Kerja Sama dan Penambahan Program Studi',
                                'description' => 'STIKes Bogor Husada menjalin kerja sama dengan RS Azra Kota Bogor serta menambah program studi S1 Farmasi.'
                            ],
                            [
                                'year' => '2020',
                                'title' => 'Penambahan Program Studi S1 Gizi',
                                'description' => 'STIKes Bogor Husada menambah program studi ketiga yaitu S1 Gizi.'
                            ],
                            [
                                'year' => '2021',
                                'title' => 'Akreditasi D3 Kebidanan',
                                'description' => 'Program studi D3 Kebidanan memperoleh akreditasi LAM-PTKes dengan peringkat "Baik Sekali" (No. 0142/LAM-PTKes/Akr/Dip/IV/2021).'
                            ],
                            [
                                'year' => '2022',
                                'title' => 'Akreditasi S1 Farmasi',
                                'description' => 'Program studi S1 Farmasi memperoleh akreditasi LAM-PTKes dengan peringkat "Baik" (No. 0844/LAM-PTKes/Akr/Sar/IX/2022).'
                            ],
                            [
                                'year' => '2023',
                                'title' => 'Akreditasi S1 Gizi dan Penambahan Kampus 2',
                                'description' => 'Program studi S1 Gizi memperoleh akreditasi LAM-PTKes "Baik" (No. 0247/LAM-PTKes/Akr/Sar/III/2023) serta penambahan Gedung Kampus 2 di Jl. Sholeh Iskandar, Kota Bogor untuk meningkatkan kualitas ruang belajar.'
                            ],
                            [
                                'year' => '2024',
                                'title' => 'Penambahan Laboratorium Farmakologi',
                                'description' => 'Penambahan fasilitas Laboratorium Farmakologi di Kampus 1 STIKes Bogor Husada pada Maret 2024 untuk mendukung pembelajaran farmakokinetik dan farmakodinamik.'
                            ]
                        ]
                    ]
                ]),
                'image' => 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            ],
            [
                'type' => 'struktur',
                'title' => 'Struktur Organisasi',
                'content' => json_encode([
                    'subtitle' => 'Susunan kepengurusan dan pimpinan akademik STIKes Bogor Husada demi mewujudkan visi misi institusi yang profesional.',
                    'content' => '<div style="text-align: center;">
                        <img src="/assets/img/struktur/struktur-organisasi.png" alt="Bagan Struktur Organisasi STIKes Bogor Husada" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); display: inline-block;">
                    </div>',
                    'features_title' => 'Unsur Pimpinan Utama',
                    'features' => [
                        [
                            'title' => 'Ketua',
                            'description' => 'Lussy Citra Resmi, M.Pd',
                            'icon' => 'fas fa-user-tie'
                        ],
                        [
                            'title' => 'Wakil Ketua I',
                            'description' => 'Bidang Akademik',
                            'icon' => 'fas fa-chalkboard-teacher'
                        ],
                        [
                            'title' => 'Wakil Ketua II',
                            'description' => 'Bidang Non-Akademik (Keuangan & SDM)',
                            'icon' => 'fas fa-wallet'
                        ],
                        [
                            'title' => 'Wakil Ketua III',
                            'description' => 'Kemahasiswaan & Kerjasama',
                            'icon' => 'fas fa-users-cog'
                        ]
                    ]
                ]),
                'image' => '/assets/img/hero-fallback.png',
            ]
        ];

        foreach ($data as $item) {
            TentangKami::updateOrCreate(
                ['type' => $item['type']],
                $item
            );
        }
    }
}
