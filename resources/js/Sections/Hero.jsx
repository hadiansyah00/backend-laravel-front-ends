import React from 'react';

export default function Hero({ content, pageInfo }) {
    // Structure: content.title, content.subtitle, content.image_desktop, content.image_mobile
    const hasImage = content.image_desktop || content.image;
    const bgImage = hasImage ? `/storage/${content.image_desktop || content.image}` : null;

    // Convert breadcrumbs object into array
    const breadcrumbs = content.breadcrumbs ? Object.values(content.breadcrumbs) : [];

    return (
        <section
            className="relative flex items-center justify-center w-full min-h-[40vh] md:min-h-[60vh] overflow-hidden bg-center bg-cover"
            style={bgImage ? { backgroundImage: `url(${bgImage})` } : { backgroundColor: '#ea580c' /* default orange */ }}
        >
            {/* Gradient Overlay */}
            {content.gradient !== 'none' && (
                <div className={`absolute inset-0 z-0 bg-gradient-to-t ${content.gradient === 'dark' ? 'from-black/80 to-transparent' :
                        content.gradient === 'orange' ? 'from-orange-900/80 to-transparent' :
                            'from-black/50 via-black/20 to-transparent'
                    }`}></div>
            )}

            {/* Content Container */}
            <div className="relative z-10 w-full px-4 text-center text-white py-14 max-w-7xl">

                {/* Dynamic Typewriter Effect for Title or Page Title */}
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    <span className="block drop-shadow-lg animate-fade-in-up">
                        {content.title || pageInfo?.title}
                    </span>
                </h1>

                {/* Subtitle */}
                {content.subtitle && (
                    <p className="max-w-3xl mx-auto mt-6 text-lg sm:text-xl md:text-2xl text-gray-100 drop-shadow-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        {content.subtitle}
                    </p>
                )}

                {/* Breadcrumbs Component */}
                {breadcrumbs.length > 0 && (
                    <nav className="flex justify-center mt-8 animate-fade-in-up" aria-label="Breadcrumb" style={{ animationDelay: '0.4s' }}>
                        <ol className="inline-flex items-center px-4 py-2 space-x-1 border border-white/20 rounded-full md:space-x-2 bg-black/30 backdrop-blur-md">
                            <li className="inline-flex items-center">
                                <a href="/" className="inline-flex items-center text-sm font-medium text-gray-100 hover:text-white group">
                                    <i className="mr-2 fas fa-home group-hover:scale-110 transition-transform"></i>
                                    Home
                                </a>
                            </li>
                            {breadcrumbs.map((crumb, idx) => (
                                <li key={idx}>
                                    <div className="flex items-center">
                                        <i className="mx-1 text-xs text-gray-300 fas fa-chevron-right md:mx-2"></i>
                                        {crumb.url ? (
                                            <a href={crumb.url} className="text-sm font-medium text-gray-100 hover:text-white">
                                                {crumb.label}
                                            </a>
                                        ) : (
                                            <span className="text-sm font-medium text-gray-300">
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
