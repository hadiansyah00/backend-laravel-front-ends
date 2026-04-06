import React, { useState, useEffect, useCallback } from 'react';
import { router, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Galeri({ galleries, categories, filters }) {
    const defaultCategories = ["Semua", ...(categories || [])];
    const activeTab = filters?.category || "Semua";
    const [selectedImage, setSelectedImage] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [loadedImages, setLoadedImages] = useState({});

    const galleryList = galleries?.data || [];

    const handleTabClick = (category) => {
        setIsAnimating(true);
        setTimeout(() => {
            router.get('/galeri', category === 'Semua' ? {} : { category }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onFinish: () => setIsAnimating(false),
            });
        }, 200);
    };

    // Track image load state for skeleton effect
    const handleImageLoad = (id) => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
    };

    // Lightbox navigation
    const handlePrev = useCallback((e) => {
        if (e) e.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = galleryList.findIndex(item => item.id === selectedImage.id);
        const prevIndex = currentIndex === 0 ? galleryList.length - 1 : currentIndex - 1;
        setSelectedImage(galleryList[prevIndex]);
    }, [selectedImage, galleryList]);

    const handleNext = useCallback((e) => {
        if (e) e.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = galleryList.findIndex(item => item.id === selectedImage.id);
        const nextIndex = currentIndex === galleryList.length - 1 ? 0 : currentIndex + 1;
        setSelectedImage(galleryList[nextIndex]);
    }, [selectedImage, galleryList]);

    // Keyboard navigation & body scroll lock
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;
            if (e.key === 'Escape') setSelectedImage(null);
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, handlePrev, handleNext]);

    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedImage]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/img/placeholder-image-large.png';
        if (imagePath.startsWith('http')) return imagePath;
        return `/storage/${imagePath.replace(/^storage\//, '')}`;
    };

    // Current image index for lightbox counter
    const currentLightboxIndex = selectedImage
        ? galleryList.findIndex(item => item.id === selectedImage.id)
        : -1;

    return (
        <MainLayout title="Galeri Kampus | STIKes Bogor Husada">
            {/* ========== HERO SECTION ========== */}
            {/* --- IMPROVED HERO SECTION (Galeri Kampus) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/img/hero-fallback.png"
                        alt="Galeri Kampus"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80';
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
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="ml-1 text-sm font-bold text-orange-400 md:ml-2">Galeri Kampus</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Title & Subtitle */}
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl shadow-lg shadow-orange-500/30 shrink-0">
                                <i className="fas fa-camera-retro text-xl md:text-2xl text-white"></i>
                            </div>
                            Galeri Kampus
                        </h1>
                        <p className="max-w-2xl text-lg font-normal leading-relaxed text-gray-300 lg:text-xl">
                            Dokumentasi momen-momen penting, fasilitas, dan kegiatan akademik STIKes Bogor Husada.
                        </p>

                        {/* Stats Section (Tampilan Baru) */}
                        {galleries?.total > 0 && (
                            <div className="flex items-center gap-6 mt-10 px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl w-fit shadow-xl">
                                <div className="text-center px-2">
                                    <span className="block text-3xl font-black text-orange-400 drop-shadow-md">{galleries.total}</span>
                                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest mt-1 block">Total Foto</span>
                                </div>
                                <div className="w-px h-12 bg-white/10"></div>
                                <div className="text-center px-2">
                                    <span className="block text-3xl font-black text-orange-400 drop-shadow-md">{categories?.length || 0}</span>
                                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest mt-1 block">Kategori</span>
                                </div>
                            </div>
                        )}
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

            {/* ========== GALLERY CONTENT ========== */}
            <section className="py-16 md:py-24 bg-white dark:bg-gray-900 min-h-[60vh]">
                <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">

                    {/* Filter Tabs */}
                    <div className="flex justify-center mb-12 overflow-x-auto hide-scrollbar">
                        <div className="flex items-center gap-2 pb-2 md:gap-3">
                            {defaultCategories.map((cat, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleTabClick(cat)}
                                    className={`relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 whitespace-nowrap border ${
                                        activeTab === cat
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-transparent shadow-lg shadow-orange-500/30 transform -translate-y-0.5'
                                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-orange-500 hover:text-orange-500 hover:-translate-y-0.5 hover:shadow-md hover:bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {activeTab === cat && (
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                    )}
                                    {cat}
                                    {activeTab === cat && galleries?.total > 0 && (
                                        <span className={`px-2 py-0.5 text-[0.7rem] font-bold rounded-full ${
                                            activeTab === cat ? 'bg-white/25 text-white' : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                                        }`}>
                                            {activeTab === 'Semua' ? galleries.total : galleries.data.length} 
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Image Grid — Masonry Layout */}
                    <div className={`columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 w-full transition-opacity duration-300 ${isAnimating ? 'opacity-30 pointer-events-none' : ''}`}>
                        {galleryList.length > 0 && galleryList.map((item, index) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedImage(item)}
                                className="break-inside-avoid mb-6 group relative rounded-2xl overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800 animate-fade-in-up border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-xl transition-all duration-300"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                {/* Skeleton Placeholder */}
                                {!loadedImages[item.id] && (
                                    <div className="absolute inset-0 z-0 bg-gray-200 dark:bg-gray-800">
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                                    </div>
                                )}
                                <img
                                    src={getImageUrl(item.image)}
                                    alt={item.title}
                                    className={`object-cover w-full h-auto min-h-[200px] transition-transform duration-700 group-hover:scale-110 ${loadedImages[item.id] ? 'opacity-100' : 'opacity-0'}`}
                                    loading="lazy"
                                    decoding="async"
                                    onLoad={() => handleImageLoad(item.id)}
                                />
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 opacity-0 bg-gradient-to-t from-gray-900/95 via-gray-900/50 to-transparent transition-opacity duration-300 group-hover:opacity-100">
                                    <div className="transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                                        {item.category && (
                                            <span className="inline-block px-2.5 py-1 mb-2 text-[0.65rem] font-bold tracking-wider text-white uppercase bg-orange-500 rounded-lg shadow-sm w-fit">
                                                {item.category}
                                            </span>
                                        )}
                                        <h4 className="text-lg font-bold leading-snug text-white line-clamp-2 drop-shadow-md">
                                            {item.title}
                                        </h4>
                                        {item.description && (
                                            <p className="mt-1.5 text-sm text-gray-300 line-clamp-2 drop-shadow-sm">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <div className="flex items-center justify-center w-10 h-10 text-white transition-all transform scale-75 opacity-0 rounded-full bg-white/20 backdrop-blur-md group-hover:opacity-100 group-hover:scale-100 hover:bg-orange-500 shadow-lg">
                                            <i className="fas fa-expand-alt"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {galleryList.length === 0 && (
                        <div className="py-20 text-center bg-gray-50 border border-gray-100 rounded-3xl dark:bg-gray-800/50 dark:border-gray-800 shadow-sm max-w-2xl mx-auto">
                            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 text-4xl text-orange-500 rounded-full bg-orange-100 dark:bg-orange-900/30">
                                <i className="fas fa-images"></i>
                            </div>
                            <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Belum Ada Foto</h3>
                            <p className="mb-8 text-gray-500 dark:text-gray-400">
                                {activeTab !== 'Semua'
                                    ? `Tidak ada foto dalam kategori "${activeTab}" saat ini.`
                                    : 'Galeri foto akan segera tersedia. Silakan kunjungi kembali nanti.'
                                }
                            </p>
                            {activeTab !== 'Semua' && (
                                <button
                                    onClick={() => handleTabClick('Semua')}
                                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all rounded-xl border border-transparent bg-gradient-to-r from-orange-500 to-orange-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/30"
                                >
                                    <i className="fas fa-th-large"></i>
                                    Lihat Semua Galeri
                                </button>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {galleries?.links && galleries.links.length > 3 && (
                        <div className="flex flex-wrap justify-center gap-2 mt-12 md:mt-16">
                            {galleries.links.map((link, index) => {
                                let label = link.label;
                                const isPrev = label.includes('&laquo;');
                                const isNext = label.includes('&raquo;');
                                if (isPrev) label = <i className="fas fa-chevron-left"></i>;
                                if (isNext) label = <i className="fas fa-chevron-right"></i>;

                                return link.url ? (
                                    <button
                                        key={index}
                                        onClick={() => router.get(link.url, filters, { preserveScroll: true, preserveState: true })}
                                        className={`flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl font-semibold text-sm transition-all border ${
                                            link.active
                                                ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white border-transparent shadow-md shadow-orange-500/30'
                                                : 'bg-white text-gray-700 border-gray-200 hover:border-orange-500 hover:text-orange-500 hover:-translate-y-0.5 hover:shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:border-orange-500'
                                        }`}
                                    >
                                        {label}
                                    </button>
                                ) : (
                                    <span key={index} className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl font-semibold text-sm border bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed opacity-60 dark:bg-gray-800/50 dark:border-gray-800 dark:text-gray-500">
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    )}

                </div>
            </section>

            {/* ========== LIGHTBOX MODAL ========== */}
            {selectedImage && (
                <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center animate-fade-in" onClick={() => setSelectedImage(null)}>
                    <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-md"></div>

                    {/* Top Bar */}
                    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 md:p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2 text-sm font-semibold text-white bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
                            <i className="fas fa-images text-orange-400"></i>
                            <span>{currentLightboxIndex + 1} <span className="text-gray-400 mx-1">/</span> {galleryList.length}</span>
                        </div>
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-white transition-all rounded-full bg-white/10 hover:bg-red-500 hover:rotate-90 backdrop-blur-md border border-white/10 shadow-lg"
                            aria-label="Tutup galeri"
                        >
                            <i className="fas fa-times text-lg md:text-xl"></i>
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="relative z-10 flex items-center justify-center w-full max-w-7xl px-4 md:px-16 flex-1 py-10" onClick={(e) => e.stopPropagation()}>
                        {/* Navigation - Left */}
                        {galleryList.length > 1 && (
                            <button
                                onClick={handlePrev}
                                className="absolute left-2 md:left-6 z-20 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 text-white transition-all rounded-full bg-white/10 backdrop-blur hover:bg-orange-500 hover:scale-110 shadow-lg border border-white/10"
                                aria-label="Foto sebelumnya"
                            >
                                <i className="fas fa-chevron-left md:text-xl"></i>
                            </button>
                        )}

                        {/* Image Container */}
                        <div className="flex items-center justify-center w-full h-full max-h-[65vh] md:max-h-[75vh]">
                            <img
                                src={getImageUrl(selectedImage.image)}
                                alt={selectedImage.title}
                                className="object-contain max-h-full max-w-full rounded-xl shadow-2xl animate-zoom-in"
                                key={selectedImage.id}
                            />
                        </div>

                        {/* Navigation - Right */}
                        {galleryList.length > 1 && (
                            <button
                                onClick={handleNext}
                                className="absolute right-2 md:right-6 z-20 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 text-white transition-all rounded-full bg-white/10 backdrop-blur hover:bg-orange-500 hover:scale-110 shadow-lg border border-white/10"
                                aria-label="Foto selanjutnya"
                            >
                                <i className="fas fa-chevron-right md:text-xl"></i>
                            </button>
                        )}
                    </div>

                    {/* Bottom Info */}
                    <div className="z-10 text-center p-4 w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
                        {selectedImage.category && (
                            <span className="inline-block px-3 py-1 mb-3 text-[0.7rem] font-bold tracking-widest text-orange-400 uppercase border border-orange-400/30 rounded-full bg-orange-400/10 backdrop-blur shadow-sm">
                                {selectedImage.category}
                            </span>
                        )}
                        <h3 className="text-xl md:text-3xl font-bold text-white mb-3 drop-shadow-lg">{selectedImage.title}</h3>
                        {selectedImage.description && (
                            <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto drop-shadow-md font-light leading-relaxed">
                                {selectedImage.description}
                            </p>
                        )}
                    </div>

                    {/* Thumbnail Strip */}
                    {galleryList.length > 1 && (
                        <div className="z-10 flex gap-2 md:gap-3 p-4 overflow-x-auto w-full justify-center hide-scrollbar" onClick={(e) => e.stopPropagation()}>
                            {galleryList.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedImage(item)}
                                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all p-0 focus:outline-none ${
                                        selectedImage.id === item.id
                                            ? 'border-orange-500 opacity-100 shadow-[0_0_15px_rgba(249,115,22,0.6)] scale-110 z-10 relative'
                                            : 'border-transparent opacity-40 hover:opacity-100 hover:scale-105'
                                    }`}
                                >
                                    <img src={getImageUrl(item.image)} alt={item.title} className="object-cover w-full h-full" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ========== SCOPED STYLES & ANIMATIONS ========== */}
            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.6s ease-out both; }
                
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer { animation: shimmer 1.5s infinite; }
                
                @keyframes fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out; }
                
                @keyframes zoom-in {
                    0% { opacity: 0; transform: scale(0.95); }
                    100% { opacity: 1; transform: scale(1); }
                }
                .animate-zoom-in { animation: zoom-in 0.3s ease-out; }
            `}</style>
        </MainLayout>
    );
}
