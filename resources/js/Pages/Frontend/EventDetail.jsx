import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';

export default function EventDetail({ event, upcomingEvents }) {
    const [copied, setCopied] = useState(false);

    // Format helpers
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const formatShortDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    // Extract time from datetime field (start_date/end_date are datetime)
    const formatTimeFromDate = (dateString) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    };

    const getDay = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).getDate();
    };

    const getMonthStr = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleString('id-ID', { month: 'short' }).toUpperCase();
    };

    // Image URL — field is `image`, NOT `thumbnail`
    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/img/placeholder-image-large.png';
        if (imagePath.startsWith('http') || imagePath.startsWith('/')) return imagePath;
        return `/storage/${imagePath.replace(/^storage\//, '')}`;
    };

    const imageUrl = getImageUrl(event?.image);

    // Map embed URL — use event.map_embed_url if available
    const mapURL = event?.map_embed_url || null;

    const pageUrl = typeof window !== 'undefined'
        ? window.location.href
        : `/event/${event?.slug}`;

    const fullImageUrl = typeof window !== 'undefined'
        ? (imageUrl.startsWith('http') ? imageUrl : window.location.origin + imageUrl)
        : imageUrl;

    // Description for share — use `content` field (not `description`)
    const shareText = event?.content
        ? event.content.substring(0, 150).replace(/<[^>]+>/g, '') + '...'
        : 'Event di STIKes Bogor Husada';

    // Check if event is upcoming or past
    const isUpcoming = event?.start_date ? new Date(event.start_date) > new Date() : false;
    const isPast = event?.end_date ? new Date(event.end_date) < new Date() : (event?.start_date ? new Date(event.start_date) < new Date() : false);

    // =========== SHARE HANDLERS ===========
    const shareToFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const shareToWhatsApp = () => {
        const text = `Saksikan Event ini: ${event?.title}\n\n${shareText}\n\nInfo lengkap: ${pageUrl}`;
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const shareToTwitter = () => {
        const text = `${event?.title} - Event STIKes Bogor Husada`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const shareToTelegram = () => {
        const url = `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(event?.title)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const copyLink = () => {
        navigator.clipboard.writeText(pageUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <MainLayout title={event ? `Event: ${event.title} | STIKes Bogor Husada` : 'Event Tidak Ditemukan'}>
            <Head>
                <title>{event ? `Event: ${event.title} | STIKes Bogor Husada` : 'Event Tidak Ditemukan'}</title>
                {event && (
                    <>
                        <meta head-key="description" name="description" content={shareText} />
                        <meta head-key="og:title" property="og:title" content={event.title} />
                        <meta head-key="og:description" property="og:description" content={shareText} />
                        <meta head-key="og:image" property="og:image" content={fullImageUrl} />
                        <meta head-key="og:type" property="og:type" content="article" />
                        <link rel="canonical" href={pageUrl} />
                    </>
                )}
            </Head>

            {event ? (
                <>
                    {/* ========== HERO / HEADER ========== */}
                    <section className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gray-900">
                        {/* Background Image & Overlay */}
                        <div className="absolute inset-0 z-0">
                            <img src={imageUrl} alt={event.title} className="object-cover w-full h-full scale-105 blur-sm" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/85 to-gray-900/60"></div>
                        </div>

                        {/* Content */}
                        <div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8 max-w-6xl">
                            {/* Breadcrumbs */}
                            <nav className="flex mb-8" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center px-4 py-2 space-x-1 border rounded-full md:space-x-3 bg-white/10 backdrop-blur-md border-white/20">
                                    <li className="inline-flex items-center">
                                        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-300 transition-colors hover:text-white">
                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                            Beranda
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                            <Link href="/event" className="ml-1 text-sm font-medium text-gray-300 transition-colors hover:text-white md:ml-2">Agenda</Link>
                                        </div>
                                    </li>
                                    <li aria-current="page">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                            <span className="ml-1 text-sm font-bold text-orange-400 md:ml-2 line-clamp-1 max-w-[200px]">{event.title}</span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>

                            <div className="flex flex-col lg:flex-row gap-8 items-end">
                                {/* Text Content */}
                                <div className="flex-1">
                                    {/* Badges */}
                                    <div className="flex flex-wrap items-center gap-2 mb-5">
                                        {event.event_type && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-orange-600 rounded-full shadow-lg uppercase tracking-wider">
                                                <i className="fas fa-tag"></i> {event.event_type}
                                            </span>
                                        )}
                                        {isPast && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-gray-300 bg-gray-700 rounded-full">
                                                <i className="fas fa-history"></i> Sudah Selesai
                                            </span>
                                        )}
                                        {isUpcoming && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-green-100 bg-green-600 rounded-full shadow-lg animate-pulse">
                                                <i className="fas fa-circle text-[6px]"></i> Segera Hadir
                                            </span>
                                        )}
                                    </div>

                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 drop-shadow-lg">
                                        {event.title}
                                    </h1>

                                    {/* Quick Info Row */}
                                    <div className="flex flex-wrap gap-5 text-gray-300 text-sm">
                                        <div className="flex items-center gap-2">
                                            <i className="far fa-calendar-alt text-orange-400"></i>
                                            <span>{formatShortDate(event.start_date)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <i className="far fa-clock text-orange-400"></i>
                                            <span>{formatTimeFromDate(event.start_date)} {event.end_date ? `- ${formatTimeFromDate(event.end_date)}` : ''} WIB</span>
                                        </div>
                                        {event.location && (
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-map-marker-alt text-orange-400"></i>
                                                <span>{event.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Date Badge Large */}
                                <div className="hidden lg:flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-5 text-center shadow-xl min-w-[120px]">
                                    <span className="text-5xl font-black text-white leading-none">{getDay(event.start_date)}</span>
                                    <span className="text-sm font-bold text-orange-400 uppercase tracking-wider mt-1">{getMonthStr(event.start_date)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Wave Divider */}
                        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-[1px] z-10">
                            <svg className="relative block w-full h-[60px] md:h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                                <path fill="currentColor" className="text-white dark:text-gray-950" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,154.7C960,128,1056,128,1152,144C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div>
                    </section>

                    {/* ========== MAIN CONTENT ========== */}
                    <section className="py-12 md:py-16 bg-white dark:bg-gray-950">
                        <div className="container px-4 mx-auto max-w-6xl">
                            <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">

                                {/* ===== LEFT COLUMN — Main Content ===== */}
                                <div className="w-full lg:w-2/3 space-y-10">

                                    {/* Event Poster */}
                                    <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
                                        <img src={imageUrl} alt={event.title} className="w-full h-auto object-cover" loading="lazy" />
                                    </div>

                                    {/* Event Description */}
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                            <div className="w-1.5 h-8 bg-orange-500 rounded-full"></div>
                                            Detail Informasi Acara
                                        </h2>
                                        {event.content ? (
                                            <div
                                                className="prose lg:prose-lg dark:prose-invert prose-orange max-w-none text-gray-700 dark:text-gray-300 prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-orange-600"
                                                dangerouslySetInnerHTML={{ __html: event.content }}
                                            />
                                        ) : (
                                            <p className="text-gray-500 dark:text-gray-400 italic">Belum ada deskripsi detail untuk acara ini.</p>
                                        )}
                                    </div>

                                    {/* Map Section — Only show if map_embed_url exists */}
                                    {mapURL && (
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                                <div className="w-1.5 h-8 bg-orange-500 rounded-full"></div>
                                                Lokasi Acara
                                            </h2>
                                            <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 h-80 md:h-96">
                                                <iframe
                                                    src={mapURL}
                                                    className="w-full h-full rounded-xl border-0"
                                                    allowFullScreen=""
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                ></iframe>
                                            </div>
                                        </div>
                                    )}

                                    {/* Share Section */}
                                    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 border border-gray-100 rounded-2xl p-5 dark:bg-gray-900 dark:border-gray-800 gap-4 shadow-sm">
                                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                            <i className="fas fa-share-alt mr-2 text-orange-500"></i>Bagikan Event:
                                        </span>
                                        <div className="flex items-center justify-around w-full sm:justify-end gap-3">
                                            <button onClick={shareToFacebook} title="Share ke Facebook" className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all hover:scale-110 shadow-md">
                                                <i className="fab fa-facebook-f"></i>
                                            </button>
                                            <button onClick={shareToWhatsApp} title="Share ke WhatsApp" className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-md">
                                                <i className="fab fa-whatsapp"></i>
                                            </button>
                                            <button onClick={shareToTwitter} title="Share ke Twitter/X" className="w-10 h-10 rounded-full bg-black hover:bg-gray-800 text-white flex items-center justify-center transition-all hover:scale-110 shadow-md">
                                                <i className="fab fa-x-twitter"></i>
                                            </button>
                                            <button onClick={shareToTelegram} title="Share ke Telegram" className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-md">
                                                <i className="fab fa-telegram-plane"></i>
                                            </button>
                                            <button onClick={copyLink} title="Salin Link" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-md ${copied ? 'bg-green-600 text-white' : 'bg-gray-800 hover:bg-black text-white'}`}>
                                                <i className={copied ? 'fas fa-check' : 'fas fa-link'}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* ===== RIGHT COLUMN — Sidebar ===== */}
                                <div className="w-full lg:w-1/3">
                                    <div className="lg:sticky lg:top-28 space-y-6 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pb-4 hide-scrollbar">

                                    {/* Event Info Card */}
                                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm space-y-5">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                            <i className="fas fa-calendar-check text-orange-500"></i> Informasi Event
                                        </h3>

                                        {/* Date & Time */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 flex items-center justify-center flex-shrink-0 text-lg">
                                                <i className="far fa-calendar-alt"></i>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Waktu Pelaksanaan</p>
                                                <p className="text-gray-900 dark:text-white font-semibold text-sm">
                                                    {formatDate(event.start_date)}
                                                </p>
                                                {event.end_date && formatDate(event.end_date) !== formatDate(event.start_date) && (
                                                    <p className="text-gray-900 dark:text-white font-semibold text-sm">
                                                        s/d {formatDate(event.end_date)}
                                                    </p>
                                                )}
                                                <p className="text-orange-600 dark:text-orange-400 font-bold text-sm mt-1">
                                                    <i className="far fa-clock mr-1"></i>
                                                    {formatTimeFromDate(event.start_date)} {event.end_date ? `- ${formatTimeFromDate(event.end_date)}` : ''} WIB
                                                </p>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center flex-shrink-0 text-lg">
                                                <i className="fas fa-map-marker-alt"></i>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Lokasi Acara</p>
                                                <p className="text-gray-900 dark:text-white font-semibold text-sm">{event.location || 'Kampus STIKes Bogor Husada'}</p>
                                            </div>
                                        </div>

                                        {/* Contact Person */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 flex items-center justify-center flex-shrink-0 text-lg">
                                                <i className="fas fa-user-tie"></i>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Contact Person</p>
                                                <p className="text-gray-900 dark:text-white font-semibold text-sm">{event.contact_person || 'Hubungi Admin'}</p>
                                            </div>
                                        </div>

                                        {/* Event Type */}
                                        {event.event_type && (
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center flex-shrink-0 text-lg">
                                                    <i className="fas fa-tag"></i>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Jenis Kegiatan</p>
                                                    <p className="text-gray-900 dark:text-white font-semibold text-sm">{event.event_type}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Divider */}
                                        <div className="border-t border-gray-100 dark:border-gray-800"></div>

                                        {/* Registration Button */}
                                        {event.registration_link ? (
                                            <a
                                                href={event.registration_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-base py-4 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all flex justify-center items-center gap-2 hover:-translate-y-0.5"
                                            >
                                                <i className="fas fa-pen-fancy"></i> Daftar Sekarang
                                            </a>
                                        ) : (
                                            <button disabled className="w-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed font-semibold text-sm py-4 rounded-xl flex justify-center items-center gap-2 border border-gray-200 dark:border-gray-700">
                                                <i className="fas fa-lock text-xs"></i> Pendaftaran Belum Tersedia
                                            </button>
                                        )}

                                        {/* Back Link */}
                                        <Link
                                            href="/event"
                                            className="w-full flex justify-center items-center gap-2 py-3 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                                        >
                                            <i className="fas fa-arrow-left text-xs"></i> Kembali ke Semua Event
                                        </Link>
                                    </div>

                                    {/* Upcoming Events Widget */}
                                    {upcomingEvents && upcomingEvents.length > 0 && (
                                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                                            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                                                <i className="fas fa-calendar-day text-orange-500"></i> Event Mendatang
                                            </h4>
                                            <div className="space-y-4">
                                                {upcomingEvents.map((upcoming) => (
                                                    <Link href={`/event/${upcoming.slug}`} key={upcoming.id} className="flex gap-4 group p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                                            <img src={getImageUrl(upcoming.image)} alt={upcoming.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs text-orange-600 dark:text-orange-400 font-bold mb-1">
                                                                <i className="far fa-calendar mr-1"></i>{formatShortDate(upcoming.start_date)}
                                                            </p>
                                                            <h5 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{upcoming.title}</h5>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <section className="py-32 text-center bg-white dark:bg-gray-950">
                    <div className="max-w-md mx-auto">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                            <i className="fas fa-calendar-times text-3xl text-orange-500"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Event Tidak Ditemukan</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Maaf, event yang Anda cari tidak tersedia atau sudah dihapus.</p>
                        <Link href="/event" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-orange-600 rounded-xl hover:bg-orange-700 transition-all shadow-md hover:shadow-lg">
                            <i className="fas fa-arrow-left"></i> Kembali ke Daftar Event
                        </Link>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}
