import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import AccessibilityWidget from "../Components/AccessibilityWidget";
import FloatingWhatsApp from "../Components/FloatingWhatsApp";
import { Head } from "@inertiajs/react";

export default function MainLayout({ children, title }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simple loading simulation matching the original Alpine.js vibe
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="pt-[104px] font-sans antialiased text-gray-900 bg-gray-50 min-h-screen flex flex-col">
            {" "}
            <Head title={title || "Beranda"} />
            {/* Loading Spinner */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-white/80 backdrop-blur-sm">
                    <div className="w-12 h-12 border-4 border-orange-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
            )}
            {/* Main Content */}
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <AccessibilityWidget />
            <FloatingWhatsApp />
        </div>
    );
}
