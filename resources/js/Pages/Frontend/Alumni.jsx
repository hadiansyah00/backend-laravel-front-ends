import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { router, Link } from "@inertiajs/react";

export default function Alumni({
    alumnis,
    tahunList = [],
    prodiList = [],
    filters = {},
}) {
    const alumniList = alumnis?.data || alumnis || [];

    const [search, setSearch] = useState(filters.search || "");
    const [tahunLulus, setTahunLulus] = useState(filters.tahun_lulus || "");
    const [prodi, setProdi] = useState(filters.prodi || "");

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "/assets/img/dosen/default.png";
        if (imagePath.startsWith("http") || imagePath.startsWith("/")) return imagePath;
        return `/storage/${imagePath}`;
    };

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(
            "/alumni",
            { search, tahun_lulus: tahunLulus, prodi },
            { preserveState: true },
        );
    };

    const handleReset = () => {
        setSearch("");
        setTahunLulus("");
        setProdi("");
        router.get("/alumni", {}, { preserveState: true });
    };

    return (
        <MainLayout title="Ikatan Alumni | STIKes Bogor Husada">
            {/* --- IMPROVED HERO SECTION (Ikatan Alumni) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/img/hero-fallback.png"
                        alt="Ikatan Alumni STIKes Bogor Husada"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src =
                                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
                        }}
                    />
                    {/* Gradient Overlay (Konsisten: Dark to Orange/Health vibes) */}
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
                                            Ikatan Alumni
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Title & Subtitle */}
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                            Ikatan Alumni
                        </h1>
                        <p className="max-w-2xl text-lg font-normal leading-relaxed text-gray-300 lg:text-xl">
                            Kisah sukses lulusan STIKes Bogor Husada di dunia
                            kerja profesional bidang kesehatan dan jejaring
                            silaturahmi antar angkatan.
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
                    {/* Filter Bar */}
                    <form
                        onSubmit={handleFilter}
                        className="p-5 mb-12 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-2xl dark:border-gray-700 md:p-6"
                    >
                        <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
                            <input
                                type="text"
                                placeholder="Cari nama alumni..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 min-w-[160px] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                            <select
                                value={prodi}
                                onChange={(e) => setProdi(e.target.value)}
                                className="flex-1 min-w-[160px] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Semua Program Studi</option>
                                {(prodiList || []).map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={tahunLulus}
                                onChange={(e) => setTahunLulus(e.target.value)}
                                className="flex-1 min-w-[140px] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Semua Angkatan</option>
                                {(tahunList || []).map((t) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
                            >
                                <i className="fas fa-search"></i> Cari
                            </button>
                            {(search || prodi || tahunLulus) && (
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="px-4 py-2 text-sm font-semibold text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Alumni Grid */}
                    <div className="mb-16">
                        <div className="max-w-2xl mx-auto mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                                Profil Alumni Inspiratif
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Jejak langkah nyata dari mereka yang telah
                                berkontribusi bagi kesehatan masyarakat
                                Indonesia.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {alumniList.length > 0 ? (
                                alumniList.map((alumni) => (
                                    <div
                                        key={alumni.id}
                                        className="overflow-hidden transition-all bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-2xl dark:border-gray-700 hover:shadow-lg group"
                                    >
                                        <div className="relative flex flex-col h-full p-8 text-center">
                                            <i className="absolute text-4xl text-gray-100 fas fa-quote-left dark:text-gray-700 top-6 left-6"></i>
                                            <div className="relative z-10 w-24 h-24 mx-auto mb-6 overflow-hidden border-4 border-white rounded-full shadow-md dark:border-gray-800">
                                                <img
                                                    src={getImageUrl(
                                                        alumni.photo,
                                                    )}
                                                    alt={alumni.name}
                                                    className="object-cover w-full h-full transition-transform group-hover:scale-110"
                                                    onError={(e) => {
                                                        e.target.src = "/assets/img/dosen/default.png";
                                                    }}
                                                />
                                            </div>
                                            <p className="relative z-10 mb-6 italic font-medium text-gray-600 dark:text-gray-300">
                                                "
                                                {alumni.testimonial ||
                                                    "Ilmu yang saya dapatkan di STIKes Bogor Husada sangat relevan dan aplikatif."}
                                                "
                                            </p>
                                            <div className="relative z-10 mt-auto">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                    {alumni.name}
                                                </h3>
                                                <p className="mt-1 text-sm font-semibold text-orange-600 dark:text-orange-400">
                                                    {alumni.jabatan ||
                                                        alumni.tempat_kerja ||
                                                        "Alumni"}
                                                </p>
                                                <p className="mt-2 text-xs text-gray-500">
                                                    {alumni.program_studi?.name ||
                                                        "STIKes Bogor Husada"}
                                                    {alumni.tahun_lulus
                                                        ? ` - Angkatan ${alumni.tahun_lulus}`
                                                        : ""}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-12 text-center text-gray-500 col-span-full">
                                    <i className="block mb-4 text-5xl text-gray-300 fas fa-users"></i>
                                    <p>
                                        Data alumni belum tersedia atau tidak
                                        ditemukan untuk filter ini.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    {alumnis?.links && alumnis.links.length > 3 && (
                        <div className="flex flex-wrap justify-center gap-1 mt-4 mb-12">
                            {alumnis.links
                                .filter((l) => l.url)
                                .map((link, i) => (
                                    <button
                                        key={i}
                                        onClick={() => router.get(link.url)}
                                        className={`min-w-[36px] px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${link.active ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"}`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                        </div>
                    )}

                    {/* Registrasi Banner */}
                    <div className="relative p-10 overflow-hidden text-center shadow-xl bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl md:p-16">
                        <div className="absolute top-0 right-0 w-64 h-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-orange-500/20 blur-3xl"></div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                                Bergabung dengan Jaringan Alumni Kami
                            </h2>
                            <p className="mb-8 text-lg text-indigo-100">
                                Perbarui data diri Anda secara berkala agar
                                tidak tertinggal info lowongan eksklusif, agenda
                                tracer study, dan temu alumni akbar.
                            </p>
                            <button
                                onClick={() =>
                                    alert("Integrasi Tracer Study belum aktif.")
                                }
                                className="flex items-center justify-center gap-3 px-8 py-4 mx-auto text-lg font-bold text-white transition-all bg-orange-500 shadow-lg hover:bg-orange-600 rounded-xl shadow-orange-500/30"
                            >
                                <i className="fas fa-user-plus"></i> Form
                                Pendaftaran Alumni
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
