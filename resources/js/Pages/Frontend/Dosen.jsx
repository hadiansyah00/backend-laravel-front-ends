import React, { useState, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Sections/Hero';
import { Head, Link, router } from '@inertiajs/react';

export default function Dosen({ dosens, prodiList, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [prodi, setProdi] = useState(filters?.prodi || '');

    const handleFilter = () => {
        router.get(route('front.dosen'), { search, prodi }, {
            preserveState: true,
            replace: true,
        });
    };

    useEffect(() => {
        if (prodi !== (filters?.prodi || '')) {
            handleFilter();
        }
    }, [prodi]);

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFilter();
        }
    };

    return (
        <MainLayout title="Direktori Dosen">
            <Head>
                <title>Direktori Dosen - STIKes Bogor Husada</title>
            </Head>

            <Hero
                content={{
                    title: 'Direktori Dosen',
                    subtitle: 'Tenaga pendidik profesional dan berpengalaman di STIKes Bogor Husada.',
                    image: '/assets/img/hero-fallback.png',
                    gradient: 'orange',
                    breadcrumbs: [
                        { label: 'Akademik', url: null },
                        { label: 'Direktori Dosen', url: null }
                    ]
                }}
            />

            <div className="py-16 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Filters */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="w-full md:w-1/3 relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                                <i className="fas fa-search text-gray-400"></i>
                            </span>
                            <input
                                type="text"
                                className="w-full pl-11 pr-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 transition-colors sm:text-sm"
                                placeholder="Cari nama dosen..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleSearchKeyDown}
                            />
                        </div>
                        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                            <select
                                className="w-full sm:w-64 py-3 px-4 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm cursor-pointer"
                                value={prodi}
                                onChange={(e) => setProdi(e.target.value)}
                            >
                                <option value="">Semua Program Studi</option>
                                {prodiList && prodiList.map((p, idx) => (
                                    <option key={idx} value={p}>{p}</option>
                                ))}
                            </select>
                            
                            <button
                                onClick={handleFilter}
                                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                            >
                                Cari
                            </button>

                            {(search || prodi) && (
                                <button
                                    onClick={() => {
                                        setSearch('');
                                        setProdi('');
                                        router.get(route('front.dosen'));
                                    }}
                                    className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors shadow-sm"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Content Grid */}
                    {dosens && dosens.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {dosens.map((dosen) => (
                                <div key={dosen.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                                        {dosen.photo ? (
                                            <img 
                                                src={dosen.photo.startsWith('http') ? dosen.photo : `/${dosen.photo}`} 
                                                alt={dosen.name}
                                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                                                <i className="fas fa-user-circle text-6xl opacity-50"></i>
                                                <span className="text-sm font-medium">Foto Tidak Tersedia</span>
                                            </div>
                                        )}
                                        {dosen.prodi && (
                                            <div className="absolute top-4 right-4">
                                                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-indigo-700 text-xs font-bold rounded-lg shadow-sm border border-white/20">
                                                    {dosen.prodi}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2 line-clamp-2" title={dosen.name}>
                                            {dosen.name}
                                        </h3>
                                        {dosen.position && (
                                            <p className="text-sm font-semibold text-indigo-600 mb-4">{dosen.position}</p>
                                        )}
                                        {dosen.nidn && (
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                                <i className="fas fa-id-card w-4 text-center"></i> NIDN: {dosen.nidn}
                                            </div>
                                        )}
                                        {dosen.email && (
                                            <a href={`mailto:${dosen.email}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-2">
                                                <i className="fas fa-envelope w-4 text-center"></i> {dosen.email}
                                            </a>
                                        )}
                                        {dosen.linkedin_url && (
                                            <a href={dosen.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                                <i className="fab fa-linkedin w-4 text-center"></i> LinkedIn Profile
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                                <i className="fas fa-search text-4xl"></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Dosen tidak ditemukan</h3>
                            <p className="text-gray-500">Coba gunakan kata kunci pencarian atau filter yang berbeda.</p>
                            {(search || prodi) && (
                                <button
                                    onClick={() => {
                                        setSearch('');
                                        setProdi('');
                                        router.get(route('front.dosen'));
                                    }}
                                    className="mt-6 px-6 py-2 bg-indigo-50 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-100 transition-colors"
                                >
                                    Tampilkan Semua Dosen
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
