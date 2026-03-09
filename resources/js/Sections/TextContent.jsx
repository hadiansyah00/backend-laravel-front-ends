import React from 'react';

export default function TextContent({ content }) {
    // Structure: content.title, content.body, content.alignment 
    const align = content.alignment === 'center' ? 'text-center' :
        content.alignment === 'right' ? 'text-right' : 'text-left';

    return (
        <section className="py-16 bg-white sm:py-24">
            <div className={`container px-6 mx-auto ${align}`}>
                {content.title && (
                    <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {content.title}
                    </h2>
                )}

                {content.body && (
                    <div
                        className="max-w-4xl mx-auto prose prose-lg prose-orange"
                        dangerouslySetInnerHTML={{ __html: content.body }}
                    />
                )}
            </div>
        </section>
    );
}
