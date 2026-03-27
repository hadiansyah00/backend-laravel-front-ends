import React from 'react';

export default function SectionTitle({ title, icon, className = "" }) {
    if (!title) return null;

    return (
        <div className={`flex justify-center mb-16 ${className}`}>
            <div className="inline-flex items-stretch shadow-md rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
                {icon && (
                    <div className="bg-orange-500 w-16 md:w-20 flex items-center justify-center shrink-0">
                        <i className={`fas ${icon} text-white text-2xl md:text-3xl`}></i>
                    </div>
                )}
                <div className="bg-slate-900 px-6 sm:px-10 py-4 md:py-5 flex items-center justify-center">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white uppercase tracking-wide">
                        {title}
                    </h2>
                </div>
            </div>
        </div>
    );
}
