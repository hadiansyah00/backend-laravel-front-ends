import React from 'react';

export default function UnitLembaga({ page }) {
    const content = page?.content ? (typeof page.content === 'string' ? JSON.parse(page.content) : page.content) : {};

    return (
        <div className="py-16 md:py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Kolom Kiri: Info Unit */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/50 rounded-bl-full -z-0"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-indigo-200">
                                    <i className="fas fa-sitemap text-2xl"></i>
                                </div>
                                <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1">UNIT / LEMBAGA</h3>
                                <h2 className="text-2xl font-black text-gray-900 mb-6 leading-tight">{page.title}</h2>

                                <div className="bg-white rounded-xl p-5 shadow-sm border border-indigo-50/50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex gap-3 items-center justify-center text-gray-400">
                                            <i className="fas fa-user-tie text-xl"></i>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Kepala Unit</p>
                                            <p className="font-bold text-gray-900">{content.kepala_unit || "Belum Ditugaskan"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Contact for Unit */}
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <i className="fas fa-headset text-indigo-500"></i> Informasi Kontak Unit
                            </h3>
                            <ul className="space-y-4 text-sm text-gray-600">
                                <li className="flex items-start gap-3">
                                    <i className="fas fa-envelope text-gray-400 mt-1"></i>
                                    <span>{page.slug}@stikesbogorhusada.ac.id<br /><span className="text-xs italic text-gray-400">*(email estimasi)</span></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <i className="fas fa-map-marker-alt text-gray-400 mt-1"></i>
                                    <span>Kantor {page.title}, Gedung Utama Lt. 2</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Kolom Kanan: Profil RTF */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl shadow-gray-200/40 border border-gray-200">
                            <h3 className="text-2xl font-black text-gray-900 mb-6 border-b border-gray-100 pb-4">Profil & Tugas Fungsi Pokok</h3>
                            {content.profil_html ? (
                                <div className="prose prose-lg prose-indigo text-gray-600 max-w-none prose-img:rounded-xl prose-img:shadow-sm" dangerouslySetInnerHTML={{ __html: content.profil_html }} />
                            ) : (
                                <div className="py-12 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
                                    <i className="fas fa-file-alt text-4xl text-gray-300 mb-3"></i>
                                    <p>Profil unit {page.title} belum ditambahkan.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
