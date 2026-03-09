import React from 'react';

export default function CardGrid({ content }) {
    const columns = parseInt(content.columns, 10) || 2;
    const bgClass = content.background || 'bg-gray-50';

    const getGridClass = (cols) => {
        switch (cols) {
            case 3: return 'md:grid-cols-3';
            case 4: return 'md:grid-cols-4';
            default: return 'md:grid-cols-2';
        }
    };

    return (
        <section className={`${bgClass} py-16`} id={content.title ? content.title.toLowerCase().replace(/\s+/g, '-') : 'cards'}>
            <div className="max-w-6xl px-6 mx-auto lg:px-12">

                {/* Section Title */}
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
                            <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">{content.subtitle}</p>
                        )}
                    </div>
                )}

                {/* Grid Items */}
                <div className={`grid grid-cols-1 gap-8 ${getGridClass(columns)}`}>
                    {content.items && content.items.map((item, index) => (
                        <div key={index} className="p-8 space-y-4 transition-all duration-300 ease-in-out bg-white shadow-md rounded-2xl hover:shadow-xl hover:-translate-y-2">

                            {/* Icon / Image */}
                            {(item.icon_svg || item.image) && (
                                <div className="flex-shrink-0">
                                    {item.image ? (
                                        <img src={item.image.startsWith('http') ? item.image : `/storage/${item.image}`} alt={item.title} className="object-cover w-full h-40 rounded-lg" />
                                    ) : item.icon_svg ? (
                                        <span
                                            className="inline-flex items-center justify-center w-12 h-12 text-orange-600 bg-orange-100 rounded-xl"
                                            dangerouslySetInnerHTML={{ __html: item.icon_svg }}
                                        />
                                    ) : null}
                                </div>
                            )}

                            {/* Text */}
                            <div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900">{item.title}</h3>
                                <p className="text-base leading-relaxed text-gray-600">{item.description}</p>
                            </div>

                            {/* Optional Link */}
                            {item.link && (
                                <a href={item.link} className="inline-flex items-center text-sm font-semibold text-orange-600 transition hover:text-orange-800 group">
                                    Selengkapnya
                                    <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                                </a>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
