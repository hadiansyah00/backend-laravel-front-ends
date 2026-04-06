import React, { useState, useEffect, useCallback } from 'react';
import { router, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Galeri({ galleries, categories, filters }) {
    const defaultCategories = ["Semua", ...(categories || [])];
    const activeTab = filters?.category || "Semua";
    const [selectedImage, setSelectedImage] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [loadedImages, setLoadedImages] = useState({});

    const galleryList = galleries?.data || [];

    const handleTabClick = (category) => {
        setIsAnimating(true);
        setTimeout(() => {
            router.get('/galeri', category === 'Semua' ? {} : { category }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onFinish: () => setIsAnimating(false),
            });
        }, 200);
    };

    // Track image load state for skeleton effect
    const handleImageLoad = (id) => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
    };

    // Lightbox navigation
    const handlePrev = useCallback((e) => {
        if (e) e.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = galleryList.findIndex(item => item.id === selectedImage.id);
        const prevIndex = currentIndex === 0 ? galleryList.length - 1 : currentIndex - 1;
        setSelectedImage(galleryList[prevIndex]);
    }, [selectedImage, galleryList]);

    const handleNext = useCallback((e) => {
        if (e) e.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = galleryList.findIndex(item => item.id === selectedImage.id);
        const nextIndex = currentIndex === galleryList.length - 1 ? 0 : currentIndex + 1;
        setSelectedImage(galleryList[nextIndex]);
    }, [selectedImage, galleryList]);

    // Keyboard navigation & body scroll lock
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;
            if (e.key === 'Escape') setSelectedImage(null);
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, handlePrev, handleNext]);

    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedImage]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/img/placeholder-image-large.png';
        if (imagePath.startsWith('http')) return imagePath;
        return `/storage/${imagePath.replace(/^storage\//, '')}`;
    };

    // Current image index for lightbox counter
    const currentLightboxIndex = selectedImage
        ? galleryList.findIndex(item => item.id === selectedImage.id)
        : -1;

    return (
        <MainLayout title="Galeri Kampus | STIKes Bogor Husada">
            {/* ========== HERO SECTION ========== */}
            <section className="galeri-hero">
                <div className="galeri-hero__bg">
                    <img
                        src="/assets/img/hero-fallback.png"
                        alt="Galeri Kampus"
                        className="galeri-hero__bg-img"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80';
                        }}
                    />
                    <div className="galeri-hero__overlay"></div>
                </div>
                <div className="galeri-hero__content">
                    {/* Breadcrumb */}
                    <nav className="galeri-hero__breadcrumb" aria-label="Breadcrumb">
                        <ol>
                            <li>
                                <Link href="/">
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    Beranda
                                </Link>
                            </li>
                            <li className="galeri-hero__breadcrumb-sep">
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                            </li>
                            <li className="galeri-hero__breadcrumb-active">Galeri Kampus</li>
                        </ol>
                    </nav>

                    <h1 className="galeri-hero__title">
                        <span className="galeri-hero__title-icon">
                            <i className="fas fa-camera-retro"></i>
                        </span>
                        Galeri Kampus
                    </h1>
                    <p className="galeri-hero__subtitle">
                        Dokumentasi momen-momen penting, fasilitas, dan kegiatan akademik STIKes Bogor Husada.
                    </p>

                    {/* Stats */}
                    {galleries?.total > 0 && (
                        <div className="galeri-hero__stats">
                            <div className="galeri-hero__stat">
                                <span className="galeri-hero__stat-number">{galleries.total}</span>
                                <span className="galeri-hero__stat-label">Total Foto</span>
                            </div>
                            <div className="galeri-hero__stat-divider"></div>
                            <div className="galeri-hero__stat">
                                <span className="galeri-hero__stat-number">{categories?.length || 0}</span>
                                <span className="galeri-hero__stat-label">Kategori</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Wave Divider */}
                <div className="galeri-hero__wave">
                    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,40 1440,50 L1440,120 L0,120 Z" />
                    </svg>
                </div>
            </section>

            {/* ========== GALLERY CONTENT ========== */}
            <section className="galeri-content">
                <div className="galeri-content__container">

                    {/* Filter Tabs */}
                    <div className="galeri-filters">
                        <div className="galeri-filters__inner">
                            {defaultCategories.map((cat, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleTabClick(cat)}
                                    className={`galeri-filters__btn ${activeTab === cat ? 'galeri-filters__btn--active' : ''}`}
                                >
                                    {activeTab === cat && (
                                        <span className="galeri-filters__btn-dot"></span>
                                    )}
                                    {cat}
                                    {activeTab === cat && galleries?.total > 0 && (
                                        <span className="galeri-filters__btn-count">
                                            {galleries.total}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Image Grid — Masonry-Inspired */}
                    <div className={`galeri-grid ${isAnimating ? 'galeri-grid--fading' : ''}`}>
                        {galleryList.length > 0 && galleryList.map((item, index) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedImage(item)}
                                className={`galeri-card galeri-card--size-${(index % 6 === 0 || index % 6 === 3) ? 'large' : 'normal'}`}
                                style={{ animationDelay: `${index * 0.06}s` }}
                            >
                                {/* Skeleton Placeholder */}
                                {!loadedImages[item.id] && (
                                    <div className="galeri-card__skeleton">
                                        <div className="galeri-card__skeleton-shimmer"></div>
                                    </div>
                                )}
                                <img
                                    src={getImageUrl(item.image)}
                                    alt={item.title}
                                    className={`galeri-card__img ${loadedImages[item.id] ? 'galeri-card__img--loaded' : ''}`}
                                    loading="lazy"
                                    onLoad={() => handleImageLoad(item.id)}
                                />
                                <div className="galeri-card__overlay">
                                    <div className="galeri-card__overlay-content">
                                        {item.category && (
                                            <span className="galeri-card__category">{item.category}</span>
                                        )}
                                        <h4 className="galeri-card__title">{item.title}</h4>
                                        {item.description && (
                                            <p className="galeri-card__desc">
                                                {item.description.length > 80
                                                    ? item.description.substring(0, 80) + '...'
                                                    : item.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="galeri-card__actions">
                                        <span className="galeri-card__zoom-icon">
                                            <i className="fas fa-expand-alt"></i>
                                        </span>
                                    </div>
                                </div>
                                {/* Decorative shine */}
                                <div className="galeri-card__shine"></div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {galleryList.length === 0 && (
                        <div className="galeri-empty">
                            <div className="galeri-empty__icon">
                                <i className="fas fa-images"></i>
                            </div>
                            <h3 className="galeri-empty__title">Belum Ada Foto</h3>
                            <p className="galeri-empty__text">
                                {activeTab !== 'Semua'
                                    ? `Tidak ada foto dalam kategori "${activeTab}" saat ini.`
                                    : 'Galeri foto akan segera tersedia. Silakan kunjungi kembali nanti.'
                                }
                            </p>
                            {activeTab !== 'Semua' && (
                                <button
                                    onClick={() => handleTabClick('Semua')}
                                    className="galeri-empty__btn"
                                >
                                    <i className="fas fa-th-large"></i>
                                    Lihat Semua Galeri
                                </button>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {galleries?.links && galleries.links.length > 3 && (
                        <div className="galeri-pagination">
                            {galleries.links.map((link, index) => {
                                let label = link.label;
                                const isPrev = label.includes('&laquo;');
                                const isNext = label.includes('&raquo;');
                                if (isPrev) label = <i className="fas fa-chevron-left"></i>;
                                if (isNext) label = <i className="fas fa-chevron-right"></i>;

                                return link.url ? (
                                    <button
                                        key={index}
                                        onClick={() => router.get(link.url, filters, { preserveScroll: true, preserveState: true })}
                                        className={`galeri-pagination__btn ${link.active ? 'galeri-pagination__btn--active' : ''} ${isPrev ? 'galeri-pagination__btn--prev' : ''} ${isNext ? 'galeri-pagination__btn--next' : ''}`}
                                    >
                                        {label}
                                    </button>
                                ) : (
                                    <span key={index} className="galeri-pagination__btn galeri-pagination__btn--disabled">
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    )}

                </div>
            </section>

            {/* ========== LIGHTBOX MODAL ========== */}
            {selectedImage && (
                <div className="galeri-lightbox" onClick={() => setSelectedImage(null)}>
                    <div className="galeri-lightbox__backdrop"></div>

                    {/* Top Bar */}
                    <div className="galeri-lightbox__topbar" onClick={(e) => e.stopPropagation()}>
                        <div className="galeri-lightbox__counter">
                            <i className="fas fa-images"></i>
                            <span>{currentLightboxIndex + 1} / {galleryList.length}</span>
                        </div>
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="galeri-lightbox__close"
                            aria-label="Tutup galeri"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="galeri-lightbox__main" onClick={(e) => e.stopPropagation()}>
                        {/* Navigation - Left */}
                        {galleryList.length > 1 && (
                            <button
                                onClick={handlePrev}
                                className="galeri-lightbox__nav galeri-lightbox__nav--prev"
                                aria-label="Foto sebelumnya"
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>
                        )}

                        {/* Image Container */}
                        <div className="galeri-lightbox__image-wrap">
                            <img
                                src={getImageUrl(selectedImage.image)}
                                alt={selectedImage.title}
                                className="galeri-lightbox__image"
                                key={selectedImage.id}
                            />
                        </div>

                        {/* Navigation - Right */}
                        {galleryList.length > 1 && (
                            <button
                                onClick={handleNext}
                                className="galeri-lightbox__nav galeri-lightbox__nav--next"
                                aria-label="Foto selanjutnya"
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        )}
                    </div>

                    {/* Bottom Info */}
                    <div className="galeri-lightbox__info" onClick={(e) => e.stopPropagation()}>
                        {selectedImage.category && (
                            <span className="galeri-lightbox__info-cat">{selectedImage.category}</span>
                        )}
                        <h3 className="galeri-lightbox__info-title">{selectedImage.title}</h3>
                        {selectedImage.description && (
                            <p className="galeri-lightbox__info-desc">{selectedImage.description}</p>
                        )}
                    </div>

                    {/* Thumbnail Strip */}
                    {galleryList.length > 1 && (
                        <div className="galeri-lightbox__thumbs" onClick={(e) => e.stopPropagation()}>
                            {galleryList.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedImage(item)}
                                    className={`galeri-lightbox__thumb ${selectedImage.id === item.id ? 'galeri-lightbox__thumb--active' : ''}`}
                                >
                                    <img src={getImageUrl(item.image)} alt={item.title} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ========== SCOPED STYLES ========== */}
            <style>{`
                /* ===== HERO ===== */
                .galeri-hero {
                    position: relative;
                    min-height: 420px;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }
                .galeri-hero__bg {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                }
                .galeri-hero__bg-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .galeri-hero__overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(30,41,59,0.85) 40%, rgba(234,88,12,0.4) 100%);
                }
                .galeri-hero__content {
                    position: relative;
                    z-index: 10;
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 7rem 1.5rem 5rem;
                    width: 100%;
                }
                .galeri-hero__breadcrumb ol {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    list-style: none;
                    padding: 0;
                    margin: 0 0 1.5rem;
                }
                .galeri-hero__breadcrumb a {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    color: rgba(255,255,255,0.7);
                    text-decoration: none;
                    font-size: 0.875rem;
                    font-weight: 500;
                    transition: color 0.2s;
                }
                .galeri-hero__breadcrumb a:hover { color: #fff; }
                .galeri-hero__breadcrumb-sep { color: rgba(255,255,255,0.35); display: flex; }
                .galeri-hero__breadcrumb-active {
                    color: #fb923c;
                    font-weight: 700;
                    font-size: 0.875rem;
                }
                .galeri-hero__title {
                    font-size: 3rem;
                    font-weight: 900;
                    color: #fff;
                    line-height: 1.1;
                    margin: 0 0 1rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    animation: galeri-fadeUp 0.7s ease-out;
                }
                .galeri-hero__title-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 56px;
                    height: 56px;
                    border-radius: 16px;
                    background: linear-gradient(135deg, #f97316, #ea580c);
                    font-size: 1.5rem;
                    color: #fff;
                    flex-shrink: 0;
                    box-shadow: 0 8px 24px rgba(249,115,22,0.35);
                }
                .galeri-hero__subtitle {
                    font-size: 1.125rem;
                    color: rgba(255,255,255,0.75);
                    max-width: 600px;
                    line-height: 1.7;
                    margin: 0 0 1.5rem;
                    animation: galeri-fadeUp 0.7s ease-out 0.15s both;
                }
                .galeri-hero__stats {
                    display: inline-flex;
                    align-items: center;
                    gap: 1.5rem;
                    padding: 0.75rem 1.5rem;
                    background: rgba(255,255,255,0.08);
                    border: 1px solid rgba(255,255,255,0.12);
                    border-radius: 12px;
                    backdrop-filter: blur(12px);
                    animation: galeri-fadeUp 0.7s ease-out 0.3s both;
                }
                .galeri-hero__stat { text-align: center; }
                .galeri-hero__stat-number {
                    display: block;
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #fb923c;
                }
                .galeri-hero__stat-label {
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.6);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-weight: 600;
                }
                .galeri-hero__stat-divider {
                    width: 1px;
                    height: 36px;
                    background: rgba(255,255,255,0.15);
                }
                .galeri-hero__wave {
                    position: absolute;
                    bottom: -1px;
                    left: 0;
                    width: 100%;
                    line-height: 0;
                    z-index: 10;
                }
                .galeri-hero__wave svg {
                    display: block;
                    width: 100%;
                    height: 60px;
                    fill: #f9fafb;
                }
                @media (prefers-color-scheme: dark) {
                    .galeri-hero__wave svg { fill: #111827; }
                }

                /* ===== CONTENT SECTION ===== */
                .galeri-content {
                    padding: 3rem 0 5rem;
                    background: #f9fafb;
                    min-height: 60vh;
                }
                @media (prefers-color-scheme: dark) {
                    .galeri-content { background: #111827; }
                }
                .galeri-content__container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                /* ===== FILTER TABS ===== */
                .galeri-filters {
                    margin-bottom: 2.5rem;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                }
                .galeri-filters::-webkit-scrollbar { display: none; }
                .galeri-filters__inner {
                    display: flex;
                    gap: 0.5rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                .galeri-filters__btn {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.65rem 1.5rem;
                    border-radius: 50px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    border: 1.5px solid #e5e7eb;
                    background: #fff;
                    color: #374151;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
                    white-space: nowrap;
                }
                @media (prefers-color-scheme: dark) {
                    .galeri-filters__btn {
                        background: #1f2937;
                        border-color: #374151;
                        color: #d1d5db;
                    }
                }
                .galeri-filters__btn:hover {
                    border-color: #f97316;
                    color: #f97316;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(249,115,22,0.15);
                }
                .galeri-filters__btn--active {
                    background: linear-gradient(135deg, #f97316, #ea580c) !important;
                    color: #fff !important;
                    border-color: transparent !important;
                    box-shadow: 0 4px 16px rgba(249,115,22,0.35);
                    transform: translateY(-2px);
                }
                .galeri-filters__btn-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #fff;
                    animation: galeri-pulse 2s infinite;
                }
                .galeri-filters__btn-count {
                    font-size: 0.7rem;
                    padding: 0.1rem 0.45rem;
                    border-radius: 10px;
                    background: rgba(255,255,255,0.25);
                    font-weight: 700;
                }

                /* ===== IMAGE GRID ===== */
                .galeri-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.25rem;
                    transition: opacity 0.3s ease;
                }
                .galeri-grid--fading {
                    opacity: 0.3;
                    pointer-events: none;
                }
                @media (max-width: 1024px) {
                    .galeri-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 640px) {
                    .galeri-grid { grid-template-columns: 1fr; }
                    .galeri-hero__title { font-size: 2rem; }
                    .galeri-hero__title-icon { width: 44px; height: 44px; font-size: 1.1rem; border-radius: 12px; }
                }

                /* ===== GALLERY CARD ===== */
                .galeri-card {
                    position: relative;
                    border-radius: 16px;
                    overflow: hidden;
                    cursor: pointer;
                    background: #e5e7eb;
                    aspect-ratio: 4/3;
                    animation: galeri-cardIn 0.5s ease-out both;
                }
                @media (prefers-color-scheme: dark) {
                    .galeri-card { background: #1f2937; }
                }
                .galeri-card--size-large {
                    grid-row: span 2;
                    aspect-ratio: auto;
                }
                @media (max-width: 640px) {
                    .galeri-card--size-large {
                        grid-row: span 1;
                        aspect-ratio: 4/3;
                    }
                }
                .galeri-card__skeleton {
                    position: absolute;
                    inset: 0;
                    background: #e5e7eb;
                    z-index: 2;
                }
                @media (prefers-color-scheme: dark) {
                    .galeri-card__skeleton { background: #374151; }
                }
                .galeri-card__skeleton-shimmer {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
                    animation: galeri-shimmer 1.5s infinite;
                }
                .galeri-card__img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.4s;
                    opacity: 0;
                }
                .galeri-card__img--loaded { opacity: 1; }
                .galeri-card:hover .galeri-card__img {
                    transform: scale(1.08);
                }
                .galeri-card__overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 1.5rem;
                    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
                    opacity: 0;
                    transition: opacity 0.35s ease;
                    z-index: 3;
                }
                .galeri-card:hover .galeri-card__overlay { opacity: 1; }
                .galeri-card__overlay-content {
                    transform: translateY(12px);
                    transition: transform 0.35s ease;
                }
                .galeri-card:hover .galeri-card__overlay-content { transform: translateY(0); }
                .galeri-card__category {
                    display: inline-block;
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: #fb923c;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    margin-bottom: 0.4rem;
                }
                .galeri-card__title {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: #fff;
                    line-height: 1.3;
                    margin: 0;
                }
                .galeri-card__desc {
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.7);
                    margin: 0.3rem 0 0;
                    line-height: 1.4;
                }
                .galeri-card__actions {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                }
                .galeri-card__zoom-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.15);
                    backdrop-filter: blur(8px);
                    color: #fff;
                    font-size: 0.9rem;
                    transition: all 0.3s;
                    transform: scale(0.7);
                    opacity: 0;
                }
                .galeri-card:hover .galeri-card__zoom-icon {
                    opacity: 1;
                    transform: scale(1);
                }
                .galeri-card__zoom-icon:hover {
                    background: #f97316;
                }
                .galeri-card__shine {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
                    opacity: 0;
                    transition: opacity 0.4s;
                    z-index: 4;
                    pointer-events: none;
                }
                .galeri-card:hover .galeri-card__shine { opacity: 1; }

                /* ===== EMPTY STATE ===== */
                .galeri-empty {
                    text-align: center;
                    padding: 5rem 2rem;
                    background: #fff;
                    border-radius: 20px;
                    border: 1px solid #e5e7eb;
                }
                @media (prefers-color-scheme: dark) {
                    .galeri-empty {
                        background: #1f2937;
                        border-color: #374151;
                    }
                }
                .galeri-empty__icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #fef3c7, #ffedd5);
                    margin-bottom: 1.5rem;
                    font-size: 2rem;
                    color: #f97316;
                }
                @media (prefers-color-scheme: dark) {
                    .galeri-empty__icon { background: linear-gradient(135deg, #451a03, #7c2d12); }
                }
                .galeri-empty__title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1f2937;
                    margin: 0 0 0.5rem;
                }
                @media (prefers-color-scheme: dark) {
                    .galeri-empty__title { color: #f3f4f6; }
                }
                .galeri-empty__text {
                    color: #6b7280;
                    font-size: 0.95rem;
                    margin: 0 0 1.5rem;
                }
                @media (prefers-color-scheme: dark) {
                    .galeri-empty__text { color: #9ca3af; }
                }
                .galeri-empty__btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #f97316, #ea580c);
                    color: #fff;
                    font-weight: 600;
                    font-size: 0.9rem;
                    border: none;
                    cursor: pointer;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .galeri-empty__btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(249,115,22,0.35);
                }

                /* ===== PAGINATION ===== */
                .galeri-pagination {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-top: 3rem;
                }
                .galeri-pagination__btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 42px;
                    height: 42px;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 0.875rem;
                    border: 1.5px solid #e5e7eb;
                    background: #fff;
                    color: #374151;
                    cursor: pointer;
                    transition: all 0.25s;
                }
                @media (prefers-color-scheme: dark) {
                    .galeri-pagination__btn {
                        background: #1f2937;
                        border-color: #374151;
                        color: #d1d5db;
                    }
                }
                .galeri-pagination__btn:hover:not(.galeri-pagination__btn--disabled):not(.galeri-pagination__btn--active) {
                    border-color: #f97316;
                    color: #f97316;
                    transform: translateY(-2px);
                }
                .galeri-pagination__btn--active {
                    background: linear-gradient(135deg, #f97316, #ea580c) !important;
                    color: #fff !important;
                    border-color: transparent !important;
                    box-shadow: 0 4px 12px rgba(249,115,22,0.3);
                }
                .galeri-pagination__btn--disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                /* ===== LIGHTBOX ===== */
                .galeri-lightbox {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    animation: galeri-lbIn 0.3s ease-out;
                }
                .galeri-lightbox__backdrop {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.92);
                    backdrop-filter: blur(8px);
                }
                .galeri-lightbox__topbar {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 1.5rem;
                    z-index: 20;
                }
                .galeri-lightbox__counter {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                    color: rgba(255,255,255,0.7);
                    font-weight: 600;
                }
                .galeri-lightbox__close {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(255,255,255,0.1);
                    color: #fff;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: all 0.25s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .galeri-lightbox__close:hover {
                    background: #ef4444;
                    transform: rotate(90deg);
                }
                .galeri-lightbox__main {
                    position: relative;
                    z-index: 15;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    max-width: 1100px;
                    padding: 0 4rem;
                    flex: 1;
                }
                .galeri-lightbox__image-wrap {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    max-height: 70vh;
                    width: 100%;
                }
                .galeri-lightbox__image {
                    max-height: 70vh;
                    max-width: 100%;
                    object-fit: contain;
                    border-radius: 12px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                    animation: galeri-imgIn 0.35s ease-out;
                }
                .galeri-lightbox__nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(255,255,255,0.1);
                    color: #fff;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.25s;
                    z-index: 20;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(4px);
                }
                .galeri-lightbox__nav:hover {
                    background: #f97316;
                    transform: translateY(-50%) scale(1.1);
                }
                .galeri-lightbox__nav--prev { left: 1rem; }
                .galeri-lightbox__nav--next { right: 1rem; }
                .galeri-lightbox__info {
                    text-align: center;
                    padding: 1rem 1.5rem;
                    z-index: 15;
                }
                .galeri-lightbox__info-cat {
                    display: inline-block;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #fb923c;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 0.3rem;
                }
                .galeri-lightbox__info-title {
                    font-size: 1.35rem;
                    font-weight: 700;
                    color: #fff;
                    margin: 0;
                }
                .galeri-lightbox__info-desc {
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.6);
                    margin: 0.4rem 0 0;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                }

                /* Thumbnail Strip */
                .galeri-lightbox__thumbs {
                    display: flex;
                    gap: 0.4rem;
                    padding: 0.75rem 1.5rem 1.25rem;
                    overflow-x: auto;
                    z-index: 15;
                    justify-content: center;
                    max-width: 100%;
                    scrollbar-width: none;
                }
                .galeri-lightbox__thumbs::-webkit-scrollbar { display: none; }
                .galeri-lightbox__thumb {
                    width: 52px;
                    height: 52px;
                    border-radius: 8px;
                    overflow: hidden;
                    border: 2px solid transparent;
                    cursor: pointer;
                    flex-shrink: 0;
                    opacity: 0.5;
                    transition: all 0.2s;
                    padding: 0;
                    background: none;
                }
                .galeri-lightbox__thumb:hover { opacity: 0.8; }
                .galeri-lightbox__thumb--active {
                    border-color: #f97316;
                    opacity: 1;
                    box-shadow: 0 0 0 2px rgba(249,115,22,0.4);
                }
                .galeri-lightbox__thumb img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                /* ===== ANIMATIONS ===== */
                @keyframes galeri-fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes galeri-cardIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.96); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes galeri-shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes galeri-pulse {
                    0%,100% { opacity:1; }
                    50% { opacity:0.4; }
                }
                @keyframes galeri-lbIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes galeri-imgIn {
                    from { opacity: 0; transform: scale(0.92); }
                    to { opacity: 1; transform: scale(1); }
                }

                /* ===== RESPONSIVE LIGHTBOX ===== */
                @media (max-width: 768px) {
                    .galeri-lightbox__main { padding: 0 1rem; }
                    .galeri-lightbox__nav { width: 40px; height: 40px; font-size: 0.85rem; }
                    .galeri-lightbox__nav--prev { left: 0.5rem; }
                    .galeri-lightbox__nav--next { right: 0.5rem; }
                    .galeri-lightbox__info-title { font-size: 1.1rem; }
                    .galeri-lightbox__thumb { width: 42px; height: 42px; }
                }
            `}</style>
        </MainLayout>
    );
}
