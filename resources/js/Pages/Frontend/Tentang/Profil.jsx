import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
// import Hero from '@/Sections/Hero'; // Boleh dihapus jika sudah tidak dipakai di file ini
import { Head, Link } from '@inertiajs/react';

export default function Profil({ data, visiMisi }) {
    // Parse the JSON content from `data.content`
    let parsedContent = {};
    if (data?.content) {
        try {
            parsedContent = JSON.parse(data.content);
        } catch (e) {
            // fallback if it's not JSON but plain text
            parsedContent = {
                tentang_content: data.content
            };
        }
    }

    const title = data?.title || 'Profil STIKes';
    const subtitle = parsedContent.subtitle || 'Mengenal lebih dekat institusi pencetak tenaga medis unggul dan profesional.';

    // Section "Tentang Kami" (Type: content_with_image from the dummy config)
    const tentangTitle = parsedContent.tentang_title || 'Tentang Kami';
    const tentangText = parsedContent.tentang_content || 'Deskripsi tentang kami belum diisi, silakan diatur dari panel admin.';
    const tentangImage = parsedContent.tentang_image || 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

    // Section "Features"
    const featuresTitle = parsedContent.features_title || 'Mengapa STIKes Bogor Husada?';
    const features = parsedContent.features || [
        { title: 'Kurikulum Terstandar', description: 'Kurikulum selalu diperbaharui mengikuti standar Kemenkes RI.', icon: 'fas fa-book-medical' },
        { title: 'Fasilitas Lab Lengkap', description: 'Laboratorium modern yang dirancang menyerupai rumah sakit.', icon: 'fas fa-microscope' },
        { title: 'Dosen Berpengalaman', description: 'Tenaga pengajar terdiri dari akademisi dan praktisi kesehatan.', icon: 'fas fa-user-md' },
        { title: 'Kemitraan Luas', description: 'Bekerjasama dengan RSUD dan RS Swasta terkemuka.', icon: 'fas fa-handshake' }
    ];

    // Parse Visi Misi directly from Profil data
    let visi = parsedContent.visi || 'Visi institusi belum diatur.';
    let misi = parsedContent.misi || 'Misi institusi belum diatur.';

    // Fallback if data is still in visiMisi prop (legacy support)
    if (visi === 'Visi institusi belum diatur.' && visiMisi?.content) {
        try {
            const vm = JSON.parse(visiMisi.content);
            if (vm.visi) visi = vm.visi;
            if (vm.misi) misi = vm.misi;
        } catch (e) {
            visi = visiMisi.content;
            misi = visiMisi.content;
        }
    }

    return (
        <MainLayout title={title}>
            <Head>
                <title>{title}</title>
            </Head>

            {/* --- IMPROVED HERO SECTION (Profil) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={data?.image || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}
                        alt={title}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
                        }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-orange-900/60"></div>
                </div>

                {/* Hero Content */}
                <div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-3xl">
                        {/* Breadcrumbs */}
                        <nav className="flex mb-8" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center px-4 py-2 space-x-1 border rounded-full md:space-x-3 bg-white/10 backdrop-blur-md border-white/20">
                                <li className="inline-flex items-center">
                                    <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-200 transition-colors hover:text-white">
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
                                        <span className="ml-1 text-sm font-medium text-gray-300 md:ml-2">Tentang Kami</span>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="ml-1 text-sm font-bold text-orange-400 md:ml-2">{title}</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Title & Subtitle */}
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                            {title}
                        </h1>
                        <p className="max-w-2xl text-lg font-normal leading-relaxed text-gray-300 lg:text-xl">
                            {subtitle}
                        </p>
                    </div>
                </div>

                {/* Bottom SVG Wave Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-[1px] z-10">
                    <svg className="relative block w-full h-[80px] md:h-[150px] lg:h-[200px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="currentColor" className="text-white dark:text-gray-900" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,154.7C960,128,1056,128,1152,144C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </section>
            {/* --- END OF HERO SECTION --- */}

            {/* Tentang Kami Section */}
            <div className="py-16 md:py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Image Side */}
                        <div className="lg:w-1/2 w-full relative group">
                            <div className="absolute -inset-4 bg-indigo-50 rounded-[3rem] transform -rotate-3 transition duration-500 group-hover:rotate-0"></div>
                            <img
                                src={tentangImage.startsWith('http') ? tentangImage : `/storage/${tentangImage}`}
                                alt="Tentang Kami"
                                className="relative rounded-3xl shadow-2xl z-10 w-full h-auto object-cover max-h-[500px] border-4 border-white"
                            />
                            {/* Decorative element */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
                            <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
                        </div>

                        {/* Text Side */}
                        <div className="lg:w-1/2 w-full">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm font-bold tracking-wide mb-6">
                                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                                Profil
                            </span>

                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                                {tentangTitle}
                            </h2>

                            <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full mb-8"></div>

                            <div className="prose prose-lg text-gray-600 mb-8 whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: tentangText }}></div>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <Link href="/tentang/sejarah" className="px-8 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1">
                                    Baca Sejarah Kami
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visi Misi Section (from legacy 2-card layout) */}
            <div className="py-16 md:py-24 bg-gray-50/50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">Arah & Gerak Institusi</h2>
                        <p className="text-lg text-gray-500">Membangun generasi emas tenaga medis yang berintegritas dan profesional secara global.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
                        {/* Visi */}
                        <div className="bg-white rounded-3xl p-10 shadow-xl shadow-orange-100/50 border border-orange-50 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                                    <i className="fas fa-eye text-3xl"></i>
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 mb-6 font-display tracking-tight">Visi</h3>
                                <div className="text-gray-600 leading-relaxed text-lg flex-1 whitespace-pre-line">
                                    {visi}
                                </div>
                            </div>
                        </div>

                        {/* Misi */}
                        <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-3xl p-10 shadow-xl shadow-orange-200/50 text-white relative flex flex-col items-start overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute bottom-0 right-0 opacity-10 transition-transform group-hover:scale-110">
                                <i className="fas fa-bullseye text-[15rem] translate-x-12 translate-y-12"></i>
                            </div>
                            <div className="relative z-10 flex flex-col h-full w-full">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20 shadow-inner">
                                    <i className="fas fa-bullseye text-3xl text-white"></i>
                                </div>
                                <h3 className="text-3xl font-black mb-6 font-display tracking-tight">Misi</h3>
                                <div className="text-orange-50 leading-relaxed text-lg flex-1 whitespace-pre-line w-full space-y-2">
                                    {/* Handle array or string for misi */}
                                    {Array.isArray(misi) ? (
                                        <ul className="list-disc pl-5 space-y-3">
                                            {misi.map((m, i) => <li key={i}>{m}</li>)}
                                        </ul>
                                    ) : (
                                        <div>{misi}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features / Mengapa STIKes */}
            <div className={`py-16 md:py-24 bg-white border-t border-gray-100 ${features.length === 0 ? 'hidden' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
                        <span className="text-orange-600 font-bold tracking-wider uppercase text-sm mb-3 block">Keunggulan</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900">{featuresTitle}</h2>
                        <div className="w-24 h-1.5 bg-orange-600 mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-gray-50/50 rounded-2xl p-8 border border-gray-100 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-50/50 transition-all duration-300 group">
                                <div className="w-14 h-14 bg-white rounded-xl shadow-sm text-orange-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all">
                                    <i className={feature.icon || 'fas fa-check'}></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </MainLayout>
    );
}