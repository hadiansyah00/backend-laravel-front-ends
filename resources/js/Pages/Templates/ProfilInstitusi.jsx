import React from 'react';

export default function ProfilInstitusi({ page }) {
    const content = page?.content ? (typeof page.content === 'string' ? JSON.parse(page.content) : page.content) : {};

    return (
        <div className="py-16 md:py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Bagian Visi & Misi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-20 items-stretch">
                    {/* Visi */}
                    <div className="bg-white rounded-3xl p-10 lg:p-12 shadow-xl shadow-indigo-100/50 border border-indigo-50 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                                <i className="fas fa-eye text-3xl"></i>
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 mb-6 font-display tracking-tight">Visi</h3>
                            <p className="text-gray-600 leading-relaxed text-lg flex-1">
                                {content.visi || "Visi institusi belum diatur. Silakan atur melalui panel admin."}
                            </p>
                        </div>
                    </div>

                    {/* Misi */}
                    <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-10 lg:p-12 shadow-xl shadow-indigo-200/50 text-white relative flex flex-col items-start overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                        <div className="absolute bottom-0 right-0 opacity-10 transition-transform group-hover:scale-110">
                            <i className="fas fa-bullseye text-[15rem] translate-x-12 translate-y-12"></i>
                        </div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20 shadow-inner">
                                <i className="fas fa-bullseye text-3xl text-white"></i>
                            </div>
                            <h3 className="text-3xl font-black mb-6 font-display tracking-tight">Misi</h3>
                            <div className="text-indigo-50 leading-relaxed text-lg flex-1 whitespace-pre-wrap">
                                {content.misi || "Misi institusi belum diatur. Silakan atur melalui panel admin."}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bagian Sejarah */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 lg:p-12 text-white flex flex-col justify-center items-start relative overflow-hidden">
                            <div className="absolute -inset-4 opacity-30 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                                    Histori
                                </span>
                                <h3 className="text-3xl md:text-4xl font-black mb-4 font-display leading-tight">Sejarah Singkat <br /><span className="text-indigo-400">Institusi</span></h3>
                                <div className="w-20 h-1.5 bg-indigo-500 rounded-full mb-6"></div>
                                <p className="text-gray-400">Perjalanan panjang mendedikasikan diri untuk dunia pendidikan dan kesehatan.</p>
                            </div>
                        </div>
                        <div className="lg:col-span-2 p-10 lg:p-12 flex items-center">
                            <div className="prose prose-lg prose-indigo text-gray-600 max-w-none whitespace-pre-wrap leading-relaxed">
                                {content.sejarah || "Sejarah institusi belum diatur. Silakan atur melalui panel admin."}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
