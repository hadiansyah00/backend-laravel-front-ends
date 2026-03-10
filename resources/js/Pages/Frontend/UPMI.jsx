import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';

export default function UPMI({ fasilitasData }) {
    const data = fasilitasData || {};
    const facilities = Array.isArray(data.facilities) ? data.facilities : [];

    const dummySectionsConfig = [
        {
            type: 'hero_static',
            content: {
                title: data.name || 'Unit Penjaminan Mutu Internal (UPMI)',
                subtitle: 'Mengawal standar kualitas tri dharma perguruan tinggi melalui sistem penjaminan mutu yang terukur dan berkelanjutan.',
                bgImage: data.image ? '/' + data.image : '/assets/img/hero-fallback.png'
            }
        },
        {
            type: 'content_with_image',
            content: {
                title: 'Mengenal UPMI',
                image: data.image ? '/' + data.image : 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2070',
                align: 'right',
                imageAspectRatio: 'aspect-[4/3]',
                content: '<p class="mb-4">' + (data.description || 'UPMI STIKes Bogor Husada adalah pilar utama dalam menjaga kredibilitas dan keunggulan institusi. Kami bertanggung jawab untuk memastikan bahwa seluruh aktivitas akademik dan non-akademik di kampus selaras dengan Standar Nasional Pendidikan Tinggi (SN-Dikti).').replace(/\n/g, '</p><p class="mb-4">') + '</p>'
            }
        },
        {
            type: 'feature',
            content: {
                title: 'Fokus Utama Penjaminan Mutu',
                features: facilities.length > 0 ? facilities.map(f => ({
                    title: f.name,
                    icon: 'fas fa-check-circle',
                    description: f.description || ''
                })) : [
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
