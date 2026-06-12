import React, { useMemo, useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';

const resolveImageUrl = (path) => {
    if (!path) return '/assets/img/placeholder.jpg';
    return path.startsWith('http') || path.startsWith('/') ? path : `/storage/${path}`;
};

const normalizeImagePath = (path) => {
    if (!path) return '';

    try {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://example.test';
        return decodeURIComponent(new URL(resolveImageUrl(path), baseUrl).pathname)
            .replace(/^\/storage\//, '')
            .replace(/^\//, '');
    } catch {
        return path.replace(/^\/storage\//, '').replace(/^\//, '');
    }
};

const removeDuplicateThumbnail = (content, thumbnail) => {
    if (!content || !thumbnail || typeof DOMParser === 'undefined') return content || '';

    const document = new DOMParser().parseFromString(content, 'text/html');
    const firstImage = document.body.querySelector('img');

    if (!firstImage || normalizeImagePath(firstImage.getAttribute('src')) !== normalizeImagePath(thumbnail)) {
        return content;
    }

    const imageContainer = firstImage.closest('figure') || firstImage;
    const parent = imageContainer.parentElement;
    imageContainer.remove();

    if (parent && ['P', 'DIV'].includes(parent.tagName) && !parent.textContent.trim() && !parent.querySelector('img, video, iframe')) {
        parent.remove();
    }

    return document.body.innerHTML;
};

export default function BeritaDetail({ article, categories, latestArticles }) {
    const [copied, setCopied] = useState(false);

    // Formatting Helper
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // Bangun URL gambar
    const imageUrl = resolveImageUrl(article?.thumbnail);
    const articleContent = useMemo(
        () => removeDuplicateThumbnail(article?.content, article?.thumbnail),
        [article?.content, article?.thumbnail],
    );
    const readingTime = Math.max(1, Math.ceil((article?.content || '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length / 200));

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
                    <section className="pt-28 pb-12 bg-gradient-to-b from-orange-50/70 via-white to-white border-b border-orange-100/70">
                        <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-5xl">
                            <nav className="flex items-center gap-2 mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
                                <Link href="/" className="hover:text-orange-600 transition-colors">Beranda</Link>
                                <i className="fas fa-chevron-right text-[10px] text-gray-300"></i>
                                <Link href="/artikel" className="hover:text-orange-600 transition-colors">Berita</Link>
                            </nav>
                            <div className="mb-5 animate-fade-in-up">
                                <span className="bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-full text-sm">
                                    {article.category?.name || 'Uncategorized'}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.12] tracking-tight mb-6 animate-fade-in-up">
                                {article.title}
                            </h1>
                            {article.excerpt && (
                                <p className="max-w-3xl mb-7 text-lg md:text-xl leading-relaxed text-gray-600">
                                    {article.excerpt}
                                </p>
                            )}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 font-medium animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                <div className="flex items-center gap-2">
                                    <i className="far fa-user text-orange-500"></i> Admin
                                </div>
                                <div className="hidden sm:block text-gray-300">•</div>
                                <div className="flex items-center gap-2">
                                    <i className="far fa-calendar-alt text-orange-500"></i> {formatDate(article.published_at)}
                                </div>
                                <div className="hidden sm:block text-gray-300">&bull;</div>
                                <div className="flex items-center gap-2">
                                    <i className="far fa-clock text-orange-500"></i> {readingTime} menit baca
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
                    <section className="pb-16 bg-white">
                        <div className="container px-4 mx-auto max-w-5xl">
                            {/* Featured Image */}
                            <div className="relative -mt-1 mb-12 aspect-[16/9] rounded-3xl overflow-hidden shadow-xl shadow-gray-200/70 border border-white animate-fade-in-up bg-gray-100" style={{ animationDelay: '0.2s' }}>
                                <img
                                    src={imageUrl}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = '/assets/img/placeholder.jpg'; }}
                                />
                            </div>

                            {/* Article Content */}
                            <article className="max-w-3xl mx-auto">
                                <div
                                    className="prose prose-lg md:prose-xl prose-orange max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-8 prose-img:rounded-2xl prose-img:shadow-sm prose-a:text-orange-600 hover:prose-a:text-orange-700 text-gray-700 mb-12 animate-fade-in-up"
                                    style={{ animationDelay: '0.3s' }}
                                    dangerouslySetInnerHTML={{ __html: articleContent }}
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
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-orange-50/60 p-6 rounded-2xl border border-orange-100">
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
                            </article>
                        </div>
                    </section>

                    {/* ===== ARTIKEL TERBARU LAINNYA ===== */}
                    {latestArticles && latestArticles.length > 0 && (
                        <section className="py-16 bg-gray-50 border-t border-gray-100">
                            <div className="container px-4 mx-auto max-w-6xl">
                                <h3 className="text-2xl font-bold text-gray-900 mb-8">Berita Terbaru Lainnya</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {latestArticles.map((post) => {
                                        const postImage = resolveImageUrl(post.thumbnail);
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
