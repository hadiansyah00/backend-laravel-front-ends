import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';
// import Hero from '@/Sections/Hero'; <-- Boleh dihapus karena sudah pakai Hero custom
import { Head, Link } from '@inertiajs/react'; // <-- FIX: Tambahkan Link di sini

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

            {/* --- IMPROVED HERO SECTION (UPMI) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={getImageUrl(data.image) || '/assets/img/hero-fallback.png'}
                        alt={data.name || 'UPMI'}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"; // Fallback image jika tidak ada
                        }}
                    />
                    {/* Gradient Overlay (Dark to Orange blend) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-orange-900/60"></div>
                </div>

                {/* Hero Content */}
                <div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-3xl">
                        {/* Breadcrumbs */}
                        <nav className="flex mb-8" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center px-4 py-2 space-x-1 border rounded-full md:space-x-3 bg-white/10 backdrop-blur-md border-white/20">
                                <li className="inline-flex items-center">
                                    <Link
                                        href="/"
                                        className="inline-flex items-center text-sm font-medium text-gray-200 transition-colors hover:text-white"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                        </svg>
                                        Beranda
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="ml-1 text-sm font-medium text-gray-300 md:ml-2">Unit & Fasilitas</span>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="ml-1 text-sm font-bold text-orange-400 md:ml-2">UPMI</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Title & Subtitle */}
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                            {data.name || 'Unit Pendidikan dan Magang (UPMI)'}
                        </h1>
                        <p className="max-w-2xl text-lg font-normal leading-relaxed text-gray-300 lg:text-xl">
                            Motor penggerak pendidikan dan magang nyata berbasis bukti ilmiah demi kesehatan masyarakat.
                        </p>
                    </div>
                </div>

                {/* Bottom SVG Wave Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-[1px] z-10">
                    <svg
                        className="relative block w-full h-[80px] md:h-[150px] lg:h-[200px]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="currentColor"
                            className="text-white dark:text-gray-900"
                            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,154.7C960,128,1056,128,1152,144C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </section>
            {/* --- END OF HERO SECTION --- */}

            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}