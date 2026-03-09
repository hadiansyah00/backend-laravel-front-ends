import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import SectionTitle from '@/Components/Sections/SectionTitle';

import HeroStaticSection from '@/Components/Sections/HeroStaticSection';

export default function Berita() {
    // Dummy Data
    const dummyNews = [
        {
            id: 1,
            title: "Penandatanganan MoU dengan RSUD Kota Bogor",
            date: "12 Okt 2025",
            category: "Akademik",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070",
            excerpt: "STIKes Bogor Husada resmi menjalin kerjasama strategis dengan RSUD Kota Bogor sebagai lahan praktik utama mahasiswa..."
        },
        {
            id: 2,
            title: "Mahasiswa S1 Gizi Sabet Juara 1 Olimpiade Sains Nasional",
            date: "05 Okt 2025",
            category: "Prestasi",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070",
            excerpt: "Kabar gembira datang dari delegasi Program Studi S1 Gizi yang berhasil menorehkan prestasi gemilang di kancah nasional..."
        },
        {
            id: 3,
            title: "Pelatihan Penulisan Jurnal Internasional bagi Dosen",
            date: "28 Sep 2025",
            category: "Kegiatan",
            image: "https://images.unsplash.com/photo-1577415124269-dd114077728e?auto=format&fit=crop&q=80&w=2070",
            excerpt: "LPPM STIKes Bogor Husada menyelenggarakan workshop intensif guna memacu publikasi ilmiah terindeks Scopus..."
        },
        {
            id: 4,
            title: "Bakti Sosial Pemeriksaan Kesehatan Gratis di Desa Binaan",
            date: "20 Sep 2025",
            category: "Pengabdian",
            image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=2070",
            excerpt: "BEM STIKes Bogor Husada berkolaborasi dengan dosen melaksanakan bakti sosial dan edukasi stunting di Kabupaten Bogor..."
        }
    ];

    const dummyCategories = ["Semua Kategori", "Akademik", "Prestasi", "Kegiatan", "Pengabdian", "Umum"];

    return (
        <MainLayout title="Berita & Artikel | STIKes Bogor Husada">
            <HeroStaticSection data={{
                title: 'Berita & Artikel',
                subtitle: 'Informasi terbaru seputar kegiatan, akademik, publikasi, dan prestasi STIKes Bogor Husada.',
                bgImage: '/assets/img/hero-fallback.png'
            }} />

            {/* Main Content */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex flex-col gap-8 lg:flex-row">

                        {/* Main Grid (Left) */}
                        <div className="w-full lg:w-2/3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {dummyNews.map(news => (
                                    <article key={news.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 group">
                                        <div className="relative aspect-video overflow-hidden">
                                            <img src={news.image} alt={news.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                                    {news.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3 space-x-4">
                                                <span className="flex items-center gap-1.5"><i className="far fa-calendar-alt"></i> {news.date}</span>
                                                <span className="flex items-center gap-1.5"><i className="far fa-user"></i> Admin</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-orange-600 transition-colors">
                                                <a href="#">{news.title}</a>
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                                                {news.excerpt}
                                            </p>
                                            <a href="#" className="inline-flex items-center text-orange-600 dark:text-orange-400 text-sm font-semibold hover:text-orange-800 transition-colors">
                                                Baca Selengkapnya <i className="fas fa-arrow-right ml-2 text-[10px]"></i>
                                            </a>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Pagination (Dummy) */}
                            <div className="flex justify-center mt-12 gap-2">
                                <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 text-gray-400 cursor-not-allowed bg-white dark:bg-gray-800 dark:border-gray-700"><i className="fas fa-chevron-left text-xs"></i></button>
                                <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-orange-600 bg-orange-600 text-white font-semibold">1</button>
                                <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 font-semibold transition-colors">2</button>
                                <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 dark:bg-gray-800 dark:border-gray-700 transition-colors"><i className="fas fa-chevron-right text-xs"></i></button>
                            </div>
                        </div>

                        {/* Sidebar (Right) */}
                        <div className="w-full lg:w-1/3 space-y-8">

                            {/* Search Widget */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><i className="fas fa-search text-orange-500"></i> Cari Berita</h3>
                                <div className="relative">
                                    <input type="text" placeholder="Ketik kata kunci..." className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 text-sm focus:outline-none" />
                                    <button className="absolute right-1 top-1 bottom-1 w-10 flex items-center justify-center bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Categories Widget */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><i className="fas fa-folder-open text-orange-500"></i> Kategori</h3>
                                <ul className="space-y-2">
                                    {dummyCategories.map((cat, idx) => (
                                        <li key={idx}>
                                            <a href="#" className={`flex items-center justify-between p-3 rounded-xl transition-colors ${idx === 0 ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 font-semibold' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300'}`}>
                                                <span>{cat}</span>
                                                <i className="fas fa-chevron-right text-[10px] opacity-50"></i>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
