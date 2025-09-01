{{-- Menggunakan layout utama --}}
@extends('layouts.app-front')

{{-- Memulai section untuk konten utama --}}
@section('content')

{{-- ================= NAVBAR DINAMIS ================= --}}
{{-- Pastikan Anda mengirimkan variabel $menus dari Controller --}}
@include('front-pages.partials.navbar', ['menus' => $menus])
{{-- ================= END NAVBAR ================= --}}


{{-- KONTEN DINAMIS DARI DATABASE --}}
<main class="pt-20"> {{-- Beri padding top agar konten tidak tertutup navbar --}}
    {{-- <h1 class="mb-8 text-3xl font-bold text-center">{{ $page->title }}</h1> --}}
    @foreach ($sections as $section)

    {{-- ================= TITLE ================= --}}
    @if ($section->type === 'title')
    <section class="relative py-20 text-white bg-center bg-cover"
        style="background-image:url('{{ asset($section->decoded_content['background'] ?? '') }}')">
        <div class="absolute inset-0 bg-black/50"></div>
        <div class="relative z-10 max-w-3xl mx-auto text-center">
            <h2 class="mb-4 text-4xl font-extrabold">
                {{ $section->decoded_content['title'] ?? '' }}
            </h2>
            <p class="text-lg">
                {{ $section->decoded_content['subtitle'] ?? '' }}
            </p>
        </div>
    </section>
    @endif

    {{-- ================= HERO SLIDER ================= --}}
    @if ($section->type === 'hero')
    <section class="relative w-full overflow-hidden">
        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                @foreach ($section->decoded_content['slides'] ?? [] as $slide)
                {{-- Ganti h-[500px] dengan min-h-screen dan sesuaikan layout konten --}}
                <div class="relative flex items-center min-h-screen bg-center bg-cover swiper-slide"
                    style="background-image:url('{{ asset($slide['background'] ?? '') }}')">

                    <div class="absolute inset-0 bg-black/60"></div> {{-- Gelapkan sedikit agar tulisan terbaca --}}

                    {{-- Container untuk menjaga konten di tengah dan tidak terlalu lebar --}}
                    <div class="container relative z-10 px-6 mx-auto">
                        <div class="max-w-2xl text-center text-white md:text-left">
                            <h1 class="mb-4 text-4xl font-extrabold leading-tight md:text-6xl">
                                {{ $slide['title'] ?? '' }}
                            </h1>
                            <p class="text-lg md:text-xl">
                                {{ $slide['subtitle'] ?? '' }}
                            </p>
                        </div>
                    </div>

                </div>
                @endforeach
            </div>
            <div class="text-white swiper-button-next"></div>
            <div class="text-white swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
        </div>
    </section>



    @endif

    {{-- ================= FEATURE ================= --}}
    @if ($section->type === 'feature')
    <section class="py-16 bg-gray-100">
        <div class="container px-6 mx-auto">
            <div class="grid gap-8 text-center md:grid-cols-3">
                @foreach ($section->decoded_content['items'] ?? [] as $item)
                <div class="p-6 transition bg-white shadow rounded-xl hover:shadow-lg">
                    <i class="{{ $item['icon'] ?? '' }} text-4xl text-purple-600 mb-4"></i>
                    <h3 class="mb-2 text-xl font-semibold">{{ $item['title'] ?? '' }}</h3>
                    <p class="text-gray-600">{{ $item['desc'] ?? '' }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>
    @endif

    @endforeach
</main>

@endsection
{{-- Mengakhiri section konten --}}