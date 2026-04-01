import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Sections/Hero';

export default function ProgramStudiDetail({ programData }) {
    if (!programData) {
        return (
            <MainLayout title="Program Studi Tidak Ditemukan">
                <div className="py-24 text-center">Data tidak ditemukan.</div>
            </MainLayout>
        );
    }

    // Static theme configs — full class names so Tailwind doesn't purge them
    const themes = {
        purple: {
            accentBg: 'bg-purple-50',
            accentBorder: 'border-purple-100',
            accentText: 'text-purple-600',
            accentTextDk: 'text-purple-700',
            bg100: 'bg-purple-100',
            bg600: 'bg-purple-600',
            bar: 'bg-purple-500',
            bar600: 'bg-purple-600',
            textLight: 'text-purple-50',
        },
        amber: {
            accentBg: 'bg-amber-50',
            accentBorder: 'border-amber-100',
            accentText: 'text-amber-600',
            accentTextDk: 'text-amber-700',
            bg100: 'bg-amber-100',
            bg600: 'bg-amber-600',
            bar: 'bg-amber-500',
            bar600: 'bg-amber-600',
            textLight: 'text-amber-50',
        },
        blue: {
            accentBg: 'bg-blue-50',
            accentBorder: 'border-blue-100',
            accentText: 'text-blue-600',
            accentTextDk: 'text-blue-700',
            bg100: 'bg-blue-100',
            bg600: 'bg-blue-600',
            bar: 'bg-blue-500',
            bar600: 'bg-blue-600',
            textLight: 'text-blue-50',
        },
    };

    let key = 'purple';
    if (programData.name && programData.name.toLowerCase().includes('gizi')) key = 'amber';
    else if (programData.name && programData.name.toLowerCase().includes('kebidanan')) key = 'blue';
    const t = themes[key];

    const imgSrc = (val) => {
        if (!val) return null;
        if (val.startsWith('http') || val.startsWith('/')) return val;
        return '/storage/' + val.replace('storage/', '');
    };

    const heroSubtitle = programData.description
        ? programData.description.substring(0, 150) + '...'
        : 'Profil lengkap program studi ' + (programData.name || '');

    const heroImage = imgSrc(programData.image) || '/assets/img/hero-fallback.png';

    const peluangKerja = Array.isArray(programData.peluang_kerja) ? programData.peluang_kerja : [];

    return (
        <MainLayout title={(programData.name || 'Program Studi') + ' - STIKes Bogor Husada'}>

            {/* --- IMPROVED HERO SECTION (Program Studi) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage || '/assets/img/hero-fallback.png'}
                        alt={'Program Studi ' + (programData?.name || '')}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"; // Fallback gambar perkuliahan/kampus
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
                                        <span className="ml-1 text-sm font-medium text-gray-300 md:ml-2">Program Studi</span>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="ml-1 text-sm font-bold text-orange-400 md:ml-2">{programData?.name || 'Detail'}</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Title & Subtitle */}
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                            Program Studi {programData?.name || ''}
                        </h1>
                        <p className="max-w-2xl text-lg font-normal leading-relaxed text-gray-300 lg:text-xl">
                            {heroSubtitle}
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

            {/* Mengenal Program Studi */}
            <div className="py-16 md:py-24 bg-white relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">Mengenal {programData.name}</h2>
                    <div className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {programData.description}
                    </div>

                    {programData.akreditasi && (
                        <div className={"inline-flex mt-8 items-center gap-4 px-8 py-4 border rounded-2xl shadow-sm text-left " + t.accentBg + " " + t.accentBorder}>
                            <i className={"fas fa-medal text-3xl " + t.accentText}></i>
                            <div>
                                <span className="block text-sm text-gray-500 font-semibold uppercase tracking-wider">Status Akreditasi</span>
                                <span className={"block text-2xl font-black " + t.accentTextDk}>{programData.akreditasi}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Profil Kaprodi */}
            {(programData.kaprodi_name || programData.kaprodi_profile) && (
                <div className="py-16 md:py-24 bg-gray-50/50 border-t border-gray-100 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                            <div className="lg:w-1/3 w-full relative group mx-auto">
                                <div className={"absolute -inset-4 rounded-[3rem] transform rotate-3 transition duration-500 group-hover:rotate-0 " + t.bg100}></div>
                                <img
                                    src={imgSrc(programData.kaprodi_photo) || "/assets/img/dosen/default.png"}
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                                    alt={programData.kaprodi_name || 'Kaprodi'}
                                    className="relative rounded-3xl shadow-2xl z-10 w-full h-auto object-cover aspect-[3/4] object-top border-4 border-white"
                                />
                            </div>
                            <div className="lg:w-2/3 w-full">
                                <span className={"inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold tracking-wide mb-6 " + t.accentBg + " " + t.accentText}>
                                    Ketua Program Studi
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                                    {programData.kaprodi_name || 'Profil Program Studi'}
                                </h2>
                                <div className={"w-20 h-1.5 rounded-full mb-8 " + t.bar}></div>
                                <div className="prose prose-lg text-gray-600 mb-8 whitespace-pre-wrap leading-relaxed">
                                    {programData.kaprodi_profile || programData.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Visi Misi */}
            {(programData.visi || programData.misi) && (
                <div className="py-16 md:py-24 bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">Visi &amp; Misi {programData.name}</h2>
                            <div className={"w-20 h-1.5 rounded-full mx-auto " + t.bar600}></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                            <div className={"bg-white rounded-3xl p-10 shadow-xl border relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 " + t.accentBorder}>
                                <div className={"w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner " + t.bg100 + " " + t.accentText}>
                                    <i className="fas fa-eye text-3xl"></i>
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 mb-6 font-display tracking-tight">Visi</h3>
                                <div className="text-gray-600 leading-relaxed text-lg flex-1 whitespace-pre-wrap">
                                    {programData.visi}
                                </div>
                            </div>
                            <div className={"rounded-3xl p-10 shadow-xl text-white relative flex flex-col items-start overflow-hidden group hover:-translate-y-1 transition-all duration-300 " + t.bg600}>
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20 shadow-inner">
                                    <i className="fas fa-bullseye text-3xl text-white"></i>
                                </div>
                                <h3 className="text-3xl font-black mb-6 font-display tracking-tight">Misi</h3>
                                <div className={"leading-relaxed text-lg whitespace-pre-wrap " + t.textLight}>
                                    {programData.misi}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Peluang Kerja */}
            {peluangKerja.length > 0 && (
                <div className="py-16 md:py-24 bg-gray-50/50 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center max-w-3xl mx-auto">
                            <span className={"font-bold tracking-wider uppercase text-sm mb-3 block " + t.accentText}>Karir Masa Depan</span>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900">Peluang Kerja Lulusan</h2>
                            <div className={"w-24 h-1.5 mx-auto mt-6 rounded-full " + t.bar600}></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {peluangKerja.map((item, idx) => {
                                const isString = typeof item === 'string';
                                const title = isString ? item : (item.title || '');
                                const description = isString ? '' : (item.description || '');
                                const icon_svg = isString ? '' : (item.icon_svg || '');
                                const iconClass = isString ? "fas fa-briefcase" : (item.icon || "fas fa-briefcase");

                                return (
                                    <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                                        <div className={"w-14 h-14 rounded-xl shadow-sm flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-all " + t.accentBg + " " + t.accentText}>
                                            {icon_svg ? (
                                                <div dangerouslySetInnerHTML={{ __html: icon_svg }} className="w-8 h-8 flex items-center justify-center svg-container" />
                                            ) : (
                                                <i className={iconClass}></i>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">{title}</h3>
                                        {description && <p className="text-gray-600 leading-relaxed text-sm">{description}</p>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
