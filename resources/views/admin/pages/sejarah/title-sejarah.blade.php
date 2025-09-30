<section id="sejarah" class="{{ $data['background'] ?? 'bg-white' }} py-20 lg:py-24 overflow-hidden">
    <div class="container px-6 mx-auto lg:px-12">
        <div class="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

            {{-- Kolom Konten Teks --}}
            <div class="@if($layout === 'right') order-2 @endif">
                {{-- Judul dengan gaya yang disempurnakan --}}
                <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                    <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                        <img src="{{ asset('assets/img/icon/element.svg') }}" alt="Icon" class="w-8 h-8">
                    </div>
                    <span
                        class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                        {{ $data['title'] ?? '' }}
                    </span>
                </h2>

                {{-- Wrapper untuk konten agar jarak konsisten --}}
                <div class="mt-8 space-y-6">
                    @if(!empty($data['subtitle']))
                    <p class="text-xl font-light text-gray-600">
                        {{ $data['subtitle'] }}
                    </p>
                    @endif

                    @if(!empty($data['content']))
                    {{-- Class 'prose' dari Tailwind untuk tipografi yang rapi secara otomatis --}}
                    <div class="prose max-w-none prose-gray">
                        @foreach($data['content'] as $paragraph)
                        <p>{{ $paragraph }}</p>
                        @endforeach
                    </div>
                    @endif
                </div>
            </div>

            {{-- Kolom Gambar --}}
            @if(!empty($data['image']))
            <div class="@if($layout === 'right') order-1 @endif">
                {{-- Bingkai dekoratif untuk gambar agar lebih menonjol --}}
                <div class="p-4 bg-gray-100 shadow-xl rounded-2xl sm:p-6">
                    <img src="{{ asset($data['image']) }}" alt="{{ $data['title'] ?? 'Sejarah' }}"
                        class="object-cover w-full h-full rounded-lg">
                </div>
            </div>
            @endif
        </div>
    </div>
</section>