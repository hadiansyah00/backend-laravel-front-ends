import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
// import Hero from '@/Sections/Hero'; // Boleh dihapus
import { Head, Link } from '@inertiajs/react';

export default function Sambutan({ data }) {
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

    const pageTitle = data?.title || 'Sambutan Ketua';
    const subtitle = parsedContent.subtitle || 'Pesan dan arahan strategis dari pimpinan STIKes Bogor Husada.';
    const contentTitle = parsedContent.content_title || pageTitle;
    const sambutanHtml = parsedContent.content || '<p>Sambutan belum tersedia.</p>';
    const imageAlign = parsedContent.image_align || 'left';
    const contentImage = parsedContent.content_image;

    // Optional styling based on alignment
    const isImageLeft = imageAlign === 'left';
    const flexDirClass = isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse';

    return (
        <MainLayout title={pageTitle}>
            <Head>
                <title>{pageTitle}</title>
            </Head>

            {/* --- IMPROVED HERO SECTION (Sambutan Ketua) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={data?.image || '/assets/img/hero-fallback.png'}
                        alt={pageTitle}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src =
                                "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
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
                                        <span className="ml-1 text-sm font-bold text-orange-400 md:ml-2">{pageTitle}</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Title & Subtitle */}
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                            {pageTitle}
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

            <div className="py-16 md:py-24 bg-white dark:bg-gray-900 min-h-[50vh]">
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ${flexDirClass} gap-12 lg:gap-16 items-start`}>

                    {contentImage && (
                        <div className="md:w-5/12 w-full flex-shrink-0 sticky top-24">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-orange-50 dark:bg-orange-900/20 rounded-[2rem] transform rotate-3 transition duration-500 group-hover:rotate-0"></div>
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-100 dark:bg-orange-900/40 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
                                <img
                                    src={contentImage.startsWith('http') || contentImage.startsWith('/') ? contentImage : `/storage/${contentImage}`}
                                    alt="Ketua STIKes Bogor Husada"
                                    className="relative rounded-[1.5rem] shadow-2xl w-full h-auto object-cover object-top border-4 border-white dark:border-gray-800 transition-transform duration-500 group-hover:-translate-y-2"
                                />
                            </div>
                        </div>
                    )}

                    <div className="md:w-7/12 w-full">
                        <div className="bg-gray-50/50 dark:bg-gray-800/50 p-8 md:p-10 rounded-[2rem] border border-gray-100 dark:border-gray-700">
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mb-8">
                                <i className="fas fa-quote-left text-3xl"></i>
                            </div>

                            {contentTitle && (
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-8 leading-tight tracking-tight">
                                    {contentTitle}
                                </h2>
                            )}

                            <div className="prose prose-lg prose-orange dark:prose-invert text-gray-700 dark:text-gray-300 max-w-none whitespace-pre-wrap leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: sambutanHtml }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}