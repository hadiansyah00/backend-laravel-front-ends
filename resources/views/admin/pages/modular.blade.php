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

    @include('admin.pages.sejarah.hero-sejarah', ['section' => $section])
    @if ($section->type === 'title-sejarah')
    @php
    $data = $section->decoded_content;
    if (empty($data['section']) || $data['section'] !== 'title-sejarah') continue;

    $layout = $data['layout'] ?? 'left';
    @endphp
    @include('admin.pages.sejarah.title-sejarah',['section' => $section])

    @endif

    @include('admin.pages.profile.hero-visi-misi', ['section' => $section])
    @if($section->type === 'profil-stikes')
    @php
    $data = $section->decoded_content;
    if (empty($data['section']) || $data['section'] !== 'profil-stikes') continue;
    @endphp
    @include('admin.pages.profile.profil-stikes',['section' => $section])
    @endif
    {{-- ================= SAMBUTAN PIMPINAN SBH ================= --}}
    @include('admin.pages.pimpinan.hero-pimpinan', ['section' => $section])
    @if ($section->type === 'sambutan-ketua')
    @php
    $data = $section->decoded_content;
    if (empty($data['section']) || $data['section'] !== 'sambutan-ketua') continue;
    @endphp
    @include('admin.pages.pimpinan.title-pimpinan',['data' => $data])
    @endif
    {{-- ================= END SAMBUTAN PIMPINAN SBH ================= --}}
    {{-- ================= HERO DOSEN ================= --}}
    @include('admin.pages.dosen.hero-dosen', ['section' => $section])
    @if ($section->type === 'sdm-stikes')
    @php
    $data = $section->decoded_content;
    if (empty($data['section']) || $data['section'] !== 'sdm-stikes') continue;
    @endphp
    @include('admin.pages.dosen.sdm-stikes',['data' => $data])
    @endif
    {{-- ================= END HERO DOSEN ================= --}}

    {{-- Program Studi --}}

    @include('admin.pages.program-studi.hero-prodi', ['section' => $section])
    @if ($section->type === 'program-studi')
    @php
    $data = $section->decoded_content;
    if (empty($data['section']) || $data['section'] !== 'program-studi') continue;
    @endphp
    @include('admin.pages.program-studi.program-studi',['data' => $data])
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