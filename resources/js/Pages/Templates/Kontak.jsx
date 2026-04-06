import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";

const CAMPUSES = [
    {
        id: 'utama',
        label: 'Kampus Utama',
        address: 'Jl. Sholeh Iskandar No.4, Kedungbadak, Tanah Sareal, Kota Bogor, Jawa Barat 16164',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.675611043629!2d106.7953086!3d-6.562567599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c414432be2cf%3A0x7ded3da932bab34d!2sSTIKes%20Bogor%20Husada!5e0!3m2!1sid!2sid!4v1775457818082!5m2!1sid!2sid',
        mapLink: 'https://maps.app.goo.gl/uX3L5t2aR1a1E1W88',
        icon: 'fa-building',
        color: 'orange',
    },
    {
        id: 'dua',
        label: 'Kampus 2',
        address: 'RT.04/RW.11, Kedungbadak, Tanah Sareal, Kota Bogor, Jawa Barat 16164',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.677044715015!2d106.7980992080039!3d-6.562387454295575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5cb6b3c65d3%3A0x495245d16fefed21!2sGedung%202%20STIKes%20Bogor%20Husada!5e0!3m2!1sid!2sid!4v1775457968713!5m2!1sid!2sid',
        mapLink: 'https://goo.gl/maps/gedung2stikesbh',
        icon: 'fa-university',
        color: 'indigo',
    }
];

const CONTACTS = [
    {
        title: 'WhatsApp Admin 1',
        value: '+62 811-1011-1560',
        href: 'https://wa.me/6281110111560',
        icon: 'fab fa-whatsapp',
        bgColor: 'bg-green-500',
        shadowColor: 'shadow-green-500/20',
    },
    {
        title: 'WhatsApp Admin 2',
        value: '+62 823-2178-0950',
        href: 'https://wa.me/6282321780950',
        icon: 'fab fa-whatsapp',
        bgColor: 'bg-green-500',
        shadowColor: 'shadow-green-500/20',
    },
    {
        title: 'Email Akademik',
        value: 'info@sbh.ac.id',
        href: 'mailto:info@sbh.ac.id',
        icon: 'fas fa-envelope',
        bgColor: 'bg-orange-600',
        shadowColor: 'shadow-orange-600/20',
        fullWidth: true,
    },
];

export default function Kontak() {
    const [activeCampus, setActiveCampus] = useState(0);

    return (
        <MainLayout title="Hubungi Kami | STIKes Bogor Husada">
            {/* --- HERO SECTION --- */}
            <section className="relative w-full pt-40 pb-24 overflow-hidden bg-gray-900 md:pt-48 md:pb-32">
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
                        <nav className="flex mb-8" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center px-4 py-2 space-x-1 border rounded-full md:space-x-3 bg-white/10 backdrop-blur-md border-white/20">
                                <li className="inline-flex items-center">
                                    <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-200 transition-colors hover:text-white">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                        </svg>
                                        Beranda
                                    </Link>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="ml-1 text-sm font-bold text-orange-400 md:ml-2">Hubungi Kami</span>
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
                    <svg className="relative block w-full h-[80px] md:h-[150px] lg:h-[200px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="currentColor" className="text-white dark:text-gray-900" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,154.7C960,128,1056,128,1152,144C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </section>

            {/* --- CONTENT SECTION --- */}
            <div className="py-16 bg-white md:py-24 dark:bg-gray-900">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

                        {/* LEFT: Info Block */}
                        <div className="space-y-10">
                            <div>
                                <span className="inline-block px-4 py-1.5 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold rounded-full text-xs mb-4 tracking-widest uppercase border border-orange-100 dark:border-orange-800">
                                    Informasi & Konsultasi
                                </span>
                                <h2 className="mb-6 text-3xl font-black leading-tight tracking-tight text-gray-900 lg:text-5xl dark:text-white">
                                    Koneksi Langsung <br />
                                    Dengan{" "}
                                    <span className="text-orange-500">Kampus Kami</span>
                                </h2>
                                <p className="max-w-lg text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                                    Dapatkan bantuan seputar pendaftaran mahasiswa baru, informasi beasiswa,
                                    tracer study, atau kolaborasi strategis dengan institusi kesehatan kami.
                                </p>
                            </div>

                            {/* Contact Cards */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {CONTACTS.map((contact, idx) => (
                                    <a
                                        key={idx}
                                        href={contact.href}
                                        target={contact.href.startsWith('http') ? '_blank' : undefined}
                                        rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className={`flex items-center gap-4 p-5 transition-all border border-gray-100 shadow-sm bg-gray-50 dark:bg-gray-800 rounded-2xl dark:border-gray-700 group hover:border-orange-200 hover:shadow-md hover:-translate-y-0.5 ${contact.fullWidth ? 'sm:col-span-2' : ''}`}
                                    >
                                        <div className={`flex items-center justify-center flex-shrink-0 w-12 h-12 text-white transition-transform ${contact.bgColor} shadow-lg rounded-xl ${contact.shadowColor} group-hover:scale-110`}>
                                            <i className={`text-xl ${contact.icon}`}></i>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="mb-0.5 font-bold text-gray-900 dark:text-white text-sm">{contact.title}</h4>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">{contact.value}</p>
                                        </div>
                                        <i className="text-xs text-gray-300 transition-transform fas fa-arrow-right group-hover:translate-x-1 group-hover:text-orange-500"></i>
                                    </a>
                                ))}
                            </div>

                            {/* Campus Location Cards */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase dark:text-gray-500">
                                    <i className="mr-2 fas fa-map-marker-alt text-orange-500"></i>Lokasi Kampus
                                </h3>
                                {CAMPUSES.map((campus, idx) => (
                                    <button
                                        key={campus.id}
                                        onClick={() => setActiveCampus(idx)}
                                        className={`w-full flex items-start gap-4 p-5 text-left transition-all border rounded-2xl group ${
                                            activeCampus === idx
                                                ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700 shadow-md shadow-orange-500/10 ring-1 ring-orange-200 dark:ring-orange-800'
                                                : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-orange-200 hover:shadow-sm'
                                        }`}
                                    >
                                        <div className={`flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl transition-all ${
                                            activeCampus === idx
                                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-600'
                                        }`}>
                                            <i className={`fas ${campus.icon}`}></i>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{campus.label}</h4>
                                                {activeCampus === idx && (
                                                    <span className="px-2 py-0.5 text-[10px] font-bold text-orange-600 bg-orange-100 dark:bg-orange-900/50 dark:text-orange-400 rounded-full">
                                                        Tampil di Peta
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">{campus.address}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: Map Block with Campus Tabs */}
                        <div className="relative lg:sticky lg:top-40 lg:self-start">
                            <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/10 border border-gray-200 dark:border-gray-700 min-h-[500px] lg:min-h-[600px]">

                                {/* Map Tabs */}
                                <div className="flex bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                    {CAMPUSES.map((campus, idx) => (
                                        <button
                                            key={campus.id}
                                            onClick={() => setActiveCampus(idx)}
                                            className={`flex-1 py-3.5 px-4 text-xs font-bold tracking-wide uppercase transition-all relative ${
                                                activeCampus === idx
                                                    ? 'text-orange-600 dark:text-orange-400 bg-white dark:bg-gray-900'
                                                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                            }`}
                                        >
                                            <i className={`fas ${campus.icon} mr-2`}></i>
                                            {campus.label}
                                            {activeCampus === idx && (
                                                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-orange-500 rounded-full"></span>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Map iframe */}
                                <div className="relative w-full h-[450px] lg:h-[540px] group">
                                    <iframe
                                        key={CAMPUSES[activeCampus].id}
                                        src={CAMPUSES[activeCampus].mapEmbed}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="absolute inset-0 transition-all duration-700 grayscale-[30%] group-hover:grayscale-0"
                                    ></iframe>
                                </div>

                                {/* Floating Action Bar */}
                                <div className="flex items-center justify-between p-4 border-t border-gray-100 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                                    <div>
                                        <h5 className="text-xs font-bold tracking-wider text-gray-800 uppercase dark:text-white">
                                            {CAMPUSES[activeCampus].label}
                                        </h5>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                            Buka di Google Maps
                                        </p>
                                    </div>
                                    <a
                                        href={CAMPUSES[activeCampus].mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-5 py-2.5 bg-gray-900 dark:bg-orange-600 text-white text-xs font-bold rounded-xl hover:bg-orange-600 dark:hover:bg-orange-700 transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95"
                                    >
                                        <i className="fas fa-directions"></i> Petunjuk Arah
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
