@extends('layouts.app-front')
@push('styles')
<style>
    /* Menambahkan gaya kustom untuk gambar di dalam konten artikel */
    .prose img {
        border-radius: 0.75rem;
        /* Ini setara dengan class 'rounded-xl' di Tailwind */
        margin-top: 2em;
        /* Memberi spasi di atas gambar */
        margin-bottom: 2em;
        /* Memberi spasi di bawah gambar */
    }
</style>
@endpush
@section('content')

{{-- 1. Bagian Header Berita (Dengan Latar Belakang Oranye) --}}
<section class="pt-10 pb-12 text-white bg-orange-600">
    <div class="container max-w-5xl px-6 mx-auto">
        {{-- Breadcrumbs (Placeholder) --}}
        <div class="mb-6 text-sm text-orange-200">
            <a href="#" class="hover:text-white">Aktivitas</a>
            <span>></span>
            <a href="#" class="hover:text-white">Berita</a>
        </div>

        {{-- Grid untuk Judul dan Gambar --}}
        <div class="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
            {{-- Kolom Kiri: Judul dan Info --}}
            <div>
                <h1 class="text-3xl font-bold md:text-4xl">
                    {!! $detail['title']['rendered'] ?? 'Judul Berita Tidak Ditemukan' !!}
                </h1>
                <div class="flex flex-wrap items-center mt-6 text-sm text-orange-100 gap-x-6 gap-y-2">
                    <div class="flex items-center gap-2">
                        <span>Diterbitkan Pada</span>
                        <span class="font-semibold">{{ \Carbon\Carbon::parse($detail['date'])->translatedFormat('d F Y')
                            }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        {{-- Ganti dengan data penulis jika tersedia dari API --}}
                        <span>Oleh</span>
                        <span class="font-semibold">Nama Penulis</span>
                    </div>
                </div>
            </div>

            {{-- Kolom Kanan: Gambar Unggulan --}}
            <div>
                @if(isset($detail['_embedded']['wp:featuredmedia'][0]['source_url']))
                <img src="{{ $detail['_embedded']['wp:featuredmedia'][0]['source_url'] }}"
                    alt="{!! $detail['title']['rendered'] !!}"
                    class="object-cover w-full shadow-lg rounded-xl aspect-video">
                @else
                {{-- Fallback jika tidak ada gambar --}}
                <div class="flex items-center justify-center w-full bg-orange-700 rounded-xl aspect-video">
                    <span class="text-orange-300">Gambar tidak tersedia</span>
                </div>
                @endif
            </div>
        </div>
    </div>
</section>

{{-- 2. Bagian Konten Berita (Dengan Tombol Share) --}}
<section class="py-16 bg-white">
    <div class="container max-w-4xl px-6 mx-auto">
        {{-- Wrapper untuk posisi relatif --}}
        <div class="relative" x-data="{ showTooltip: false }">

            {{-- Tombol Share Mengambang (Hanya di layar besar) --}}
            <div class="absolute top-0 hidden -translate-x-full -left-8 lg:block">
                <div
                    class="sticky flex flex-col items-center p-2 space-y-4 bg-white border rounded-full shadow-sm top-24">
                    {{-- Tombol Share (Contoh) --}}
                    <a href="https://api.whatsapp.com/send?text={{ urlencode($detail['link']) }}" target="_blank"
                        class="text-gray-500 hover:text-green-500">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.06 21.94L7.32 20.58C8.77 21.33 10.37 21.72 12.04 21.72C17.5 21.72 21.95 17.27 21.95 11.81C21.95 6.35 17.5 2 12.04 2M12.04 3.67C16.56 3.67 20.28 7.39 20.28 11.81C20.28 16.23 16.56 19.95 12.04 19.95C10.51 19.95 9.04 19.53 7.78 18.73L7.33 18.46L4.24 19.24L5.05 16.24L4.76 15.77C3.86 14.41 3.4 12.91 3.4 11.81C3.4 7.49 7.02 3.67 12.04 3.67M9.21 7.53C8.96 7.53 8.76 7.54 8.57 7.54C8.31 7.54 8.01 7.63 7.77 8.04C7.52 8.44 6.93 9.03 6.93 10.13C6.93 11.23 7.8 12.28 7.95 12.48C8.1 12.68 9.94 15.54 12.79 16.79C15.21 17.84 15.68 17.65 16.12 17.6C16.5 17.56 17.43 17.03 17.63 16.43C17.83 15.83 17.83 15.33 17.73 15.23C17.63 15.13 17.48 15.08 17.23 14.98C16.98 14.88 15.68 14.23 15.43 14.13C15.18 14.03 15.03 13.98 14.88 14.23C14.73 14.48 14.28 15.08 14.13 15.23C13.98 15.38 13.83 15.43 13.58 15.33C13.33 15.23 12.61 14.98 11.73 14.18C11.01 13.53 10.53 12.73 10.38 12.48C10.23 12.23 10.37 12.09 10.5 11.96C10.62 11.83 10.77 11.65 10.92 11.5C11.07 11.35 11.12 11.23 11.22 11.03C11.32 10.83 11.27 10.68 11.22 10.53C11.17 10.38 10.63 9.08 10.43 8.58C10.23 8.08 10.03 8.13 9.88 8.12C9.72 8.12 9.46 8.11 9.21 8.11V7.53Z">
                            </path>
                        </svg>
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode($detail['link']) }}"
                        target="_blank" class="text-gray-500 hover:text-blue-600">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </a>
                    {{-- Tombol Copy Link dengan Alpine.js --}}
                    <div class="relative">
                        <button
                            @click="navigator.clipboard.writeText('{{ $detail['link'] }}'); showTooltip = true; setTimeout(() => showTooltip = false, 2000)"
                            class="text-gray-500 hover:text-orange-500">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1">
                                </path>
                            </svg>
                        </button>
                        {{-- Tooltip --}}
                        <div x-show="showTooltip" x-transition
                            class="absolute px-2 py-1 ml-2 text-xs text-white bg-gray-800 rounded left-full whitespace-nowrap">
                            Link disalin!
                        </div>
                    </div>
                </div>
            </div>

            {{-- Konten Artikel dari WordPress --}}
            <div class="mt-4 mb-3 news-container">
                <div class="news-content">
                    {!! $detail['content']['rendered'] ?? '<p>Konten tidak tersedia.</p>' !!}
                </div>
            </div>
        </div>
    </div>
</section>

@endsection
<style>
    /* Membuat ukuran gambar berita utama lebih proporsional */
    .news-featured-img {
        max-height: 400px;
        object-fit: cover;
        border-radius: 15px;
    }

    /* Menjaga ukuran gambar di dalam konten agar tetap seragam */
    .news-content img {
        width: 100%;
        height: auto;
        max-height: 400px;
        object-fit: cover;
        border-radius: 10px;
        display: block;
        margin: 10px auto;
        text-align: center;
    }

    /* Gambar berita populer di sidebar */
    .news-thumbnail {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 10px;
    }

    /* Membuat teks justify */
    .news-content {
        text-align: justify;
    }
</style>