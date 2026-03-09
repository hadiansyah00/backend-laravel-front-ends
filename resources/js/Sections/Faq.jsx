import React, { useState } from 'react';

export default function Faq({ content }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl px-6 mx-auto lg:px-12">
                {content.title && (
                    <div className="mb-12 text-center">
                        <h2 className="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                            <div className="flex items-center justify-center bg-orange-500 w-14 h-14">
                                <img src="/assets/img/icon/element.svg" alt="Icon" className="w-8 h-8" />
                            </div>
                            <span className="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                                {content.title}
                            </span>
                        </h2>
                        {content.subtitle && (
                            <p className="mt-4 text-lg text-gray-600">{content.subtitle}</p>
                        )}
                    </div>
                )}

                <div className="space-y-4">
                    {content.items && content.items.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={index} className="overflow-hidden bg-gray-50 border border-gray-200 rounded-xl">
                                <button
                                    onClick={() => toggleOpen(index)}
                                    className="flex items-center justify-between w-full px-6 py-5 text-left transition hover:bg-gray-100 focus:outline-none"
                                >
                                    <span className="text-lg font-semibold text-gray-800">{item.question}</span>
                                    <svg
                                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>

                                <div
                                    className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                                >
                                    <div className="px-6 pb-5">
                                        <div className="prose max-w-none prose-gray">
                                            <p>{item.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
