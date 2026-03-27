import React from 'react';

export default function Stats({ content }) {
    const bgClass = content.background || 'bg-orange-600';

    return (
        <section className={`${bgClass} py-16`}>
            <div className="container px-6 mx-auto lg:px-12">
                {content.title && (
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-white">{content.title}</h2>
                        {content.subtitle && (
                            <p className="mt-2 text-lg text-orange-100">{content.subtitle}</p>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
                    {content.items && content.items.map((item, index) => (
                        <div key={index} className="p-6">
                            {item.icon && (
                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full">
                                    <i className={`${item.icon} text-2xl text-white`}></i>
                                </div>
                            )}
                            <div className="text-4xl font-extrabold text-white">
                                {item.value || '0'}{item.suffix || ''}
                            </div>
                            <p className="mt-2 text-sm font-medium tracking-wider text-orange-100 uppercase">
                                {item.label || ''}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
