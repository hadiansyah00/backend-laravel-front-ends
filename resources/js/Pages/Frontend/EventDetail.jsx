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

    const formatTime = (timeString) => {
        if (!timeString) return '';
        return timeString.substring(0, 5); // Assuming format HH:mm:ss
    };

    const mapURL = event?.map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.023214877771!2d106.77259257499422!3d-6.643997693350419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69cf2cd271ce33%3A0xc6ad10e3dfd3b207!2sSTIKes%20Bogor%20Husada!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid";
    const imageUrl = event?.thumbnail ? `/storage/${event.thumbnail.replace('storage/', '')}` : '/img/placeholder-image-large.png';

    const pageUrl = typeof window !== 'undefined'
        ? window.location.href
        : `/event/${event?.slug}`;

    const fullImageUrl = typeof window !== 'undefined'
        ? (imageUrl.startsWith('http') ? imageUrl : window.location.origin + imageUrl)
        : imageUrl;

    const shareText = event?.description 
        ? event.description.substring(0, 150).replace(/<[^>]+>/g, '') + '...' 
        : 'Event di STIKes Bogor Husada';

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
                    {/* Split Header */}
                    <section className="pt-24 lg:pt-32 pb-16 bg-white dark:bg-gray-950">
                        <div className="container px-4 mx-auto max-w-6xl">
                            <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">

                                {/* Kolom Kiri - Gambar */}
                                <div className="w-full lg:w-1/2">
                                    <div className="rounded-3xl overflow-hidden shadow-2xl relative border border-gray-100 dark:border-gray-800 bg-gray-100">
                                        <img src={imageUrl} alt={event.title} className="w-full h-auto object-cover aspect-[4/3]" />
                                        <div className="absolute top-4 left-4 bg-orange-600 text-white font-bold px-4 py-1.5 rounded-full text-sm shadow-lg">
                                            Kegiatan
                                        </div>
                                    </div>
                                    
                                    {/* Kolom Share di Bawah Gambar untuk Desktop, atau inline untuk mobile */}
                                    <div className="mt-6 flex flex-col sm:flex-row justify-between items-center bg-gray-50 border border-gray-100 rounded-2xl p-4 dark:bg-gray-900 dark:border-gray-800 gap-4 shadow-sm">
                                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap">Bagikan Event:</span>
                                        <div className="flex items-center justify-around w-full sm:justify-end gap-3">
                                            <button onClick={shareToFacebook} title="Share ke Facebook" className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all hover:scale-110">
                                                <i className="fab fa-facebook-f"></i>
                                            </button>
                                            <button onClick={shareToWhatsApp} title="Share ke WhatsApp" className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all hover:scale-110">
                                                <i className="fab fa-whatsapp"></i>
                                            </button>
                                            <button onClick={shareToTwitter} title="Share ke Twitter/X" className="w-10 h-10 rounded-full bg-black hover:bg-gray-800 text-white flex items-center justify-center transition-all hover:scale-110">
                                                <i className="fab fa-x-twitter"></i>
                                            </button>
                                            <button onClick={shareToTelegram} title="Share ke Telegram" className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-all hover:scale-110">
                                                <i className="fab fa-telegram-plane"></i>
                                            </button>
                                            <button onClick={copyLink} title="Salin Link" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${copied ? 'bg-green-600 text-white' : 'bg-gray-800 hover:bg-black text-white'}`}>
                                                <i className={copied ? 'fas fa-check' : 'fas fa-link'}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Kolom Kanan - Data Event */}
                                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                                    <Link href="/event" className="text-gray-500 hover:text-indigo-600 font-semibold text-sm mb-4 inline-flex items-center gap-2 transition-colors">
                                        <i className="fas fa-arrow-left"></i> Semua Acara
                                    </Link>

                                    <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                                        {event.title}
                                    </h1>

                                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 mb-8 space-y-5">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 text-lg"><i className="far fa-calendar-check"></i></div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-0.5">Waktu Pelaksanaan</p>
                                                <p className="text-gray-900 dark:text-white font-semibold">
                                                    {formatDate(event.start_date)}
                                                    {event.end_date && event.end_date !== event.start_date && ` - ${formatDate(event.end_date)}`}
                                                    <span className="text-gray-400 font-normal mx-2">|</span>
                                                    {formatTime(event.start_time)} {event.end_time ? `- ${formatTime(event.end_time)}` : ''} WIB
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 text-lg"><i className="fas fa-map-marker-alt"></i></div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-0.5">Lokasi Acara</p>
                                                <p className="text-gray-900 dark:text-white font-semibold">{event.location || 'Kampus STIKes'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-lg"><i className="fas fa-ticket-alt"></i></div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-0.5">Contact Person / Info</p>
                                                <p className="text-gray-900 dark:text-white font-semibold">{event.contact_person || 'Hubungi Admin'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {event.registration_link ? (
                                        <a href={event.registration_link} target="_blank" rel="noopener noreferrer" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all flex justify-center items-center gap-2">
                                            Daftar Sekarang <i className="fas fa-external-link-alt text-sm"></i>
                                        </a>
                                    ) : (
                                        <button className="w-full bg-gray-300 text-gray-500 cursor-not-allowed font-bold text-lg py-4 rounded-xl flex justify-center items-center gap-2">
                                            Pendaftaran Belum Tersedia
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Content & Map Section */}
                    <section className="py-12 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                        <div className="container px-4 mx-auto max-w-6xl">
                            <div className="flex flex-col lg:flex-row gap-12">

                                <div className="w-full lg:w-2/3">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-indigo-600 inline-block pb-2">Detail Informasi Acara</h3>
                                    {event.description && (
                                        <div
                                            className="prose lg:prose-lg dark:prose-invert prose-indigo max-w-none text-gray-700 dark:text-gray-300"
                                            dangerouslySetInnerHTML={{ __html: event.description }}
                                        />
                                    )}
                                </div>

                                {/* Sidebar Map */}
                                <div className="w-full lg:w-1/3 space-y-8">
                                    <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 h-80">
                                        <iframe
                                            src={mapURL}
                                            className="w-full h-full rounded-xl border-0"
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>

                                    {/* Upcoming Events Widget */}
                                    {upcomingEvents && upcomingEvents.length > 0 && (
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Event Mendatang</h4>
                                            <div className="space-y-4">
                                                {upcomingEvents.map((upcoming) => (
                                                    <Link href={`/event/${upcoming.slug}`} key={upcoming.id} className="flex gap-4 group">
                                                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                                                            <img src={upcoming.thumbnail ? `/storage/${upcoming.thumbnail.replace('storage/', '')}` : '/img/placeholder-image.png'} alt={upcoming.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-indigo-600 font-bold mb-1">{formatDate(upcoming.start_date)}</p>
                                                            <h5 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 transition-colors">{upcoming.title}</h5>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <section className="py-32 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Event tidak ditemukan</h2>
                    <Link href="/event" className="mt-4 inline-block text-indigo-600 hover:underline">Kembali ke Daftar Event</Link>
                </section>
            )}
        </MainLayout>
    );
}
