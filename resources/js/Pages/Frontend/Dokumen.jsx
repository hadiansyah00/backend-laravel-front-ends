import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import HeroStaticSection from '@/Components/Sections/HeroStaticSection';
import { router } from '@inertiajs/react';

export default function Dokumen({ documents, categories, filters }) {
    const documentList = documents?.data || [];

    const handleFilterChange = (key, value) => {
        router.get('/dokumen', { ...filters, [key]: value }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const getFileExtension = (filePath) => {
        if (!filePath) return 'FILE';
        return filePath.split('.').pop().toUpperCase();
    };

    const getFileSize = (filePath) => {
        // Since we don't have actual file sizes in DB without querying storage, we'll dummy it broadly or see if it exists
        return "Tersedia";
    };

    const getFileIcon = (type) => {
        if (type === 'PDF') return 'fa-file-pdf text-red-500';
        if (type === 'DOCX') return 'fa-file-word text-blue-500';
        if (type === 'XLSX') return 'fa-file-excel text-green-500';
        return 'fa-file-alt text-gray-500';
    };

    return (
        <MainLayout title="Unduh Dokumen | STIKes Bogor Husada">
            <HeroStaticSection data={{
                title: 'Unduh Dokumen',
                subtitle: 'Kumpulan pedoman, formulir administrasi, dan SOP yang dapat diunduh oleh sivitas akademika.',
                bgImage: '/assets/img/hero-fallback.png'
            }} />

            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container px-4 mx-auto max-w-5xl">

                    {/* Search Bar */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                placeholder="Cari nama dokumen..."
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm focus:outline-none"
                                defaultValue={filters?.search || ''}
                                onBlur={(e) => handleFilterChange('search', e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleFilterChange('search', e.target.value);
                                    }
                                }}
                            />
                        </div>
                        <div className="w-full md:w-48">
                            <select
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm focus:outline-none text-gray-600 dark:text-gray-300 appearance-none"
                                value={filters?.category || ''}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                            >
                                <option value="">Semua Kategori</option>
                                {categories && categories.map((cat, idx) => (
                                    <option key={idx} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Documents List */}
                    <div className="grid grid-cols-1 gap-4">
                        {documentList.length > 0 ? documentList.map((doc) => {
                            const ext = getFileExtension(doc.file_path);
                            return (
                                <div key={doc.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-emerald-500 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 flex-shrink-0 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                            <i className={`fas ${getFileIcon(ext)}`}></i>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 group-hover:text-emerald-600 transition-colors">
                                                {doc.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{doc.category || 'Umum'}</span>
                                                <span className="flex items-center gap-1"><i className="far fa-hdd"></i> Tersedia</span>
                                                <span className="flex items-center gap-1"><i className="far fa-calendar-alt"></i> {formatDate(doc.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 flex items-center gap-3">
                                        <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hidden sm:inline-block border border-gray-200 dark:border-gray-600">{ext}</span>
                                        <a href={`/${doc.file_path}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-emerald-500 hover:text-white text-gray-600 dark:text-gray-300 rounded-full transition-all duration-300">
                                            <i className="fas fa-download"></i>
                                        </a>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <i className="fas fa-folder-open text-4xl text-gray-300 dark:text-gray-600 mb-3"></i>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">Dokumen tidak ditemukan.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {documents?.links && documents.links.length > 3 && (
                        <div className="flex flex-wrap justify-center mt-12 gap-2">
                            {documents.links.map((link, index) => {
                                let label = link.label;
                                if (label.includes('&laquo;')) label = <i className="fas fa-chevron-left text-xs"></i>;
                                if (label.includes('&raquo;')) label = <i className="fas fa-chevron-right text-xs"></i>;

                                return link.url ? (
                                    <button
                                        key={index}
                                        onClick={() => router.get(link.url, filters, { preserveScroll: true, preserveState: true })}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition-colors ${link.active
                                            ? 'border border-emerald-600 bg-emerald-600 text-white'
                                            : 'border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ) : (
                                    <span key={index} className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 text-gray-400 cursor-not-allowed bg-white dark:bg-gray-800 dark:border-gray-700">
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
