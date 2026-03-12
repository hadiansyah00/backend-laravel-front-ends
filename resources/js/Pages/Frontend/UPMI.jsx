import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';
import Hero from '@/Sections/Hero';
import { Head } from '@inertiajs/react';

export default function UPMI({ fasilitasData }) {
    // 1. DATA AMAN
    const data = fasilitasData || {};
    const facilities = Array.isArray(data.facilities) ? data.facilities : [];

    // 2. HELPER: Pengaman URL Gambar
    const getImageUrl = (path) => {
        if (!path || typeof path !== 'string') return null;
        if (path.startsWith('http')) return path;
        if (path.startsWith('storage/')) return '/' + path;
        return '/storage/' + path;
    };

    // 3. HELPER: Ekstraksi Judul Aman
    const getSectionTitle = (name) => {
        if (!name || typeof name !== 'string') return 'Mengenal UPMI';
        const match = name.match(/\(([^)]+)\)/); 
        return match ? `Mengenal ${match[1]}` : `Mengenal ${name}`;
    };

    // 4. HELPER: Format Paragraf Aman
    const formatDescription = (desc) => {
        const defaultDesc = 'UPMI STIKes Bogor Husada adalah pilar utama dalam menjaga kredibilitas dan keunggulan institusi. Kami bertanggung jawab untuk memastikan bahwa seluruh aktivitas akademik dan non-akademik di kampus selaras dengan Standar Nasional Pendidikan Tinggi (SN-Dikti).';
        const rawText = typeof desc === 'string' && desc.trim() !== '' ? desc : defaultDesc;
        
        return rawText
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => `<p class="mb-4 text-gray-700 dark:text-gray-300">${line.trim()}</p>`)
            .join('');
    };

    const defaultFacilities = {
        "Audit Mutu Internal (AMI)": {
            icon: "fas fa-clipboard-check",
            description: "Investigasi independen yang dilakukan setiap akhir semester untuk menilai kepatuhan program studi terhadap standar mutu ISO dan Dikti."
        },
        "Evaluasi Dosen oleh Mahasiswa (EDOM)": {
            icon: "fas fa-user-check",
            description: "Platform survei analitik untuk mengukur kepuasan mahasiswa atas performa mengajar dosen di setiap mata kuliah."
        },
        "Survei Kepuasan Pengguna": {
            icon: "fas fa-chart-line",
            description: "Evaluasi kepuasan mahasiswa terhadap layanan akademik, BAAK, ketersediaan perpustakaan, hingga infrastruktur laboratorium."
        },
        "Tracer Study Luaran": {
            icon: "fas fa-graduation-cap",
            description: "Pelacakan profil dan tingkat keterserapan alumni di dunia kerja (rumah sakit/industri medis) secara nasional."
        }
    };

    // 5. RAKIT SECTION DENGAN PENGAMAN ARRAY
    const dummySectionsConfig = [
        {
            type: 'content_with_image',
            content: {
                title: getSectionTitle(data.name),
                image: getImageUrl(data.image) || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2070',
                align: 'right',
                imageAspectRatio: 'aspect-[4/3]',
                content: formatDescription(data.description)
            }
        },
        {
            type: 'feature',
            content: {
                title: 'Layanan & Fokus Utama',
                features: facilities.length > 0 
                    ? facilities.map(f => {
                        // FIX UTAMA: Jika ada item array yang cacat/null, skip prosesnya
                        if (!f || typeof f !== 'object') return null;

                        // Gunakan optional chaining (?.) agar tidak crash
                        const name = typeof f?.name === 'string' ? f.name : 'Layanan Unit';
                        const fallback = defaultFacilities[name] || {};
                        
                        return {
                            title: name,
                            icon: typeof f?.icon === 'string' && f.icon ? f.icon : (fallback.icon || 'fas fa-check-circle'),
                            description: typeof f?.description === 'string' && f.description ? f.description : (fallback.description || 'Deskripsi belum tersedia.')
                        };
                    }).filter(Boolean) // Membuang nilai null dari hasil map
                    : Object.entries(defaultFacilities).map(([key, val]) => ({
                        title: key,
                        icon: val.icon,
                        description: val.description
                    }))
            }
        }
    ];

    const pageTitle = (data && typeof data.name === 'string') ? data.name : 'Unit Penjaminan Mutu Internal (UPMI)';
    const shortName = pageTitle.includes('(') ? pageTitle.split('(')[1].replace(')', '') : 'UPMI';

    return (
        <MainLayout title={`${shortName} | STIKes Bogor Husada`}>
            <Head>
                <title>{shortName} - STIKes Bogor Husada</title>
            </Head>

            <Hero
                content={{
                    title: pageTitle,
                    subtitle: 'Mengawal standar kualitas tri dharma perguruan tinggi melalui sistem penjaminan mutu yang terukur dan berkelanjutan.',
                    image: getImageUrl(data.image) || '/assets/img/hero-fallback.png',
                    gradient: 'orange',
                    breadcrumbs: [
                        { label: 'Unit & Fasilitas', url: null },
                        { label: shortName, url: null }
                    ]
                }}
            />

            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}