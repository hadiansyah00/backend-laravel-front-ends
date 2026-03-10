import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import SectionTitle from '@/Components/Sections/SectionTitle';
import HeroStaticSection from '@/Components/Sections/HeroStaticSection';
import { Link } from '@inertiajs/react';

export default function Berita({ articles, categories, latestArticles, meta }) {
    // Determine the articles list from pagination data
    const newsList = articles?.data || [];

    // Formatting Helper
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <MainLayout title="Berita & Artikel | STIKes Bogor Husada">
            <HeroStaticSection data={{
                title: 'Berita & Artikel',
                subtitle: 'Informasi terbaru seputar kegiatan, akademik, publikasi, dan prestasi STIKes Bogor Husada.',
                bgImage: '/assets/img/hero-fallback.png'
            }} />

            {/* Main Content */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex flex-col gap-8 lg:flex-row">

                        {/* Main Grid (Left) */}
                        <div className="w-full lg:w-2/3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {newsList.length > 0 ? newsList.map(news => (
                                    <article key={news.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 group flex flex-col">
                                        <div className="relative aspect-video overflow-hidden bg-gray-100">
                                            <Link href={`/artikel/${news.slug}`} className="block relative h-full w-full">
                                                <img
                                                    src={news.thumbnail ? `/storage/${news.thumbnail.replace('storage/', '')}` : '/img/placeholder-image.png'}
                                                    alt={news.title}
                                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </Link>
                                            <div className="absolute top-4 left-4 pointer-events-none">
                                                <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                                    {news.category?.name || 'Uncategorized'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3 space-x-4">
                                                <span className="flex items-center gap-1.5"><i className="far fa-calendar-alt"></i> {formatDate(news.published_at)}</span>
                                                <span className="flex items-center gap-1.5"><i className="far fa-user"></i> Admin</span>
                                            </div>
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-orange-600 transition-colors">
                                                <Link href={`/artikel/${news.slug}`}>{news.title}</Link>
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-grow">
                                                {news.excerpt || news.content?.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...'}
                                            </p>
                                            <Link href={`/artikel/${news.slug}`} className="inline-flex items-center text-orange-600 dark:text-orange-400 text-sm font-semibold hover:text-orange-800 transition-colors mt-auto">
                                                Baca Selengkapnya <i className="fas fa-arrow-right ml-2 text-[10px]"></i>
                                            </Link>
                                        </div>
                                    </article>
                                )) : (
                                    <div className="col-span-1 md:col-span-2 text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                                        <i className="fas fa-newspaper text-4xl text-gray-300 dark:text-gray-600 mb-3"></i>
                                        <p className="text-gray-500 dark:text-gray-400 font-medium">Belum ada berita yang diterbitkan.</p>
                                    </div>
                                )}
                            </div>

                            {/* Pagination (Real Tailwind UI) */}
                            {articles?.links && articles.links.length > 3 && (
                                <div className="flex flex-wrap justify-center mt-12 gap-2">
                                    {articles.links.map((link, index) => {
                                        let label = link.label;
                                        if (label.includes('&laquo;')) label = <i className="fas fa-chevron-left text-xs"></i>;
                                        if (label.includes('&raquo;')) label = <i className="fas fa-chevron-right text-xs"></i>;

                                        return link.url ? (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition-colors ${link.active
                                                        ? 'border border-orange-600 bg-orange-600 text-white'
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

                        {/* Sidebar (Right) */}
                        <div className="w-full lg:w-1/3 space-y-8">

                            {/* Search Widget */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><i className="fas fa-search text-orange-500"></i> Cari Berita</h3>
                                <div className="relative">
                                    <form action="/berita-dan-artikel/filter" method="GET">
                                        <input type="text" name="search" placeholder="Ketik kata kunci..." defaultValue={new URLSearchParams(window.location.search).get('search') || ''} className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 text-sm focus:outline-none" />
                                        <button type="submit" className="absolute right-1 top-1 bottom-1 w-10 flex items-center justify-center bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Categories Widget */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><i className="fas fa-folder-open text-orange-500"></i> Kategori</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/artikel" className={`flex items-center justify-between p-3 rounded-xl transition-colors ${!new URLSearchParams(window.location.search).get('category') ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 font-semibold' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300'}`}>
                                            <span>Semua Berita</span>
                                            <i className="fas fa-chevron-right text-[10px] opacity-50"></i>
                                        </Link>
                                    </li>
                                    {categories && categories.map((cat, idx) => (
                                        <li key={cat.id}>
                                            <Link href={`/berita-dan-artikel/filter?category=${cat.id}`} className={`flex items-center justify-between p-3 rounded-xl transition-colors ${new URLSearchParams(window.location.search).get('category') == cat.id ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 font-semibold' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300'}`}>
                                                <span>{cat.name}</span>
                                                <i className="fas fa-chevron-right text-[10px] opacity-50"></i>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
