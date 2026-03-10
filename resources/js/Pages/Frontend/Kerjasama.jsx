import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import HeroStaticSection from '@/Components/Sections/HeroStaticSection';
import { Link } from '@inertiajs/react';

export default function Kerjasama({ kerjasamas }) {
    const kerjasamaList = kerjasamas || [];

    const getImageUrl = (imagePath, fallbackName) => {
        if (imagePath) return `/storage/${imagePath.replace('storage/', '')}`;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName || 'Partner')}&background=0D8ABC&color=fff&size=128`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <MainLayout title="Jaringan Kerjasama | STIKes Bogor Husada">
            <HeroStaticSection data={{
                title: 'Jaringan Kerjasama',
                subtitle: 'Mitra strategis STIKes Bogor Husada dalam pendidikan, penelitian, dan pengabdian masyarakat.',
                bgImage: '/assets/img/hero-fallback.png'
            }} />

            <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-[50vh]">
                <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {kerjasamaList.length > 0 ? kerjasamaList.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-shadow group flex flex-col items-center text-center">
                                <div className="w-24 h-24 mb-6 rounded-full overflow-hidden shadow-md group-hover:scale-110 transition-transform bg-gray-50 dark:bg-gray-900 border-4 border-white dark:border-gray-800">
                                    <img src={getImageUrl(item.logo, item.title)} alt={item.title} className="w-full h-full object-cover object-center" />
                                </div>
                                <span className="text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/40 dark:text-orange-400 px-3 py-1 rounded-full mb-3 tracking-wider">
                                    {item.type || 'Mitra'}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {item.title}
                                </h3>
                                <div
                                    className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3 prose prose-sm dark:prose-invert"
                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                />
                                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700 w-full flex items-center justify-center text-xs text-gray-400">
                                    <i className="far fa-handshake mr-2"></i> Kemitraan
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full text-center py-20 text-gray-500 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <i className="far fa-handshake text-4xl mb-4 text-gray-300 dark:text-gray-600"></i>
                                <p>Daftar kemitraan sedang diperbarui.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
