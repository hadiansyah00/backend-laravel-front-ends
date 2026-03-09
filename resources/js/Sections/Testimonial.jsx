import React from 'react';

export default function Testimonial({ content }) {
    return (
        <section className="py-16 bg-white">
            <div className="container px-6 mx-auto lg:px-12">
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

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {content.items && content.items.map((item, index) => (
                        <div key={index} className="p-8 bg-gray-50 rounded-2xl">
                            {/* Quote icon */}
                            <svg className="w-10 h-10 mb-4 text-orange-200" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
                            </svg>

                            <p className="mb-6 italic leading-relaxed text-gray-600">"{item.quote}"</p>

                            <div className="flex items-center">
                                {item.photo && (
                                    <img
                                        src={item.photo.startsWith('http') ? item.photo : `/storage/${item.photo}`}
                                        alt={item.name}
                                        className="object-cover w-12 h-12 mr-4 rounded-full"
                                    />
                                )}
                                <div>
                                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                                    <p className="text-sm text-orange-600">{item.position}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
