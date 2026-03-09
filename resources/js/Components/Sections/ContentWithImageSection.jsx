import React from 'react';

export default function ContentWithImageSection({ data }) {
    // Fallback Dummy Data
    const title = data?.title || "Membangun Generasi Emas Kesehatan Indonesia";
    const content = data?.content || "STIKes Bogor Husada berkomitmen penuh dalam menyelenggarakan pendidikan berkualitas yang beradaptasi dengan perkembangan IPTEK kesehatan terkini. Kami membekali mahasiswa dengan keterampilan praktis langsung (hands-on) di fasilitas modern agar siap bersaing di dunia kerja global.";
    const imageUrl = data?.image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
    const align = data?.align || 'left'; // 'left' means text left, image right
    const imageAspectRatio = data?.imageAspectRatio || 'aspect-[4/3]';
    const imagePosition = data?.imagePosition || 'object-center';

    return (
        <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col gap-12 lg:gap-20 items-center ${align === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        {/* Decorative Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold tracking-wide uppercase border border-orange-200 dark:border-orange-800/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                            Sorotan Kami
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                            {title}
                        </h2>

                        <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full"></div>

                        <div
                            className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>

                    {/* Image Area */}
                    <div className="w-full lg:w-1/2 relative">
                        {/* Decorative Background Blob behind image */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-orange-200 to-blue-200 dark:from-orange-900/40 dark:to-blue-900/40 rounded-3xl blur-2xl opacity-60"></div>

                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/20 group">
                            <img
                                src={imageUrl}
                                alt={title}
                                className={`w-full h-auto object-cover ${imagePosition} ${imageAspectRatio} transform transition-transform duration-700 group-hover:scale-105`}
                            />
                            {/* Overlay Vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Floating Small Card (Optional Decor - can toggle based on props if needed, but keeping for aesthetic) */}
                        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-xl border border-gray-100 dark:border-gray-800 flex items-center gap-4 animate-[bounce_3s_ease-in-out_infinite]">
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <i className="fas fa-quote-right text-2xl"></i>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
