@extends('layouts.app-front')

@section('title', 'Layanan Tidak Tersedia')

@section('content')
<div class="flex items-center justify-center min-h-screen px-6 bg-gray-50">
    <div class="max-w-md text-center">
        <h1 class="mb-4 font-bold text-blue-500 text-7xl">503</h1>

        <h2 class="mb-3 text-2xl font-semibold text-gray-800">
            Layanan Sedang Tidak Tersedia
        </h2>

        <p class="mb-6 text-gray-600">
            Kami sedang melakukan pemeliharaan sistem.
            Silakan coba kembali beberapa saat lagi.
        </p>

        <div class="flex justify-center gap-4">
            <a href="{{ url('/') }}" class="px-6 py-2 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600">
                Beranda
            </a>

            <a href="javascript:location.reload()"
                class="px-6 py-2 text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-100">
                Coba Lagi
            </a>
        </div>
    </div>
</div>
@endsection