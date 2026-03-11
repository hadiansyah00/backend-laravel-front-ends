import React from 'react';

export default function Hero({ content, pageInfo }) {
    // Structure: content.title, content.subtitle, content.image_desktop, content.image_mobile
    const hasImage = content.image_desktop || content.image;
    const rawImage = hasImage ? (content.image_desktop || content.image) : null;
    const bgImage = rawImage 
        ? (rawImage.startsWith('http') || rawImage.startsWith('/') ? rawImage : `/storage/${rawImage}`) 
        : null;

    // Convert breadcrumbs object into array
    const breadcrumbs = content.breadcrumbs ? Object.values(content.breadcrumbs) : [];

    return (
        <section
            className="relative flex items-center justify-center w-full min-h-[50vh] md:min-h-[70vh] overflow-hidden bg-center bg-cover bg-fixed group"
            style={bgImage ? { backgroundImage: `url(${bgImage})` } : { backgroundColor: '#ea580c' /* default orange */ }}
        >
            {/* Dark Gradient Overlay for optimal text contrast */}
            {content.gradient !== 'none' && (
                <div className={`absolute inset-0 z-0 bg-gradient-to-t ${
                    content.gradient === 'dark' ? 'from-gray-900 via-gray-900/70 to-black/30' :
                    content.gradient === 'orange' ? 'from-orange-900 via-orange-900/70 to-black/30' :
                    'from-gray-900/80 via-gray-900/40 to-transparent'
                }`}></div>
            )}
            
            {/* Subtle Zoom Effect on Background (Optional CSS class added via parent or global) */}
            <div className={`absolute inset-0 z-0 bg-center bg-cover bg-fixed transition-transform duration-[10000ms] ease-linear group-hover:scale-105 ${bgImage ? '' : 'hidden'}`}
                 style={{ backgroundImage: `url(${bgImage})`, opacity: 0.1 }}></div>

            {/* Content Container */}
            <div className="relative z-10 w-full px-4 text-center text-white py-20 max-w-7xl">

                {/* Dynamic Typewriter Effect for Title or Page Title */}
                <h1 className="mb-6 text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl">
                    <span className="block animate-fade-in-up bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300">
                        {content.title || pageInfo?.title}
                    </span>
                </h1>

                {/* Subtitle */}
                {content.subtitle && (
                    <p className="max-w-3xl mx-auto mt-6 text-lg sm:text-xl md:text-2xl text-gray-200 drop-shadow-lg animate-fade-in-up font-medium leading-relaxed" style={{ animationDelay: '0.2s' }}>
                        {content.subtitle}
                    </p>
                )}

                {/* Breadcrumbs Component */}
                {breadcrumbs.length > 0 && (
                    <nav className="flex justify-center mt-12 animate-fade-in-up" aria-label="Breadcrumb" style={{ animationDelay: '0.4s' }}>
                        <ol className="inline-flex items-center px-6 py-3 space-x-2 md:space-x-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl">
                            <li className="inline-flex items-center">
                                <a href="/" className="inline-flex items-center text-sm font-semibold text-gray-200 hover:text-white transition-colors group">
                                    <i className="mr-2.5 fas fa-home group-hover:scale-110 transition-transform"></i>
                                    Home
                                </a>
                            </li>
                            {breadcrumbs.map((crumb, idx) => (
                                <li key={idx}>
                                    <div className="flex items-center">
                                        <i className="mx-2 text-[10px] text-white/50 fas fa-circle"></i>
                                        {crumb.url ? (
                                            <a href={crumb.url} className="text-sm font-semibold text-gray-200 hover:text-white transition-colors ml-2">
                                                {crumb.label}
                                            </a>
                                        ) : (
                                            <span className="text-sm font-bold text-white ml-2 tracking-wide">
                                                {crumb.label}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}
            </div>

            {/* Scroll Indicator */}
            {content.scroll_indicator && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-[30px] h-[50px] border-2 border-white rounded-full flex justify-center p-1 opacity-70">
                        <div className="w-1.5 h-3 bg-white rounded-full animate-scroll-down"></div>
                    </div>
                </div>
            )}
        </section>
    );
}
