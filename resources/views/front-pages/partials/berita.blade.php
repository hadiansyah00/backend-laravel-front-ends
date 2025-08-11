<section class="py-20 bg-white" id="berita">
    <div class="container mx-auto px-4-lg">

        <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold text-gray-800 md:text-4xl">Berita & Artikel Terbaru</h2>
            <p class="mt-2 text-lg text-gray-600">Ikuti perkembangan terbaru dari perjuangan Perempuan Adat Nusantara.
            </p>
        </div>

        @if(isset($berita) && count($berita) > 0)
        @php
        // Pisahkan berita pertama untuk dijadikan featured
        $featuredArticle = $berita[0];
        // Ambil 2 berita berikutnya untuk ditampilkan di samping
        $otherArticles = array_slice($berita, 1, 2);
        @endphp

        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">

            <div class="lg:col-span-2">
                <div
                    class="relative h-full overflow-hidden transition-all duration-300 ease-in-out bg-white shadow-lg rounded-2xl group hover:shadow-2xl">
                    <a href="{{ $featuredArticle['link'] ?? '#' }}" target="_blank" rel="noopener noreferrer"
                        class="flex flex-col h-full">

                        {{-- Gambar Berita Utama --}}
                        <div class="overflow-hidden">
                            @if(isset($featuredArticle['_embedded']['wp:featuredmedia'][0]['source_url']))
                            <img src="{{ $featuredArticle['_embedded']['wp:featuredmedia'][0]['source_url'] }}"
                                alt="{!! $featuredArticle['title']['rendered'] ?? 'Gambar Berita' !!}"
                                class="object-cover w-full h-64 transition-transform duration-500 md:h-80 group-hover:scale-105">
                            @else
                            <div class="flex items-center justify-center w-full h-64 text-gray-500 bg-gray-200 md:h-80">
                                <span>No Image</span>
                            </div>
                            @endif
                        </div>

                        {{-- Konten Berita Utama --}}
                        <div class="flex flex-col flex-grow p-6 md:p-8">
                            <h3
                                class="mb-3 text-2xl font-bold leading-tight text-gray-800 transition-colors duration-300 group-hover:text-purple-600">
                                {!! $featuredArticle['title']['rendered'] ?? 'Judul Tidak Tersedia' !!}
                            </h3>
                            {{-- Deskripsi diperpanjang dengan line-clamp-4 --}}
                            <div class="mb-6 leading-relaxed text-gray-600 line-clamp-4">
                                {!! isset($featuredArticle['excerpt']['rendered']) ?
                                strip_tags($featuredArticle['excerpt']['rendered']) : '' !!}
                            </div>
                            <div class="mt-auto"> {{-- Mendorong tombol ke bawah --}}
                                <span
                                    class="inline-block font-semibold text-purple-600 transition-transform duration-300 group-hover:translate-x-1">
                                    Selengkapnya &rarr;
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <div class="flex flex-col col-span-1 gap-8">
                @foreach($otherArticles as $item)
                <div
                    class="relative overflow-hidden transition-all duration-300 ease-in-out shadow-lg rounded-2xl group hover:shadow-2xl">
                    <a href="{{ $item['link'] ?? '#' }}" target="_blank" rel="noopener noreferrer" class="block h-full">

                        @if(isset($item['_embedded']['wp:featuredmedia'][0]['source_url']))
                        <img src="{{ $item['_embedded']['wp:featuredmedia'][0]['source_url'] }}"
                            alt="{!! $item['title']['rendered'] ?? 'Gambar Berita' !!}"
                            class="object-cover w-full h-full transition-transform duration-500 min-h-64 group-hover:scale-105">
                        @else
                        <div class="flex items-center justify-center w-full h-full text-gray-500 bg-gray-200 min-h-64">
                            <span>No Image</span>
                        </div>
                        @endif

                        {{-- Overlay dan Judul --}}
                        <div
                            class="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-transparent">
                            {{-- Judul bisa sampai 3 baris --}}
                            <h3 class="text-xl font-bold leading-tight text-white line-clamp-3">
                                {!! $item['title']['rendered'] ?? 'Judul Tidak Tersedia' !!}
                            </h3>
                        </div>
                    </a>
                </div>
                @endforeach
            </div>
        </div>

        @else
        <div class="py-8 text-center">
            <p class="text-gray-500">Tidak ada berita yang tersedia saat ini.</p>
        </div>
        @endif
    </div>
</section>