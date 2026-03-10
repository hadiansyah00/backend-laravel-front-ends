import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Sections/Hero';
import { Head } from '@inertiajs/react';

export default function Perpustakaan({ fasilitasData }) {
    const data = fasilitasData || {};

    return (
        <MainLayout title="Perpustakaan">
            <Head>
                <title>Perpustakaan - STIKes Bogor Husada</title>
            </Head>

            <Hero
                content={{
                    title: data.name || 'Perpustakaan Kampus',
                    subtitle: 'Sumber literatur, jurnal, dan referensi medis terlengkap guna mendukung kegiatan Tri Dharma Perguruan Tinggi.',
                    image: data.image ? `/${data.image}` : '/assets/img/hero-fallback.png',
                    gradient: 'dark',
                }}
            />

            <div className="py-16 md:py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="lg:w-1/2 w-full relative group">
                            <div className="absolute -inset-4 bg-sky-50 rounded-[3rem] transform rotate-3 transition duration-500 group-hover:rotate-0"></div>
                            <img 
                                src={data.image ? `/${data.image}` : '/assets/img/hero-fallback.png'}
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                                alt={data.name || 'Perpustakaan SBH'} 
                                className="relative rounded-3xl shadow-2xl z-10 w-full h-auto object-cover max-h-[500px] border-4 border-white"
                            />
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-sm font-bold tracking-wide mb-6">
                                <i className="fas fa-book-reader"></i> Pusat Sumber Belajar
                            </span>
                            
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                                {data.name || 'Perpustakaan STIKes Bogor Husada'}
                            </h2>
                            
                            <div className="w-20 h-1.5 bg-gradient-to-r from-sky-500 to-blue-400 rounded-full mb-8"></div>
                            
                            <div className="prose prose-lg text-gray-600 mb-8 whitespace-pre-wrap leading-relaxed">
                                <p>{data.description || 'Deskripsi perpustakaan belum tersedia.'}</p>
                            </div>

                            {data.facilities && Array.isArray(data.facilities) && data.facilities.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="font-bold text-gray-800 mb-3">Layanan & Fasilitas:</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-600 font-medium">
                                        {data.facilities.map((item, idx) => (
                                            <li key={idx}>{item.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>            
        </MainLayout>
    );
}
