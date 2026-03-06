{{-- 
    Section: HERO
    Generic hero banner with background image (desktop + mobile), breadcrumbs, title, subtitle.
    Replaces: hero-sejarah, hero-visi-misi, hero-pimpinan, hero-dosen, hero-organisasi, hero (kebidanan/farmasi/gizi)
    
    JSON keys: background_image, background_image_mobile, breadcrumbs[{url, text}], title, subtitle, gradient_from (optional)
--}}
@php
    $data = $section->decoded_content ?? $data ?? [];
    $gradientFrom = $data['gradient_from'] ?? 'orange-600';
@endphp

<section class="relative w-full h-80 md:h-96">
    {{-- Desktop background --}}
    <div class="absolute inset-0 hidden bg-center bg-cover md:block"
        style="background-image: url('{{ asset($data['background_image'] ?? '') }}')">
    </div>

    {{-- Mobile background --}}
    <div class="absolute inset-0 block bg-center bg-cover md:hidden"
        style="background-image: url('{{ asset($data['background_image_mobile'] ?? $data['background_image'] ?? '') }}')">
    </div>

    <div class="absolute inset-0 bg-gradient-to-r from-{{ $gradientFrom }}/80 to-white/20"></div>

    <div class="container relative z-10 flex flex-col justify-center h-full px-6 mx-auto text-white">
        {{-- Breadcrumbs --}}
        <div class="flex items-center space-x-2 text-sm text-green-100">
            <a href="/" class="transition hover:text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                    </path>
                </svg>
            </a>

            @if(!empty($data['breadcrumbs']))
                @foreach($data['breadcrumbs'] as $crumb)
                    <span>/</span>
                    <a href="{{ $crumb['url'] ?? '#' }}" class="transition hover:text-white">{{ $crumb['text'] ?? '' }}</a>
                @endforeach
            @endif

            <span>/</span>
            <span class="font-semibold text-white">{{ $data['title'] ?? '' }}</span>
        </div>

        <div class="max-w-2xl mt-4">
            <h1 class="text-4xl font-extrabold leading-tight md:text-5xl">
                {{ $data['title'] ?? 'Judul Halaman' }}
            </h1>
            @if(!empty($data['subtitle']))
                <p class="mt-2 text-lg text-green-100 md:text-xl">
                    {{ $data['subtitle'] }}
                </p>
            @endif
        </div>
    </div>
</section>
