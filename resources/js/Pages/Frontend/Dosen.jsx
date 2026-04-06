import React, { useState, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Dosen({ dosens, prodiList, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [prodi, setProdi] = useState(filters?.prodi || '');

    const getImageUrl = (photo) => {
        if (!photo) return null;
        if (photo.startsWith('http') || photo.startsWith('/')) return photo;
        if (photo.startsWith('storage/')) return `/${photo}`;
        return `/storage/${photo}`;
    };

    const handleFilter = () => {
        router.get(route('front.dosen'), { search, prodi }, {
            preserveState: true,
            replace: true,
        });
    };

    useEffect(() => {
        if (prodi !== (filters?.prodi || '')) {
            handleFilter();
        }
    }, [prodi]);

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFilter();
        }
    };

    return (
        <MainLayout title="Direktori Dosen">
            <Head>
                <title>Direktori Dosen - STIKes Bogor Husada</title>
            </Head>

            {/* --- HERO SECTION (Konsisten dengan Alumni) --- */}
            <section className="relative w-full pt-40 pb-24 overflow-hidden bg-gray-900 md:pt-48 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/img/hero-fallback.png"
                        alt="Direktori Dosen STIKes Bogor Husada"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src =
                                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
                        }}
                    />
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
                                        <span className="ml-1 text-sm font-bold text-orange-400 md:ml-2">Direktori Dosen</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                            Direktori Dosen
                        </h1>
                        <p className="max-w-2xl text-lg font-normal leading-relaxed text-gray-300 lg:text-xl">
                            Tenaga pendidik profesional dan berpengalaman di STIKes Bogor Husada yang siap membimbing generasi
                            tenaga kesehatan masa depan Indonesia.
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
                            className="text-gray-50 dark:text-gray-900"
                            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,154.7C960,128,1056,128,1152,144C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </section>

            <div className="py-16 bg-gray-50 dark:bg-gray-900 min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Filters */}
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleFilter(); }}
                        className="p-5 mb-12 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-2xl dark:border-gray-700 md:p-6"
                    >
                        <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
                            <div className="flex-1 min-w-[160px] relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <i className="fas fa-search text-gray-400"></i>
                                </span>
                                <input
                                    type="text"
                                    className="w-full pl-10 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Cari nama dosen..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={handleSearchKeyDown}
                                />
                            </div>
                            <select
                                className="flex-1 min-w-[160px] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm dark:bg-gray-700 dark:text-white"
                                value={prodi}
                                onChange={(e) => setProdi(e.target.value)}
                            >
                                <option value="">Semua Program Studi</option>
                                {prodiList && prodiList.map((p, idx) => (
                                    <option key={idx} value={p}>{p}</option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white transition-colors bg-orange-600 rounded-lg hover:bg-orange-700"
                            >
                                <i className="fas fa-search"></i> Cari
                            </button>
                            {(search || prodi) && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');
                                        setProdi('');
                                        router.get(route('front.dosen'));
                                    }}
                                    className="px-4 py-2 text-sm font-semibold text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Section Title */}
                    <div className="max-w-2xl mx-auto mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                            Tenaga Pengajar Kami
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Para dosen dan pendidik berkualitas yang mendedikasikan diri dalam menciptakan
                            lulusan kesehatan yang kompeten dan profesional.
                        </p>
                    </div>

                    {/* Content Grid */}
                    {dosens && dosens.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {dosens.map((dosen) => {
                                const photoUrl = getImageUrl(dosen.photo);
                                return (
                                    <div key={dosen.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                        <div className="aspect-[3/4] relative overflow-hidden bg-gray-100 dark:bg-gray-700">
                                            {photoUrl ? (
                                                <img
                                                    src={photoUrl}
                                                    alt={dosen.name}
                                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextElementSibling && (e.target.nextElementSibling.style.display = 'flex');
                                                    }}
                                                />
                                            ) : null}
                                            <div
                                                className={`w-full h-full flex-col items-center justify-center text-gray-400 gap-4 absolute inset-0 ${photoUrl ? 'hidden' : 'flex'}`}
                                            >
                                                <i className="fas fa-user-circle text-6xl opacity-50"></i>
                                                <span className="text-sm font-medium">Foto Tidak Tersedia</span>
                                            </div>
                                            {dosen.prodi && (
                                                <div className="absolute top-4 right-4">
                                                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-orange-700 dark:text-orange-400 text-xs font-bold rounded-lg shadow-sm border border-white/20">
                                                        {dosen.prodi}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-2 line-clamp-2" title={dosen.name}>
                                                {dosen.name}
                                            </h3>
                                            {dosen.position && (
                                                <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-4">{dosen.position}</p>
                                            )}
                                            {dosen.nidn && (
                                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                                    <i className="fas fa-id-card w-4 text-center"></i> NIDN: {dosen.nidn}
                                                </div>
                                            )}
                                            {dosen.email && (
                                                <a href={`mailto:${dosen.email}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 transition-colors mb-2">
                                                    <i className="fas fa-envelope w-4 text-center"></i> {dosen.email}
                                                </a>
                                            )}
                                            {dosen.linkedin_url && (
                                                <a href={dosen.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                                    <i className="fab fa-linkedin w-4 text-center"></i> LinkedIn Profile
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                            <div className="w-24 h-24 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300 dark:text-gray-500">
                                <i className="fas fa-search text-4xl"></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Dosen tidak ditemukan</h3>
                            <p className="text-gray-500 dark:text-gray-400">Coba gunakan kata kunci pencarian atau filter yang berbeda.</p>
                            {(search || prodi) && (
                                <button
                                    onClick={() => {
                                        setSearch('');
                                        setProdi('');
                                        router.get(route('front.dosen'));
                                    }}
                                    className="mt-6 px-6 py-2 bg-orange-50 text-orange-600 font-semibold rounded-xl hover:bg-orange-100 transition-colors"
                                >
                                    Tampilkan Semua Dosen
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
