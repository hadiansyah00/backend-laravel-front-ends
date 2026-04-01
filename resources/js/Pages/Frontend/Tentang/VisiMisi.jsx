import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
// import Hero from '@/Sections/Hero'; // Bisa dihapus
import { Head, Link } from '@inertiajs/react';

export default function VisiMisi({ data }) {
    const title = data?.title || 'Visi & Misi';
    const subtitle = 'Tujuan, arah gerak, dan komitmen STIKes Bogor Husada dalam mencetak tenaga kesehatan profesional.';

    // Parse JSON content if available
    let visi = 'Visi institusi belum diatur.';
    let misi = 'Misi institusi belum diatur.';

    if (data?.content) {
        try {
            const parsed = JSON.parse(data.content);
            if (parsed.visi) visi = parsed.visi;
            if (parsed.misi) misi = parsed.misi;
        } catch (e) {
            // Not JSON
            visi = data.content;
            misi = data.content;
        }
    }

    return (
        <MainLayout title={title}>
            <Head>
                <title>{title}</title>
            </Head>

            {/* --- IMPROVED HERO SECTION (Visi & Misi) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={data?.image || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}
                        alt={title}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src =
                                "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
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

            {/* --- CONTENT SECTION --- */}
            <div className="py-16 md:py-24 bg-gray-50/50 dark:bg-gray-900 min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-stretch">

                        {/* Visi */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 lg:p-12 shadow-xl shadow-orange-100/50 dark:shadow-none border border-orange-50 dark:border-gray-700 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 dark:bg-orange-900/20 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                                    <i className="fas fa-eye text-3xl"></i>
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6 font-display tracking-tight">Visi</h3>
                                <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg flex-1 whitespace-pre-wrap">
                                    {visi}
                                </div>
                            </div>
                        </div>

                        {/* Misi */}
                        <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-3xl p-10 lg:p-12 shadow-xl shadow-orange-200/50 text-white relative flex flex-col items-start overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute bottom-0 right-0 opacity-10 transition-transform group-hover:scale-110">
                                <i className="fas fa-bullseye text-[15rem] translate-x-12 translate-y-12"></i>
                            </div>
                            <div className="relative z-10 flex flex-col h-full w-full">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20 shadow-inner">
                                    <i className="fas fa-bullseye text-3xl text-white"></i>
                                </div>
                                <h3 className="text-3xl font-black mb-6 font-display tracking-tight">Misi</h3>
                                <div className="text-orange-50 leading-relaxed text-lg flex-1 whitespace-pre-wrap w-full space-y-2">
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
        </MainLayout>
    );
}