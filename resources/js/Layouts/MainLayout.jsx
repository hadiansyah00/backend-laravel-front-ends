import React, { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Head, usePage } from "@inertiajs/react";

const AccessibilityWidget = lazy(() => import("../Components/AccessibilityWidget"));
const FloatingWhatsApp = lazy(() => import("../Components/FloatingWhatsApp"));
const CookieConsent = lazy(() => import("../Components/CookieConsent"));
const BackToTop = lazy(() => import("../Components/BackToTop"));

export default function MainLayout({ children, title }) {
    const { settings } = usePage().props;
    const [loadWidgets, setLoadWidgets] = useState(false);

    const siteName = settings?.site_name || "STIKes Bogor Husada";
    const pageTitle = title || settings?.seo_title || siteName;
    const metaDesc = settings?.seo_description || "Website Resmi STIKes Bogor Husada";
    const metaKeywords = settings?.seo_keywords || "STIKes, Kesehatan, Bogor, Husada";

    useEffect(() => {
        const scheduleWidgets = () => setLoadWidgets(true);

        if ("requestIdleCallback" in window) {
            const idleId = window.requestIdleCallback(scheduleWidgets, { timeout: 2000 });
            return () => window.cancelIdleCallback(idleId);
        }

        const timeoutId = window.setTimeout(scheduleWidgets, 1200);
        return () => window.clearTimeout(timeoutId);
    }, []);

    return (
        <div className="pt-[136px] font-sans antialiased text-gray-900 bg-gray-50 min-h-screen flex flex-col">
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDesc} />
                <meta name="keywords" content={metaKeywords} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={metaDesc} />
                {settings?.site_logo && <meta property="og:image" content={`/storage/${settings.site_logo}`} />}
            </Head>

            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />

            {loadWidgets && (
                <Suspense fallback={null}>
                    <AccessibilityWidget />
                    <FloatingWhatsApp />
                    <CookieConsent />
                    <BackToTop />
                </Suspense>
            )}
        </div>
    );
}
