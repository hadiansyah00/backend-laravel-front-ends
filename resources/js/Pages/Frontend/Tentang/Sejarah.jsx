import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
// import Hero from '@/Sections/Hero'; // Boleh dihapus karena kita pakai hero custom
import { Head, Link } from '@inertiajs/react';

export default function Sejarah({ data }) {
    // Parse the JSON content from `data.content`
    let parsedContent = {};
    if (data?.content) {
        try {
            parsedContent = JSON.parse(data.content);
        } catch (e) {
            // fallback if it's not JSON but plain text
            parsedContent = {
                content: data.content
            };
        }
    }

    const title = data?.title || 'Sejarah Institusi';
    const subtitle = parsedContent.subtitle || 'Perjalanan panjang dan tonggak pencapaian STIKes Bogor Husada.';
    const textContent = parsedContent.content || '<p>Konten sejarah belum tersedia.</p>';
    const timeline = parsedContent.timeline || { items: [] };

    return (
        <MainLayout title={title}>
            <Head>
                <title>{title}</title>
            </Head>

            {/* --- IMPROVED HERO SECTION (Sejarah Institusi) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={data?.image || 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}
                        alt={title}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src =
                                "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
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

            {/* Rich Text Presentation Section */}
            <div className="py-16 md:py-24 bg-white dark:bg-gray-900 relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-bold tracking-widest uppercase mb-4 border border-orange-100 dark:border-orange-800">
                            Latar Belakang
                        </span>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full mx-auto"></div>
                    </div>
                    <div className="prose prose-lg prose-orange dark:prose-invert text-gray-700 dark:text-gray-300 max-w-none leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: textContent }} />
                </div>
            </div>

            {/* Timeline Roadmap Section */}
            {timeline.items && timeline.items.length > 0 && (
                <div className="py-16 md:py-24 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm text-orange-600 dark:text-orange-400 flex items-center justify-center text-3xl mx-auto mb-6 border border-gray-100 dark:border-gray-700">
                                <i className={timeline.icon || 'fas fa-route'}></i>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                                {timeline.title || 'Roadmap'}
                            </h2>
                        </div>

                        <div className="relative border-l-4 border-orange-200 dark:border-orange-900/50 ml-4 md:ml-0 md:border-none">
                            {/* Desktop center line */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-orange-200 dark:bg-orange-900/50 -translate-x-1/2 rounded-full"></div>

                            <div className="space-y-12">
                                {timeline.items.map((item, idx) => {
                                    const isEven = idx % 2 === 0;
                                    return (
                                        <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                            {/* Node Marker */}
                                            <div className="absolute -left-[1.35rem] md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-900 border-4 border-orange-500 shadow flex items-center justify-center z-10 top-0 md:top-auto">
                                                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                            </div>

                                            {/* Content side */}
                                            <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                                                <div className={`bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 transition-transform duration-300 hover:-translate-y-1 relative group`}>

                                                    {/* Decorative arrow pointing to timeline */}
                                                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-t border-r border-gray-100 dark:border-gray-700 transform rotate-45 ${isEven ? '-right-2 border-l border-b-transparent dark:border-b-transparent' : '-left-2 border-b border-r-transparent border-t-transparent dark:border-r-transparent dark:border-t-transparent'}`}></div>

                                                    <span className="inline-block px-3 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-bold rounded-lg mb-3 shadow-sm border border-orange-100 dark:border-orange-800">
                                                        {item.year || 'Tahun'}
                                                    </span>
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{item.description}</p>
                                                </div>
                                            </div>

                                            {/* Empty side for spacing */}
                                            <div className="hidden md:block w-1/2"></div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}