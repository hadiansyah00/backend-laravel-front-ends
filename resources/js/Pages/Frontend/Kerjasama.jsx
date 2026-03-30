import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";

export default function Kerjasama({ kerjasamas }) {
    const kerjasamaList = kerjasamas || [];

    const getImageUrl = (imagePath, fallbackName) => {
        if (imagePath) return `/storage/${imagePath.replace("storage/", "")}`;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName || "Partner")}&background=0D8ABC&color=fff&size=128`;
    };

    return (
        <MainLayout title="Jaringan Kerjasama | STIKes Bogor Husada">
            {/* --- IMPROVED HERO SECTION (Jaringan Kerjasama) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/img/hero-fallback.png"
                        alt="Jaringan Kerjasama STIKes Bogor Husada"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src =
                                "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
                        }}
                    />
                    {/* Gradient Overlay (Consistency: Dark to Orange blend) */}
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
                                            Jaringan Kerjasama
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Title & Subtitle */}
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                            Jaringan Kerjasama
                        </h1>
                        <p className="max-w-2xl text-lg font-normal leading-relaxed text-gray-300 lg:text-xl">
                            Mitra strategis STIKes Bogor Husada dalam upaya
                            kolaborasi pendidikan, penelitian internasional, dan
                            pengabdian masyarakat.
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

            <section className="py-16 bg-white dark:bg-gray-900 min-h-[50vh]">
                <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {kerjasamaList.length > 0 ? (
                            kerjasamaList.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col items-center p-8 text-center transition-all duration-300 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-2xl dark:border-gray-700 hover:shadow-xl group"
                                >
                                    <div className="flex items-center justify-center w-24 h-24 p-2 mb-6 overflow-hidden transition-transform border-4 rounded-full shadow-md group-hover:scale-110 bg-gray-50 dark:bg-gray-900 border-orange-50 dark:border-gray-700">
                                        <img
                                            src={getImageUrl(
                                                item.logo,
                                                item.title,
                                            )}
                                            alt={item.title}
                                            className="object-contain max-w-full max-h-full"
                                        />
                                    </div>
                                    <span className="text-[10px] font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/30 dark:text-orange-400 px-3 py-1 rounded-full mb-3 tracking-widest uppercase">
                                        {item.type || "Mitra Strategis"}
                                    </span>
                                    <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                                        {item.title}
                                    </h3>
                                    <div
                                        className="mb-6 text-sm leading-relaxed prose-sm prose text-gray-600 dark:text-gray-400 line-clamp-3 dark:prose-invert"
                                        dangerouslySetInnerHTML={{
                                            __html: item.description,
                                        }}
                                    />
                                    <div className="flex items-center justify-center w-full pt-6 mt-auto text-xs font-medium text-gray-400 border-t border-gray-100 dark:border-gray-700">
                                        <i className="mr-2 text-orange-500 fas fa-handshake-angle"></i>{" "}
                                        Terjalin Sejak Kemitraan
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center text-gray-500 border border-gray-300 border-dashed col-span-full bg-gray-50 dark:bg-gray-800/50 rounded-2xl dark:border-gray-600">
                                <i className="mb-4 text-4xl text-gray-300 fas fa-network-wired dark:text-gray-600"></i>
                                <p className="text-lg font-medium">
                                    Daftar kemitraan sedang diperbarui.
                                </p>
                                <p className="text-sm">
                                    Silakan kembali beberapa saat lagi.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
