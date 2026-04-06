import React, { useState, useEffect } from 'react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        // Delay checking slightly to ensure hydration is complete and we don't flash
        const timer = setTimeout(() => {
            const consent = localStorage.getItem('cookieConsent');
            if (consent !== 'true' && consent !== 'dismissed') {
                setIsVisible(true);
                // Trigger animation entry after a small delay
                setTimeout(() => setShowAnimation(true), 100);
            }
        }, 1500); // 1.5 seconds delay before showing the banner so it doesn't interrupt immediate page load

        return () => clearTimeout(timer);
    }, []);

    const handleAccept = () => {
        setShowAnimation(false);
        setTimeout(() => {
            localStorage.setItem('cookieConsent', 'true');
            setIsVisible(false);
        }, 300); // Wait for exit animation
    };

    const handleDismiss = () => {
        setShowAnimation(false);
        setTimeout(() => {
            localStorage.setItem('cookieConsent', 'dismissed');
            setIsVisible(false);
        }, 300); // Wait for exit animation
    };

    if (!isVisible) return null;

    return (
        <div 
            className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[100000] max-w-[420px] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                showAnimation ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
            }`}
        >
            <div className="relative p-6 overflow-hidden border shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-white/40 dark:border-gray-800/50 rounded-3xl">
                
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 transform -translate-x-8 translate-y-8 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 shadow-inner bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/40 dark:to-orange-800/40 rounded-2xl">
                                <span className="text-xl filter drop-shadow-sm animate-bounce" style={{ animationDuration: '3s' }}>🍪</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-outfit">
                                Pengaturan Privasi
                            </h3>
                        </div>
                        <button 
                            onClick={handleDismiss}
                            className="p-1.5 text-gray-400 transition-colors bg-transparent rounded-full hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-800 focus:outline-none"
                            title="Tutup sementara"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                        Kami menggunakan cookies untuk mempersonalisasi konten dan meningkatkan kenyamanan Anda saat menjelajahi website <span className="font-semibold text-gray-800 dark:text-gray-200">STIKes Bogor Husada</span>.
                    </p>

                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleAccept}
                            className="flex-1 px-5 py-2.5 text-sm font-bold text-white transition-all transform bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:from-orange-600 hover:to-orange-700 hover:-translate-y-0.5 shadow-lg shadow-orange-500/25 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <i className="fas fa-check"></i> Saya Mengerti
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
