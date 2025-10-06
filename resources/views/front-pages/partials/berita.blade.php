<section id="berita" class="py-16 bg-white sm:py-24">
    <div class="px-6 mx-auto max-w-7xl lg:px-8">
        <div class="flex items-center justify-between pb-6 mb-8 border-b border-gray-200">
            <h2 class="text-3xl font-bold text-orange-700">Berita & Informasi</h2>
            <a href="{{ url('/berita') }}"
                class="px-4 py-2 text-sm font-semibold text-orange-700 transition-colors bg-orange-100 rounded-full hover:bg-orange-200">
                Lihat Semua
            </a>
        </div>

        {{-- Container untuk Berita, akan diisi oleh JS --}}
        <div id="berita-container" class="space-y-8">

            {{-- SKELETON LOADER (Disesuaikan untuk layout baru) --}}
            <div>
                {{-- Skeleton untuk Berita Utama (lebih tinggi, rasio 4:3) --}}
                <div class="w-full bg-gray-200 rounded-lg animate-pulse aspect-[4/3]"></div>

                {{-- Skeleton untuk Berita Lainnya (5 kolom) --}}
                <div class="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    <div class="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div class="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div class="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div class="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div class="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
            </div>

        </div>
    </div>
    {{-- Header Section --}}

</section>

<script>
    document.addEventListener("DOMContentLoaded", () => {
    const beritaContainer = document.getElementById("berita-container");

    // Fungsi untuk membuat HTML berita utama (kiri, 2/3)
    const createMainArticleHTML = (article) => {
        const publishedDate = new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        return `
            <a href="/artikel/${article.slug}" class="relative flex flex-col justify-end block w-full p-6 overflow-hidden text-white transition-shadow duration-300 bg-gray-300 rounded-lg shadow-md lg:col-span-2 group aspect-video hover:shadow-xl">
                <img src="/storage/${article.thumbnail ?? 'default.jpg'}" alt="${article.title}" class="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" onerror="this.onerror=null; this.src='/path/to/default-image.jpg';">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div class="relative z-10">
                    <span class="inline-block px-2 py-1 mb-2 text-xs font-semibold text-orange-200 uppercase rounded-full bg-orange-800/50">${article.category?.name ?? 'Berita'}</span>
                    <h3 class="text-2xl font-bold leading-tight transition-colors sm:text-3xl group-hover:text-orange-300 line-clamp-2">${article.title}</h3>
                    <p class="mt-2 text-sm text-gray-300">${publishedDate}</p>
                </div>
            </a>
        `;
    };

    // Fungsi untuk berita pendamping (kanan, 1/3) dan berita di baris bawah
    const createSideArticleHTML = (article) => {
        const publishedDate = new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        return `
            <a href="/artikel/${article.slug}" class="flex flex-col overflow-hidden transition-shadow duration-300 bg-white border border-gray-100 rounded-lg shadow-sm group hover:shadow-lg">
                <div class="overflow-hidden">
                    <img src="/storage/${article.thumbnail ?? 'default.jpg'}" alt="${article.title}" class="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-105" onerror="this.onerror=null; this.src='/path/to/default-image.jpg';">
                </div>
                <div class="flex flex-col flex-grow p-5">
                    <span class="text-xs font-semibold text-orange-700 uppercase">${article.category?.name ?? 'Info'}</span>
                    <h4 class="mt-2 text-base font-semibold leading-tight text-gray-800 transition-colors line-clamp-3 group-hover:text-orange-800">${article.title}</h4>
                    <p class="pt-4 mt-auto text-xs text-gray-500">${publishedDate}</p>
                </div>
            </a>
        `;
    };

    const loadBerita = async () => {
        try {
            // Mengambil 6 berita (1 utama + 1 pendamping + 4 di bawah)
            const response = await fetch("/api/articles?per_page=6");
            if (!response.ok) throw new Error('Network response was not ok');

            const result = await response.json();
            const articles = result.data;

            if (!articles || articles.length < 2) { // Butuh minimal 2 artikel untuk layout ini
                beritaContainer.innerHTML = `<p class="text-center text-gray-500">Belum ada cukup berita untuk ditampilkan.</p>`;
                return;
            }

            const [mainArticle, secondaryArticle, ...otherArticles] = articles;

            let htmlContent = `<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">`;
            // Berita Utama (kiri, 2 kolom)
            htmlContent += createMainArticleHTML(mainArticle);
            // Berita Pendamping (kanan, 1 kolom)
            htmlContent += `<div class="lg:col-span-1">${createSideArticleHTML(secondaryArticle)}</div>`;
            htmlContent += `</div>`;

            if (otherArticles.length > 0) {
                // Berita Lainnya (di bawah, 4 kolom)
                htmlContent += `<div class="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">`;
                otherArticles.forEach(item => {
                    htmlContent += createSideArticleHTML(item);
                });
                htmlContent += `</div>`;
            }

            beritaContainer.innerHTML = htmlContent;

        } catch (error) {
            console.error("Gagal memuat berita:", error);
            beritaContainer.innerHTML = `<p class="text-center text-red-500">Terjadi kesalahan saat memuat berita.</p>`;
        }
    };

    loadBerita();
});
</script>