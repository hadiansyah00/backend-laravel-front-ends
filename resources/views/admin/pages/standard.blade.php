@extends('layouts.app-modullar')

<style>
    /* Membuat semua paragraf di dalam konten menjadi rata kiri-kanan */
    .prose p {
        text-align: justify;
    }

    /* Memberi gaya pada semua gambar di dalam konten */
    .prose img {
        border-radius: 1rem;
        /* rounded-xl */
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        /* shadow-lg */
        margin-top: 2em;
        margin-bottom: 2em;
    }
</style>    

@section('content')

@include('front-pages.partials.navbar', ['menus' => $menus])

<main class="pt-20">

    {{-- ================= HEADER HALAMAN BARU ================= --}}
    <header class="relative overflow-hidden bg-gradient-to-r from-orange-600 to-orange-800">
        <div class="container px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:py-20">
            <div class="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">

                {{-- Kolom Teks Kiri --}}
                <div class="text-white">
                    <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        {{ $page->title }}
                    </h1>

                    <div class="flex items-center mt-6 space-x-8 text-sm text-green-100">
                        <div>
                            <p class="font-semibold">Diterbitkan Pada</p>
                            <p>{{ $page->created_at->format('d F Y') ?? '' }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">Diterbitkan Oleh</p>
                            <p>{{ $page->author->name ?? 'Admin' }}</p>
                        </div>
                    </div>
                </div>

                {{-- Kolom Gambar Kanan --}}
                <div class="w-full">
                    <img src="{{ asset($page->thumbnail ?? 'https://placehold.co/600x400/22c55e/FFFFFF/png') }}"
                        alt="{{ $page->title }}" class="object-cover w-full h-full shadow-2xl rounded-2xl">
                </div>

            </div>
        </div>
    </header>
    {{-- ================= END HEADER ================= --}}


    {{-- ================= KONTEN DINAMIS DARI DATABASE ================= --}}
    <section class="py-16 bg-white sm:py-20 md:py-24 dark:bg-slate-900">
        <div class="container px-4 mx-auto sm:px-6 lg:px-8">
            <article class="max-w-4xl mx-auto prose prose-lg lg:prose-xl dark:prose-invert">
                {!! $page->content !!}
            </article>
        </div>
    </section>
    {{-- ================= END KONTEN ================= --}}

</main>

@endsection
