import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import HeroStaticSection from '@/Components/Sections/HeroStaticSection';

export default function Galeri() {
    const categories = ["Semua", "Akademik", "Fasilitas", "Kegiatan", "Prestasi"];
    const [activeTab, setActiveTab] = useState("Semua");

    const dummyGallery = [
        { id: 1, title: 'Praktikum Farmasi Dasar', category: 'Akademik', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000' },
        { id: 2, title: 'Perpustakaan Digital', category: 'Fasilitas', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=2070' },
        { id: 3, title: 'Seminar Kesehatan Nasional', category: 'Kegiatan', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2000' },
        { id: 4, title: 'Peringatan Dies Natalis', category: 'Kegiatan', image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=2070' },
        { id: 5, title: 'Juara Lomba KTI Tingkat Nasional', category: 'Prestasi', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070' },
        { id: 6, title: 'Lab. OSCE Terpadu', category: 'Fasilitas', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2053' },
    ];

    const filteredGallery = activeTab === "Semua" ? dummyGallery : dummyGallery.filter(item => item.category === activeTab);

    return (
        <MainLayout title="Galeri Kampus | STIKes Bogor Husada">
            <HeroStaticSection data={{
                title: 'Galeri Kampus',
                subtitle: 'Dokumentasi momen-momen penting, fasilitas, dan kegiatan akademik STIKes Bogor Husada.',
                bgImage: '/assets/img/hero-fallback.png'
            }} />

            <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="container px-4 mx-auto max-w-7xl">

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveTab(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === cat ? 'bg-orange-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {filteredGallery.map((item) => (
                            <div key={item.id} className="relative group rounded-2xl overflow-hidden aspect-square bg-gray-200 dark:bg-gray-800 shadow-sm cursor-pointer border border-gray-100 dark:border-gray-700">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <span className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">{item.category}</span>
                                    <h4 className="text-white text-lg font-bold leading-tight">{item.title}</h4>
                                </div>
                                {/* Icon Zoom */}
                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                    <i className="fas fa-search-plus"></i>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredGallery.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            <i className="fas fa-images text-4xl mb-4 text-gray-300 dark:text-gray-600"></i>
                            <p>Tidak ada foto dalam kategori ini.</p>
                        </div>
                    )}

                </div>
            </section>
        </MainLayout>
    );
}
