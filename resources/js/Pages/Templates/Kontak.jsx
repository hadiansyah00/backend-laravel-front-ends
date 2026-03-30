import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";

export default function Kontak() {
    return (
        <MainLayout title="Hubungi Kami | STIKes Bogor Husada">
            {/* --- IMPROVED HERO SECTION (Kontak) --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/img/hero-fallback.png"
                        alt="Kampus STIKes Bogor Husada"
                        className="object-cover w-full h-full opacity-60"
                        onError={(e) => {
                            e.target.src =
                                "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-orange-900/60"></div>
                </div>

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
                                            Hubungi Kami
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                            Hubungi Kami
                        </h1>
                        <p className="max-w-2xl text-lg font-normal leading-relaxed text-gray-300 lg:text-xl">
                            Kami selalu siap mendengar saran, pertanyaan, atau
                            permohonan informasi akademik Anda. Silakan hubungi
                            tim kami melalui kanal informasi resmi di bawah ini.
                        </p>
                    </div>
                </div>

                {/* Wave Divider */}
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

            {/* --- CONTENT SECTION --- */}
            <div className="py-16 bg-white md:py-24 dark:bg-gray-900">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                        {/* Info Block */}
                        <div className="space-y-10">
                            <div>
                                <span className="inline-block px-4 py-1.5 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold rounded-full text-xs mb-4 tracking-widest uppercase border border-orange-100 dark:border-orange-800">
                                    Informasi & Konsultasi
                                </span>
                                <h2 className="mb-6 text-3xl font-black leading-tight tracking-tight text-gray-900 lg:text-5xl dark:text-white">
                                    Koneksi Langsung <br />
                                    Dengan{" "}
                                    <span className="text-orange-500">
                                        Kampus Kami
                                    </span>
                                </h2>
                                <p className="max-w-lg text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                                    Dapatkan bantuan seputar pendaftaran
                                    mahasiswa baru, informasi beasiswa, tracer
                                    study, atau kolaborasi strategis dengan
                                    institusi kesehatan kami.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2">
                                <div className="flex flex-col gap-4 p-6 transition-all border border-gray-100 shadow-sm bg-gray-50 dark:bg-gray-800 rounded-2xl dark:border-gray-700 group hover:border-orange-200">
                                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white transition-transform bg-orange-500 shadow-lg rounded-xl shadow-orange-500/20 group-hover:scale-110">
                                        <i className="text-xl fas fa-phone-alt"></i>
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-bold text-gray-900 dark:text-white">
                                            Telepon Resmi
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            (0251) 8355 777
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 p-6 transition-all border border-gray-100 shadow-sm bg-gray-50 dark:bg-gray-800 rounded-2xl dark:border-gray-700 group hover:border-orange-200">
                                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white transition-transform bg-green-500 shadow-lg rounded-xl shadow-green-500/20 group-hover:scale-110">
                                        <i className="text-xl fab fa-whatsapp"></i>
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-bold text-gray-900 dark:text-white">
                                            WhatsApp Admin
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            0812-1111-xxxx
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 p-6 transition-all border border-gray-100 shadow-sm bg-gray-50 dark:bg-gray-800 rounded-2xl dark:border-gray-700 sm:col-span-2 group hover:border-orange-200">
                                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white transition-transform bg-indigo-600 shadow-lg rounded-xl shadow-indigo-600/20 group-hover:scale-110">
                                        <i className="text-xl fas fa-envelope"></i>
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-bold text-gray-900 dark:text-white">
                                            Email Akademik
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            info@stikesbh.ac.id
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 p-6 transition-all border border-gray-100 shadow-sm bg-gray-50 dark:bg-gray-800 rounded-2xl dark:border-gray-700 sm:col-span-2 group hover:border-orange-200">
                                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white transition-transform bg-orange-600 shadow-lg rounded-xl shadow-orange-600/20 group-hover:scale-110">
                                        <i className="text-xl fas fa-map-marker-alt"></i>
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-bold text-gray-900 dark:text-white">
                                            Lokasi Kampus Utama
                                        </h4>
                                        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                            Jl. Letjen Ibrahim Adjie No.180,
                                            Kel. Sindangbarang, Kec. Bogor
                                            Barat, Kota Bogor, Jawa Barat 16117
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Block */}
                        <div className="relative">
                            <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/10 border border-gray-200 dark:border-gray-700 h-full min-h-[500px] group">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.435773177893!2d106.7588371!3d-6.592652199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c50058e57877%3A0xc3f982a5c328e124!2sSTIKes%20Bogor%20Husada!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0 transition-all duration-700 grayscale contrast-125 group-hover:grayscale-0"
                                ></iframe>

                                {/* Overlay Floating Action */}
                                <div className="absolute flex items-center justify-between p-4 shadow-xl bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-2xl">
                                    <div className="hidden sm:block">
                                        <h5 className="text-xs font-bold tracking-wider uppercase dark:text-white">
                                            Navigasi Langsung
                                        </h5>
                                        <p className="text-[10px] text-gray-500">
                                            Buka via Google Maps Apps
                                        </p>
                                    </div>
                                    <a
                                        href="https://maps.app.goo.gl/uX3L5t2aR1a1E1W88"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-5 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-2"
                                    >
                                        <i className="fas fa-directions"></i>{" "}
                                        Petunjuk Arah
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
