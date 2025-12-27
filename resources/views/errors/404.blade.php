@extends('layouts.app-front')

@section('title', 'Halaman Tidak Ditemukan')

@section('content')
<div class="flex items-center justify-center min-h-screen px-6 bg-gray-50">
    <div class="max-w-md text-center">
        <h1 class="mb-4 font-bold text-orange-500 text-7xl">404</h1>

        <h2 class="mb-3 text-2xl font-semibold text-gray-800">
            Halaman Tidak Ditemukan
        </h2>

        <p class="mb-6 text-gray-600">
            Maaf, halaman yang Anda cari tidak tersedia, mungkin telah dipindahkan
            atau alamat URL yang Anda masukkan kurang tepat.
        </p>

        <div class="flex items-center justify-center gap-4">
            <a href="{{ url('/') }}"
                class="px-6 py-2 text-white transition bg-orange-500 rounded-lg hover:bg-orange-600">
                Kembali ke Beranda
            </a>

            <a href="javascript:history.back()"
                class="px-6 py-2 text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-100">
                Halaman Sebelumnya
            </a>
        </div>
    </div>
</div>
@endsection