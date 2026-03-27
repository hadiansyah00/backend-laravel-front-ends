import React from 'react';
import SectionTitle from './SectionTitle';

export default function FeatureSection({ data }) {
    // Dummy Data
    const title = data?.title || "Mengapa Memilih STIKes Bogor Husada?";
    const features = data?.features || [
        {
            title: "Kurikulum Terkini",
            description: "Disusun bersama pakar industri kesehatan untuk memastikan relevansi dengan kebutuhan medis masa depan.",
            icon: "fas fa-book-medical" // FontAwesome
        },
        {
            title: "Laboratorium Standar RS",
            description: "Praktek langsung di fasilitas kampus yang mensimulasikan lingkungan rumah sakit sebenarnya.",
            icon: "fas fa-microscope"
        },
        {
            title: "Dosen Praktisi Tersertifikasi",
            description: "Belajar dari ahlinya, para praktisi medis dan perawat senior yang aktif di lapangan.",
            icon: "fas fa-user-md"
        },
        {
            title: "Jaringan Karir Luas",
            description: "Bekerjasama dengan lebih dari 50 Rumah Sakit dan Klinik Nasional untuk jaminan penempatan magang.",
            icon: "fas fa-network-wired"
        }
    ];

    return (
        <section className="py-20 bg-gray-900 dark:bg-gray-950 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-600/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <SectionTitle title={title} icon="fa-star" />

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800 transition-colors duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-gray-700/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon_svg ? (
                                    <div
                                        className="text-orange-400 group-hover:text-orange-500 transition-colors [&>svg]:w-8 [&>svg]:h-8"
                                        dangerouslySetInnerHTML={{ __html: feature.icon_svg }}
                                    />
                                ) : (
                                    <i className={`${feature.icon} text-2xl text-orange-400 group-hover:text-orange-500`}></i>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
