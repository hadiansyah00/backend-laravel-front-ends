import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';

export default function Farmasi() {
    const dummySectionsConfig = [
        {
            type: 'hero_static',
            content: {
                title: 'Program Studi S1 Farmasi',
                subtitle: 'Menjelajahi dunia farmasi yang penuh inovasi dan tantangan bersama STIKes Bogor Husada.',
                bgImage: '/assets/img/hero-fallback.png'
            }
        },
        // Program Details directly first or Kaprodi? Let's do Program Details.
        {
            type: 'rich_text',
            content: {
                content: `
                    <div class="max-w-4xl mx-auto text-center space-y-6">
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Mengenal S1 Farmasi</h2>
                        <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Farmasi adalah program studi yang mempelajari tentang obat-obatan. Di sini kamu akan mempelajari untuk mengenali struktur kimia obat dan cara sintesisnya, kemudian mengelolanya menjadi obat yang berkhasiat. Tidak hanya meracik, kamu juga harus mengetahui bagaimana penggunaan obat secara aman.
                        </p>
                        <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Bidang farmasi tidak akan pernah ada matinya, sebab pola penyakit pun terus berkembang dan membutuhkan penanganan yang tepat. Lulusan prodi Farmasi akan memperoleh gelar Sarjana Farmasi (S. Farm) dan dapat meneruskan pendidikan apoteker untuk mendapatkan gelar Apoteker (Apt).
                        </p>
                        <div class="inline-flex mt-4 items-center gap-3 px-6 py-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-2xl shadow-sm">
                            <i class="fas fa-medal text-blue-500 text-2xl"></i>
                            <div class="text-left">
                                <span class="block text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Status Akreditasi</span>
                                <span class="block text-xl font-bold text-blue-700 dark:text-blue-300">LAM-PTKes "BAIK"</span>
                            </div>
                        </div>
                    </div>
                `
            }
        },
        {
            type: 'content_with_image',
            content: {
                title: 'Profil Sarjana Farmasi',
                image: '/assets/img/kaprodi/kaprodi-farmasi.png',
                align: 'left',
                imageAspectRatio: 'aspect-[3/4]',
                imagePosition: 'object-top',
                content: `
                    <p class="mb-4">Selamat datang di Program Studi S1 Farmasi STIKes Bogor Husada! Kami dengan bangga mengundang Anda untuk menjelajahi dunia farmasi yang penuh inovasi dan tantangan.</p>
                    <p class="mb-4">Program Studi S1 Farmasi kami berkomitmen untuk memberikan pendidikan berkualitas dalam berbagai aspek farmasi, termasuk farmasi klinis, farmasi industri, dan penelitian obat. Kami bertekad untuk melahirkan para profesional farmasi yang tidak hanya mahir dalam ilmu farmasi, tetapi juga memiliki kepekaan etika, kreativitas, dan semangat inovasi untuk menjawab tantangan farmasi masa depan.</p>
                    <p class="mb-4">Kami menekankan pentingnya pengembangan bakat, kerja tim, penerapan teknologi terkini dalam praktik farmasi, serta kontribusi pada kesehatan masyarakat secara luas.</p>
                    <p class="mb-6">Kami mengundang Anda untuk menjelajahi lebih lanjut halaman web kami untuk memperoleh informasi tentang program studi, kurikulum, acara, dan pencapaian mahasiswa dan alumni. Jika Anda memiliki pertanyaan atau tertarik untuk memulai perjalanan Anda dalam bidang farmasi bersama kami, jangan ragu untuk menghubungi kami.</p>
                    <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <p class="text-xl font-bold text-gray-900 dark:text-white mb-1">Ilham Maulana, M. Farm.</p>
                        <p class="text-orange-600 font-semibold text-sm uppercase tracking-wide">Ketua Program Studi S1 Farmasi, STIKes Bogor Husada</p>
                    </div>
                `
            }
        },
        {
            type: 'visi_misi',
            content: {
                title: 'Visi & Misi S1 Farmasi',
                visi: 'Menjadi penyelenggara Program Studi S1 Farmasi yang menghasilkan lulusan Sarjana Farmasi yang profesional, unggul di bidang pelayanan kefarmasian, berkarakter dan berwawasan global.',
                misi: [
                    'Menyelenggarakan pendidikan S1 Farmasi yang menghasilkan lulusan Sarjana Farmasi yang profesional, kompeten, berkarakter, berwawasan global, dan unggul di bidang kefarmasian.',
                    'Menyelenggarakan penelitian di bidang kefarmasian serta meningkatkan produktivitas publikasi dan HAKI.',
                    'Menyelenggarakan kegiatan pengabdian kepada masyarakat dengan mengaplikasikan ilmu kefarmasian dalam meningkatkan taraf kesehatan di masyarakat.',
                    'Menyelenggarakan tata kelola program studi yang sehat dengan mengoptimalkan kerja sama dan pemanfaatan teknologi informasi yang tepat.'
                ]
            }
        },
        {
            type: 'feature',
            content: {
                title: 'Peluang Kerja Lulusan Farmasi',
                features: [
                    {
                        title: "Rumah Sakit, Apotek, dan Klinik",
                        icon_svg: "<svg class=\"w-7 h-7 text-indigo-600\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 21h16.5M4.5 3h15M5.25 3v18M18.75 3v18M9 6.75h6M9 11.25h6M9 15.75h6\" \/><\/svg>",
                        description: "Lulusan S1 Farmasi dapat bekerja sebagai apoteker, teknisi farmasi, atau petugas administrasi kesehatan. Tugas utamanya meliputi pelayanan farmasi klinik, pengelolaan obat, pemberian informasi obat kepada pasien."
                    },
                    {
                        title: "Perusahaan Farmasi",
                        icon_svg: "<svg class=\"w-7 h-7 text-indigo-600\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3 9h18M3 12h18M3 15h18M3 18h18\" \/><\/svg>",
                        description: "Di sektor industri farmasi, lulusan dapat berkarier sebagai ilmuwan farmasi, peneliti, ahli teknis, hingga tenaga pemasaran. Terlibat dalam pengembangan, produksi, dan distribusi."
                    },
                    {
                        title: "Produksi & Quality Control (QC)",
                        icon_svg: "<svg class=\"w-7 h-7 text-indigo-600\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3v18M3 12h18\" \/><\/svg>",
                        description: "Peluang kerja dalam bidang produksi mencakup pengawasan mutu bahan baku, proses produksi, hingga produk akhir agar memenuhi standar regulasi industri."
                    },
                    {
                        title: "Distribusi Produk Farmasi",
                        icon_svg: "<svg class=\"w-7 h-7 text-indigo-600\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3v18M3 12h18\" \/><\/svg>",
                        description: "Lulusan dapat bekerja di bidang distribusi yang mengelola logistik, penyimpanan, dan pengiriman produk farmasi secara aman dan tepat waktu."
                    },
                    {
                        title: "Pegawai Negeri Sipil (PNS)",
                        icon_svg: "<svg class=\"w-7 h-7 text-indigo-600\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3v18M3 12h18\" \/><\/svg>",
                        description: "Dapat menjadi PNS di instansi seperti Kemenkes, BPOM, Dinas Kesehatan. Berperan dalam pengaturan kebijakan dan pengawasan mutu obat publik."
                    },
                    {
                        title: "Kosmetik & Estetika Medis",
                        icon_svg: "<svg class=\"w-7 h-7 text-indigo-600\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6 3h12v18H6V3z\" \/><\/svg>",
                        description: "Bekerja di industri kosmetik sebagai formulator, konsultan kecantikan, atau staff di klinik estetika yang merekomendasikan produk perawatan kulit."
                    },
                    {
                        title: "Administrasi Pelayanan Obat",
                        icon_svg: "<svg class=\"w-7 h-7 text-indigo-600\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 21h16.5M4.5 3h15M5.25 3v18M18.75 3v18M9 6.75h6M9 11.25h6M9 15.75h6\" \/><\/svg>",
                        description: "Mencakup pengelolaan resep, pencatatan inventaris obat, dan administrasi pasien di rumah sakit, klinik, maupun apotek."
                    },
                    {
                        title: "Penelitian dan Pengembangan (R&D)",
                        icon_svg: "<svg class=\"w-7 h-7 text-indigo-600\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3v18M3 12h18\" \/><\/svg>",
                        description: "Fokus pada penemuan obat baru, uji klinis, pengembangan formulasi, dan studi efikasi serta keamanan produk farmasi masa depan."
                    }
                ]
            }
        }
    ];

    return (
        <MainLayout title="S1 Farmasi | STIKes Bogor Husada">
            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}
