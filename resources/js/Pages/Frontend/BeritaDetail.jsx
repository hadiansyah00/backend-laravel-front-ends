import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function BeritaDetail({ article, categories, latestArticles }) {
    const [copied, setCopied] = useState(false);

    // Formatting Helper
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // Bangun URL gambar
    const imageUrl = article?.thumbnail
        ? (article.thumbnail.startsWith('http') || article.thumbnail.startsWith('/')
            ? article.thumbnail
            : `/storage/${article.thumbnail}`)
        : '/assets/img/placeholder.jpg';

    // Bangun URL halaman untuk share (absolute)
    const pageUrl = typeof window !== 'undefined'
        ? window.location.href
        : `/artikel/${article?.slug}`;

    const fullImageUrl = typeof window !== 'undefined'
        ? (imageUrl.startsWith('http') ? imageUrl : window.location.origin + imageUrl)
        : imageUrl;

    // Deskripsi singkat untuk share text
    const shareText = article?.excerpt
        || (article?.content ? article.content.substring(0, 150).replace(/<[^>]+>/g, '') + '...' : '');

    // =========== SHARE HANDLERS ===========
    const shareToFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const shareToWhatsApp = () => {
        const text = `${article?.title}\n\n${shareText}\n\nBaca selengkapnya: ${pageUrl}`;
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const shareToTwitter = () => {
        const text = `${article?.title} - STIKes Bogor Husada`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const shareToTelegram = () => {
        const url = `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(article?.title)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const copyLink = () => {
        navigator.clipboard.writeText(pageUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <MainLayout title={article ? `${article.title} | STIKes Bogor Husada` : 'Berita Tidak Ditemukan'}>
            {/* SEO Head — untuk client-side navigation (SPA) */}
            <Head>
                <title>{article ? `${article.title} - STIKes Bogor Husada` : 'Berita Tidak Ditemukan'}</title>
                {article && (
                    <>
                        <meta head-key="description" name="description" content={shareText} />
                        <meta head-key="og:title" property="og:title" content={`${article.title} - STIKes Bogor Husada`} />
                        <meta head-key="og:description" property="og:description" content={shareText} />
                        <meta head-key="og:image" property="og:image" content={fullImageUrl} />
                        <meta head-key="og:url" property="og:url" content={pageUrl} />
                        <meta head-key="og:type" property="og:type" content="article" />
                        <meta head-key="twitter:title" name="twitter:title" content={`${article.title} - STIKes Bogor Husada`} />
                        <meta head-key="twitter:description" name="twitter:description" content={shareText} />
                        <meta head-key="twitter:image" name="twitter:image" content={fullImageUrl} />
                    </>
                )}
            </Head>

            {article ? (
                <>
                    {/* ===== HEADER ===== */}
                    <section className="pt-32 pb-12 bg-gray-50 border-b border-gray-100">
                        <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-4xl">
                            <div className="mb-6 animate-fade-in-up">
                                <span className="bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-full text-sm">
                                    {article.category?.name || 'Uncategorized'}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6 animate-fade-in-up">
                                {article.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 font-medium animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                <div className="flex items-center gap-2">
                                    <i className="far fa-user text-orange-500"></i> Admin
                                </div>
                                <div className="hidden sm:block text-gray-300">•</div>
                                <div className="flex items-center gap-2">
                                    <i className="far fa-calendar-alt text-orange-500"></i> {formatDate(article.published_at)}
                                </div>
                                {article.views > 0 && (
                                    <>
                                        <div className="hidden sm:block text-gray-300">•</div>
                                        <div className="flex items-center gap-2">
                                            <i className="far fa-eye text-orange-500"></i> {article.views} Dilihat
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* ===== CONTENT ===== */}
                    <section className="py-12 bg-white">
                        <div className="container px-4 mx-auto max-w-4xl">
                            {/* Featured Image */}
                            <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <img
                                    src={imageUrl}
                                    alt={article.title}
                                    className="w-full h-auto object-cover max-h-[500px]"
                                    onError={(e) => { e.target.src = '/assets/img/placeholder.jpg'; }}
                                />
                            </div>

                            {/* Article Content */}
                            <div
                                className="prose prose-lg prose-orange max-w-none prose-img:rounded-xl prose-a:text-orange-600 hover:prose-a:text-orange-700 font-medium text-gray-700 mb-12 animate-fade-in-up"
                                style={{ animationDelay: '0.3s' }}
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />

                            {/* Tags */}
                            {article.tags && article.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-10 pt-8 border-t border-gray-100">
                                    <span className="text-sm font-semibold text-gray-500 mr-2 self-center">Tags:</span>
                                    {article.tags.map(tag => (
                                        <Link
                                            href={`/artikel?search=${encodeURIComponent(tag.name)}`}
                                            key={tag.id}
                                            className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        >
                                            #{tag.name}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* ===== SHARE & BACK ===== */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <Link href="/artikel" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold transition-colors">
                                    <i className="fas fa-arrow-left"></i> Kembali ke Daftar Berita
                                </Link>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-500 mr-1">Bagikan:</span>
                                    {/* Facebook */}
                                    <button
                                        onClick={shareToFacebook}
                                        title="Share ke Facebook"
                                        className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all hover:scale-110"
                                    >
                                        <i className="fab fa-facebook-f"></i>
                                    </button>
                                    {/* WhatsApp */}
                                    <button
                                        onClick={shareToWhatsApp}
                                        title="Share ke WhatsApp"
                                        className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all hover:scale-110"
                                    >
                                        <i className="fab fa-whatsapp"></i>
                                    </button>
                                    {/* Twitter/X */}
                                    <button
                                        onClick={shareToTwitter}
                                        title="Share ke Twitter/X"
                                        className="w-10 h-10 rounded-full bg-black hover:bg-gray-800 text-white flex items-center justify-center transition-all hover:scale-110"
                                    >
                                        <i className="fab fa-x-twitter"></i>
                                    </button>
                                    {/* Telegram */}
                                    <button
                                        onClick={shareToTelegram}
                                        title="Share ke Telegram"
                                        className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-all hover:scale-110"
                                    >
                                        <i className="fab fa-telegram-plane"></i>
                                    </button>
                                    {/* Copy Link */}
                                    <button
                                        onClick={copyLink}
                                        title="Salin Link"
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                                            copied
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-800 hover:bg-black text-white'
                                        }`}
                                    >
                                        <i className={copied ? 'fas fa-check' : 'fas fa-link'}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ===== ARTIKEL TERBARU LAINNYA ===== */}
                    {latestArticles && latestArticles.length > 0 && (
                        <section className="py-16 bg-gray-50 border-t border-gray-100">
                            <div className="container px-4 mx-auto max-w-6xl">
                                <h3 className="text-2xl font-bold text-gray-900 mb-8">Berita Terbaru Lainnya</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {latestArticles.map((post) => {
                                        const postImage = post.thumbnail
                                            ? (post.thumbnail.startsWith('http') || post.thumbnail.startsWith('/')
                                                ? post.thumbnail
                                                : `/storage/${post.thumbnail}`)
                                            : '/assets/img/placeholder.jpg';
                                        return (
                                            <Link
                                                href={post.slug ? `/artikel/${post.slug}` : '/artikel'}
                                                key={post.id}
                                                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                            >
                                                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                                                    <img
                                                        src={postImage}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        loading="lazy"
                                                        onError={(e) => { e.target.src = '/assets/img/placeholder.jpg'; }}
                                                    />
                                                </div>
                                                <div className="p-5">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="text-xs text-orange-600 font-semibold">{formatDate(post.published_at)}</span>
                                                        {post.category && (
                                                            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                                                {post.category.name}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h4 className="text-base font-bold text-gray-900 group-hover:text-orange-600 line-clamp-2 transition-colors leading-snug">
                                                        {post.title}
                                                    </h4>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    )}
                </>
            ) : (
                <section className="py-32 text-center">
                    <div className="max-w-md mx-auto">
                        <i className="fas fa-newspaper text-6xl text-gray-200 mb-6"></i>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Berita tidak ditemukan</h2>
                        <p className="text-gray-500 mb-8">Artikel yang Anda cari mungkin telah dihapus atau tidak tersedia.</p>
                        <Link href="/artikel" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors">
                            <i className="fas fa-arrow-left"></i> Kembali ke Daftar Berita
                        </Link>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}
