{{-- resources/views/admin/pages/kebidanan/peluang-kerja.blade.php --}}
<section class="py-16 bg-gray-50" id="peluang-kerja">
    <div class="max-w-6xl px-6 mx-auto lg:px-12">
        <div class="mb-12 text-center">
            <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                    <img src="{{ asset('assets/img/icon/element.svg') }}" alt="Icon" class="w-8 h-8">
                </div>
                <span
                    class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                    {{ $content['title'] ?? '' }}
                </span>
            </h2>
        </div>

        {{-- Grid Items --}}
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            @foreach ($content['items'] ?? [] as $item)
            {{-- Awal dari satu kartu --}}
            <div
                class="p-8 space-y-4 transition-all duration-300 ease-in-out bg-white shadow-md rounded-2xl hover:shadow-xl hover:-translate-y-2">

                {{-- Wadah Ikon --}}
                <div class="flex-shrink-0">
                    <span class="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl">
                        {{--
                        CATATAN: Anda perlu menambahkan key 'icon_svg' pada data Anda.
                        Contoh: $item['icon_svg'] = '<svg>...</svg>';
                        Jika tidak ada, ikon placeholder di bawah akan digunakan.
                        --}}
                        @if (!empty($item['icon_svg']))
                        {!! $item['icon_svg'] !!} {{-- Pastikan SVG ini aman (sanitized) --}}
                        @else
                        {{-- Ikon Placeholder --}}
                        <svg class="text-orange-600 w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                        @endif
                    </span>
                </div>

                {{-- Konten Teks --}}
                <div>
                    <h3 class="mb-2 text-xl font-bold text-gray-900">
                        {{ $item['title'] ?? 'Judul Item' }}
                    </h3>
                    <p class="text-base leading-relaxed text-gray-600">
                        {{ $item['description'] ?? 'Deskripsi default untuk item ini akan ditampilkan di sini.' }}
                    </p>
                </div>
            </div>
            {{-- Akhir dari satu kartu --}}
            @endforeach
        </div>
    </div>
</section>