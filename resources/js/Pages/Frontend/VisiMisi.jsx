import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';

export default function VisiMisi() {
    const dummySectionsConfig = [
        {
            type: 'hero_static',
            content: {
                title: 'Visi, Misi & Tujuan',
                subtitle: 'Arah gerak dan pijakan lurus dedikasi STIKes Bogor Husada dalam dunia pendidikan kesehatan.',
                bgImage: '/assets/img/hero-fallback.png'
            }
        },
        {
            type: 'visi_misi',
            content: {
                title: 'Visi, Misi & Tujuan STIKes Bogor Husada',
                visi: 'Menjadi Penyelenggara Pendidikan Tinggi Kesehatan yang Menghasilkan Lulusan Tenaga Kesehatan yang Profesional, Berkarakter dan Berwawasan Global tahun 2040.',
                misi: [
                    'Menyelenggarakan pendidikan tinggi kesehatan untuk menghasilkan lulusan tenaga kesehatan yang kompeten, profesional, berkarakter dan berwawasan global.',
                    'Menyelenggarakan penelitian di bidang kesehatan serta meningkatkan produktivitas publikasi dan HAKI.',
                    'Menyelenggarakan pengabdian kepada masyarakat di bidang kesehatan yang dapat meningkatkan taraf kesehatan di masyarakat.',
                    'Menyelenggarakan tatakelola lembaga yang sehat dengan prinsip tata pamong yang akuntabel dan transparan.',
                    'Menyelenggarakan kerja sama lintas sektor, baik regional, nasional, dan internasional yang berkesinambungan.'
                ],
                tujuan: [
                    'Menghasilkan tenaga kesehatan yang profesional, unggul dalam pelayanan, dan berakhlak mulia sesuai dengan etika profesi.',
                    'Meningkatkan budaya ilmiah produktif dosen dan mahasiswa dalam bentuk penelitian dan inovasi IPTEK yang bermanfaat.',
                    'Mengembangkan program pemberdayaan dan edukasi kesehatan masyarakat untuk menurunkan angka morbiditas di regional Jawa Barat.',
                    'Mewujudkan sistem tata kelola manajemen perguruan tinggi yang optimal berbasis teknologi informasi terintegrasi.',
                    'Memperluas jejaring kemitraan strategis dengan institusi, industri, dan pemerintah daerah untuk percepatan penyerapan lulusan.'
                ]
            }
        }
    ];

    return (
        <MainLayout title="Visi & Misi | STIKes Bogor Husada">
            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}
