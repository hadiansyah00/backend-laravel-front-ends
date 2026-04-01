import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react'; // <-- FIX: Tambahkan Link di sini

export default function Perpustakaan({ fasilitasData }) {
    const data = fasilitasData || {};

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        if (path.startsWith('storage/')) return '/' + path;
        return '/storage/' + path;
    };

    return (
        <MainLayout title="Perpustakaan">
            <Head>
                <title>Perpustakaan - STIKes Bogor Husada</title>
            </Head>

            {/* --- IMPROVED HERO SECTION (Perpustakaan Kampus) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={getImageUrl(data.image) || '/assets/img/hero-fallback.png'}
                        alt={data.name || 'Perpustakaan Kampus'}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"; // Fallback gambar perpustakaan/buku
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
                                        <span className="ml-1 text-sm font-bold text-orange-400 md:ml-2">Perpustakaan</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Title & Subtitle */}
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                            {data.name || 'Perpustakaan Kampus'}
                        </h1>
                        <p className="max-w-2xl text-lg font-normal leading-relaxed text-gray-300 lg:text-xl">
                            Sumber literatur, jurnal, dan referensi medis terlengkap guna mendukung kegiatan Tri Dharma Perguruan Tinggi.
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

            <div className="py-16 md:py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="lg:w-1/2 w-full relative group">
                            <div className="absolute -inset-4 bg-sky-50 rounded-[3rem] transform rotate-3 transition duration-500 group-hover:rotate-0"></div>
                            <img
                                src={getImageUrl(data.image) || '/assets/img/hero-fallback.png'}
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                                alt={data.name || 'Perpustakaan SBH'}
                                className="relative rounded-3xl shadow-2xl z-10 w-full h-auto object-cover max-h-[500px] border-4 border-white"
                            />
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-sm font-bold tracking-wide mb-6">
                                <i className="fas fa-book-reader"></i> Pusat Sumber Belajar
                            </span>

                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                                {data.name || 'Perpustakaan STIKes Bogor Husada'}
                            </h2>

                            <div className="w-20 h-1.5 bg-gradient-to-r from-sky-500 to-blue-400 rounded-full mb-8"></div>

                            <div className="prose prose-lg text-gray-600 mb-8 whitespace-pre-wrap leading-relaxed">
                                <p>{data.description || 'Deskripsi perpustakaan belum tersedia.'}</p>
                            </div>

                            {data.facilities && Array.isArray(data.facilities) && data.facilities.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="font-bold text-gray-800 mb-3">Layanan & Fasilitas:</h4>
                                    <ul className="space-y-4 text-gray-600 font-medium">
                                        {data.facilities.map((item, idx) => (
                                            <li key={idx} className="flex gap-3">
                                                <i className={`${item.icon || 'fas fa-check-circle'} text-sky-500 mt-1`}></i>
                                                <div>
                                                    <span className="font-bold text-gray-800">{item.name}</span>
                                                    {item.description && <p className="text-sm text-gray-500 mt-1 font-normal">{item.description}</p>}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
