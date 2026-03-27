import React from 'react';

export default function VisiMisi({ content }) {
    const visi = content.visi || content.vision;
    const misiItems = content.misi || content.mission || [];

    return (
        <section className="py-20 bg-slate-50" id="visi-misi">
            <div className="max-w-6xl px-6 mx-auto lg:px-12">

                {/* Section Title */}
                <div className="mb-16 text-center">
                    {content.title && (
                        <h2 className="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                            <div className="flex items-center justify-center bg-orange-500 w-14 h-14">
                                <img src="/assets/img/icon/element.svg" alt="Icon" className="w-8 h-8" />
                            </div>
                            <span className="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                                {content.title}
                            </span>
                        </h2>
                    )}
                    {content.subtitle ? (
                        <p className="mt-4 text-lg leading-8 text-gray-600">{content.subtitle}</p>
                    ) : (
                        <p className="mt-4 text-lg leading-8 text-gray-600">Landasan dan tujuan yang menjadi pedoman kami dalam berkarya.</p>
                    )}
                </div>

                {/* Visi & Misi Grid */}
                <div className="grid grid-cols-1 p-10 bg-white shadow-lg gap-y-12 lg:grid-cols-2 lg:gap-x-16 rounded-2xl">

                    {/* Visi */}
                    {visi && (
                        <div>
                            <div className="flex items-center mb-4 gap-x-4">
                                <span className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-indigo-600 w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </span>
                                <h3 className="text-2xl font-semibold text-gray-800">Visi</h3>
                            </div>
                            <p className="leading-relaxed text-gray-600">
                                {visi}
                            </p>
                        </div>
                    )}

                    {/* Misi */}
                    {misiItems.length > 0 && (
                        <div>
                            <div className="flex items-center mb-4 gap-x-4">
                                <span className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-indigo-600 w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                <h3 className="text-2xl font-semibold text-gray-800">Misi</h3>
                            </div>
                            <ul className="space-y-4 text-gray-600">
                                {misiItems.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="flex-shrink-0 w-6 h-6 mt-0.5 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="ml-3">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
