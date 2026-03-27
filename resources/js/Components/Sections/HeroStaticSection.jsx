import React from 'react';
import { Link } from '@inertiajs/react';

export default function HeroStaticSection({ data }) {
    const title = data?.title || 'Halaman';
    const subtitle = data?.subtitle || '';
    const bgImage = data?.bgImage || '/assets/img/hero-fallback.png';

    return (
        <section className="relative h-[400px] flex items-center overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={bgImage}
                    alt={title}
                    className="w-full h-full object-cover select-none"
                    draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/95 via-orange-500/80 to-transparent"></div>
            </div>

            {/* Content Left Aligned */}
            <div className="relative z-10 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto w-full">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-white/90 font-medium mb-6 animate-fade-in-up">
                    <Link href="/" className="hover:text-white transition-colors">
                        <i className="fas fa-home"></i>
                    </Link>
                    <span>/</span>
                    <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                    <span>/</span>
                    <span className="text-white font-bold">{title}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 animate-fade-in-up shadow-sm">
                    {title}
                </h1>

                {subtitle && (
                    <p className="text-lg sm:text-xl text-orange-50 font-medium max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        {subtitle}
                    </p>
                )}
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </section>
    );
}
