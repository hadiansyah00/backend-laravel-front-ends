import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';

export default function Gizi() {
    const dummySectionsConfig = [
        {
            type: 'hero_static',
            content: {
                title: 'Program Studi S1 Gizi',
                subtitle: 'Mencetak pakar nutrisi berkarakter yang siap melayani kebutuhan gizi klinis, institusi, maupun masyarakat.',
                bgImage: '/assets/img/hero-fallback.png'
            }
        },
        {
            type: 'rich_text',
            content: {
                content: `
                    <div class="max-w-4xl mx-auto text-center space-y-6">
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Mengenal S1 Gizi</h2>
                        <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Program Studi S1 Gizi dirancang untuk mendalami ilmu gizi di bidang kesehatan manusia. Mahasiswa akan mempelajari dasar-dasar nutrisi makro dan mikro, dietetika klinis, gizi olahraga, hingga penyelenggaraan makanan massal di rumah sakit maupun institusi komersial.
                        </p>
                        <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Kebutuhan akan ahli gizi (Dietitian dan Nutrisionis) semakin melonjak seiring dengan kesadaran masyarakat modern akan pentingnya pencegahan penyakit metabolik seperti obesitas, diabetes, dan stunting.
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
                title: 'Profil Sarjana Gizi',
                image: '/assets/img/kaprodi/kaprodi-gizi.png', // Assuming dummy path or fallback
                align: 'left',
                imageAspectRatio: 'aspect-[3/4]',
                imagePosition: 'object-top',
                content: `
                    <p class="mb-4">Selamat datang di Program Studi S1 Gizi STIKes Bogor Husada. Suatu kehormatan bagi kami untuk menjadi tempat bagi Anda yang bersemangat dalam memajukan kualitas hidup melalui pemahaman nutrisi yang memadai.</p>
                    <p class="mb-4">Kami merancang kurikulum yang progresif, menantang, serta relevan baik di tingkat nasional maupun standar global ilmu gizi klinis. Program kami bertujuan melahirkan pakar yang memiliki analisis saintifik tinggi dengan naluri kepedulian yang besar terhadap penanganan gizi esensial masyarakat.</p>
                    <p class="mb-6">Kami dengan bangga mengundang Anda untuk menjelajahi wawasan baru serta menemukan langkah karir gemilang Anda di bidang Gizi bersama kami. Bergabunglah dengan kami, dan jadilah inisiator pola hidup sehat di masyarakat.</p>
                    <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <p class="text-xl font-bold text-gray-900 dark:text-white mb-1">Dosen Kepala S1 Gizi</p>
                        <p class="text-orange-600 font-semibold text-sm uppercase tracking-wide">Ketua Program Studi S1 Gizi, STIKes Bogor Husada</p>
                    </div>
                `
            }
        },
        {
            type: 'visi_misi',
            content: {
                title: 'Visi & Misi S1 Gizi',
                visi: 'Menjadi Program Studi Sarjana Gizi yang inovatif, berstandar kualitas prima, serta menghasilkan lulusan kompeten yang peduli pada isu gizi lintas generasi di tahun 2035.',
                misi: [
                    'Menyelenggarakan proses pembelajaran mutakhir yang selaras dengan tantangan perbaikan gizi masyarakat dan pengembangan dietetika klinis.',
                    'Melaksanakan penelitian bidang gizi terapan untuk menyelesaikan permasalahan malnutrisi lokal maupun global.',
                    'Menyelenggarakan pengabdian masyarakat guna mendorong pemberdayaan pangan fungsional serta literasi gizi.',
                    'Membangun tata pamong program studi yang kredibel dalam jaringan mitra pelayanan kesehatan serta industri pangan.'
                ]
            }
        },
        {
            type: 'feature',
            content: {
                title: 'Peluang Kerja Lulusan Gizi',
                features: [
                    {
                        title: "Dietitian Rumah Sakit / Klinik",
                        icon_svg: "",
                        icon: "fas fa-user-nurse",
                        description: "Bekerja di rumah sakit atau puskesmas sebagai ahli gizi klinis untuk menyusun program diet spesifik pasien yang sedang dalam perawatan medis (Diabetes, Hipertensi, Pra/Pasca Bedah)."
                    },
                    {
                        title: "Konsultan Gizi Industri Fitness",
                        icon_svg: "",
                        icon: "fas fa-dumbbell",
                        description: "Memberikan pendampingan langsung bagi atlet olahraga atau pengunjung pusat kebugaran untuk memaksimalkan performa dan membentuk keseimbangan massa tubuh."
                    },
                    {
                        title: "Quality Control Industri Pangan",
                        icon_svg: "",
                        icon: "fas fa-industry",
                        description: "Menjadi tim ahli di industri manufaktur makanan dan minuman olahan komersial untuk memastikan produk mematuhi standar gizi produk dan keamanan pangan nasional."
                    },
                    {
                        title: "Pengusaha Katering Diet",
                        icon_svg: "",
                        icon: "fas fa-utensils",
                        description: "Menjadi wirausahawan (entrepreneur) kuliner khusus penyediaan katering sehat berbasis diet bagi individu dengan kebutuhan klinis maupun estetika diet."
                    }
                ]
            }
        }
    ];

    return (
        <MainLayout title="S1 Gizi | STIKes Bogor Husada">
            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}
