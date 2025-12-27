@extends('layouts.app-front')

@section('content')

{{-- Memanggil komponen Navbar dari folder partials --}}

{{-- Memanggil komponen Hero Section dari folder partials --}}
@include('front-pages.partials.sliders')
{{-- @include('front-pages.partials.statistic', ['statistic' => $statistic]) --}}
@include('front-pages.partials.title', ['programStudis' => $programStudis])
@include('front-pages.partials.program', ['programStudis' => $programStudis])
{{-- @include('front-pages.partials.visi-misi') --}}
@include('front-pages.partials.berita', ['berita' => $berita])
@include('front-pages.partials.video', ['videoContent' => $videoContent])
{{-- @include('front-pages.partials.buku', ['buku' => $buku]) --}}
@include('front-pages.partials.testimoni', ['testimonials' => $testimonials])
{{-- @include('front-pages.partials.mitra') --}}

{{-- Bagian Hero Section --}}
{{-- Bagian Berita --}}

{{-- Bagian konten utama halaman depan --}}
{{-- Contoh bagian konten selanjutnya di bawah Hero Section --}}

{{-- Bagian konten utama halaman depan --}}
{{-- Contoh bagian konten selanjutnya di bawah Hero Section --}}

{{-- Bagian konten utama halaman depan --}}
{{-- Contoh bagian konten selanjutnya di bawah Hero Section --}}

{{-- Bagian footer --}}
{{-- Anda bisa menambahkan bagian lain seperti footer di sini --}}

@endsection