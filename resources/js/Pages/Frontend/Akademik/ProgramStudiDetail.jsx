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
        indigo: {
            accentBg:      'bg-indigo-50',
            accentBorder:  'border-indigo-100',
            accentText:    'text-indigo-600',
            accentTextDk:  'text-indigo-700',
            bg100:         'bg-indigo-100',
            bg600:         'bg-indigo-600',
            bar:           'bg-indigo-500',
            bar600:        'bg-indigo-600',
            textLight:     'text-indigo-50',
        },
        emerald: {
            accentBg:      'bg-emerald-50',
            accentBorder:  'border-emerald-100',
            accentText:    'text-emerald-600',
            accentTextDk:  'text-emerald-700',
            bg100:         'bg-emerald-100',
            bg600:         'bg-emerald-600',
            bar:           'bg-emerald-500',
            bar600:        'bg-emerald-600',
            textLight:     'text-emerald-50',
        },
        pink: {
            accentBg:      'bg-pink-50',
            accentBorder:  'border-pink-100',
            accentText:    'text-pink-600',
            accentTextDk:  'text-pink-700',
            bg100:         'bg-pink-100',
            bg600:         'bg-pink-600',
            bar:           'bg-pink-500',
            bar600:        'bg-pink-600',
            textLight:     'text-pink-50',
        },
    };

    let key = 'indigo';
    if (programData.name && programData.name.toLowerCase().includes('gizi')) key = 'emerald';
    else if (programData.name && programData.name.toLowerCase().includes('kebidanan')) key = 'pink';
    const t = themes[key];

    const heroSubtitle = programData.description
        ? programData.description.substring(0, 150) + '...'
        : 'Profil lengkap program studi ' + (programData.name || '');

    const heroImage = programData.image
        ? '/' + programData.image
        : '/assets/img/hero-fallback.png';

    const peluangKerja = Array.isArray(programData.peluang_kerja) ? programData.peluang_kerja : [];

    return (
        <MainLayout title={(programData.name || 'Program Studi') + ' - STIKes Bogor Husada'}>

            <Hero
                content={{
                    title: 'Program Studi ' + (programData.name || ''),
                    subtitle: heroSubtitle,
                    image: heroImage,
                    gradient: 'dark',
                }}
            />

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
                                    src={programData.kaprodi_photo ? '/' + programData.kaprodi_photo : "/assets/img/dosen/default.png"}
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
                            {peluangKerja.map((feature, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                                    <div className={"w-14 h-14 rounded-xl shadow-sm flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-all " + t.accentBg + " " + t.accentText}>
                                        <i className="fas fa-briefcase"></i>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
