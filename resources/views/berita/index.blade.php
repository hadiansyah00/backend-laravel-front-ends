@extends('layouts.app-berita')

@section('content')

{{-- Judul Halaman dan Breadcrumb --}}
<section class="relative pt-24 pb-16 text-white bg-gray-800">
    {{-- Latar Belakang & Overlay --}}
    <div class="absolute inset-0">
        {{-- Latar Belakang untuk Desktop (Ganti gambar jika perlu) --}}
        <img src="{{ asset('assets/img/hero/head-2.jpg') }}" alt="Header Berita"
            class="hidden object-cover w-full h-full md:block">
        {{-- Latar Belakang untuk Mobile --}}
        <img src="{{ asset('assets/img/hero/head-mb-1.jpg') }}" alt="Header Berita"
            class="object-cover w-full h-full md:hidden">
        {{-- Overlay Gradient --}}
        <div class="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-orange-800/70 to-transparent"></div>
    </div>

    {{-- Konten Header --}}
    <div class="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8">
        {{-- Breadcrumb --}}
        <div class="flex items-center space-x-2 text-sm text-orange-100">
            <a href="/" class="transition hover:text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                    </path>
                </svg>
            </a>
            <span>/</span>
            <a href="/berita" class="transition hover:text-white">Berita</a>
            <span>/</span>
            {{-- Ini bisa dibuat dinamis jika halaman ini untuk kategori tertentu --}}
            <span class="font-semibold text-white">Semua Berita</span>
        </div>

        {{-- Judul dan Deskripsi --}}
        <div class="max-w-3xl mt-4">
            <h1 class="text-4xl font-extrabold leading-tight md:text-5xl">
                Aktivitas & Berita Terbaru
            </h1>
            <p class="mt-2 text-lg text-orange-100 md:text-xl">
                Informasi terbaru seputar kegiatan, akademik, dan prestasi.
            </p>
        </div>
    </div>
</section>
<div class="container px-4 py-16 mx-auto sm:px-6 lg:px-8">

    {{-- FILTER BAR --}}
    <div class="flex flex-col gap-4 mb-8 md:flex-row md:items-center">

        <div class="relative w-full md:w-56">
            <select id="filter-category"
                class="block w-full px-4 py-2 pr-8 leading-tight text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Semua Kategori</option>
                @foreach ($categories as $category)
                <option value="{{ $category->slug }}">{{ $category->name }}</option>
                @endforeach
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
            </div>
        </div>

        <div class="relative w-full md:w-40">
            <select id="filter-year"
                class="block w-full px-4 py-2 pr-8 leading-tight text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tahun</option>
                @foreach (range(date('Y'), 2015) as $year)
                <option value="{{ $year }}">{{ $year }}</option>
                @endforeach
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
            </div>
        </div>

    </div>

    {{-- GRID UTAMA --}}
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">

        {{-- KOLOM KONTEN (span 2) --}}
        <div class="space-y-8 lg:col-span-2">
            <div id="articlesContainer" class="max-w-4xl px-4 mx-auto space-y-8">
            </div>

            <div id="paginationLinks" class="flex justify-center mt-6 space-x-2">
                <!-- Pagination akan diisi lewat AJAX -->
            </div>
        </div>

        {{-- KOLOM SIDEBAR --}}
        <aside class="lg:col-span-1">
            <div class="space-y-8 lg:sticky lg:top-8">
                {{-- Widget Pencarian --}}
                <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Cari Berita</h3>
                    <form id="search-form" action="{{ route('berita.filter') }}" method="GET" data-ajax="true">
                        <div class="relative">
                            <input type="search" name="search" value="{{ request('search') }}"
                                placeholder="Ketikkan kata kunci..."
                                class="block w-full p-3 pr-10 text-sm border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500">
                            <button type="submit"
                                class="absolute top-0 bottom-0 right-0 p-3 text-white bg-orange-700 rounded-r-lg hover:bg-orange-800">
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>

                {{-- Widget Kategori --}}
                <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Kategori
                    </h3>

                    <ul id="category-list" class="space-y-2">
                        {{-- Semua kategori --}}
                        <li>
                            <a href="#" data-id=""
                                class="flex items-center justify-between px-3 py-2 text-gray-700 transition-colors duration-200 rounded-lg category-link dark:text-gray-300 hover:bg-orange-50 hover:text-orange-700 dark:hover:bg-orange-900/20 dark:hover:text-orange-400">
                                Semua Kategori
                                <span class="text-sm text-gray-400 category-count"></span>
                            </a>
                        </li>

                        {{-- Daftar kategori --}}
                        @foreach ($categories as $category)
                        <li>
                            <a href="#" data-id="{{ $category->slug }}"
                                class="flex items-center justify-between px-3 py-2 text-gray-700 transition-colors duration-200 rounded-lg category-link dark:text-gray-300 hover:bg-orange-50 hover:text-orange-700 dark:hover:bg-orange-900/20 dark:hover:text-orange-400">
                                {{ $category->name }}
                                @if(isset($category->articles_count))
                                <span class="text-sm text-gray-400 category-count">{{ $category->articles_count
                                    }}</span>
                                @endif
                            </a>
                        </li>
                        @endforeach
                    </ul>
                </div>

                {{-- Widget Berita Terbaru --}}
                <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Berita Terbaru</h3>
                    <div class="space-y-4">
                        @foreach ($latestArticles as $latest)
                        <div class="flex items-start">
                            <img src="{{ asset('storage/'.$latest->thumbnail) }}"
                                class="object-cover w-16 h-16 mr-4 rounded-lg" alt="{{ $latest->title }}">
                            <div>
                                <a href="{{ route('berita.show', $latest->slug) }}"
                                    class="font-semibold text-gray-800 hover:text-orange-700 dark:text-white dark:hover:text-orange-400">
                                    {{ Str::limit($latest->title, 50) }}
                                </a>
                                <p class="text-sm text-gray-500 dark:text-gray-400">
                                    {{ $latest->published_at->format('d M Y') }}
                                </p>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </aside>
    </div>
</div>
@endsection