import React from 'react';

export default function ProdiProfile({ content }) {
    return (
        <section className="py-20 bg-slate-50" id="profil-prodi">
            <div className="container px-6 mx-auto lg:px-12">

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
                    {content.subtitle && (
                        <p className="max-w-2xl mx-auto mt-3 text-lg text-gray-600">{content.subtitle}</p>
                    )}
                </div>

                {/* Description & Accreditation */}
                {content.program_details && (
                    <div className="max-w-5xl p-8 mx-auto mb-16 bg-white shadow-sm rounded-2xl">
                        <div className="space-y-6">
                            <p className="text-lg leading-relaxed text-gray-700">
                                {content.program_details.description || 'Deskripsi program studi belum tersedia.'}
                            </p>

                            {content.program_details.accreditation_status && (
                                <div className="pt-4">
                                    <span className="inline-block px-4 py-2 text-sm font-semibold text-teal-800 bg-teal-100 rounded-full">
                                        Akreditasi: {content.program_details.accreditation_status}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Head of Program Card */}
                {content.head_of_program && (
                    <div className="max-w-5xl mx-auto overflow-hidden bg-white shadow-lg rounded-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="flex items-center justify-center p-8 md:col-span-1 bg-gradient-to-br from-gray-100 to-gray-200">
                                <div className="w-full relative pb-[125%] md:pb-0 md:h-full">
                                    <img
                                        src={content.head_of_program.photo_url ? (content.head_of_program.photo_url.startsWith('http') ? content.head_of_program.photo_url : `/storage/${content.head_of_program.photo_url}`) : '/assets/img/placeholder.jpg'}
                                        alt={content.head_of_program.name || 'Foto Kaprodi'}
                                        className="absolute inset-0 object-cover w-full h-full shadow-md rounded-xl ring-4 ring-white ring-offset-4 ring-offset-gray-100"
                                    />
                                </div>
                            </div>

                            <div className="p-8 md:col-span-2 md:p-10">
                                <p className="text-base font-semibold text-orange-600">
                                    {content.head_of_program.job_title || 'Ketua Program Studi'}
                                </p>
                                <h3 className="mt-1 text-2xl font-bold text-gray-900">
                                    {content.head_of_program.name}
                                </h3>

                                <hr className="my-6 border-gray-200" />

                                <div className="space-y-4 leading-relaxed text-gray-600">
                                    {content.head_of_program.greeting_paragraphs && content.head_of_program.greeting_paragraphs.length > 0 ? (
                                        content.head_of_program.greeting_paragraphs.map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))
                                    ) : (
                                        <p>Sambutan dari Ketua Program Studi akan segera ditampilkan di sini.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
