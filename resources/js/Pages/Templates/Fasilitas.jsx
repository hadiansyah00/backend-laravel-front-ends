import React from 'react';

export default function Fasilitas({ page }) {
    const content = page?.content ? (typeof page.content === 'string' ? JSON.parse(page.content) : page.content) : {};

    return (
        <div className="py-16 md:py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 font-bold rounded-full text-sm mb-4 tracking-wide uppercase border border-indigo-100">
                        Infrastruktur
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Fasilitas Kampus</h2>
                    <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {content.deskripsi_fasilitas || "Deskripsi fasilitas belum diatur. Silakan tambahkan penjelasan fasilitas melalui panel admin."}
                    </p>
                </div>

                {/* Example Placeholder for dynamic facilities via sections/gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Dummy card 1 */}
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col">
                        <div className="h-48 bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-indigo-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-500">
                                <i className="fas fa-image text-4xl"></i>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Laboratorium Komputer</h3>
                            <p className="text-gray-500 text-sm">Laboratorium modern dengan perangkat standar industri terbaru untuk mahasiswa.</p>
                        </div>
                    </div>
                    {/* Dummy card 2 */}
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col">
                        <div className="h-48 bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-indigo-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-500">
                                <i className="fas fa-image text-4xl"></i>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Perpustakaan Terpadu</h3>
                            <p className="text-gray-500 text-sm">Koleksi ribuan buku fisik dan akses e-journal nasional maupun internasional.</p>
                        </div>
                    </div>
                    {/* Dummy card 3 */}
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col">
                        <div className="h-48 bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-indigo-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-500">
                                <i className="fas fa-image text-4xl"></i>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Ruang Kelas Nyaman</h3>
                            <p className="text-gray-500 text-sm">Dilengkapi AC, Proyektor, dan tata ruang yang mendukung pembelajaran interaktif.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center text-sm text-gray-400 italic">
                    <i className="fas fa-info-circle mr-1"></i> Data fasilitas di atas ilustratif, dapat diatur atau dihubungkan dengan modul Galeri agar dinamis.
                </div>

            </div>
        </div>
    );
}
