import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";

export default function Lowongan({ lowongans }) {
    const jobList = lowongans || [];

    const getImageUrl = (imagePath, fallbackName) => {
        if (imagePath) return `/storage/${imagePath.replace("storage/", "")}`;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=0D8ABC&color=fff`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    return (
        <MainLayout title="Bursa Lowongan Kerja | STIKes Bogor Husada">
            {/* --- IMPROVED HERO SECTION (Bursa Kerja) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/img/hero-fallback.png"
                        alt="Bursa Kerja STIKes Bogor Husada"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src =
                                "https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
                        }}
                    />
                    {/* Gradient Overlay (Konsisten dengan branding) */}
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
                                            Bursa Lowongan Kerja
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Title & Subtitle */}
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                            Bursa Lowongan Kerja
                        </h1>
                        <p className="max-w-2xl text-lg font-normal leading-relaxed text-gray-300 lg:text-xl">
                            Temukan peluang karir terbaik dari berbagai instansi
                            kesehatan mitra resmi STIKes Bogor Husada khusus
                            untuk alumni dan mahasiswa tingkat akhir.
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

            <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-[50vh]">
                <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex flex-col gap-8 lg:flex-row">
                        {/* Sidebar Filters */}
                        <div className="w-full lg:w-1/4">
                            <div className="p-6 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-2xl dark:border-gray-700 md:sticky md:top-24">
                                <h3 className="pb-4 mb-6 text-lg font-bold text-gray-900 border-b border-gray-100 dark:text-white dark:border-gray-700">
                                    Filter Pekerjaan
                                </h3>
                                <div className="mb-6 space-y-4">
                                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                                        Tipe Kontrak
                                    </h4>
                                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer dark:text-gray-400">
                                        <input
                                            type="checkbox"
                                            className="text-orange-600 rounded focus:ring-orange-500"
                                        />{" "}
                                        Full-Time
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer dark:text-gray-400">
                                        <input
                                            type="checkbox"
                                            className="text-orange-600 rounded focus:ring-orange-500"
                                        />{" "}
                                        Part-Time
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer dark:text-gray-400">
                                        <input
                                            type="checkbox"
                                            className="text-orange-600 rounded focus:ring-orange-500"
                                        />{" "}
                                        Contract
                                    </label>
                                </div>
                                <button
                                    onClick={() =>
                                        alert(
                                            "Filter pekerjaan belum berfungsi saat ini.",
                                        )
                                    }
                                    className="w-full bg-orange-100 hover:bg-orange-200 text-orange-700 font-semibold py-2.5 rounded-lg transition-colors text-sm"
                                >
                                    Terapkan Filter
                                </button>
                            </div>
                        </div>

                        {/* Job Lists */}
                        <div className="w-full space-y-6 lg:w-3/4">
                            {jobList.length > 0 ? (
                                jobList.map((job) => (
                                    <div
                                        key={job.id}
                                        className="flex flex-col items-start gap-6 p-6 transition-shadow bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-2xl md:p-8 md:flex-row md:items-center dark:border-gray-700 hover:shadow-md"
                                    >
                                        <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 p-2 overflow-hidden border border-gray-100 rounded-xl bg-gray-50 dark:border-gray-700">
                                            <img
                                                src={getImageUrl(
                                                    job.thumbnail,
                                                    job.company,
                                                )}
                                                alt={job.company}
                                                className="object-contain w-full h-full"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-gray-900 transition-colors cursor-pointer dark:text-white hover:text-orange-600">
                                                    {job.title}
                                                </h3>
                                                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                                    {job.type || "Pekerjaan"}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center gap-1.5">
                                                    <i className="far fa-building"></i>{" "}
                                                    {job.company}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <i className="fas fa-map-marker-alt"></i>{" "}
                                                    {job.location}
                                                </span>
                                            </div>
                                            {job.description && (
                                                <div
                                                    className="text-sm prose-sm prose text-gray-600 dark:text-gray-400 line-clamp-2 dark:prose-invert max-w-none"
                                                    dangerouslySetInnerHTML={{
                                                        __html: job.description,
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <div className="flex flex-col items-center justify-between flex-shrink-0 w-full h-full gap-4 pt-4 border-t border-gray-100 md:items-end md:w-auto md:border-t-0 dark:border-gray-700 md:pt-0">
                                            <span className="px-3 py-1 text-xs font-semibold text-red-600 rounded-md bg-red-50 whitespace-nowrap">
                                                <i className="mr-1 far fa-clock"></i>{" "}
                                                Tutup:{" "}
                                                {formatDate(job.deadline)}
                                            </span>
                                            {job.link ? (
                                                <a
                                                    href={job.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full md:w-auto px-6 py-2.5 bg-gray-900 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors text-sm text-center"
                                                >
                                                    Lihat Detail / Lamar
                                                </a>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        alert(
                                                            "Link pendaftaran belum tersedia.",
                                                        )
                                                    }
                                                    className="w-full md:w-auto px-6 py-2.5 bg-gray-200 text-gray-500 font-semibold rounded-lg cursor-not-allowed transition-colors text-sm"
                                                >
                                                    Instansi Internal
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-20 text-center text-gray-500 bg-white border border-gray-100 dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                                    <i className="mb-4 text-4xl text-gray-300 fas fa-briefcase dark:text-gray-600"></i>
                                    <p>
                                        Saat ini belum ada lowongan pekerjaan
                                        yang tersedia.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
