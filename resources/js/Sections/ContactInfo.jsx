import React from 'react';

export default function ContactInfo({ content }) {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl px-6 mx-auto lg:px-12">
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
                    </div>
                )}

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                    {/* Contact Details */}
                    <div className="p-8 space-y-6 bg-white shadow-md rounded-2xl">
                        {content.address && (
                            <div className="flex items-start space-x-4">
                                <svg className="flex-shrink-0 w-6 h-6 mt-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Alamat</h3>
                                    <p className="text-gray-600">{content.address}</p>
                                </div>
                            </div>
                        )}

                        {content.phone && (
                            <div className="flex items-start space-x-4">
                                <svg className="flex-shrink-0 w-6 h-6 mt-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Telepon</h3>
                                    <p className="text-gray-600">{content.phone}</p>
                                </div>
                            </div>
                        )}

                        {content.email && (
                            <div className="flex items-start space-x-4">
                                <svg className="flex-shrink-0 w-6 h-6 mt-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Email</h3>
                                    <p className="text-gray-600">{content.email}</p>
                                </div>
                            </div>
                        )}

                        {content.office_hours && (
                            <div className="flex items-start space-x-4">
                                <svg className="flex-shrink-0 w-6 h-6 mt-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Jam Operasional</h3>
                                    <p className="text-gray-600">{content.office_hours}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Map */}
                    {content.map_embed_url && (
                        <div className="overflow-hidden shadow-md rounded-2xl">
                            <iframe
                                src={content.map_embed_url}
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
