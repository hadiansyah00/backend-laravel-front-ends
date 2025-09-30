<section class="relative py-20 lg:py-24 {{ $data['background'] ?? 'bg-gray-50' }}">
    <div class="container px-6 mx-auto lg:px-12">
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

            {{-- Kolom Kiri: Gambar dengan Aksen Dekoratif --}}
            @if (!empty($data['author']['image']))
            <div class="relative flex justify-center order-2 lg:order-1">
                {{-- Bentuk dekoratif di latar belakang --}}
                <div class="absolute w-full h-full transform bg-orange-100 rounded-3xl -rotate-6"></div>

                {{-- Gambar utama dengan bingkai dan bayangan --}}
                <div class="relative w-full max-w-sm overflow-hidden border-8 border-white shadow-2xl rounded-2xl">
                    <img src="{{ asset($data['author']['image']) }}" alt="{{ $data['author']['name'] ?? 'Author' }}"
                        class="object-cover w-full h-full">
                </div>
            </div>
            @endif

            {{-- Kolom Kanan: Konten Teks --}}
            <div class="order-1 lg:order-2">
                {{-- Judul Kustom --}}
                <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                    <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                        <img src="{{ asset('assets/img/icon/element.svg') }}" alt="Icon" class="w-8 h-8">
                    </div>
                    <span
                        class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                        {{ $data['title'] ?? '' }}
                    </span>
                </h2>

                {{-- Menggunakan blockquote untuk pesan/sambutan --}}
                <blockquote class="mt-8">
                    {{-- Plugin 'prose' untuk tipografi yang rapi secara otomatis --}}
                    <div class="prose prose-lg text-gray-700 max-w-none prose-p:leading-relaxed">
                        @if (!empty($data['subtitle']))
                        <p class="font-semibold text-orange-600">{{ $data['subtitle'] }}</p>
                        @endif

                        @foreach ($data['content'] ?? [] as $paragraph)
                        <p>{{ $paragraph }}</p>
                        @endforeach
                    </div>

                    {{-- Tanda tangan/Author di akhir kutipan --}}
                    @if (!empty($data['author']))
                    <footer class="pt-6 mt-6 border-t border-gray-200">
                        <p class="text-xl font-bold text-gray-900">{{ $data['author']['name'] ?? '' }}</p>
                        <p class="text-base text-gray-600">{{ $data['author']['position'] ?? '' }}</p>
                    </footer>
                    @endif
                </blockquote>
            </div>

        </div>
    </div>
</section>