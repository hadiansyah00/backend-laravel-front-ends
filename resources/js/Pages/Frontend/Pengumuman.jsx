import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import HeroStaticSection from '@/Components/Sections/HeroStaticSection';

export default function Pengumuman() {
    const dummyPengumuman = [
        {
            id: 1,
            title: "Pengumuman Jadwal Ujian Akhir Semester (UAS) Genap TA 2025/2026",
            date: "15 Mei 2026",
            type: "Akademik",
            file: "#",
        },
        {
            id: 2,
            title: "Tata Cara Pendaftaran Ulang Mahasiswa Lama",
            date: "10 Mei 2026",
            type: "Administrasi",
            file: null,
        },
        {
            id: 3,
            title: "Edaran Libur Nasional dan Cuti Bersama Idul Fitri 1447 H",
            date: "05 Mar 2026",
            type: "Penting",
            file: "#",
        }
    ];

    return (
        <MainLayout title="Pengumuman | STIKes Bogor Husada">
            <HeroStaticSection data={{
                title: 'Papan Pengumuman',
                subtitle: 'Pusat informasi resmi, surat edaran, dan pengumuman akademik civitas STIKes Bogor Husada.',
                bgImage: '/assets/img/hero-fallback.png'
            }} />

            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container px-4 mx-auto max-w-5xl">
                    <div className="space-y-4">
                        {dummyPengumuman.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 flex-shrink-0 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                                        <i className="fas fa-bullhorn text-xl"></i>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-md text-white ${item.type === 'Penting' ? 'bg-red-500' : 'bg-blue-500'}`}>
                                                {item.type}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400"><i className="far fa-calendar-alt mr-1"></i> {item.date}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                            <a href="#">{item.title}</a>
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 ml-16 md:ml-0">
                                    <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-semibold rounded-lg transition-colors text-sm">
                                        Detail Pengumuman <i className="fas fa-arrow-right"></i>
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
