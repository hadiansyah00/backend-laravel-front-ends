import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SplashScreen from "../Components/SplashScreen";
import { Head, usePage } from "@inertiajs/react";

// Lazy-load non-critical widgets — they don't need to block first paint
const AccessibilityWidget = lazy(() => import("../Components/AccessibilityWidget"));
const FloatingWhatsApp = lazy(() => import("../Components/FloatingWhatsApp"));

// Module-level variable: resets on full page reload, persists on Inertia SPA navigations
let hasShownSplash = false;

export default function MainLayout({ children, title }) {
    const { settings } = usePage().props;

    // Show splash if it hasn't been shown in this page load instance
    const [showSplash, setShowSplash] = useState(!hasShownSplash);
    const [contentReady, setContentReady] = useState(hasShownSplash);

    const siteName = settings?.site_name || "STIKes Bogor Husada";
    const pageTitle = title ? `${title}` : (settings?.seo_title || siteName);
    const metaDesc = settings?.seo_description || "Website Resmi STIKes Bogor Husada";
    const metaKeywords = settings?.seo_keywords || "STIKes, Kesehatan, Bogor, Husada";

    const handleSplashFinish = useCallback(() => {
        hasShownSplash = true; // Mark as shown for subsequent Inertia navigations
        setShowSplash(false);
        setContentReady(true);
    }, []);

    // If splash is not shown, content is immediately ready
    useEffect(() => {
        if (!showSplash) {
            setContentReady(true);
            hasShownSplash = true;
        }
    }, [showSplash]);

    return (
        <>
            {/* Splash Screen — only on first visit */}
            {showSplash && (
                <SplashScreen
                    onFinish={handleSplashFinish}
                    minimumDuration={2500}
                />
            )}

            <div
                className={`pt-[104px] font-sans antialiased text-gray-900 bg-gray-50 min-h-screen flex flex-col transition-opacity duration-500 ${contentReady ? 'opacity-100' : 'opacity-0'}`}
            >
                <Head>
                    <title>{pageTitle}</title>
                    <meta name="description" content={metaDesc} />
                    <meta name="keywords" content={metaKeywords} />
                    <meta property="og:title" content={pageTitle} />
                    <meta property="og:description" content={metaDesc} />
                    {settings?.site_logo && <meta property="og:image" content={`/storage/${settings.site_logo}`} />}
                </Head>

                {/* Main Content */}
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />

                {/* Lazy-loaded widgets — render after main content */}
                <Suspense fallback={null}>
                    <AccessibilityWidget />
                    <FloatingWhatsApp />
                </Suspense>
            </div>
        </>
    );
}
