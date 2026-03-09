import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';

export default function UPMI() {
    const dummySectionsConfig = [
        {
            type: 'hero_static',
            content: {
                title: 'Unit Penjaminan Mutu Internal (UPMI)',
                subtitle: 'Mengawal standar kualitas tri dharma perguruan tinggi melalui sistem penjaminan mutu yang terukur dan berkelanjutan.',
                bgImage: '/assets/img/hero-fallback.png'
            }
        },
        {
            type: 'content_with_image',
            content: {
                title: 'Mengenal UPMI',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2070', // Audit/Quality concept
                align: 'right', // image on right, text on left
                imageAspectRatio: 'aspect-[4/3]',
                content: `
                    <p class="mb-4"><strong>UPMI STIKes Bogor Husada</strong> adalah pilar utama dalam menjaga kredibilitas dan keunggulan institusi. Kami bertanggung jawab untuk memastikan bahwa seluruh aktivitas akademik dan non-akademik di kampus selaras dengan Standar Nasional Pendidikan Tinggi (SN-Dikti).</p>
                    <p class="mb-4">Melalui siklus Penetapan, Pelaksanaan, Evaluasi, Pengendalian, dan Peningkatan (PPEPP), UPMI mengaudit mutu manajemen kampus secara periodik. Layanan pendidikan yang bermutu tidak hanya memberikan pengalaman belajar terbaik bagi mahasiswa, namun juga menjadi pondasi utama akreditasi LAM-PTKes yang "Baik Sekali".</p>
                `
            }
        },
        {
            type: 'feature',
            content: {
                title: 'Fokus Utama Penjaminan Mutu',
                features: [
                    {
                        title: "Audit Mutu Internal (AMI)",
                        icon: "fas fa-clipboard-check",
                        description: "Investigasi independen yang dilakukan setiap akhir semester untuk menilai kepatuhan program studi terhadap standar mutu ISO dan Dikti."
                    },
                    {
                        title: "Evaluasi Dosen oleh Mahasiswa (EDOM)",
                        icon: "fas fa-user-check",
                        description: "Platform survei analitik untuk mengukur kepuasan mahasiswa atas performa mengajar dosen di setiap mata kuliah."
                    },
                    {
                        title: "Survei Kepuasan Pengguna",
                        icon: "fas fa-chart-line",
                        description: "Evaluasi kepuasan mahasiswa terhadap layanan akademik, BAAK, ketersediaan perpustakaan, hingga infrastruktur laboratorium."
                    },
                    {
                        title: "Tracer Study Luaran",
                        icon: "fas fa-graduation-cap",
                        description: "Pelacakan profil dan tingkat keterserapan alumni di dunia kerja (rumah sakit/industri medis) secara nasional."
                    }
                ]
            }
        }
    ];

    return (
        <MainLayout title="UPMI | STIKes Bogor Husada">
            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}
