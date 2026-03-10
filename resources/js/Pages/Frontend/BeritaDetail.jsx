import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';

export default function BeritaDetail({ article, related, recentPosts, categories, popularTags }) {
    // Formatting Helper
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const imageUrl = article?.thumbnail ? `/storage/${article.thumbnail.replace('storage/', '')}` : '/img/placeholder-image-large.png';

    return (
        <MainLayout title={article ? `${article.title} | STIKes Bogor Husada` : 'Berita Tidak Ditemukan'}>
            {/* Header Area */}
            {article ? (
                <>
                    <section className="pt-32 pb-12 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                        <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-4xl">
                            <div className="mb-6 animate-fade-in-up">
                                <span className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 font-bold px-3 py-1 rounded-full text-sm">
                                    {article.category?.name || 'Uncategorized'}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6 animate-fade-in-up">
                                {article.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 font-medium animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                <div className="flex items-center gap-2">
                                    <i className="far fa-user text-orange-500"></i> Admin
                                </div>
                                <div className="hidden sm:block text-gray-300 dark:text-gray-600">•</div>
                                <div className="flex items-center gap-2">
                                    <i className="far fa-calendar-alt text-orange-500"></i> {formatDate(article.published_at)}
                                </div>
                                <div className="hidden sm:block text-gray-300 dark:text-gray-600">•</div>
                                <div className="flex items-center gap-2">
                                    <i className="far fa-eye text-orange-500"></i> {article.views || 0} Dilihat
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Content Area */}
                    <section className="py-12 bg-white dark:bg-gray-950">
                        <div className="container px-4 mx-auto max-w-4xl">
                            <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <img src={imageUrl} alt={article.title} className="w-full h-auto object-cover max-h-[500px]" />
                            </div>

                            <div
                                className="prose prose-lg dark:prose-invert prose-orange max-w-none prose-img:rounded-xl prose-a:text-orange-600 hover:prose-a:text-orange-700 font-medium text-gray-700 dark:text-gray-300 mb-12 animate-fade-in-up"
                                style={{ animationDelay: '0.3s' }}
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />

                            {/* Tags */}
                            {article.tags && article.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                                    {article.tags.map(tag => (
                                        <Link href={`/berita-dan-artikel/filter?search=${tag.name}`} key={tag.id} className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer">
                                            #{tag.name}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Share & Back */}
                            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                <Link href="/berita" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 font-semibold transition-colors">
                                    <i className="fas fa-arrow-left"></i> Kembali ke Daftar Berita
                                </Link>
                                <div className="flex gap-3">
                                    <button onClick={() => alert('Fitur Share ke Facebook belum aktif.')} className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"><i className="fab fa-facebook-f"></i></button>
                                    <button onClick={() => alert('Fitur Share ke WhatsApp belum aktif.')} className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors"><i className="fab fa-whatsapp"></i></button>
                                    <button onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        alert('Link berhasil disalin ke clipboard!');
                                    }} className="w-10 h-10 rounded-full bg-gray-800 hover:bg-black text-white flex items-center justify-center transition-colors"><i className="fas fa-link"></i></button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Related Posts */}
                    {related && related.length > 0 && (
                        <section className="py-12 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                            <div className="container px-4 mx-auto max-w-6xl">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Berita Terkait</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {related.map((post) => (
                                        <Link href={`/artikel/${post.slug}`} key={post.id} className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                                            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                                                <img src={post.thumbnail ? `/storage/${post.thumbnail.replace('storage/', '')}` : '/img/placeholder-image.png'} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <div className="p-4">
                                                <p className="text-xs text-orange-600 font-semibold mb-2">{formatDate(post.published_at)}</p>
                                                <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-orange-600 line-clamp-2 transition-colors">{post.title}</h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </>
            ) : (
                <section className="py-32 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Berita tidak ditemukan</h2>
                    <Link href="/artikel" className="mt-4 inline-block text-orange-600 hover:underline">Kembali ke Daftar Berita</Link>
                </section>
            )}
        </MainLayout>
    );
}
