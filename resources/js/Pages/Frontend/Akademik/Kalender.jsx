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

            <Hero
                content={{
                    title: 'Kalender Akademik',
                    subtitle: 'Jadwal kegiatan akademik STIKes Bogor Husada.',
                    image: '/assets/img/hero-fallback.png',
                    gradient: 'orange',
                    breadcrumbs: [
                        { label: 'Akademik', url: null },
                        { label: 'Kalender Akademik', url: null }
                    ]
                }}
            />

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
