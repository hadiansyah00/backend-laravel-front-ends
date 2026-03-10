import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import HeroStaticSection from '@/Components/Sections/HeroStaticSection';
import { Link } from '@inertiajs/react';

export default function Event({ events }) {
    const eventList = events?.data || [];

    // Helper functions
    const getDay = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).getDate();
    };

    const getMonthStr = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleString('id-ID', { month: 'short' });
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        return timeString.substring(0, 5); // Assuming format HH:mm:ss
    };

    return (
        <MainLayout title="Event & Agenda | STIKes Bogor Husada">
            <HeroStaticSection data={{
                title: 'Agenda Kegiatan',
                subtitle: 'Jangan lewatkan berbagai seminar, workshop, dan kegiatan bermanfaat yang akan diselenggarakan oleh STIKes Bogor Husada.',
                bgImage: '/assets/img/hero-fallback.png'
            }} />

            <section className="py-16 bg-white dark:bg-gray-950">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {eventList.length > 0 ? eventList.map((event) => (
                            <div key={event.id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col group hover:-translate-y-2 transition-transform duration-300">
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    <Link href={`/event/${event.slug}`} className="block relative w-full h-full">
                                        <img src={event.thumbnail ? `/storage/${event.thumbnail.replace('storage/', '')}` : '/img/placeholder-image.png'} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </Link>
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-center rounded-xl p-2 min-w-[60px] shadow-sm border border-white/50 pointer-events-none">
                                        <span className="block text-2xl font-black text-indigo-700 leading-none">{getDay(event.start_date)}</span>
                                        <span className="block text-xs font-bold text-gray-500 uppercase mt-1">{getMonthStr(event.start_date)}</span>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                            Kegiatan
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
                                        <Link href={`/event/${event.slug}`} className="hover:text-indigo-600 transition-colors">{event.title}</Link>
                                    </h3>
                                    <div className="mt-auto space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                                <i className="far fa-clock"></i>
                                            </div>
                                            <span>
                                                {formatTime(event.start_time)} {event.end_time ? `- ${formatTime(event.end_time)}` : ''} WIB
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/40 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                                <i className="fas fa-map-marker-alt"></i>
                                            </div>
                                            <span className="line-clamp-1">{event.location || 'Kampus STIKes'}</span>
                                        </div>
                                    </div>
                                    <Link href={`/event/${event.slug}`} className="mt-6 block w-full text-center py-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-indigo-600 hover:text-white text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl transition-colors border border-gray-100 dark:border-gray-700 hover:border-indigo-600">
                                        Detail Acara
                                    </Link>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                                <i className="far fa-calendar-times text-5xl text-gray-300 dark:text-gray-600 mb-4"></i>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Tidak ada event</h3>
                                <p className="text-gray-500 dark:text-gray-400">Belum ada agenda kegiatan yang dijadwalkan.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {events?.links && events.links.length > 3 && (
                        <div className="flex flex-wrap justify-center mt-12 gap-2">
                            {events.links.map((link, index) => {
                                let label = link.label;
                                if (label.includes('&laquo;')) label = <i className="fas fa-chevron-left text-xs"></i>;
                                if (label.includes('&raquo;')) label = <i className="fas fa-chevron-right text-xs"></i>;

                                return link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition-colors ${link.active
                                                ? 'border border-indigo-600 bg-indigo-600 text-white'
                                                : 'border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        {label}
                                    </Link>
                                ) : (
                                    <span key={index} className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 text-gray-400 cursor-not-allowed bg-white dark:bg-gray-800 dark:border-gray-700">
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
