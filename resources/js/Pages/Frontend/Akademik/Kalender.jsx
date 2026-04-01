import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Sections/Hero';
import { Head } from '@inertiajs/react';

export default function Kalender({ kalenders = {} }) {
    const ganjil = kalenders.Ganjil || [];
    const genap = kalenders.Genap || [];

    const tahunGanjil = ganjil.length > 0 ? ganjil[0].tahun_akademik : '-';
    const tahunGenap = genap.length > 0 ? genap[0].tahun_akademik : '-';

    return (
        <MainLayout title="Kalender Akademik">
            <Head>
                <title>Kalender Akademik - STIKes Bogor Husada</title>
            </Head>

            {/* --- IMPROVED HERO SECTION (Kalender Akademik) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src='/assets/img/hero-fallback.png'
                        alt="Kalender Akademik"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1506784951206-53d395a12165?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"; // Fallback gambar kalender/jadwal
                        }}
                    />
                    {/* Gradient Overlay (Dark to Orange blend) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-orange-900/60"></div>
                </div>

                {/* Hero Content */}
                <div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-3xl">
                        {/* Breadcrumbs */}
                        <nav className="flex mb-8" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center px-4 py-2 space-x-1 border rounded-full md:space-x-3 bg-white/10 backdrop-blur-md border-white/20">
                                <li className="inline-flex items-center">
                                    <Link
                                        href="/"
                                        className="inline-flex items-center text-sm font-medium text-gray-200 transition-colors hover:text-white"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                        </svg>
                                        Beranda
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="ml-1 text-sm font-medium text-gray-300 md:ml-2">Akademik</span>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="ml-1 text-sm font-bold text-orange-400 md:ml-2">Kalender Akademik</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Title & Subtitle */}
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                            Kalender Akademik
                        </h1>
                        <p className="max-w-2xl text-lg font-normal leading-relaxed text-gray-300 lg:text-xl">
                            Jadwal kegiatan akademik STIKes Bogor Husada.
                        </p>
                    </div>
                </div>

                {/* Bottom SVG Wave Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-[1px] z-10">
                    <svg
                        className="relative block w-full h-[80px] md:h-[150px] lg:h-[200px]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="currentColor"
                            className="text-white dark:text-gray-900"
                            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,154.7C960,128,1056,128,1152,144C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </section>
            {/* --- END OF HERO SECTION --- */}

            <div className="py-16 md:py-24 bg-gray-50/50 relative">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Semester Ganjil */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
                        <div className="bg-indigo-600 px-6 py-6 md:px-8 flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Semester Ganjil</h2>
                                <p className="text-indigo-100 mt-1">Tahun Akademik {tahunGanjil}</p>
                            </div>
                            <div className="mt-4 md:mt-0 px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm text-white font-semibold flex items-center gap-2">
                                <i className="fas fa-calendar-alt"></i> Semester Ganjil
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold uppercase text-xs tracking-wider">
                                        <th className="px-6 py-4 md:px-8">Kegiatan</th>
                                        <th className="px-6 py-4">Mulai</th>
                                        <th className="px-6 py-4">Selesai</th>
                                        <th className="px-6 py-4">Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {ganjil.length > 0 ? ganjil.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-indigo-50/50 transition-colors">
                                            <td className="px-6 py-4 md:px-8 text-gray-900 font-medium whitespace-break-spaces">{row.kegiatan}</td>
                                            <td className="px-6 py-4 text-gray-600">{row.mulai || '-'}</td>
                                            <td className="px-6 py-4 text-gray-600">{row.selesai || '-'}</td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">
                                                {row.keterangan ? (
                                                    <span className="px-2.5 py-1 bg-gray-100 rounded-md font-medium text-gray-700">{row.keterangan}</span>
                                                ) : '-'}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-8 text-center text-gray-500">Belum ada agenda semester ganjil.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Semester Genap */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-emerald-600 px-6 py-6 md:px-8 flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Semester Genap</h2>
                                <p className="text-emerald-100 mt-1">Tahun Akademik {tahunGenap}</p>
                            </div>
                            <div className="mt-4 md:mt-0 px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm text-white font-semibold flex items-center gap-2">
                                <i className="fas fa-calendar-alt"></i> Semester Genap
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold uppercase text-xs tracking-wider">
                                        <th className="px-6 py-4 md:px-8">Kegiatan</th>
                                        <th className="px-6 py-4">Mulai</th>
                                        <th className="px-6 py-4">Selesai</th>
                                        <th className="px-6 py-4">Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {genap.length > 0 ? genap.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-emerald-50/50 transition-colors">
                                            <td className="px-6 py-4 md:px-8 text-gray-900 font-medium whitespace-break-spaces">{row.kegiatan}</td>
                                            <td className="px-6 py-4 text-gray-600">{row.mulai || '-'}</td>
                                            <td className="px-6 py-4 text-gray-600">{row.selesai || '-'}</td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">
                                                {row.keterangan ? (
                                                    <span className="px-2.5 py-1 bg-gray-100 rounded-md font-medium text-gray-700 whitespace-break-spaces">{row.keterangan}</span>
                                                ) : '-'}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-8 text-center text-gray-500">Belum ada agenda semester genap.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

        </MainLayout>
    );
}
