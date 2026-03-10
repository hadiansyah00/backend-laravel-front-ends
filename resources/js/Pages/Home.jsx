import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

// Swiper for sliders
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Formatter helper
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

// Helper: extract YouTube embed URL from any YouTube link format
const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

export default function Home({ berita, programStudis, beranda = {}, pengumuman = [], events = [], galleries = [] }) {
    
    // Extract definitions from beranda
    const heroData = beranda.hero || {};
    const sliders = heroData.sliders || [];
    
    const quickActionData = beranda.quick_action || {};
    
    const programStudiSettings = beranda.program_studi || {};
    
    const videoContent = beranda.video_profil || {};
    
    const testimoniSettings = beranda.testimoni || {};
    const testimonials = testimoniSettings.items || [];

    const videoEmbedUrl = videoContent ? getYouTubeEmbedUrl(videoContent.video_url) : '';

    return (
        <MainLayout title="Beranda">
            <Head>
                <title>Beranda - STIKes Bogor Husada</title>
                <meta name="description" content="Selamat datang di website resmi STIKes Bogor Husada. Kampus kesehatan terbaik yang mencetak tenaga medis profesional." />
            </Head>

            {/* 1. HERO SLIDER SECTION */}
            <section className="relative w-full h-[80vh] min-h-[500px] bg-gray-900">
                {sliders && sliders.length > 0 ? (
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, EffectFade]}
                        effect="fade"
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                        className="w-full h-full hero-swiper"
                    >
                        {sliders.map((slider, idx) => (
                            <SwiperSlide key={idx} className="relative w-full h-full">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={slider.image ? (slider.image.startsWith('http') || slider.image.startsWith('/') ? slider.image : `/storage/${slider.image}`) : '/assets/img/hero-fallback.png'}
                                        alt={slider.title}
                                        className="object-cover w-full h-full"
                                        onError={(e) => { e.target.src='/assets/img/hero-fallback.png'; }}
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40"></div>
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 flex items-center">
                                    <div className="container px-6 mx-auto lg:px-12">
                                        <div className="max-w-3xl text-white">
                                            {slider.subtitle && (
                                                <span className="inline-block px-4 py-1 mb-4 text-sm font-bold tracking-wider text-orange-600 uppercase bg-white rounded-full">
                                                    {slider.subtitle}
                                                </span>
                                            )}
                                            <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl text-shadow-sm">
                                                {slider.title}
                                            </h1>
                                            {slider.description && (
                                                <p className="mb-8 text-lg md:text-xl text-gray-200 line-clamp-3">
                                                    {slider.description}
                                                </p>
                                            )}
                                            {slider.link && (
                                                <a
                                                    href={slider.link}
                                                    className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all transform bg-orange-600 rounded-lg hover:bg-orange-700 hover:-translate-y-1 shadow-lg shadow-orange-600/30"
                                                >
                                                    {slider.link_text || 'Pelajari Lebih Lanjut'}
                                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0">
                            <img
                                src="/assets/img/hero-fallback.png"
                                alt="STIKes Bogor Husada Hero"
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center">
                            <div className="container px-6 mx-auto lg:px-12">
                                <div className="max-w-3xl text-white">
                                    <span className="inline-block px-4 py-1 mb-4 text-sm font-bold tracking-wider text-orange-600 uppercase bg-white rounded-full">
                                        Selamat Datang
                                    </span>
                                    <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl text-shadow-sm">
                                        Mencetak Tenaga Kesehatan Profesional
                                    </h1>
                                    <p className="mb-8 text-lg md:text-xl text-gray-200">
                                        Kampus terbaik untuk masa depan karir dunia kesehatan. Fasilitas lengkap, dosen berpengalaman, dan kurikulum standar industri.
                                    </p>
                                    <a href="/pmb" className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all transform bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700 hover:-translate-y-1 shadow-orange-600/30">
                                        Daftar Sekarang
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* 2. PMB QUICK ACTION BANNER */}
            {beranda.quick_action && (
                <section className="relative z-20 px-6 mx-auto -mt-10 max-w-7xl lg:px-12">
                    <div className="grid overflow-hidden bg-white shadow-2xl md:grid-cols-2 rounded-2xl">
                        <div className="p-8 md:p-12 bg-gradient-to-br from-indigo-900 to-indigo-800 text-white">
                            <h2 className="mb-4 text-3xl font-bold">{beranda.quick_action.title || 'Penerimaan Mahasiswa Baru'}</h2>
                            <p className="mb-8 text-indigo-100">{quickActionData.subtitle || 'Mari bergabung dan kembangkan potensi Anda di bidang kesehatan bersama fasilitas modern dan pengajar profesional.'}</p>
                            <a href={quickActionData.button_link || "https://pmb.sbh.ac.id"} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 font-semibold text-indigo-900 transition-colors bg-white rounded-lg hover:bg-indigo-50">
                                {quickActionData.button_text || 'Daftar Sekarang'}
                            </a>
                        </div>
                        <div className="p-8 md:p-12">
                            <h2 className="mb-4 text-2xl font-bold text-gray-800">{quickActionData.info_title || 'Butuh Informasi Lengkap?'}</h2>
                            <p className="mb-6 text-gray-600">{quickActionData.info_subtitle || 'Dapatkan brosur pendaftaran digital dan rincian biaya studi kami dengan mendaftarkan email Anda.'}</p>
                            <a href={quickActionData.info_link || "/pendaftaran-email/create"} className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800">
                                {quickActionData.info_link_text || 'Unduh Brosur PMB'}
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </a>
                        </div>
                    </div>
                </section>
            )}

            {/* 3. PROGRAM STUDI SECTION */}
            {
                programStudis && programStudis.length > 0 && (
                    <section className="py-24 bg-gray-50">
                        <div className="container px-6 mx-auto lg:px-12">
                            <div className="mb-16 text-center">
                                <span className="text-sm font-bold tracking-wider text-orange-600 uppercase">{programStudiSettings.badge || 'Akademik'}</span>
                                <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">{beranda.program_studi?.title || 'Program Studi Pilihan'}</h2>
                                <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">{programStudiSettings.description || 'Terakreditasi dan dirancang untuk mencetak tenaga ahli yang siap terjun ke dunia kerja kesehatan.'}</p>
                            </div>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                {programStudis.map((prodi, idx) => (
                                    <div key={idx} className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-xl hover:-translate-y-2 group">
                                        <div className="relative pt-[60%] overflow-hidden bg-gray-200">
                                            {prodi.image ? (
                                                <img
                                                    src={`/storage/${prodi.image}`}
                                                    alt={prodi.name}
                                                    className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-orange-50">
                                                    <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col flex-1 p-8">
                                            <div className="flex items-center gap-2 mb-3">
                                                {prodi.gelar && (
                                                    <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full">
                                                        {prodi.gelar}
                                                    </span>
                                                )}
                                                {prodi.akreditasi && (
                                                    <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                                                        Akreditasi {prodi.akreditasi}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="mb-3 text-2xl font-bold text-gray-900">{prodi.name}</h3>
                                            <p className="flex-1 mb-6 text-gray-600 line-clamp-3">
                                                {prodi.description || `Program studi ${prodi.name} dengan kurikulum yang komprehensif dan fasilitas praktikum terdepan.`}
                                            </p>
                                            <Link href={`/${prodi.slug}`} className="inline-flex items-center text-sm font-semibold text-orange-600 transition-colors hover:text-orange-800">
                                                Lihat Detail Program
                                                <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* 5. VIDEO COMPANY PROFILE */}
            {beranda.video_profil && (
                <section className="py-24 bg-white">
                    <div className="container px-6 mx-auto lg:px-12">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="text-sm font-bold tracking-wider text-orange-600 uppercase">
                                {videoContent?.badge || 'Company Profile'}
                            </span>
                            <h2 className="mt-2 mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                                {beranda.video_profil?.title || 'Mengenal Lebih Dekat STIKes Bogor Husada'}
                            </h2>
                            <p className="mb-8 text-lg leading-relaxed text-gray-600">
                                {videoContent?.description || 'Video profil ini memperkenalkan STIKes Bogor Husada, sebuah institusi pendidikan tinggi kesehatan yang berlokasi di Kota Bogor.'}
                            </p>
                            <a
                                href={videoContent?.video_url || 'https://www.youtube.com/watch?v=JKkfJVV4RHQ'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all bg-orange-600 rounded-lg hover:bg-orange-700 shadow-lg shadow-orange-600/30 hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                Tonton Video
                            </a>
                        </div>
                    </div>
                </section>
            )}

            {/* 6. BERITA & PENGUMUMAN */}
            {
                ((berita && berita.length > 0) || (pengumuman && pengumuman.length > 0)) && (
                    <section className="py-24 bg-gray-50/50">
                        <div className="container px-6 mx-auto lg:px-12">
                            <div className="flex flex-col items-start justify-between mb-12 space-y-4 md:flex-row md:items-end md:space-y-0">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">Kabar Terbaru Kampus</h2>
                                    <p className="mt-2 text-sm text-gray-500">Informasi publik dan berita terkini dari STIKes Bogor Husada.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                {/* KOLOM KIRI: BERITA (2 Kolom) */}
                                <div className="lg:col-span-2">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold flex items-center text-gray-800">
                                            <svg className="w-5 h-5 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                                            Berita & Artikel
                                        </h3>
                                        <Link href="/berita" className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-lg hover:bg-indigo-100 transition-colors">
                                            Semua Berita <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                        </Link>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {berita && berita.map((item) => {
                                            const bgImageUrl = item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/assets/img/placeholder.jpg';
                                            return (
                                                <Link href={`/berita/${item.slug}`} key={item.id} className="flex flex-col overflow-hidden bg-white border border-gray-100 shadow-sm sm:rounded-2xl hover:shadow-md transition-shadow group">
                                                    <div className="relative pt-[55%] overflow-hidden bg-gray-100">
                                                        <img
                                                            src={bgImageUrl}
                                                            alt={item.title.rendered}
                                                            className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col flex-1 p-5 lg:p-6">
                                                        <div className="flex items-center mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                            <svg className="w-3.5 h-3.5 mr-1.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                            {formatDate(item.date)}
                                                        </div>
                                                        {item.title && item.title.rendered && (
                                                            <h3 className="mb-3 text-lg font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors" dangerouslySetInnerHTML={{ __html: item.title.rendered }}></h3>
                                                        )}
                                                        <div className="mt-auto pt-4 border-t border-gray-50 text-sm font-semibold text-indigo-600 group-hover:text-indigo-800 transition-colors flex items-center">
                                                            Baca Selengkapnya
                                                            <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* KOLOM KANAN: PENGUMUMAN (1 Kolom) */}
                                <div className="lg:col-span-1">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold flex items-center text-gray-800">
                                            <svg className="w-5 h-5 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
                                            Pengumuman
                                        </h3>
                                        <Link href="/pengumuman" className="inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-lg hover:bg-emerald-100 transition-colors">
                                            Semua <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                        </Link>
                                    </div>

                                    <div className="flex flex-col space-y-3 bg-white border border-gray-100 shadow-sm sm:rounded-2xl p-2 h-max">
                                        {pengumuman && pengumuman.length > 0 ? (
                                            pengumuman.map((item) => (
                                                <Link 
                                                    href={`/pengumuman/${item.slug}`} 
                                                    key={item.id} 
                                                    className="flex flex-col p-4 transition-colors rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 group"
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 rounded-md">
                                                            {formatDate(item.created_at)}
                                                        </span>
                                                        <svg className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                                    </div>
                                                    <h4 className="font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
                                                        {item.title}
                                                    </h4>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="p-8 text-center">
                                                <i className="fas fa-bullhorn text-3xl text-gray-200 mb-3"></i>
                                                <p className="text-sm text-gray-500">Belum ada pengumuman terbaru.</p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Quick Link Card below Pengumuman */}
                                    <div className="mt-8 bg-indigo-600 rounded-2xl p-6 text-white text-center shadow-sm relative overflow-hidden group border border-indigo-700">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:scale-125 transition-transform duration-700"></div>
                                        <div className="relative z-10">
                                            <div className="w-12 h-12 bg-indigo-500/50 rounded-xl flex items-center justify-center mx-auto mb-4 border border-indigo-500">
                                                <svg className="w-6 h-6 text-indigo-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            </div>
                                            <h4 className="font-bold text-lg mb-1">Pusat Bantuan</h4>
                                            <p className="text-indigo-200 text-sm mb-5 leading-relaxed">Butuh informasi lengkap seputar PMB atau kegiatan akademik?</p>
                                            <a href="/kontak" className="inline-block w-full px-4 py-3 bg-white text-indigo-700 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                                                Hubungi Kami Sekarang
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }

            {/* 6.5. AGENDA / EVENTS */}
            {
                events && events.length > 0 && (
                    <section className="py-24 bg-white relative overflow-hidden">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-orange-50 rounded-full blur-3xl opacity-60"></div>
                        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

                        <div className="container px-6 mx-auto lg:px-12 relative z-10">
                            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                                <div className="max-w-2xl">
                                    <span className="text-sm font-bold tracking-wider text-orange-600 uppercase">Agenda Kampus</span>
                                    <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">Kegiatan & Acara Mendatang</h2>
                                    <p className="mt-4 text-gray-600 text-lg">Jangan lewatkan berbagai kegiatan menarik, seminar, dan acara akademik yang diselenggarakan oleh STIKes Bogor Husada.</p>
                                </div>
                                <Link href="/event" className="flex-shrink-0 inline-flex items-center px-6 py-3 font-semibold text-white transition-all bg-indigo-900 rounded-lg hover:bg-indigo-800 shadow-md hover:-translate-y-1">
                                    Lihat Semua Agenda
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {events.map((event) => {
                                    const startDate = new Date(event.start_date);
                                    const day = startDate.getDate();
                                    const month = startDate.toLocaleDateString('id-ID', { month: 'short' });
                                    const time = startDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

                                    return (
                                        <Link href={`/event/${event.slug}`} key={event.id} className="group relative flex flex-col sm:flex-row items-center bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
                                            {/* Calendar Box (Left) */}
                                            <div className="flex-shrink-0 w-full sm:w-32 h-32 sm:h-full bg-indigo-50 flex flex-col items-center justify-center p-6 border-b sm:border-b-0 sm:border-r border-indigo-100 group-hover:bg-indigo-600 transition-colors">
                                                <span className="text-sm font-bold text-indigo-800 uppercase tracking-widest group-hover:text-indigo-200">{month}</span>
                                                <span className="text-4xl lg:text-5xl font-extrabold text-indigo-900 group-hover:text-white leading-none my-1">{day}</span>
                                            </div>

                                            {/* Event Details (Right) */}
                                            <div className="flex-1 p-6 relative">
                                                {/* Decorative Icon */}
                                                <svg className="absolute top-6 right-6 w-8 h-8 text-gray-100 group-hover:text-orange-100 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/></svg>

                                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 pr-8">{event.title}</h3>
                                                
                                                <div className="flex flex-col space-y-2">
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                        {time} WIB - Selesai
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                                        <span className="truncate">{event.location || 'Kampus STIKes Bogor Husada'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* 7. TESTIMONIALS */}
            {
                testimonials && testimonials.length > 0 && (
                    <section className="py-24 bg-white relative overflow-hidden">
                        {/* Background Decorators */}
                        <div className="absolute top-0 right-0 w-64 h-64 transform translate-x-1/2 -translate-y-1/2 bg-indigo-50 rounded-full opacity-50 blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 transform -translate-x-1/2 translate-y-1/2 bg-orange-50 rounded-full opacity-50 blur-3xl pointer-events-none"></div>

                        <div className="container px-6 mx-auto lg:px-12 relative z-10">
                            <div className="mb-16 text-center max-w-2xl mx-auto">
                                <span className="text-sm font-bold tracking-wider text-orange-600 uppercase">
                                    {testimoniSettings.badge || 'Suara Alumni'}
                                </span>
                                <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
                                    {beranda.testimoni?.title || 'Alumni STIKes Bogor Husada'}
                                </h2>
                                <p className="mt-4 text-gray-600 text-lg">
                                    {testimoniSettings.description || 'Dengarkan cerita sukses dan pengalaman belajar dari para alumni kami yang kini telah berkarya di berbagai instansi kesehatan.'}
                                </p>
                            </div>

                            <div className="relative testimonial-slider-container">
                                <Swiper
                                    modules={[Navigation, Pagination, Autoplay]}
                                    spaceBetween={32}
                                    slidesPerView={1}
                                    navigation
                                    pagination={{ clickable: true, dynamicBullets: true }}
                                    autoplay={{ delay: 6000, disableOnInteraction: false }}
                                    breakpoints={{
                                        768: { slidesPerView: 2 },
                                        1024: { slidesPerView: 3 },
                                    }}
                                    className="!pb-16 px-2"
                                >
                                    {testimonials.map((testi, idx) => (
                                        <SwiperSlide key={idx} className="h-auto">
                                            <div className="relative flex flex-col h-full p-8 transition-all duration-300 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:-translate-y-2 group group-hover:bg-gray-50 shadow-sm">
                                                <svg className="absolute w-12 h-12 text-orange-100 transition-colors top-6 right-6 group-hover:text-orange-200" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" /></svg>

                                                <div className="relative z-10 flex flex-col flex-1">
                                                    <p className="mb-8 text-lg italic leading-relaxed text-gray-600 flex-1">
                                                        "{testi.message}"
                                                    </p>

                                                    <div className="flex items-center pt-6 mt-auto border-t border-gray-100">
                                                        {testi.photo ? (
                                                            <img
                                                                src={testi.photo.startsWith('http') || testi.photo.startsWith('/') ? testi.photo : `/storage/${testi.photo}`}
                                                                alt={testi.name}
                                                                className="object-cover w-14 h-14 mr-4 rounded-full border-2 border-orange-100 shadow-sm transition-transform group-hover:scale-110"
                                                                onError={(e) => { e.target.src='https://via.placeholder.com/150?text=A'; }}
                                                            />
                                                        ) : (
                                                            <div className="flex items-center justify-center w-14 h-14 mr-4 text-xl font-bold text-white bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-sm transition-transform group-hover:scale-110">
                                                                {testi?.name ? testi.name.charAt(0).toUpperCase() : 'U'}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <h4 className="font-bold text-gray-900 group-hover:text-indigo-900 transition-colors">{testi.name}</h4>
                                                            <p className="text-sm font-medium text-orange-600">{testi.role}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </section>
                )
            }

        </MainLayout >
    );
}
