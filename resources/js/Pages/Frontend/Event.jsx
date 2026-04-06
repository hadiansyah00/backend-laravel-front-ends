import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";

export default function Event({ events }) {
    const eventList = events?.data || [];

    // Helper functions
    const getDay = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).getDate();
    };

    const getMonthStr = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleString("id-ID", { month: "short" }).toUpperCase();
    };

    // Extract time from datetime field (start_date is datetime, not separate time field)
    const formatTimeFromDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatShortDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    // Check if event is past
    const isEventPast = (event) => {
        const checkDate = event.end_date || event.start_date;
        return checkDate ? new Date(checkDate) < new Date() : false;
    };

    return (
        <MainLayout title="Agenda Kegiatan | STIKes Bogor Husada">
            {/* --- HERO SECTION --- */}
            <section className="relative w-full pt-32 pb-24 overflow-hidden bg-gray-900 md:pt-40 md:pb-32">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/img/hero-fallback.png"
                        alt="Agenda Kegiatan"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src =
                                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-orange-900/60"></div>
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
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                        </svg>
                                        Beranda
                                    </Link>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <span className="ml-1 text-sm font-bold text-orange-400 md:ml-2">
                                            Agenda Kegiatan
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Title & Subtitle */}
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl shadow-lg shadow-orange-500/30 shrink-0">
                                <i className="fas fa-calendar-alt text-xl md:text-2xl text-white"></i>
                            </div>
                            Agenda Kegiatan
                        </h1>
                        <p className="max-w-2xl text-lg font-normal leading-relaxed text-gray-300 lg:text-xl">
                            Jangan lewatkan berbagai seminar, workshop, dan kegiatan bermanfaat yang akan diselenggarakan oleh STIKes Bogor Husada.
                        </p>

                        {/* Stats */}
                        {events?.total > 0 && (
                            <div className="flex items-center gap-6 mt-10 px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl w-fit shadow-xl">
                                <div className="text-center px-2">
                                    <span className="block text-3xl font-black text-orange-400 drop-shadow-md">{events.total}</span>
                                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest mt-1 block">Total Event</span>
                                </div>
                            </div>
                        )}
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
                            className="text-white dark:text-gray-950"
                            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,154.7C960,128,1056,128,1152,144C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </section>
            {/* --- END OF HERO SECTION --- */}

            <section className="py-16 bg-white dark:bg-gray-950">
                <div className="container px-4 mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {eventList.length > 0 ? (
                            eventList.map((event) => {
                                const bgImageUrl = event.image
                                    ? event.image.startsWith("http") || event.image.startsWith("/")
                                        ? event.image
                                        : `/storage/${event.image}`
                                    : "/img/placeholder-image.png";

                                const past = isEventPast(event);

                                return (
                                    <div
                                        key={event.id}
                                        className={`flex flex-col overflow-hidden transition-all duration-300 bg-white border shadow-sm dark:bg-gray-900 rounded-3xl hover:shadow-xl dark:border-gray-800 group hover:-translate-y-2 ${past ? 'border-gray-200 opacity-75 hover:opacity-100' : 'border-gray-100'}`}
                                    >
                                        <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-800">
                                            <Link
                                                href={`/event/${event.slug}`}
                                                className="relative block w-full h-full"
                                            >
                                                <img
                                                    src={bgImageUrl}
                                                    alt={event.title}
                                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                                {past && (
                                                    <div className="absolute inset-0 bg-gray-900/30 flex items-center justify-center">
                                                        <span className="px-3 py-1.5 text-xs font-bold text-white bg-gray-800/80 rounded-full backdrop-blur-sm">
                                                            <i className="fas fa-history mr-1"></i> Sudah Selesai
                                                        </span>
                                                    </div>
                                                )}
                                            </Link>

                                            {/* Date Box Overlay */}
                                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-center rounded-2xl p-3 min-w-[70px] shadow-lg border border-white/50 pointer-events-none">
                                                <span className="block text-3xl font-black leading-none text-orange-600">
                                                    {getDay(event.start_date)}
                                                </span>
                                                <span className="block mt-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                                                    {getMonthStr(event.start_date)}
                                                </span>
                                            </div>

                                            {/* Event Type Badge */}
                                            {event.event_type && (
                                                <div className="absolute top-4 left-4">
                                                    <span className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold text-white bg-orange-600 rounded-full shadow-lg uppercase tracking-wider backdrop-blur-sm">
                                                        <i className="fas fa-tag text-[8px]"></i> {event.event_type}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col flex-1 p-8">
                                            <div className="flex items-center gap-2 mb-4">
                                                {!event.event_type && (
                                                    <span className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                                        Event Kampus
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="mb-6 text-xl font-bold leading-snug text-gray-900 dark:text-white line-clamp-2">
                                                <Link
                                                    href={`/event/${event.slug}`}
                                                    className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
                                                >
                                                    {event.title}
                                                </Link>
                                            </h3>

                                            <div className="pt-6 mt-auto space-y-4 text-sm text-gray-600 border-t dark:text-gray-400 border-gray-50 dark:border-gray-800">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-orange-500 rounded-full bg-orange-50 dark:bg-gray-800">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                    </div>
                                                    <span className="font-medium">
                                                        {formatTimeFromDate(event.start_date)}{" "}
                                                        {event.end_date
                                                            ? `- ${formatTimeFromDate(event.end_date)}`
                                                            : "WIB"}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-orange-500 rounded-full bg-orange-50 dark:bg-gray-800">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                        </svg>
                                                    </div>
                                                    <span className="font-medium line-clamp-1">
                                                        {event.location || "Kampus STIKes"}
                                                    </span>
                                                </div>
                                            </div>

                                            <Link
                                                href={`/event/${event.slug}`}
                                                className="mt-8 block w-full text-center py-3.5 bg-gray-50 dark:bg-gray-800 hover:bg-orange-600 hover:text-white text-orange-600 dark:text-orange-400 font-bold rounded-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-orange-600 shadow-sm hover:shadow-orange-600/20"
                                            >
                                                Lihat Detail Acara
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-1 py-20 text-center border border-gray-100 md:col-span-2 lg:col-span-3 bg-gray-50 dark:bg-gray-900 rounded-3xl dark:border-gray-800">
                                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-orange-500 bg-orange-100 rounded-full dark:bg-orange-900/30">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                                    Belum Ada Agenda
                                </h3>
                                <p className="max-w-sm mx-auto text-gray-500 dark:text-gray-400">
                                    Saat ini belum ada agenda kegiatan atau acara yang dijadwalkan dalam waktu dekat.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {events?.links && events.links.length > 3 && (
                        <div className="flex flex-wrap justify-center gap-2 mt-16">
                            {events.links.map((link, index) => {
                                let label = link.label;
                                const stringLabel = String(link.label);

                                if (stringLabel.includes("&laquo;"))
                                    label = (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                        </svg>
                                    );
                                if (stringLabel.includes("&raquo;"))
                                    label = (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    );

                                return link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all ${
                                            link.active
                                                ? "border-transparent bg-orange-600 text-white shadow-lg shadow-orange-600/30 -translate-y-1"
                                                : "border border-gray-200 bg-white hover:bg-gray-50 hover:border-orange-300 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
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
