import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';
import Hero from '@/Sections/Hero';
import { Head } from '@inertiajs/react';

export default function UPMI({ fasilitasData }) {
    // 1. Ensure data is always an object safely
    const data = fasilitasData || {};
    const facilities = Array.isArray(data.facilities) ? data.facilities : [];

    // 2. FIX: Check if path is actually a string before using .startsWith()
    const getImageUrl = (path) => {
        if (!path || typeof path !== 'string') return null;
        if (path.startsWith('http')) return path;
        if (path.startsWith('storage/')) return '/' + path;
        return '/storage/' + path;
    };

    // 3. FIX: Ensure description is a string before using .replace()
    const rawDescription = typeof data.description === 'string' && data.description.trim() !== '' 
        ? data.description 
        : 'UPMI STIKes Bogor Husada didirikan dengan tujuan menjadi wadah dinamis bagi seluruh sivitas akademika dalam mengembangkan Ilmu Pengetahuan, Teknologi, dan Seni (IPTEKS) di bidang kesehatan.';
        
    const formattedDescription = '<p class="mb-4">' + rawDescription.replace(/\n/g, '</p><p class="mb-4">') + '</p>';

    const dummySectionsConfig = [
        {
            type: 'content_with_image',
            content: {
                title: 'Tentang UPMI',
                image: getImageUrl(data.image) || 'https://images.unsplash.com/photo-1576091160550-2173ff9e9e9c?auto=format&fit=crop&q=80&w=2070',
                align: 'left',
                imageAspectRatio: 'aspect-[4/3]',
                content: formattedDescription
            }
        },
        {
            type: 'feature',
            content: {
                title: 'Program Kerja & Layanan UPMI',
                features: facilities.length > 0 ? facilities.map(f => ({
                    title: f.name || 'Unnamed Feature',
                    icon: 'fas fa-check-circle',
                    description: f.description || ''
                })) : [
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
        <MainLayout title="UPMI | STIKes Bogor Husada">
            <Head>
                <title>UPMI - STIKes Bogor Husada</title>
            </Head>

            <Hero
                content={{
                    title: data.name || 'Unit Pendidikan dan Magang (UPMI)',
                    subtitle: 'Motor penggerak pendidikan dan magang nyata berbasis bukti ilmiah demi kesehatan masyarakat.',
                    image: getImageUrl(data.image) || '/assets/img/hero-fallback.png',
                    gradient: 'orange',
                    breadcrumbs: [
                        { label: 'Unit & Fasilitas', url: null },
                        { label: 'UPMI', url: null }
                    ]
                }}
            />

            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}