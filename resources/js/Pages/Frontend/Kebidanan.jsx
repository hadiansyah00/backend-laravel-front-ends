import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';

export default function Kebidanan() {
    const dummySectionsConfig = [
        {
            type: 'hero_static',
            content: {
                title: 'Program Studi D3 Kebidanan',
                subtitle: 'Mendedikasikan ilmu untuk menjaga kesehatan ibu dan anak melalui pelayanan asuhan kebidanan yang humanis dan cekatan.',
                bgImage: '/assets/img/hero-fallback.png'
            }
        },
        {
            type: 'rich_text',
            content: {
                content: `
                    <div class="max-w-4xl mx-auto text-center space-y-6">
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Mengenal D3 Kebidanan</h2>
                        <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Program Studi Diploma Tiga (D3) Kebidanan adalah salah satu program studi pelopor di STIKes Bogor Husada. Program studi ini memfokuskan pendidikan pada pembentukan karakter asuhan kebidanan (midwifery care) yang meliputi kesehatan ibu saat kehamilan, persalinan, nifas, serta kesehatan bayi baru lahir.
                        </p>
                        <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Lulusan D3 Kebidanan (A.Md.Keb) dikenal memiliki peran yang amat krusial dalam lini terdepan (first-line) pelayanan fasilitas reproduksi wanita dan keluarga pra-sejahtera di berbagai wilayah di Indonesia.
                        </p>
                        <div class="inline-flex mt-4 items-center gap-3 px-6 py-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-2xl shadow-sm">
                            <i class="fas fa-medal text-blue-500 text-2xl"></i>
                            <div class="text-left">
                                <span class="block text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Status Akreditasi</span>
                                <span class="block text-xl font-bold text-blue-700 dark:text-blue-300">LAM-PTKes "BAIK SEKALI"</span>
                            </div>
                        </div>
                    </div>
                `
            }
        },
        {
            type: 'content_with_image',
            content: {
                title: 'Profil Bidan Profesional',
                image: '/assets/img/kaprodi/kaprodi-kebidanan.png', // Dummy
                align: 'left',
                imageAspectRatio: 'aspect-[3/4]',
                imagePosition: 'object-top',
                content: `
                    <p class="mb-4">Salam hangat dari Program Studi D3 Kebidanan STIKes Bogor Husada. Kami adalah 'kawah candradimuka' tempat lahirnya bidan-bidan tangguh yang memiliki kepekaan emosional dan intelektual tinggi.</p>
                    <p class="mb-4">Tantangan seorang bidan jauh lebih luas daripada sekadar proses melahirkan. Oleh karenanya, pendidikan vokasional di sini membekali setiap mahasiswi dengan alat rekam jejak praktik laboratorium yang setara dengan simulasi riil persalinan serta asuhan kebidanan komunitas.</p>
                    <p class="mb-6">Cita-cita kami sederhana: mewariskan senyuman bagi ibu dan harapan kehidupan tangguh bagi setiap bayi yang disambut ke dunia ini. Bergabung bersama kami, wujudkan nurani kemanusiaan melalui profesi yang luhur ini.</p>
                    <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <p class="text-xl font-bold text-gray-900 dark:text-white mb-1">Dosen Kepala D3 Kebidanan</p>
                        <p class="text-orange-600 font-semibold text-sm uppercase tracking-wide">Ketua Program Studi D3 Kebidanan, STIKes Bogor Husada</p>
                    </div>
                `
            }
        },
        {
            type: 'visi_misi',
            content: {
                title: 'Visi & Misi D3 Kebidanan',
                visi: 'Menjadi Program Studi D3 Kebidanan unggulan di bidang Asuhan Kebidanan Komplementer yang berjiwa *entrepreneurial* dan diakui secara regional maupun nasional.',
                misi: [
                    'Menyelenggarakan pendidikan Vokasi Kebidanan terkini dengan integrasi kompetensi asuhan komplementer.',
                    'Mengembangkan penilitian terapan yang berkontribusi tinggi untuk menekan angka kematian ibu dan anak (AKI-AKB).',
                    'Melaksanakan pengabdian masyarakat secara mandiri berupa deteksi dini gangguan reproduksi hingga pelayanan nifas.',
                    'Mengokohkan kolaborasi dengan fasilitator dan fasilitas kesehatan (Rumah Sakit Bunda, Bidan Praktik Mandiri, dsb).'
                ]
            }
        },
        {
            type: 'feature',
            content: {
                title: 'Peluang Kerja Lulusan Kebidanan',
                features: [
                    {
                        title: "Bidan Praktik Mandiri (BPM)",
                        icon_svg: "",
                        icon: "fas fa-house-medical",
                        description: "Menyediakan layanan mandiri asuhan pemeriksaan kehamilan (ANC), persalinan, serta nifas bagi ibu dan kesehatan balita secara langsung di lingkungan tempat tinggal masyarakat."
                    },
                    {
                        title: "Bidan Pelaksana Rumah Sakit",
                        icon_svg: "",
                        icon: "fas fa-hospital-user",
                        description: "Menjadi tulang punggung asuhan keperawatan kebidanan di ruang poli obstetri, ruang bersalin operasi (VK), dan NICU/PICU untuk memonitor perkembangan nyawa bayi."
                    },
                    {
                        title: "Pemberi Asuhan Komunitas",
                        icon_svg: "",
                        icon: "fas fa-users-line",
                        description: "Tenaga lapangan (puskesmas, posyandu) yang membina kader-kader penyuluh ibu untuk edukasi laktasi (ASI eklusif) dan panduan KB serta gizi balita."
                    },
                    {
                        title: "Manajer Pelayanan Kebidanan",
                        icon_svg: "",
                        icon: "fas fa-clipboard-list",
                        description: "Memimpin koordinasi penyediaan unit bersalin di pusat kesehatan, klinik ibu anak, dengan menangani jalur administrasi jaminan kesehatan (BPJS)."
                    }
                ]
            }
        }
    ];

    return (
        <MainLayout title="D3 Kebidanan | STIKes Bogor Husada">
            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}
