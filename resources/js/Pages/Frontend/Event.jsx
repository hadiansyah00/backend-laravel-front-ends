import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import HeroStaticSection from '@/Components/Sections/HeroStaticSection';

export default function Event() {
    const dummyEvents = [
        {
            id: 1,
            title: "Seminar Nasional Kebidanan Komplementer 2026",
            date: "12",
            month: "Agustus",
            time: "08:00 - 15:00 WIB",
            location: "Gedung Serbaguna STIKes Bogor Husada",
            type: "Seminar",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2070"
        },
        {
            id: 2,
            title: "Workshop Kewirausahaan Mahasiswa Kesehatan",
            date: "24",
            month: "Juli",
            time: "09:00 - 14:00 WIB",
            location: "Auditorium Kampus 2",
            type: "Workshop",
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=2070"
        },
        {
            id: 3,
            title: "Bakti Sosial & Penyuluhan Gizi Balita",
            date: "15",
            month: "Juli",
            time: "07:00 - 12:00 WIB",
            location: "Balai Desa Sukamantri",
            type: "Pengabdian",
            image: "https://images.unsplash.com/photo-1593113580326-928d3e642456?auto=format&fit=crop&q=80&w=2070"
        }
    ];

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
                        {dummyEvents.map((event) => (
                            <div key={event.id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col group hover:-translate-y-2 transition-transform duration-300">
                                <div className="relative h-48 overflow-hidden">
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-center rounded-xl p-2 min-w-[60px] shadow-sm border border-white/50">
                                        <span className="block text-2xl font-black text-indigo-700 leading-none">{event.date}</span>
                                        <span className="block text-xs font-bold text-gray-500 uppercase mt-1">{event.month}</span>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                            {event.type}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
                                        <a href="#" className="hover:text-indigo-600 transition-colors">{event.title}</a>
                                    </h3>
                                    <div className="mt-auto space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                                <i className="far fa-clock"></i>
                                            </div>
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/40 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                                <i className="fas fa-map-marker-alt"></i>
                                            </div>
                                            <span className="line-clamp-1">{event.location}</span>
                                        </div>
                                    </div>
                                    <a href="#" className="mt-6 block w-full text-center py-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-indigo-600 hover:text-white text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl transition-colors border border-gray-100 dark:border-gray-700 hover:border-indigo-600">
                                        Detail Acara
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
