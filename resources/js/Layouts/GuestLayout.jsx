import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function GuestLayout({ children, title }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <Head title={title || 'Masuk'} />

            <div className="w-full sm:max-w-md mt-6 px-8 py-10 bg-white dark:bg-gray-800 shadow-xl overflow-hidden sm:rounded-2xl border border-gray-100 dark:border-gray-700">
                {children}
            </div>
        </div>
    );
}
