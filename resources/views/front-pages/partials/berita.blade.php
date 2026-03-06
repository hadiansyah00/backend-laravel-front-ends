<section id="berita" class="py-16 bg-white sm:py-24" x-data="newsWidget()">
    <div class="px-6 mx-auto max-w-7xl lg:px-8">

        <div class="flex items-end justify-between pb-8 mb-10 border-b border-gray-100">
            <div>
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Berita & <span class="text-orange-700">Informasi</span>
                </h2>
                <p class="mt-2 text-base text-gray-500">Update terbaru seputar kegiatan dan artikel menarik.</p>
            </div>
            <a href="{{ url('/artikel') }}"
                class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-orange-700 transition-all duration-300 bg-orange-50 rounded-full hover:bg-orange-100 hover:pr-6 group">
                Lihat Semua
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                    <path fill-rule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clip-rule="evenodd" />
                </svg>
            </a>
        </div>

        <div class="space-y-10">

            <template x-if="isLoading">
                <div>
                    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div
                            class="w-full bg-gray-100 rounded-2xl animate-pulse aspect-[4/3] lg:col-span-2 lg:h-[450px]">
                        </div>
                        <div class="w-full h-64 bg-gray-100 lg:h-auto rounded-2xl animate-pulse"></div>
                    </div>
                    <div class="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
                        <template x-for="i in 4">
                            <div class="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
                        </template>
                    </div>
                </div>
            </template>

            <template x-if="!isLoading && error">
                <div class="py-12 text-center bg-gray-50 rounded-2xl">
                    <p class="text-gray-500" x-text="error"></p>
                    <button @click="fetchArticles" class="mt-4 text-orange-700 hover:underline">Coba Lagi</button>
                </div>
            </template>

            <template x-if="!isLoading && !error && articles.length < 2">
                <div class="py-12 text-center bg-gray-50 rounded-2xl">
                    <p class="text-gray-500">Belum ada berita yang diterbitkan saat ini.</p>
                </div>
            </template>

            <template x-if="!isLoading && !error && articles.length >= 2">
                <div>
                    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:auto-rows-fr">

                        <div
                            class="relative overflow-hidden group rounded-2xl lg:col-span-2 shadow-sm hover:shadow-xl transition-all duration-300 h-[400px] lg:h-[500px]">
                            <a :href="`/artikel/${articles[0].slug}`" class="block w-full h-full">
                                <img :src="articles[0].thumbnail ? `/storage/${articles[0].thumbnail}` : '/path/to/default-image.jpg'"
                                    :alt="articles[0].title"
                                    class="object-cover w-full h-full transition-transform duration-700 transform group-hover:scale-105"
                                    onerror="this.onerror=null; this.src='/path/to/default-image.jpg';">

                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                </div>

                                <div class="absolute bottom-0 left-0 w-full p-6 sm:p-8">
                                    <span
                                        class="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium tracking-wide text-orange-100 uppercase bg-orange-700/80 backdrop-blur-sm rounded-full">
                                        <span x-text="articles[0].category?.name ?? 'Berita'"></span>
                                    </span>
                                    <h3
                                        class="mb-3 text-2xl font-bold leading-tight text-white sm:text-3xl line-clamp-2 group-hover:text-orange-200 transition-colors">
                                        <span x-text="articles[0].title"></span>
                                    </h3>
                                    <div class="flex items-center gap-3 text-sm text-gray-300">
                                        <div class="flex items-center gap-1.5">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                                </path>
                                            </svg>
                                            <span x-text="formatDate(articles[0].published_at)"></span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div
                            class="relative flex flex-col h-full bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-lg transition-all duration-300 overflow-hidden">
                            <a :href="`/artikel/${articles[1].slug}`" class="flex flex-col h-full">
                                <div class="relative h-48 overflow-hidden sm:h-56 lg:h-1/2">
                                    <img :src="articles[1].thumbnail ? `/storage/${articles[1].thumbnail}` : '/path/to/default-image.jpg'"
                                        class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                        onerror="this.onerror=null; this.src='/path/to/default-image.jpg';">
                                    <div class="absolute top-4 left-4">
                                        <span
                                            class="inline-block px-3 py-1 text-xs font-bold text-orange-700 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                                            <span x-text="articles[1].category?.name ?? 'Info'"></span>
                                        </span>
                                    </div>
                                </div>
                                <div class="flex flex-col justify-between flex-1 p-6">
                                    <div>
                                        <h3
                                            class="text-xl font-bold leading-snug text-gray-900 transition-colors line-clamp-3 group-hover:text-orange-700">
                                            <span x-text="articles[1].title"></span>
                                        </h3>
                                        <p class="mt-3 text-sm leading-relaxed text-gray-500 line-clamp-3"
                                            x-text="stripHtml(articles[1].excerpt || articles[1].body || '')"></p>
                                    </div>
                                    <div class="pt-4 mt-4 text-xs font-medium text-gray-400 border-t border-gray-50">
                                        <span x-text="formatDate(articles[1].published_at)"></span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <template x-if="articles.length > 2">
                        <div class="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
                            <template x-for="article in articles.slice(2)">
                                <a :href="`/artikel/${article.slug}`"
                                    class="flex flex-col h-full transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:-translate-y-1 hover:shadow-lg">
                                    <div class="relative overflow-hidden aspect-[16/9] rounded-t-2xl">
                                        <img :src="article.thumbnail ? `/storage/${article.thumbnail}` : '/path/to/default-image.jpg'"
                                            class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                            onerror="this.onerror=null; this.src='/path/to/default-image.jpg';">
                                        <div
                                            class="absolute inset-0 transition-opacity opacity-0 bg-black/10 group-hover:opacity-100">
                                        </div>
                                    </div>
                                    <div class="flex flex-col flex-1 p-5">
                                        <div class="mb-2">
                                            <span
                                                class="text-[10px] font-bold tracking-wider text-orange-700 uppercase bg-orange-50 px-2 py-1 rounded-md">
                                                <span x-text="article.category?.name ?? 'Info'"></span>
                                            </span>
                                        </div>
                                        <h4
                                            class="mb-2 text-base font-bold leading-snug text-gray-900 transition-colors line-clamp-2 group-hover:text-orange-700">
                                            <span x-text="article.title"></span>
                                        </h4>
                                        <div class="mt-auto pt-3 border-t border-gray-50">
                                            <span class="text-xs text-gray-400"
                                                x-text="formatDate(article.published_at)"></span>
                                        </div>
                                    </div>
                                </a>
                            </template>
                        </div>
                    </template>
                </div>
            </template>

        </div>
    </div>
</section>

<script>
    function newsWidget() {
        return {
            articles: [],
            isLoading: true,
            error: null,
            
            async init() {
                await this.fetchArticles();
            },

            async fetchArticles() {
                this.isLoading = true;
                this.error = null;
                try {
                    const response = await fetch("/api/articles?per_page=6");
                    if (!response.ok) throw new Error('Gagal memuat data');
                    
                    const result = await response.json();
                    this.articles = result.data;
                    
                } catch (err) {
                    console.error(err);
                    this.error = "Terjadi kesalahan saat memuat berita.";
                } finally {
                    this.isLoading = false;
                }
            },

            formatDate(dateString) {
                if (!dateString) return '';
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                return new Date(dateString).toLocaleDateString('id-ID', options);
            },
            
            // Helper sederhana untuk membersihkan tag HTML jika Anda menampilkan excerpt
            stripHtml(html) {
                if (!html) return '';
                let tmp = document.createElement("DIV");
                tmp.innerHTML = html;
                return tmp.textContent || tmp.innerText || "";
            }
        }
    }
</script>