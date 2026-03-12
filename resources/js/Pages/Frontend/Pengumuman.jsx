import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import HeroStaticSection from "@/Components/Sections/HeroStaticSection";
import { Link } from "@inertiajs/react";

export default function Pengumuman({ pengumumans }) {
    const pengumumanList = pengumumans?.data || [];

    // Formatting Helper
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    return (
        <MainLayout title="Pengumuman | STIKes Bogor Husada">
            {/* --- IMPROVED HERO SECTION (Pengumuman) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/img/hero-fallback.png"
                        alt="Papan Pengumuman"
                        className="object-cover w-full h-full"
                        // Fallback otomatis jika file lokal belum ada
                        onError={(e) => {
                            e.target.src =
                                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
                        }}
                    />
                    {/* Gradient Overlay (Dark to Orange blend - konsisten dengan branding) */}
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
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                        </svg>
                                        Beranda
                                    </Link>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg
                                            className="w-5 h-5 text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <span className="ml-1 text-sm font-bold text-orange-400 md:ml-2">
                                            Papan Pengumuman
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Title & Subtitle */}
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                            Papan Pengumuman
                        </h1>
                        <p className="max-w-2xl text-lg font-normal leading-relaxed text-gray-300 lg:text-xl">
                            Pusat informasi resmi, surat edaran, dan pengumuman
                            akademik civitas STIKes Bogor Husada.
                        </p>
                    </div>
                </div>

                {/* Bottom SVG Wave Divider */}
                {/* Smooth Bottom SVG Wave Divider */}
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

            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container max-w-5xl px-4 mx-auto">
                    <div className="space-y-4">
                        {pengumumanList.length > 0 ? (
                            pengumumanList.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col justify-between gap-6 p-6 transition-shadow bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-2xl dark:border-gray-700 hover:shadow-md md:flex-row md:items-center group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-blue-600 rounded-full bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400">
                                            <i className="text-xl fas fa-bullhorn"></i>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-xs font-bold px-2.5 py-1 rounded-md text-white bg-blue-500">
                                                    Pengumuman
                                                </span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    <i className="mr-1 far fa-calendar-alt"></i>{" "}
                                                    {formatDate(
                                                        item.created_at,
                                                    )}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 transition-colors dark:text-white group-hover:text-blue-600">
                                                <Link
                                                    href={`/pengumuman/${item.slug}`}
                                                >
                                                    {item.title}
                                                </Link>
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 ml-16 md:ml-0">
                                        <Link
                                            href={`/pengumuman/${item.slug}`}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-semibold rounded-lg transition-colors text-sm"
                                        >
                                            Detail Pengumuman{" "}
                                            <i className="fas fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center bg-white border border-gray-100 dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                                <i className="mb-3 text-4xl text-gray-300 fas fa-bullhorn dark:text-gray-600"></i>
                                <p className="font-medium text-gray-500 dark:text-gray-400">
                                    Belum ada pengumuman.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {pengumumans?.links && pengumumans.links.length > 3 && (
                        <div className="flex flex-wrap justify-center gap-2 mt-12">
                            {pengumumans.links.map((link, index) => {
                                let label = link.label;
                                if (label.includes("&laquo;"))
                                    label = (
                                        <i className="text-xs fas fa-chevron-left"></i>
                                    );
                                if (label.includes("&raquo;"))
                                    label = (
                                        <i className="text-xs fas fa-chevron-right"></i>
                                    );

                                return link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition-colors ${
                                            link.active
                                                ? "border border-blue-600 bg-blue-600 text-white"
                                                : "border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                ) : (
                                    <span
                                        key={index}
                                        className="flex items-center justify-center w-10 h-10 text-gray-400 bg-white border border-gray-200 rounded-lg cursor-not-allowed dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
