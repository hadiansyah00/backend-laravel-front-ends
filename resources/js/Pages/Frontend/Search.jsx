import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Search({ q, filter, counts, results }) {
    const [searchQuery, setSearchQuery] = useState(q || '');

    const handleSearch = (e) => {
        e.getType = e.type; // Check event type
        if (e.getType === 'submit') e.preventDefault();
        
        if (searchQuery.trim()) {
            router.get('/search', { q: searchQuery, filter: 'all' }, { preserveState: true });
        }
    };

    const setFilter = (newFilter) => {
        router.get('/search', { q, filter: newFilter }, { preserveState: true });
    };

    // Helper for highlighting search terms
    const highlightText = (text, highlight) => {
        if (!text || !highlight) return text;
        
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) => 
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <mark key={i} className="bg-orange-200 text-orange-900 rounded-sm px-0.5">{part}</mark>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    // Card Renderer for each Type
    const ResultCard = ({ item }) => {
        // Ikon berdasarkan tipe
        const typeIcons = {
            'Berita': 'fas fa-newspaper',
            'Pengumuman': 'fas fa-bullhorn',
            'Event': 'far fa-calendar-alt',
            'Program Studi': 'fas fa-graduation-cap',
            'Dosen': 'fas fa-chalkboard-teacher',
            'Halaman': 'fas fa-file-alt'
        };

        const iconColor = {
            'Berita': 'text-blue-500 bg-blue-50',
            'Pengumuman': 'text-red-500 bg-red-50',
            'Event': 'text-green-500 bg-green-50',
            'Program Studi': 'text-purple-500 bg-purple-50',
            'Dosen': 'text-orange-500 bg-orange-50',
            'Halaman': 'text-gray-500 bg-gray-50'
        };

        return (
            <Link 
                href={item.url}
                className="group flex flex-col sm:flex-row bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 transform hover:-translate-y-1"
            >
                {/* Image Section (jika ada) */}
                {item.image && (
                    <div className="w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 bg-gray-100 overflow-hidden">
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    </div>
                )}
                
                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${iconColor[item.type] || 'text-gray-500 bg-gray-100'}`}>
                            <i className={typeIcons[item.type] || 'fas fa-tag'}></i>
                            {item.type}
                        </span>
                        {item.date && (
                            <span className="text-xs text-gray-400 font-medium">
                                <i className="far fa-clock mr-1"></i> {item.date}
                            </span>
                        )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {highlightText(item.title, q)}
                    </h3>
                    
                    {item.snippet && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4 font-medium flex-1">
                            {highlightText(item.snippet, q)}
                        </p>
                    )}

                    <div className="mt-auto flex items-center text-sm font-bold text-orange-600 group-hover:text-orange-700">
                        Baca Selengkapnya <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                </div>
            </Link>
        );
    };

    return (
        <MainLayout title={`Pencarian: ${q || '...'} | STIKes Bogor Husada`}>
            <Head>
                <title>{`Pencarian: ${q || '...'} | STIKes Bogor Husada`}</title>
            </Head>

            {/* Header Area */}
            <section className="pt-32 pb-12 bg-gray-50 border-b border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-500"></div>
                <div className="container px-4 mx-auto max-w-5xl relative z-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Pusat <span className="text-orange-600">Pencarian</span>
                    </h1>
                    
                    {/* Search Form Large */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative mb-6">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Ketikkan kata kunci untuk mencari informasi..."
                            className="w-full pl-6 pr-16 py-4 rounded-2xl border-2 border-transparent bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none text-lg text-gray-800 transition-all font-medium"
                        />
                        <button type="submit" className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white w-12 rounded-xl flex items-center justify-center shadow-md transition-all active:scale-95">
                            <i className="fas fa-search text-lg"></i>
                        </button>
                    </form>

                    {q.length > 0 && q.length < 2 && (
                        <p className="text-red-500 font-medium text-sm bg-red-50 inline-block px-4 py-2 rounded-full">
                            <i className="fas fa-exclamation-circle mr-1"></i> Kata kunci minimal 2 huruf.
                        </p>
                    )}
                </div>
            </section>

            {/* Content Area */}
            {q.length >= 2 && (
                <section className="py-12 bg-white min-h-[50vh]">
                    <div className="container px-4 mx-auto max-w-5xl">
                        
                        {/* Summary & Filters - Hanya tampil jika filter 'all' atau ada hasilnya */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                {results.total > 0 ? (
                                    <>
                                        Menemukan <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">{results.total}</span> hasil untuk "{q}"
                                    </>
                                ) : (
                                    <>Tidak ada hasil untuk "{q}"</>
                                )}
                            </h2>

                            {filter === 'all' && results.total > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-sm font-semibold text-gray-500 py-1.5 mr-2">Kategori:</span>
                                    {Object.entries(counts).filter(([key, val]) => key !== 'all' && val > 0).map(([key, val]) => (
                                        <button 
                                            key={key}
                                            onClick={() => setFilter(key)}
                                            className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 rounded-lg text-sm font-bold transition-colors capitalize flex items-center gap-2 shadow-sm"
                                        >
                                            {key} <span className="bg-gray-200 text-gray-700 text-[10px] px-1.5 py-0.5 rounded-full">{val}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {filter !== 'all' && (
                                <button
                                    onClick={() => setFilter('all')}
                                    className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-bold hover:bg-orange-200 transition-colors flex items-center gap-2"
                                >
                                    <i className="fas fa-times"></i> Hapus Filter ({filter})
                                </button>
                            )}
                        </div>

                        {/* Search Results */}
                        {results.data.length > 0 ? (
                            <div className="flex flex-col gap-6">
                                {results.data.map((item, idx) => (
                                    <ResultCard key={`${item.id}_${idx}`} item={item} />
                                ))}

                                {/* Pagination */}
                                {results.last_page > 1 && (
                                    <div className="mt-12 flex justify-center pb-8 border-t border-gray-100 pt-8">
                                        <div className="inline-flex items-center bg-gray-50 rounded-xl p-1 shadow-sm border border-gray-200">
                                            {results.links.map((link, index) => {
                                                const label = link.label.replace('&laquo; Previous', '«').replace('Next &raquo;', '»');
                                                const isPageNum = !isNaN(label);

                                                if (!link.url) {
                                                    return (
                                                        <span key={index} className="px-4 py-2 text-gray-400 font-medium text-sm" dangerouslySetInnerHTML={{ __html: label }} />
                                                    );
                                                }
                                                return (
                                                    <Link
                                                        key={index}
                                                        href={link.url}
                                                        className={`px-4 py-2 mx-0.5 rounded-lg text-sm font-bold transition-all ${
                                                            link.active
                                                                ? 'bg-white shadow-sm border border-gray-200 text-orange-600'
                                                                : 'text-gray-600 hover:bg-white hover:text-orange-600'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: label }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="py-16 text-center max-w-md mx-auto">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <i className="fas fa-search text-4xl text-gray-300"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops, tidak ada hasil!</h3>
                                <p className="text-gray-500 font-medium mb-8">
                                    Kami tidak menemukan apapun yang cocok dengan <strong>"{q}"</strong> {filter !== 'all' ? `di kategori ${filter}` : ''}.
                                    Cobalah menggunakan kata kunci yang berbeda atau lebih umum.
                                </p>
                                <button 
                                    onClick={() => {
                                        setSearchQuery('');
                                        document.querySelector('form input').focus();
                                    }}
                                    className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95"
                                >
                                    Coba Pencarian Baru
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Default State (Empty Search) */}
            {q.length === 0 && (
                <section className="py-24 bg-white text-center">
                    <div className="container max-w-md mx-auto px-4">
                        <i className="fas fa-search text-5xl text-gray-200 mb-6 block"></i>
                        <h2 className="text-xl font-bold text-gray-700 mb-2">Cari Informasi Kampus</h2>
                        <p className="text-gray-500 font-medium text-sm">
                            Ketikkan kata kunci di kolom pencarian di atas untuk menemukan Berita, Pengumuman, Event, Data Dosen, hingga Program Studi.
                        </p>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}
