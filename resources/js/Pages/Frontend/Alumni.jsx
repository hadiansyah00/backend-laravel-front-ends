import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import HeroStaticSection from '@/Components/Sections/HeroStaticSection';
import { router } from '@inertiajs/react';

export default function Alumni({ alumnis, tahunList = [], prodiList = [], filters = {} }) {
    const alumniList = alumnis?.data || alumnis || [];

    const [search, setSearch] = useState(filters.search || '');
    const [tahunLulus, setTahunLulus] = useState(filters.tahun_lulus || '');
    const [prodi, setProdi] = useState(filters.prodi || '');

    const getImageUrl = (imagePath) => {
        return imagePath ? `/storage/${imagePath.replace('storage/', '')}` : '/assets/img/dosen/default.png';
    };

    const handleFilter = (e) => {
        e.preventDefault();
        router.get('/alumni', { search, tahun_lulus: tahunLulus, prodi }, { preserveState: true });
    };

    const handleReset = () => {
        setSearch('');
        setTahunLulus('');
        setProdi('');
        router.get('/alumni', {}, { preserveState: true });
    };

    return (
        <MainLayout title="Ikatan Alumni | STIKes Bogor Husada">
            <HeroStaticSection data={{
                title: 'Ikatan Alumni',
                subtitle: 'Kisah sukses lulusan STIKes Bogor Husada di dunia kerja profesional bidang kesehatan.',
                bgImage: '/assets/img/hero-fallback.png'
            }} />

            <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-[50vh]">
                <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">

                    {/* Filter Bar */}
                    <form onSubmit={handleFilter} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 md:p-6 mb-12">
                        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                            <input
                                type="text"
                                placeholder="Cari nama alumni..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="flex-1 min-w-[160px] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                            <select value={prodi} onChange={e => setProdi(e.target.value)}
                                className="flex-1 min-w-[160px] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm dark:bg-gray-700 dark:text-white">
                                <option value="">Semua Program Studi</option>
                                {(prodiList || []).map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                            <select value={tahunLulus} onChange={e => setTahunLulus(e.target.value)}
                                className="flex-1 min-w-[140px] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm dark:bg-gray-700 dark:text-white">
                                <option value="">Semua Angkatan</option>
                                {(tahunList || []).map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm flex items-center gap-2">
                                <i className="fas fa-search"></i> Cari
                            </button>
                            {(search || prodi || tahunLulus) && (
                                <button type="button" onClick={handleReset} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm">
                                    Reset
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Alumni Grid */}
                    <div className="mb-16">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Profil Alumni Inspiratif</h2>
                            <p className="text-gray-600 dark:text-gray-400">Jejak langkah nyata dari mereka yang telah berkontribusi bagi kesehatan masyarakat Indonesia.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {alumniList.length > 0 ? alumniList.map(alumni => (
                                <div key={alumni.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group">
                                    <div className="p-8 text-center flex flex-col h-full relative">
                                        <i className="fas fa-quote-left text-4xl text-gray-100 dark:text-gray-700 absolute top-6 left-6"></i>
                                        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-md mb-6 relative z-10 border-4 border-white dark:border-gray-800">
                                            <img src={getImageUrl(alumni.photo)} alt={alumni.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform" />
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10 font-medium">"{alumni.testimonial || 'Ilmu yang saya dapatkan di STIKes Bogor Husada sangat relevan dan aplikatif.'}"</p>
                                        <div className="mt-auto relative z-10">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{alumni.name}</h3>
                                            <p className="text-orange-600 dark:text-orange-400 text-sm font-semibold mt-1">{alumni.jabatan || alumni.tempat_kerja || 'Alumni'}</p>
                                            <p className="text-gray-500 text-xs mt-2">{alumni.program_studi || 'STIKes Bogor Husada'}{alumni.tahun_lulus ? ` - Angkatan ${alumni.tahun_lulus}` : ''}</p>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full text-center py-12 text-gray-500">
                                    <i className="fas fa-users text-5xl text-gray-300 mb-4 block"></i>
                                    <p>Data alumni belum tersedia atau tidak ditemukan untuk filter ini.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    {alumnis?.links && alumnis.links.length > 3 && (
                        <div className="flex flex-wrap gap-1 justify-center mt-4 mb-12">
                            {alumnis.links.filter(l => l.url).map((link, i) => (
                                <button key={i} onClick={() => router.get(link.url)}
                                    className={`min-w-[36px] px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${link.active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Registrasi Banner */}
                    <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-10 md:p-16 text-center shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Bergabung dengan Jaringan Alumni Kami</h2>
                            <p className="text-indigo-100 mb-8 text-lg">Perbarui data diri Anda secara berkala agar tidak tertinggal info lowongan eksklusif, agenda tracer study, dan temu alumni akbar.</p>
                            <button onClick={() => alert('Integrasi Tracer Study belum aktif.')} className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all text-lg flex items-center justify-center mx-auto gap-3">
                                <i className="fas fa-user-plus"></i> Form Pendaftaran Alumni
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </MainLayout>
    );
}
