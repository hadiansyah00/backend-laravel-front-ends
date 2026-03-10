import { router, Link } from '@inertiajs/react';

export default function Galeri({ galleries, categories, filters }) {
    const defaultCategories = ["Semua", ...(categories || [])];
    const activeTab = filters?.category || "Semua";
    const [selectedImage, setSelectedImage] = useState(null);

    const galleryList = galleries?.data || [];

    const handleTabClick = (category) => {
        router.get('/galeri', category === 'Semua' ? {} : { category }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    // Lightbox navigation logic
    const handlePrev = (e) => {
        if (e) e.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = galleryList.findIndex(item => item.id === selectedImage.id);
        const prevIndex = currentIndex === 0 ? galleryList.length - 1 : currentIndex - 1;
        setSelectedImage(galleryList[prevIndex]);
    };

    const handleNext = (e) => {
        if (e) e.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = galleryList.findIndex(item => item.id === selectedImage.id);
        const nextIndex = currentIndex === galleryList.length - 1 ? 0 : currentIndex + 1;
        setSelectedImage(galleryList[nextIndex]);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;
            if (e.key === 'Escape') setSelectedImage(null);
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, galleryList]);

    const getImageUrl = (imagePath) => {
        return imagePath ? `/storage/${imagePath.replace('storage/', '')}` : '/img/placeholder-image-large.png';
    };

    return (
        <MainLayout title="Galeri Kampus | STIKes Bogor Husada">
            <HeroStaticSection data={{
                title: 'Galeri Kampus',
                subtitle: 'Dokumentasi momen-momen penting, fasilitas, dan kegiatan akademik STIKes Bogor Husada.',
                bgImage: '/assets/img/hero-fallback.png'
            }} />

            <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="container px-4 mx-auto max-w-7xl">

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {defaultCategories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleTabClick(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === cat ? 'bg-orange-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {galleryList.length > 0 && galleryList.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedImage(item)}
                                className="relative group rounded-2xl overflow-hidden aspect-square bg-gray-200 dark:bg-gray-800 shadow-sm cursor-pointer border border-gray-100 dark:border-gray-700"
                            >
                                <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <span className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">{item.category || 'Galeri'}</span>
                                    <h4 className="text-white text-lg font-bold leading-tight">{item.title}</h4>
                                </div>
                                {/* Icon Zoom */}
                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                    <i className="fas fa-search-plus"></i>
                                </div>
                            </div>
                        ))}
                    </div>

                    {galleryList.length === 0 && (
                        <div className="text-center py-20 text-gray-500 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <i className="fas fa-images text-4xl mb-4 text-gray-300 dark:text-gray-600"></i>
                            <p>Tidak ada foto dalam kategori ini.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {galleries?.links && galleries.links.length > 3 && (
                        <div className="flex flex-wrap justify-center mt-12 gap-2">
                            {galleries.links.map((link, index) => {
                                let label = link.label;
                                if (label.includes('&laquo;')) label = <i className="fas fa-chevron-left text-xs"></i>;
                                if (label.includes('&raquo;')) label = <i className="fas fa-chevron-right text-xs"></i>;

                                return link.url ? (
                                    <button
                                        key={index}
                                        onClick={() => router.get(link.url, filters, { preserveScroll: true, preserveState: true })}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition-colors ${link.active
                                                ? 'border border-orange-600 bg-orange-600 text-white'
                                                : 'border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ) : (
                                    <span key={index} className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 text-gray-400 cursor-not-allowed bg-white dark:bg-gray-800 dark:border-gray-700">
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    )}

                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10 animate-fade-in backdrop-blur-sm">
                    {/* Close Button */}
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-red-500 text-white rounded-full transition-colors z-10"
                    >
                        <i className="fas fa-times text-xl"></i>
                    </button>

                    <div className="relative max-w-5xl w-full max-h-full flex flex-col items-center">
                        <img
                            src={getImageUrl(selectedImage.image)}
                            alt={selectedImage.title}
                            className="max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl"
                        />
                        <div className="mt-6 text-center">
                            <span className="text-orange-500 text-sm font-bold uppercase tracking-widest">{selectedImage.category || 'Galeri'}</span>
                            <h3 className="text-2xl font-bold text-white mt-2">{selectedImage.title}</h3>
                        </div>

                        {/* Navigation Buttons (Left & Right) */}
                        {galleryList.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-12 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-orange-600 text-white rounded-full transition-all backdrop-blur-sm z-10"
                                >
                                    <i className="fas fa-chevron-left text-xl"></i>
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-12 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-orange-600 text-white rounded-full transition-all backdrop-blur-sm z-10"
                                >
                                    <i className="fas fa-chevron-right text-xl"></i>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Background Click to Close */}
                    <div className="absolute inset-0 -z-10" onClick={() => setSelectedImage(null)}></div>
                </div>
            )}

        </MainLayout>
    );
}
