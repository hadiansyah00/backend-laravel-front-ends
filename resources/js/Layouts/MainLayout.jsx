import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Head } from '@inertiajs/react';

export default function MainLayout({ children, title }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simple loading simulation matching the original Alpine.js vibe
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="pt-24 font-sans antialiased text-gray-900 bg-gray-50 min-h-screen flex flex-col">
            <Head title={title || 'Beranda'} />

            {/* Loading Spinner */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-300">
                    <div className="w-12 h-12 border-4 border-orange-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
            )}

            {/* Main Content */}
            <Navbar />

            <main className="flex-grow">
                {children}
            </main>

            <Footer />
        </div>
    );
}
