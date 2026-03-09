import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import HeroStaticSection from '@/Components/Sections/HeroStaticSection';

export default function Dokumen() {
    const dummyDocuments = [
        {
            id: 1,
            title: "Buku Pedoman Akademik Mahasiswa TA 2025/2026",
            size: "2.4 MB",
            date: "01 Sep 2025",
            type: "PDF",
            category: "Pedoman"
        },
        {
            id: 2,
            title: "SOP Pengajuan Cuti Akademik",
            size: "845 KB",
            date: "14 Ags 2025",
            type: "PDF",
            category: "Formulir & SOP"
        },
        {
            id: 3,
            title: "Template Laporan PKHP S1 Gizi",
            size: "1.2 MB",
            date: "10 Jul 2025",
            type: "DOCX",
            category: "Tugas Akhir"
        },
        {
            id: 4,
            title: "Formulir Pendaftaran Beasiswa KIP-K 2025",
            size: "500 KB",
            date: "02 Mei 2025",
            type: "PDF",
            category: "Kemahasiswaan"
        }
    ];

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
                            <input type="text" placeholder="Cari nama dokumen..." className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm focus:outline-none" />
                        </div>
                        <div className="w-full md:w-48">
                            <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm focus:outline-none text-gray-600 dark:text-gray-300 appearance-none">
                                <option value="">Semua Kategori</option>
                                <option value="Pedoman">Pedoman</option>
                                <option value="Formulir & SOP">Formulir & SOP</option>
                                <option value="Kemahasiswaan">Kemahasiswaan</option>
                            </select>
                        </div>
                    </div>

                    {/* Documents List */}
                    <div className="grid grid-cols-1 gap-4">
                        {dummyDocuments.map((doc) => (
                            <div key={doc.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-emerald-500 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 flex-shrink-0 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                        <i className={`fas ${getFileIcon(doc.type)}`}></i>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 group-hover:text-emerald-600 transition-colors">
                                            {doc.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{doc.category}</span>
                                            <span className="flex items-center gap-1"><i className="far fa-hdd"></i> {doc.size}</span>
                                            <span className="flex items-center gap-1"><i className="far fa-calendar-alt"></i> {doc.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 flex items-center gap-3">
                                    <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hidden sm:inline-block border border-gray-200 dark:border-gray-600">{doc.type}</span>
                                    <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-emerald-500 hover:text-white text-gray-600 dark:text-gray-300 rounded-full transition-all duration-300">
                                        <i className="fas fa-download"></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </MainLayout>
    );
}
