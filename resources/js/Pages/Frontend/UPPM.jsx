import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';

export default function UPPM() {
    const dummySectionsConfig = [
        {
            type: 'hero_static',
            content: {
                title: 'Unit Penelitian dan Pengabdian kepada Masyarakat (UPPM)',
                subtitle: 'Motor penggerak riset inovatif dan pengabdian nyata berbasis bukti ilmiah demi kesehatan masyarakat.',
                bgImage: '/assets/img/hero-fallback.png'
            }
        },
        {
            type: 'content_with_image',
            content: {
                title: 'Tentang UPPM',
                image: 'https://images.unsplash.com/photo-1576091160550-2173ff9e9e9c?auto=format&fit=crop&q=80&w=2070', // Research team
                align: 'left',
                imageAspectRatio: 'aspect-[4/3]',
                content: `
                    <p class="mb-4"><strong>UPPM STIKes Bogor Husada</strong> didirikan dengan tujuan menjadi wadah dinamis bagi seluruh sivitas akademika dalam mengembangkan Ilmu Pengetahuan, Teknologi, dan Seni (IPTEKS) di bidang kesehatan.</p>
                    <p class="mb-4">Kami memfasilitasi setiap ide riset cemerlang dari dosen dan mahasiswa agar dapat diwujudkan dalam bentuk penelitian aplikatif. Tidak berhenti pada publikasi jurnal, hasil dari penelitian tersebut kemudian direalisasikan dalam bentuk program-program pengabdian kepada masyarakat (PKM) yang berfokus pada pencegahan penyakit menular dan tidak menular, stunting, hingga pemberdayaan gizi komplementer di desa binaan.</p>
                `
            }
        },
        {
            type: 'feature',
            content: {
                title: 'Program Kerja & Layanan UPPM',
                features: [
                    {
                        title: "Hibah Riset Internal & Eksternal",
                        icon: "fas fa-hand-holding-usd",
                        description: "Fasilitasi pendanaan penelitian dosen dan mahasiswa melalui seleksi ketat untuk menghasilkan inovasi medis."
                    },
                    {
                        title: "Publikasi Jurnal Terakreditasi",
                        icon: "fas fa-book-open",
                        description: "Pendampingan penulisan naskah ilmiah untuk diterbitkan di jurnal nasional SINTA maupun jurnal internasional bereputasi."
                    },
                    {
                        title: "Hak Kekayaan Intelektual (HKI)",
                        icon: "fas fa-certificate",
                        description: "Pengurusan paten, hak cipta, dan desain industri atas luaran produk/modul hasil riset kesehatan sivitas akademika."
                    },
                    {
                        title: "Desa Binaan & Pengabdian Tematik",
                        icon: "fas fa-people-carry",
                        description: "Penerjunan tim kolaboratif dosen-mahasiswa ke daerah rawan kesehatan untuk edukasi masif dan intervensi klinis dasar."
                    }
                ]
            }
        }
    ];

    return (
        <MainLayout title="UPPM | STIKes Bogor Husada">
            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}
