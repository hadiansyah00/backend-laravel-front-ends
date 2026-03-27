import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Link, router } from "@inertiajs/react";

export default function Dokumen({ documents, categories, filters }) {
    const documentList = documents?.data || [];

    // Fungsi untuk menangani perubahan pencarian/filter
    const handleFilterChange = (key, value) => {
        router.get(
            "/dokumen",
            { ...filters, [key]: value },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    // Helper: Format Tanggal
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    // Helper: Ambil Ekstensi File
    const getFileExtension = (filePath) => {
        if (!filePath) return "FILE";
        return filePath.split(".").pop().toUpperCase();
    };

    // Helper: Render Icon SVG berdasarkan tipe file
    const renderFileIcon = (type) => {
        if (type === "PDF") {
            return (
                <svg
                    className="text-red-500 w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    ></path>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9 9h1.5m1.5 0H15m-6 4h6m-6 4h4"
                    ></path>
                </svg>
            );
        }
        if (type === "DOC" || type === "DOCX") {
            return (
                <svg
                    className="text-blue-500 w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                </svg>
            );
        }
        if (type === "XLS" || type === "XLSX") {
            return (
                <svg
                    className="text-green-500 w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                </svg>
            );
        }
        return (
            <svg
                className="text-gray-500 w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                ></path>
            </svg>
        );
    };

    return (
        <MainLayout title="Unduh Dokumen | STIKes Bogor Husada">
            {/* --- IMPROVED HERO SECTION (Emerald Theme) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/img/hero-fallback.png"
                        alt="Unduh Dokumen"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src =
                                "https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
                        }}
                    />
                    {/* Gradient Overlay (Dark to Emerald blend untuk kesan arsip/dokumen) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-emerald-900/60"></div>
                </div>

                {/* Hero Content */}
                <div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-3xl pb-16 md:pb-24">
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
                                        <span className="ml-1 text-sm font-bold text-emerald-400 md:ml-2">
                                            Unduh Dokumen
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Title & Subtitle */}
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                            Pusat Dokumen
                        </h1>
                        <p className="max-w-2xl text-lg font-normal leading-relaxed text-gray-300 lg:text-xl">
                            Kumpulan pedoman, formulir administrasi, dan SOP
                            resmi yang dapat diunduh oleh sivitas akademika
                            STIKes Bogor Husada.
                        </p>
                    </div>
                </div>

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
                            className="text-gray-50 dark:text-gray-950"
                            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,154.7C960,128,1056,128,1152,144C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </section>
            {/* --- END OF HERO SECTION --- */}

            <section className="min-h-screen py-16 bg-gray-50 dark:bg-gray-950">
                <div className="container max-w-5xl px-4 mx-auto">
                    {/* Search & Filter Bar */}
                    <div className="relative z-20 flex flex-col gap-4 p-4 mb-8 bg-white border border-gray-100 shadow-sm dark:bg-gray-900 rounded-2xl dark:border-gray-800 md:flex-row">
                        <div className="relative flex-1">
                            <svg
                                className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                            <input
                                type="text"
                                placeholder="Cari nama dokumen..."
                                className="w-full py-3 pl-12 pr-4 text-sm transition-shadow border-none bg-gray-50 dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white"
                                defaultValue={filters?.search || ""}
                                onBlur={(e) =>
                                    handleFilterChange("search", e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleFilterChange(
                                            "search",
                                            e.target.value,
                                        );
                                    }
                                }}
                            />
                        </div>
                        <div className="relative w-full md:w-64">
                            <select
                                className="w-full py-3 pl-4 pr-10 text-sm font-medium text-gray-600 border-none appearance-none cursor-pointer bg-gray-50 dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-gray-300"
                                value={filters?.category || ""}
                                onChange={(e) =>
                                    handleFilterChange(
                                        "category",
                                        e.target.value,
                                    )
                                }
                            >
                                <option value="">Semua Kategori</option>
                                {categories &&
                                    categories.map((cat, idx) => (
                                        <option key={idx} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 pointer-events-none">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Documents List */}
                    <div className="grid grid-cols-1 gap-5">
                        {documentList.length > 0 ? (
                            documentList.map((doc) => {
                                const ext = getFileExtension(doc.file_path);
                                return (
                                    <div
                                        key={doc.id}
                                        className="flex flex-col justify-between gap-6 p-5 transition-all duration-300 transform bg-white border border-gray-100 shadow-sm dark:bg-gray-900 md:p-6 rounded-2xl dark:border-gray-800 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 md:flex-row md:items-center group"
                                    >
                                        <div className="flex items-start gap-5 md:items-center">
                                            {/* Icon Box */}
                                            <div className="flex items-center justify-center flex-shrink-0 transition-all duration-300 w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-xl group-hover:scale-110 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30">
                                                {renderFileIcon(ext)}
                                            </div>

                                            {/* Info */}
                                            <div>
                                                <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2 md:line-clamp-1">
                                                    {doc.title}
                                                </h3>
                                                <div className="flex flex-wrap items-center text-xs font-medium text-gray-500 gap-x-5 gap-y-2 dark:text-gray-400">
                                                    <span className="flex items-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-md">
                                                        {doc.category || "Umum"}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <svg
                                                            className="w-4 h-4 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                                                            ></path>
                                                        </svg>
                                                        Tersedia
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <svg
                                                            className="w-4 h-4 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            ></path>
                                                        </svg>
                                                        {formatDate(
                                                            doc.created_at,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Box */}
                                        <div className="flex items-center justify-between flex-shrink-0 gap-4 pt-4 mt-2 border-t border-gray-100 md:justify-end md:mt-0 md:pt-0 md:border-t-0 dark:border-gray-800">
                                            <span className="text-xs font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
                                                {ext}
                                            </span>
                                            <a
                                                href={`/${doc.file_path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white font-bold rounded-xl transition-all duration-300 shadow-sm hover:shadow-emerald-500/30"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                    ></path>
                                                </svg>
                                                Unduh
                                            </a>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="py-20 text-center bg-white border border-gray-100 shadow-sm dark:bg-gray-900 rounded-3xl dark:border-gray-800">
                                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-gray-50 dark:bg-gray-800">
                                    <svg
                                        className="w-10 h-10 text-gray-300 dark:text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                                        ></path>
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                                    Dokumen Tidak Ditemukan
                                </h3>
                                <p className="max-w-sm mx-auto text-gray-500 dark:text-gray-400">
                                    Coba gunakan kata kunci pencarian yang lain
                                    atau pilih kategori yang berbeda.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination - FIXED .includes bug */}
                    {documents?.links && documents.links.length > 3 && (
                        <div className="flex flex-wrap justify-center gap-2 mt-12">
                            {documents.links.map((link, index) => {
                                let label = link.label;
                                const stringLabel = String(link.label); // FIX ERROR HERE

                                if (stringLabel.includes("&laquo;"))
                                    label = (
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 19l-7-7 7-7"
                                            ></path>
                                        </svg>
                                    );
                                if (stringLabel.includes("&raquo;"))
                                    label = (
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            ></path>
                                        </svg>
                                    );

                                return link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        data={filters} // Kirim filter state saat klik pagination
                                        preserveScroll
                                        preserveState
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all ${
                                            link.active
                                                ? "border-transparent bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 -translate-y-1"
                                                : "border border-gray-200 bg-white hover:bg-gray-50 hover:border-emerald-300 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                ) : (
                                    <span
                                        key={index}
                                        className="flex items-center justify-center w-12 h-12 text-gray-400 border border-gray-100 cursor-not-allowed rounded-xl bg-gray-50 dark:bg-gray-800/50 dark:border-gray-800"
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
