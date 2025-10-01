<section class="py-20 bg-slate-50" id="visi-misi">
    <div class="max-w-6xl px-6 mx-auto lg:px-12">

        {{-- Judul Section --}}
        <div class="mb-16 text-center">
            @if (!empty($content['title']))
            <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                    <img src="{{ asset('assets/img/icon/element.svg') }}" alt="Icon" class="w-8 h-8">
                </div>
                <span
                    class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                    {{ $content['title'] ?? '' }}
                </span>
            </h2>
            <p class="mt-4 text-lg leading-8 text-gray-600">
                Landasan dan tujuan yang menjadi pedoman kami dalam berkarya.
            </p>
            @endif
        </div>

        {{-- Kontainer Grid untuk Visi dan Misi --}}

        <div class="grid grid-cols-1 p-10 bg-white shadow-lg gap-y-12 lg:grid-cols-2 lg:gap-x-16 rounded-2xl">

            {{-- Kolom Visi --}}
            @if (!empty($content['visi']))
            <div>
                <div class="flex items-center mb-4 gap-x-4">
                    {{-- Ikon Visi --}}
                    <span class="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="text-indigo-600 w-7 h-7">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </span>
                    <h3 class="text-2xl font-semibold text-gray-800">Visi</h3>
                </div>
                <p class="leading-relaxed text-gray-600">
                    {{ $content['visi'] }}
                </p>
            </div>
            @endif

            {{-- Kolom Misi --}}
            @if (!empty($content['misi']) && is_array($content['misi']))
            <div>
                <div class="flex items-center mb-4 gap-x-4">
                    {{-- Ikon Misi --}}
                    <span class="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="text-indigo-600 w-7 h-7">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                    <h3 class="text-2xl font-semibold text-gray-800">Misi</h3>
                </div>
                <ul class="space-y-4 text-gray-600">
                    @foreach ($content['misi'] as $item)
                    <li class="flex items-start">
                        {{-- Ikon Checkmark untuk setiap item --}}
                        <svg class="flex-shrink-0 w-6 h-6 mt-0.5 text-teal-500" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd" />
                        </svg>
                        <span class="ml-3">{{ $item }}</span>
                    </li>
                    @endforeach
                </ul>
            </div>
            @endif
        </div>

    </div>
</section>