import React from 'react';
import SectionTitle from './SectionTitle';

export default function VisiMisiSection({ data }) {
    const title = data?.title || "Visi, Misi & Tujuan";
    // Dummy fallback if data is stripped
    const visi = data?.visi || "Menjadi Institusi Pendidikan Tinggi Kesehatan yang Unggul, Inovatif, dan Berkarakter di Tingkat Nasional pada tahun 2030.";
    const misi = data?.misi || [
        "Menyelenggarakan pendidikan akademik dan vokasi di bidang kesehatan yang bermutu tinggi.",
        "Melaksanakan penelitian dasar dan terapan yang inovatif untuk memecahkan masalah kesehatan masyarakat.",
        "Menyelenggarakan pengabdian kepada masyarakat berbasis riset dan kearifan lokal.",
        "Mengembangkan tata kelola institusi yang transparan, akuntabel, dan berbasis teknologi informasi.",
        "Membangun kemitraan strategis dengan berbagai institusi pelayanan kesehatan dan kelembagaan lain di tingkat nasional dan internasional."
    ];
    const tujuan = data?.tujuan || [
        "Menghasilkan lulusan yang kompeten, profesional, dan berakhlak mulia.",
        "Meningkatkan kualitas dan kuantitas publikasi ilmiah dosen dan mahasiswa.",
        "Mewujudkan masyarakat yang sehat dan mandiri melalui program pengabdian masyarakat yang terarah."
    ];

    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <SectionTitle title={title} icon="fa-bullseye" />

                {/* Visi */}
                <div className="text-center max-w-3xl mx-auto mb-16 shrink-0 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl text-gray-50 dark:text-gray-800 font-serif opacity-50 select-none pointer-events-none">
                        &ldquo;
                    </div>
                    <h2 className="text-sm font-bold tracking-widest text-orange-600 uppercase mb-3 relative z-10">Visi Kami</h2>
                    <p className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white leading-relaxed relative z-10">
                        {visi}
                    </p>
                </div>

                <div className={`grid gap-12 lg:gap-20 ${tujuan && tujuan.length > 0 ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-4xl mx-auto w-full'}`}>
                    {/* Misi */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                                <i className="fas fa-bullseye text-xl"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Misi</h3>
                        </div>

                        <ul className="space-y-4">
                            {misi.map((item, idx) => (
                                <li key={idx} className="flex gap-4 group">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm font-bold text-gray-500 dark:text-gray-400 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-colors">
                                        {idx + 1}
                                    </span>
                                    <p className="text-gray-600 dark:text-gray-300 pt-1 leading-relaxed">
                                        {item}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tujuan */}
                    {tujuan && tujuan.length > 0 && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-8 sm:p-10 shadow-sm border border-blue-100 dark:border-blue-800/50">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                                    <i className="fas fa-flag-checkered text-xl"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Tujuan</h3>
                            </div>

                            <ul className="space-y-4">
                                {tujuan.map((item, idx) => (
                                    <li key={idx} className="flex gap-4 items-start">
                                        <i className="fas fa-check-circle text-blue-500 shrink-0 mt-1"></i>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {item}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}
