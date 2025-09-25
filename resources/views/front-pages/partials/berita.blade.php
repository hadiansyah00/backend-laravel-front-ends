<section class="py-16 bg-white sm:py-24" id="berita">
    <div class="px-6 mx-auto max-w-7xl lg:px-8">
        @if(isset($berita) && count($berita) > 0)
        @php
        $featuredArticle = $berita[0];
        $otherArticles = array_slice($berita, 1, 2);
        @endphp

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">

            {{-- ARTIKEL UTAMA (FEATURED) --}}
            <div class="lg:col-span-2">
                <a href="{{ route('berita.detail', $featuredArticle['slug']) }}"
                    class="relative block w-full overflow-hidden shadow-lg group rounded-2xl min-h-[480px]">

                    @if(isset($featuredArticle['_embedded']['wp:featuredmedia'][0]['source_url']))
                    <img src="{{ $featuredArticle['_embedded']['wp:featuredmedia'][0]['source_url'] }}"
                        alt="{!! $featuredArticle['title']['rendered'] ?? 'Gambar Berita' !!}"
                        class="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                    @endif

                    <div class="absolute inset-0 bg-gradient-to-t from-orange-600/60 via-orange-600/60 to-transparent">
                    </div>

                    <div class="relative flex flex-col h-full p-6 text-white md:p-8">
                        <div class="flex items-start justify-between">
                            {{-- ======================================================= --}}
                            {{-- == BADGE KATEGORI DINAMIS == --}}
                            {{-- ======================================================= --}}
                            <span
                                class="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-orange-600 bg-white rounded-full text-orange backdrop-blur-sm">
                                <span class="block w-2 h-2 bg-orange-400 rounded-full"></span>
                                @if(isset($featuredArticle['_embedded']['wp:term'][0][0]['name']))
                                {{ $featuredArticle['_embedded']['wp:term'][0][0]['name'] }}
                                @else
                                Berita dan Artikel STIkes Bogor Husada
                                @endif
                            </span>
                            <div class="p-2 rounded-md bg-white/10 backdrop-blur-sm">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                                </svg>
                            </div>
                        </div>

                        <div class="mt-auto">
                            <p class="text-sm text-white-600">
                                {{ \Carbon\Carbon::parse($featuredArticle['date'])->translatedFormat('d F Y') }}
                            </p>
                            <h3 class="mt-2 text-2xl font-bold leading-tight md:text-4xl line-clamp-3">
                                {!! $featuredArticle['title']['rendered'] ?? 'Judul Tidak Tersedia' !!}
                            </h3>
                        </div>
                    </div>
                </a>
            </div>

            {{-- ARTIKEL KECIL DI KANAN --}}
            <div class="flex flex-col col-span-1 gap-6 lg:gap-8">
                @foreach($otherArticles as $item)
                <a href="{{ $item['link'] ?? '#' }}" target="_blank" rel="noopener noreferrer"
                    class="relative block w-full overflow-hidden shadow-lg group rounded-2xl h-60">

                    @if(isset($item['_embedded']['wp:featuredmedia'][0]['source_url']))
                    <img src="{{ $item['_embedded']['wp:featuredmedia'][0]['source_url'] }}"
                        alt="{!! $item['title']['rendered'] ?? 'Gambar Berita' !!}"
                        class="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                    @endif

                    <div class="absolute inset-0 bg-gradient-to-t from-orange-600/60 via-orange-600/60 to-transparent">
                    </div>

                    <div class="relative flex flex-col h-full p-6 text-white">
                        <div class="flex items-start justify-between">
                            {{-- ======================================================= --}}
                            {{-- == BADGE KATEGORI DINAMIS (DALAM LOOP) == --}}
                            {{-- ======================================================= --}}
                            <span
                                class="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-orange-600 bg-white rounded-full backdrop-blur-sm">
                                <span class="block w-2 h-2 bg-orange-400 rounded-full"></span>
                                @if(isset($item['_embedded']['wp:term'][0][0]['name']))
                                {{ $item['_embedded']['wp:term'][0][0]['name'] }}
                                @else
                                Berita dan Artikel STIkes Bogor Husada
                                @endif
                            </span>
                            <div class="p-2 rounded-md bg-white/10 backdrop-blur-sm">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="mt-auto">
                            <p class="text-xs text-white">
                                {{ \Carbon\Carbon::parse($item['date'])->translatedFormat('d F Y') }}
                            </p>
                            <h3 class="mt-1 text-lg font-bold leading-tight line-clamp-2">
                                {!! $item['title']['rendered'] ?? 'Judul Tidak Tersedia' !!}
                            </h3>
                        </div>
                    </div>
                </a>
                @endforeach
            </div>
        </div>

        {{-- ======================================================= --}}
        {{-- == TEKS DESKRIPSI DAN TOMBOL BARU == --}}
        {{-- ======================================================= --}}
        <div class="flex flex-wrap items-end justify-between gap-8 mt-12">
            <div class="max-w-2xl text-gray-700">
                <p>STIKes Bogor Husada berperan aktif dalam inovasi kesehatan yang berdampak, melalui pengembangan
                    riset, pengabdian masyarakat, dan kolaborasi strategis. Kami berupaya menghasilkan tenaga kesehatan
                    unggul dan solusi inovatif yang bermanfaat bagi masyarakat luas dan pembangunan nasional.</p>
            </div>
            <div>
                <a href="#"
                    class="inline-block px-6 py-3 font-semibold text-white transition bg-orange-600 rounded-lg shadow-md hover:bg-orange-600">
                    STIKes Bogor Husada Berdampak &rarr;
                </a>
            </div>
        </div>

        @else
        <div class="py-8 text-center">
            <p class="text-gray-500">Tidak ada berita yang tersedia saat ini.</p>
        </div>
        @endif
    </div>
</section>