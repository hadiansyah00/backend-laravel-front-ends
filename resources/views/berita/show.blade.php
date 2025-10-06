@extends('layouts.app-front')

@section('content')
<style>
    /* Kustomisasi untuk Tailwind Typography (@tailwindcss/typography) */
    .prose p {
        text-align: justify;
    }

    .prose img {
        border-radius: 1rem;
        /* rounded-xl */
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        /* shadow-lg */
        margin-top: 2em;
        margin-bottom: 2em;
    }
</style>

<main class=" bg-gray-50 dark:bg-gray-900">

    {{-- HEADER ARTIKEL DUA KOLOM --}}
    <header
        class="py-16 bg-gradient-to-r from-orange-600 to-orange-800 dark:from-orange-700 dark:to-orange-900 lg:py-20">
        <div class="container px-4 mx-auto sm:px-6 lg:px-8">
            <div class="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">

                {{-- Kolom Kiri: Judul dan Meta Info --}}
                <div class="text-white lg:pr-12">
                    <h2 class="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        {{ $article->title }}
                    </h2>

                    <div class="flex flex-wrap items-center mt-6 text-sm text-orange-100">
                        <div class="flex items-center mr-6">
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clip-rule="evenodd" fill-rule="evenodd"></path>
                            </svg>
                            <span>Diterbitkan Pada: {{ $article->published_at ? $article->published_at->format('d F Y')
                                :
                                'N/A' }}</span>
                        </div>
                        <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"
                                    fill-rule="evenodd"></path>
                            </svg>
                            <span>Diterbitkan Oleh: {{ $article->author->name ?? 'Admin' }}</span>
                        </div>
                    </div>
                </div>

                {{-- Kolom Kanan: Thumbnail --}}
                <div class="w-full">
                    {{-- FIX: Cek jika thumbnail ada sebelum memanggil asset() --}}
                    @if ($article->thumbnail)
                    <img src="{{ asset('storage/' . $article->thumbnail) }}" alt="{{ $article->title }}"
                        class="object-cover w-full h-auto max-h-[400px] shadow-2xl rounded-lg">
                    @else
                    <div
                        class="flex items-center justify-center w-full h-[400px] bg-green-500 rounded-lg shadow-2xl text-white text-3xl font-bold">
                        600 &times; 400
                    </div>
                    @endif
                </div>

            </div>
        </div>
    </header>

    {{-- KONTEN UTAMA & SIDEBAR --}}
    <div class="container px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-3">

            {{-- Kolom Kiri: Konten Artikel --}}
            <div class="lg:col-span-2">
                <article class="max-w-full prose prose-lg lg:prose-xl dark:prose-invert">
                    {!! $article->content !!}
                </article>

                <hr class="my-10 border-gray-200 dark:border-gray-700">

                {{-- Bagian Tags --}}
                <div class="flex flex-wrap items-center gap-2">
                    <strong class="mr-2 text-gray-800 dark:text-gray-200">Tags:</strong>
                    @forelse ($article->tags as $tag)
                    <a href="#"
                        class="inline-block px-3 py-1.5 text-sm font-medium text-green-800 bg-green-100 rounded-full hover:bg-green-200 dark:bg-green-900 dark:text-green-200">
                        #{{ $tag->name }}
                    </a>
                    @empty
                    <span class="text-sm text-gray-500">Tidak ada tag.</span>
                    @endforelse
                </div>

                {{-- Bagian Social Share --}}
                <div class="p-6 mt-10 bg-gray-100 border rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <h4 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Bagikan Artikel Ini</h4>
                    <div class="flex space-x-4">
                        {{-- Ganti URL dengan link dinamis jika diperlukan --}}
                        <a href="#"
                            class="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Facebook</a>
                        <a href="#"
                            class="px-5 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800">X /
                            Twitter</a>
                        <a href="#"
                            class="px-5 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600">WhatsApp</a>
                    </div>
                </div>

            </div>

            {{-- Kolom Kanan: Sidebar --}}
            <aside class="lg:col-span-1">
                <div class="space-y-8 lg:sticky lg:top-28">

                    {{-- Widget Berita Terkait --}}
                    <div class="p-6 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700">
                        <h3 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Berita Terkait</h3>
                        <div class="space-y-6">
                            @forelse ($related as $rel)
                            <div class="flex items-start group">
                                <a href="{{ route('berita.show', $rel->slug) }}" class="flex-shrink-0">
                                    <img src="{{ asset('storage/'.$rel->thumbnail) }}" alt="{{ $rel->title }}"
                                        class="object-cover w-24 h-20 rounded-lg">
                                </a>
                                <div class="ml-4">
                                    <a href="{{ route('berita.show', $rel->slug) }}">
                                        <p
                                            class="font-semibold leading-tight text-gray-800 group-hover:text-green-600 dark:text-gray-200 dark:group-hover:text-green-400">
                                            {{ $rel->title }}</p>
                                        <p class="mt-1 text-xs text-gray-500">{{ $rel->published_at ?
                                            $rel->published_at->format('d M Y') : '' }}</p>
                                    </a>
                                </div>
                            </div>
                            @empty
                            <p class="text-sm text-gray-500">Tidak ada berita terkait.</p>
                            @endforelse
                        </div>
                    </div>

                    {{-- Widget Berita Terbaru --}}
                    <div class="p-6 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700">
                        <h3 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Berita Terbaru</h3>
                        <div class="space-y-6">
                            @forelse ($recentPosts as $recent)
                            <div class="flex items-start group">
                                <a href="{{ route('berita.show', $recent->slug) }}" class="flex-shrink-0">
                                    <img src="{{ asset('storage/'.$recent->thumbnail) }}" alt="{{ $recent->title }}"
                                        class="object-cover w-24 h-20 rounded-lg">
                                </a>
                                <div class="ml-4">
                                    <a href="{{ route('berita.show', $recent->slug) }}">
                                        <p
                                            class="font-semibold leading-tight text-gray-800 group-hover:text-green-600 dark:text-gray-200 dark:group-hover:text-green-400">
                                            {{ $recent->title }}</p>
                                        <p class="mt-1 text-xs text-gray-500">{{ $recent->published_at ?
                                            $recent->published_at->format('d M Y') : '' }}</p>
                                    </a>
                                </div>
                            </div>
                            @empty
                            <p class="text-sm text-gray-500">Tidak ada berita terbaru.</p>
                            @endforelse
                        </div>
                    </div>

                    {{-- Widget Kategori --}}
                    <div class="p-6 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700">
                        <h3 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Kategori</h3>
                        <ul class="space-y-2">
                            @forelse ($categories as $category)
                            <li>
                                <a href="#"
                                    class="flex justify-between text-gray-600 hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400">
                                    <span>{{ $category->name }}</span>
                                    <span
                                        class="px-2 text-xs text-gray-500 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-400">{{
                                        $category->articles_count }}</span>
                                </a>
                            </li>
                            @empty
                            <p class="text-sm text-gray-500">Tidak ada kategori.</p>
                            @endforelse
                        </ul>
                    </div>

                    {{-- Widget Tag Populer --}}
                    <div class="p-6 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700">
                        <h3 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Tag Populer</h3>
                        <div class="flex flex-wrap gap-2">
                            @forelse ($popularTags as $tag)
                            <a href="#"
                                class="inline-block px-3 py-1.5 text-sm font-medium text-green-800 bg-green-100 rounded-full hover:bg-green-200 dark:bg-green-900 dark:text-green-200">
                                #{{ $tag->name }}
                            </a>
                            @empty
                            <p class="text-sm text-gray-500">Tidak ada tag populer.</p>
                            @endforelse
                        </div>
                    </div>

                </div>
            </aside>
        </div>
    </div>
</main>
@endsection