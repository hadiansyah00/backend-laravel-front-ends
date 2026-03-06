{{-- Menggunakan layout utama --}}
@extends('layouts.app-modullar')

{{-- Memulai section untuk konten utama --}}
@section('content')

{{-- ================= NAVBAR DINAMIS ================= --}}
@include('front-pages.partials.navbar', ['menus' => $menus])
{{-- ================= END NAVBAR ================= --}}

{{-- KONTEN DINAMIS DARI DATABASE --}}
<main class="pt-20">

    @foreach ($sections as $section)
        @php
            // Mapping dari section type lama ke komponen generik baru
            $typeMap = [
                // Hero variants → hero
                'hero-sejarah'       => 'hero',
                'hero-visi'          => 'hero',
                'hero-pimpinan'      => 'hero',
                'hero-dosen'         => 'hero',
                'hero-organisasi'    => 'hero',
                'hero-prodi'         => 'hero',
                'hero-kebidanan'     => 'hero',
                'hero-farmasi'       => 'hero',
                'hero-gizi'          => 'hero',

                // Content with image variants
                'title-sejarah'      => 'content-with-image',
                'profil-stikes'      => 'content-with-image',

                // Visi-misi variants
                'visi-misi-farmasi'  => 'visi-misi',
                'visi-misi-gizi'     => 'visi-misi',

                // Sambutan / Image-text
                'sambutan-ketua'     => 'image-text',

                // Dosen / Team grid
                'dosen-stikes'       => 'team-grid',

                // Program studi variants
                'program-studi'      => 'card-grid',

                // Prodi profile variants
                'profil_prodi'              => 'prodi-profile',
                'profil_prodi_farmasi'      => 'prodi-profile',
                'profil_prodi_gizi'         => 'prodi-profile',

                // Peluang kerja variants → card-grid
                'peluang-kerja'          => 'card-grid',
                'peluang-kerja-farmasi'  => 'card-grid',
                'peluang-kerja-gizi'     => 'card-grid',

                // Timeline
                'timeline-sejarah'   => 'timeline',

                // Struktur Organisasi
                'struktur-organisasi' => 'org-chart',
            ];

            // Tentukan component yang akan dirender
            $resolvedType = $typeMap[$section->type] ?? $section->type;
            $componentView = 'components.sections.' . $resolvedType;
        @endphp

        {{-- Dynamic Section Renderer --}}
        @if(view()->exists($componentView))
            @include($componentView, [
                'section' => $section,
                'data'    => $section->decoded_content ?? [],
            ])
        @else
            {{-- Fallback: tampilkan pesan jika section type tidak ditemukan --}}
            @if(config('app.debug'))
            <div class="py-4 text-center text-gray-400 bg-gray-50 border border-dashed border-gray-300 rounded-lg mx-6 my-4">
                <p class="text-sm">⚠️ Section type <code class="px-2 py-1 bg-gray-200 rounded">{{ $section->type }}</code> tidak ditemukan.</p>
            </div>
            @endif
        @endif

    @endforeach

</main>

@endsection