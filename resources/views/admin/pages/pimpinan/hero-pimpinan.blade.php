@if ($section->type === 'hero-pimpinan')
<section class="relative w-full h-80 md:h-96">
    {{-- Latar Belakang untuk Desktop (md ke atas) --}}
    <div class="absolute inset-0 hidden bg-center bg-cover md:block"
        style="background-image: url('{{ asset($section->decoded_content['background_image'] ?? '') }}')">
    </div>

    {{-- Latar Belakang untuk Mobile (di bawah md) --}}
    <div class="absolute inset-0 block bg-center bg-cover md:hidden"
        style="background-image: url('{{ asset($section->decoded_content['background_image_mobile'] ?? '') }}')">
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-orange-600/80 to-white/20"></div>
    <div class="container relative z-10 flex flex-col justify-center h-full px-6 mx-auto text-white">

        <div class="flex items-center space-x-2 text-sm text-green-100">
            <a href="/" class="transition hover:text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                    </path>
                </svg>
            </a>

            @if(!empty($section->decoded_content['breadcrumbs']))
            @foreach($section->decoded_content['breadcrumbs'] as $crumb)
            <span>/</span>
            <a href="{{ $crumb['url'] ?? '#' }}" class="transition hover:text-white">{{ $crumb['text'] ?? '' }}</a>
            @endforeach
            @endif

            <span>/</span>
            <span class="font-semibold text-white">{{ $section->decoded_content['title'] ?? '' }}</span>
        </div>

        <div class="max-w-2xl mt-4">
            <h1 class="text-4xl font-extrabold leading-tight md:text-5xl">
                {{ $section->decoded_content['title'] ?? 'Judul Halaman' }}
            </h1>
            @if(!empty($section->decoded_content['subtitle']))
            <p class="mt-2 text-lg text-green-100 md:text-xl">
                {{ $section->decoded_content['subtitle'] }}
            </p>
            @endif
        </div>
    </div>
</section>
@endif