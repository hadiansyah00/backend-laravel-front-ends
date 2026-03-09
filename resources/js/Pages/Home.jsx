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

export default function Home({ sliders, berita, programStudis, statistic, videoContent, testimonials }) {

    // Debug: log videoContent to verify data is arriving
    console.log('videoContent:', videoContent);

    const videoEmbedUrl = videoContent ? getYouTubeEmbedUrl(videoContent.video_url) : '';
    console.log('videoEmbedUrl:', videoEmbedUrl);

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
                                        src={`/storage/${slider.image}`}
                                        alt={slider.title}
                                        className="object-cover w-full h-full"
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
            <section className="relative z-20 px-6 mx-auto -mt-10 max-w-7xl lg:px-12">
                <div className="grid overflow-hidden bg-white shadow-2xl md:grid-cols-2 rounded-2xl">
                    <div className="p-8 md:p-12 bg-gradient-to-br from-indigo-900 to-indigo-800 text-white">
                        <h2 className="mb-4 text-3xl font-bold">Penerimaan Mahasiswa Baru</h2>
                        <p className="mb-8 text-indigo-100">Mari bergabung dan kembangkan potensi Anda di bidang kesehatan bersama fasilitas modern dan pengajar profesional.</p>
                        <a href="https://pmb.sbh.ac.id" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 font-semibold text-indigo-900 transition-colors bg-white rounded-lg hover:bg-indigo-50">
                            Daftar Sekarang
                        </a>
                    </div>
                    <div className="p-8 md:p-12">
                        <h2 className="mb-4 text-2xl font-bold text-gray-800">Butuh Informasi Lengkap?</h2>
                        <p className="mb-6 text-gray-600">Dapatkan brosur pendaftaran digital dan rincian biaya studi kami dengan mendaftarkan email Anda.</p>
                        <a href="/pendaftaran-email/create" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800">
                            Unduh Brosur PMB
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* 3. PROGRAM STUDI SECTION */}
            {
                programStudis && programStudis.length > 0 && (
                    <section className="py-24 bg-gray-50">
                        <div className="container px-6 mx-auto lg:px-12">
                            <div className="mb-16 text-center">
                                <span className="text-sm font-bold tracking-wider text-orange-600 uppercase">Akademik</span>
                                <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">Program Studi Pilihan</h2>
                                <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">Terakreditasi dan dirancang untuk mencetak tenaga ahli yang siap terjun ke dunia kerja kesehatan.</p>
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

            {/* 4. STATISTICS SECTION */}
            {
                statistic && statistic.length > 0 && (
                    <section className="py-20 text-white bg-orange-600">
                        <div className="container px-6 mx-auto lg:px-12">
                            <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
                                {statistic.map((stat, idx) => (
                                    <div key={idx} className="p-6">
                                        <div className="text-4xl font-extrabold md:text-5xl lg:text-6xl">
                                            {stat.value}{stat.suffix}
                                        </div>
                                        <p className="mt-3 text-sm font-medium tracking-wider text-orange-100 uppercase md:text-base">
                                            {stat.title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* 5. VIDEO COMPANY PROFILE */}
            <section className="py-24 bg-white">
                <div className="container px-6 mx-auto lg:px-12">
                    {/* Kontainer dibatasi lebarnya (max-w-3xl) dan diposisikan di tengah (mx-auto text-center) */}
                    <div className="max-w-3xl mx-auto text-center">

                        <span className="text-sm font-bold tracking-wider text-orange-600 uppercase">
                            Company Profile
                        </span>

                        <h2 className="mt-2 mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                            {videoContent?.title || 'Mengenal Lebih Dekat STIKes Bogor Husada'}
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

            {/* 6. BERITA TERBARU (WordPress API) */}
            {
                berita && berita.length > 0 && (
                    <section className="py-24 bg-gray-50">
                        <div className="container px-6 mx-auto lg:px-12">
                            <div className="flex flex-col items-end justify-between mb-16 space-y-4 md:flex-row md:space-y-0">
                                <div>
                                    <span className="text-sm font-bold tracking-wider text-orange-600 uppercase">Informasi Terbaru</span>
                                    <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">Berita & Artikel Kampus</h2>
                                </div>
                                <Link href="/berita" className="inline-flex items-center px-6 py-3 font-semibold text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:text-orange-600">
                                    Lihat Semua Berita
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {berita.map((item) => {
                                    const bgImageUrl = item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/assets/img/placeholder.jpg';
                                    return (
                                        <Link href={`/berita/${item.slug}`} key={item.id} className="flex flex-col overflow-hidden transition-all duration-300 bg-white shadow-sm rounded-2xl hover:shadow-xl group hover:-translate-y-1">
                                            <div className="relative pt-[60%] overflow-hidden bg-gray-200">
                                                <img
                                                    src={bgImageUrl}
                                                    alt={item.title.rendered}
                                                    className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1 p-6">
                                                <div className="flex items-center mb-3 space-x-2 text-xs text-gray-500">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    <span>{formatDate(item.date)}</span>
                                                </div>
                                                {item.title && item.title.rendered && (
                                                    <h3 className="mb-3 text-xl font-bold text-gray-900 line-clamp-2" dangerouslySetInnerHTML={{ __html: item.title.rendered }}></h3>
                                                )}
                                                {item.excerpt && item.excerpt.rendered && (
                                                    <div className="flex-1 mb-4 text-sm leading-relaxed text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}></div>
                                                )}
                                                <div className="mt-auto font-semibold text-orange-600 transition-colors group-hover:text-orange-800">
                                                    Baca Selengkapnya &rarr;
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
                                    Suara Alumni
                                </span>
                                <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
                                    Alumni STIKes Bogor Husada
                                </h2>
                                <p className="mt-4 text-gray-600 text-lg">
                                    Dengarkan cerita sukses dan pengalaman belajar dari para alumni kami yang kini telah berkarya di berbagai instansi kesehatan.
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
                                                                src={`/storage/${testi.photo}`}
                                                                alt={testi.name}
                                                                className="object-cover w-14 h-14 mr-4 rounded-full border-2 border-orange-100 shadow-sm transition-transform group-hover:scale-110"
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
