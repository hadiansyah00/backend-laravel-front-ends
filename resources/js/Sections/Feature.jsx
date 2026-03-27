import React from 'react';

export default function Feature({ content }) {
    const columns = parseInt(content.columns, 10) || 3;

    const getGridClass = (cols) => {
        switch (cols) {
            case 2: return 'md:grid-cols-2';
            case 4: return 'md:grid-cols-4';
            default: return 'md:grid-cols-3';
        }
    };

    return (
        <section className="py-16 bg-gray-100">
            <div className="container px-6 mx-auto">
                {content.title && (
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-gray-800">{content.title}</h2>
                        {content.subtitle && (
                            <p className="mt-2 text-lg text-gray-600">{content.subtitle}</p>
                        )}
                    </div>
                )}

                <div className={`grid gap-8 text-center ${getGridClass(columns)}`}>
                    {content.items && content.items.map((item, index) => (
                        <div key={index} className="p-6 transition bg-white shadow rounded-xl hover:shadow-lg">
                            <i className={`${item.icon || 'fas fa-star'} text-4xl text-purple-600 mb-4`}></i>
                            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
