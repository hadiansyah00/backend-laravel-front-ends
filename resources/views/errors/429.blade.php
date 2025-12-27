@extends('layouts.app-front')

@section('title', 'Terlalu Banyak Permintaan')

@section('content')
<div class="flex items-center justify-center min-h-screen px-6 bg-gray-50">
    <div class="max-w-md text-center">
        <h1 class="mb-4 font-bold text-yellow-500 text-7xl">429</h1>

        <h2 class="mb-3 text-2xl font-semibold text-gray-800">
            Terlalu Banyak Permintaan
        </h2>

        <p class="mb-6 text-gray-600">
            Anda melakukan permintaan terlalu sering dalam waktu singkat.
            Silakan tunggu beberapa saat lalu coba kembali.
        </p>

        <div class="flex justify-center gap-4">
            <a href="javascript:location.reload()"
                class="px-6 py-2 text-white transition bg-yellow-500 rounded-lg hover:bg-yellow-600">
                Muat Ulang
            </a>

            <a href="{{ url('/') }}"
                class="px-6 py-2 text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-100">
                Beranda
            </a>
        </div>
    </div>
</div>
@endsection