import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Berita({ articles, categories, filters = {} }) {
    // State untuk form pencarian
    const [searchQuery, setSearchQuery] = useState(filters.search || "");

    // Tentukan list artikel dari data pagination
    const newsList = articles?.data || [];

    // Formatting Helper
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    // Handle pencarian tanpa reload halaman (Inertia SPA)
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            "/artikel",
            { search: searchQuery, category: filters.category },
            { preserveState: true, preserveScroll: true },
        );
    };

    return (
        <MainLayout title="Berita & Artikel | STIKes Bogor Husada">
            <Head>
                <meta head-key="description" name="description" content="Kumpulan berita, informasi, dan artikel terbaru dari STIKes Bogor Husada." />
                <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/artikel'} />
                <meta head-key="og:title" property="og:title" content="Berita & Artikel | STIKes Bogor Husada" />
                <meta head-key="og:description" property="og:description" content="Kumpulan berita, informasi, dan artikel terbaru dari STIKes Bogor Husada." />
            </Head>

            {/* --- IMPROVED HERO SECTION (Sama seperti Profil) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Berita & Artikel"
                        className="object-cover w-full h-full"
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
                                            Berita & Artikel
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Title & Subtitle */}
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                            Berita & Artikel
                        </h1>
                        <p className="max-w-2xl text-lg font-normal leading-relaxed text-gray-300 lg:text-xl">
                            Informasi terbaru seputar kegiatan, akademik,
                            publikasi, dan prestasi STIKes Bogor Husada.
                        </p>
                    </div>
                </div>

                {/* Bottom SVG Wave Divider (Match dengan warna bg-gray-50 dan dark mode bg-gray-900) */}
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

            {/* Main Content */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex flex-col gap-8 lg:flex-row">
                        {/* Main Grid (Left) */}
                        <div className="w-full lg:w-2/3">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {newsList.length > 0 ? (
                                    newsList.map((item) => {
                                        const bgImageUrl = item.thumbnail
                                            ? item.thumbnail.startsWith(
                                                  "http",
                                              ) ||
                                              item.thumbnail.startsWith("/")
                                                ? item.thumbnail
                                                : `/storage/${item.thumbnail}`
                                            : "/assets/img/placeholder.jpg";

                                        return (
                                            <Link
                                                href={
                                                    item.slug
                                                        ? `/artikel/${item.slug}`
                                                        : "/artikel"
                                                }
                                                key={item.id}
                                                className="flex flex-col overflow-hidden transition-shadow bg-white border border-gray-100 shadow-sm sm:rounded-2xl hover:shadow-md group dark:bg-gray-800 dark:border-gray-700"
                                            >
                                                <div className="relative pt-[55%] overflow-hidden bg-gray-100 dark:bg-gray-700">
                                                    <img
                                                        src={bgImageUrl}
                                                        alt={item.title}
                                                        className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="flex flex-col flex-1 p-5 lg:p-6">
                                                    <div className="flex items-center justify-between mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                                        <div className="flex items-center">
                                                            <svg
                                                                className="w-3.5 h-3.5 mr-1.5 text-orange-400"
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
                                                                item.published_at,
                                                            )}
                                                        </div>
                                                        {item.category && (
                                                            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-[10px] tracking-wide dark:bg-orange-900/30 dark:text-orange-400">
                                                                {
                                                                    item
                                                                        .category
                                                                        .name
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    {item.title && (
                                                        <h3 className="mb-3 text-lg font-bold leading-snug text-gray-900 transition-colors line-clamp-2 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                                                            {item.title}
                                                        </h3>
                                                    )}

                                                    <p className="flex-grow mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                                                        {item.excerpt ||
                                                            (item.content
                                                                ? item.content
                                                                      .replace(
                                                                          /<[^>]*>?/gm,
                                                                          "",
                                                                      )
                                                                      .substring(
                                                                          0,
                                                                          100,
                                                                      ) + "..."
                                                                : "")}
                                                    </p>

                                                    <div className="flex items-center pt-4 mt-auto text-sm font-semibold text-orange-600 transition-colors border-t border-gray-50 dark:border-gray-700 dark:text-orange-400 group-hover:text-orange-800 dark:group-hover:text-orange-300">
                                                        Baca Selengkapnya
                                                        <svg
                                                            className="w-4 h-4 ml-1 transition-all -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <div className="col-span-1 py-12 text-center bg-white border border-gray-100 shadow-sm md:col-span-2 dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                                        <svg
                                            className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                            ></path>
                                        </svg>
                                        <p className="font-medium text-gray-500 dark:text-gray-400">
                                            Belum ada berita yang diterbitkan
                                            atau ditemukan.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Pagination (Di-handle otomatis oleh Inertia) */}
                            {articles?.links && articles.links.length > 3 && (
                                <div className="flex flex-wrap justify-center gap-2 mt-12">
                                    {articles.links.map((link, index) => {
                                        // Solusi aman agar tidak error "label.includes is not a function"
                                        let label = link.label;
                                        const stringLabel = String(link.label);

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
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition-colors ${
                                                    link.active
                                                        ? "border border-orange-600 bg-orange-600 text-white shadow-md"
                                                        : "border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                                                }`}
                                            >
                                                {label}
                                            </Link>
                                        ) : (
                                            <span
                                                key={index}
                                                className="flex items-center justify-center w-10 h-10 text-gray-400 border border-gray-200 rounded-lg cursor-not-allowed bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700"
                                            >
                                                {label}
                                            </span>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Sidebar (Right) */}
                        <div className="w-full space-y-8 lg:w-1/3">
                            {/* Search Widget */}
                            <div className="p-6 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                                <h3 className="flex items-center mb-4 text-lg font-bold text-gray-800 text-gray-900 dark:text-white">
                                    <svg
                                        className="w-5 h-5 mr-2 text-orange-500"
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
                                    Cari Berita
                                </h3>
                                <div className="relative">
                                    <form onSubmit={handleSearch}>
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                            placeholder="Ketik kata kunci..."
                                            className="w-full py-3 pl-4 pr-12 text-sm transition-shadow border border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-1.5 top-1.5 bottom-1.5 w-10 flex items-center justify-center bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-sm"
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
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Categories Widget */}
                            <div className="p-6 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                                <h3 className="flex items-center mb-4 text-lg font-bold text-gray-800 text-gray-900 dark:text-white">
                                    <svg
                                        className="w-5 h-5 mr-2 text-orange-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                        ></path>
                                    </svg>
                                    Kategori
                                </h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link
                                            href={`/artikel${filters.search ? `?search=${filters.search}` : ""}`}
                                            className={`flex items-center justify-between p-3 rounded-xl transition-colors ${!filters.category ? "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 font-semibold" : "hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300"}`}
                                        >
                                            <span>Semua Berita</span>
                                            <svg
                                                className={`w-4 h-4 ${!filters.category ? "text-orange-500" : "text-gray-400"}`}
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
                                        </Link>
                                    </li>
                                    {categories &&
                                        categories.map((cat) => (
                                            <li key={cat.id}>
                                                <Link
                                                    href={`/artikel?category=${cat.id}${filters.search ? `&search=${filters.search}` : ""}`}
                                                    className={`flex items-center justify-between p-3 rounded-xl transition-colors ${String(filters.category) === String(cat.id) ? "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 font-semibold" : "hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300"}`}
                                                >
                                                    <span>{cat.name}</span>
                                                    <svg
                                                        className={`w-4 h-4 ${String(filters.category) === String(cat.id) ? "text-orange-500" : "text-gray-400"}`}
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
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
