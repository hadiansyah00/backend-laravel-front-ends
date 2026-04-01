import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
// import Hero from '@/Sections/Hero'; // Boleh dihapus
import { Head, Link } from '@inertiajs/react';

export default function Struktur({ data }) {
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

    const title = data?.title || 'Struktur Organisasi';
    const subtitle = parsedContent.subtitle || 'Susunan kepengurusan dan pimpinan akademik STIKes Bogor Husada.';
    const htmlContent = parsedContent.content;
    const featuresTitle = parsedContent.features_title || 'Unsur Pimpinan Utama';
    const features = parsedContent.features || [];

    return (
        <MainLayout title={title}>
            <Head>
                <title>{title}</title>
            </Head>

            {/* --- IMPROVED HERO SECTION (Struktur Organisasi) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={data?.image || '/assets/img/hero-fallback.png'}
                        alt={title}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src =
                                "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"; // Fallback gambar tim/organisasi
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

            <div className="py-16 md:py-24 bg-gray-50/50 dark:bg-gray-900 min-h-[50vh]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    {/* Visual / Image Content Container */}
                    {parsedContent.content_image ? (
                        <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 inline-block mb-16 transition-all hover:shadow-xl">
                            <img src={parsedContent.content_image.startsWith('http') || parsedContent.content_image.startsWith('/') ? parsedContent.content_image : `/storage/${parsedContent.content_image}`} alt="Struktur Organisasi" className="max-w-full h-auto rounded-xl" />
                        </div>
                    ) : htmlContent ? (
                        <div className="max-w-5xl mx-auto mt-6 text-center prose prose-lg prose-orange dark:prose-invert text-gray-700 dark:text-gray-300 mb-16 overflow-x-auto"
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                    ) : (data?.image ? (
                        <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 inline-block mb-16 transition-all hover:shadow-xl">
                            <img src={data.image.startsWith('http') || data.image.startsWith('/') ? data.image : `/storage/${data.image}`} alt="Struktur Organisasi" className="max-w-full h-auto rounded-xl" />
                        </div>
                    ) : (
                        <div className="bg-gray-100 dark:bg-gray-800/50 p-12 rounded-3xl border border-dashed border-gray-300 dark:border-gray-600 mb-16">
                            <i className="fas fa-sitemap text-4xl text-gray-400 dark:text-gray-500 mb-4 block"></i>
                            <p className="text-gray-500 dark:text-gray-400">Bagan sruktur organisasi belum diunggah.</p>
                        </div>
                    ))}

                    {/* Features (Pimpinan) Section */}
                    {features && features.length > 0 && (
                        <div className="mt-12 text-left">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                                {featuresTitle}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {features.map((feature, index) => (
                                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-orange-200 dark:hover:border-orange-800 transition-all group">
                                        <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                                            <i className={feature.icon || 'fas fa-user-circle'}></i>
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </MainLayout>
    );
}