import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Sections/Hero';
import { Head } from '@inertiajs/react';

export default function VisiMisi({ data }) {
    const title = data?.title || 'Visi & Misi';
    const content = data?.content || '';

    // Parse JSON content if available
    let visi = 'Visi institusi belum diatur.';
    let misi = 'Misi institusi belum diatur.';
    if (data?.content) {
        try {
            const parsed = JSON.parse(data.content);
            if (parsed.visi) visi = parsed.visi;
            if (parsed.misi) misi = parsed.misi;
        } catch (e) {
            // Not JSON
            visi = data.content;
            misi = data.content;
        }
    }

    return (
        <MainLayout title={title}>
            <Head>
                <title>{title}</title>
            </Head>

            <Hero
                content={{
                    title: title,
                    subtitle: 'Tujuan dan arah gerak STIKes Bogor Husada',
                    image: data?.image,
                    gradient: 'dark',
                }}
            />

            <div className="py-16 md:py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
                        {/* Visi */}
                        <div className="bg-white rounded-3xl p-10 lg:p-12 shadow-xl shadow-indigo-100/50 border border-indigo-50 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                                    <i className="fas fa-eye text-3xl"></i>
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 mb-6 font-display tracking-tight">Visi</h3>
                                <p className="text-gray-600 leading-relaxed text-lg flex-1 whitespace-pre-wrap">
                                    {visi}
                                </p>
                            </div>
                        </div>

                        {/* Misi */}
                        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-10 lg:p-12 shadow-xl shadow-indigo-200/50 text-white relative flex flex-col items-start overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute bottom-0 right-0 opacity-10 transition-transform group-hover:scale-110">
                                <i className="fas fa-bullseye text-[15rem] translate-x-12 translate-y-12"></i>
                            </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20 shadow-inner">
                                    <i className="fas fa-bullseye text-3xl text-white"></i>
                                </div>
                                <h3 className="text-3xl font-black mb-6 font-display tracking-tight">Misi</h3>
                                <div className="text-indigo-50 leading-relaxed text-lg flex-1 whitespace-pre-wrap">
                                    {misi}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
