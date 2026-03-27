import React from 'react';

export default function ContentWithImage({ content }) {
    const layout = content.layout || 'left';
    const bgClass = content.background || 'bg-white';

    return (
        <section id={content.title ? content.title.toLowerCase().replace(/\s+/g, '-') : 'content'} className={`${bgClass} py-20 lg:py-24 overflow-hidden`}>
            <div className="container px-6 mx-auto lg:px-12">
                <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

                    {/* Text Column */}
                    <div className={layout === 'right' ? 'lg:order-2' : 'lg:order-1'}>
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

                        <div className="mt-8 space-y-6">
                            {content.subtitle && (
                                <p className="text-xl font-light text-gray-600">{content.subtitle}</p>
                            )}

                            {content.introduction && (
                                <p className="text-lg leading-relaxed text-gray-700">{content.introduction}</p>
                            )}

                            {content.content && Array.isArray(content.content) && (
                                <div className="prose max-w-none prose-gray">
                                    {content.content.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            )}

                            {/* Optional Visi & Misi block */}
                            {(content.vision || (content.mission && content.mission.length > 0)) && (
                                <div className="space-y-8">
                                    {content.vision && (
                                        <div className="p-6 border-l-4 border-orange-500 rounded-r-lg bg-gray-50">
                                            <h3 className="mb-2 text-xl font-bold text-gray-800">Visi</h3>
                                            <p className="italic text-gray-700">"{content.vision}"</p>
                                        </div>
                                    )}

                                    {content.mission && content.mission.length > 0 && (
                                        <div>
                                            <h3 className="mb-4 text-xl font-bold text-gray-800">Misi</h3>
                                            <ul className="space-y-4">
                                                {content.mission.map((mission, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <svg className="flex-shrink-0 w-6 h-6 mt-1 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <p className="ml-3 text-gray-700">{mission}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Image Column */}
                    {content.image && (
                        <div className={layout === 'right' ? 'lg:order-1' : 'lg:order-2'}>
                            <div className="p-4 bg-gray-100 shadow-xl rounded-2xl sm:p-6">
                                <img
                                    src={content.image.startsWith('http') ? content.image : `/storage/${content.image}`}
                                    alt={content.title || 'Image'}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
