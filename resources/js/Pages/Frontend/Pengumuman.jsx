import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import HeroStaticSection from '@/Components/Sections/HeroStaticSection';
import { Link } from '@inertiajs/react';

export default function Pengumuman({ pengumumans }) {
    const pengumumanList = pengumumans?.data || [];

    // Formatting Helper
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <MainLayout title="Pengumuman | STIKes Bogor Husada">
            <HeroStaticSection data={{
                title: 'Papan Pengumuman',
                subtitle: 'Pusat informasi resmi, surat edaran, dan pengumuman akademik civitas STIKes Bogor Husada.',
                bgImage: '/assets/img/hero-fallback.png'
            }} />

            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container px-4 mx-auto max-w-5xl">
                    <div className="space-y-4">
                        {pengumumanList.length > 0 ? pengumumanList.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 flex-shrink-0 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                                        <i className="fas fa-bullhorn text-xl"></i>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-bold px-2.5 py-1 rounded-md text-white bg-blue-500">
                                                Pengumuman
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400"><i className="far fa-calendar-alt mr-1"></i> {formatDate(item.created_at)}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                            <Link href={`/pengumuman/${item.slug}`}>{item.title}</Link>
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 ml-16 md:ml-0">
                                    <Link href={`/pengumuman/${item.slug}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-semibold rounded-lg transition-colors text-sm">
                                        Detail Pengumuman <i className="fas fa-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <i className="fas fa-bullhorn text-4xl text-gray-300 dark:text-gray-600 mb-3"></i>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">Belum ada pengumuman.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {pengumumans?.links && pengumumans.links.length > 3 && (
                        <div className="flex flex-wrap justify-center mt-12 gap-2">
                            {pengumumans.links.map((link, index) => {
                                let label = link.label;
                                if (label.includes('&laquo;')) label = <i className="fas fa-chevron-left text-xs"></i>;
                                if (label.includes('&raquo;')) label = <i className="fas fa-chevron-right text-xs"></i>;

                                return link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition-colors ${link.active
                                                ? 'border border-blue-600 bg-blue-600 text-white'
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
