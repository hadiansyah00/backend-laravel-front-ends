import React from 'react';
import SectionTitle from './SectionTitle';

export default function TimelineSection({ data }) {
    const title = data?.title || "Timeline Momen Penting";
    const icon = data?.icon || "fa-map-marked-alt";
    // Fallback Dummy Data if empty
    const items = data?.items || [
        {
            year: "2000",
            title: "Tahun Berdiri",
            description: "Awal mula perjalanan institusi ini."
        }
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <SectionTitle title={title} icon={icon} />

                {/* Timeline Container */}
                <div className="relative">
                    {/* Vertical Line Line */}
                    <div className="absolute left-[39px] sm:left-[89px] top-4 bottom-4 w-px bg-gray-200 dark:bg-gray-700"></div>

                    <div className="space-y-12">
                        {items.map((item, idx) => (
                            <div key={idx} className="relative flex items-start group">

                                {/* Timeline Dot & Year */}
                                <div className="flex flex-col sm:flex-row items-center sm:items-start shrink-0 z-10">
                                    <div className="w-[80px] sm:w-[120px] flex sm:justify-end items-center mb-2 sm:mb-0">
                                        {/* Dot */}
                                        <div className="absolute left-[29px] sm:left-[79px] w-5 h-5 bg-white dark:bg-gray-900 border-4 border-orange-500 rounded-full group-hover:bg-orange-500 transition-colors duration-300"></div>

                                        {/* Year Badge */}
                                        <span className="sm:mr-10 text-orange-600 font-bold bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-orange-200 dark:border-orange-800 shadow-sm text-sm">
                                            {item.year}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="flex-1 ml-16 sm:ml-0 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 group-hover:shadow-md transition-shadow duration-300 relative">
                                    {/* Arrow pointing to left */}
                                    <div className="absolute top-6 -left-3 w-6 h-6 bg-white dark:bg-gray-800 border-l border-b border-gray-100 dark:border-gray-700 transform rotate-45"></div>

                                    <div className="relative z-10">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
