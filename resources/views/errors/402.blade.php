@extends('layouts.app-front')
@section('title', 'Pembayaran Diperlukan')

@section('content')
<div class="flex items-center justify-center min-h-screen px-6 bg-gray-50">
    <div class="max-w-md text-center">
        <h1 class="mb-4 font-bold text-yellow-500 text-7xl">402</h1>

        <h2 class="mb-3 text-2xl font-semibold text-gray-800">
            Pembayaran Diperlukan
        </h2>

        <p class="mb-6 text-gray-600">
            Untuk melanjutkan akses ke layanan ini, silakan selesaikan
            proses pembayaran terlebih dahulu.
        </p>

        <div class="flex justify-center gap-4">
            <a href="{{ url('/payment') }}"
                class="px-6 py-2 text-white transition bg-yellow-500 rounded-lg hover:bg-yellow-600">
                Lakukan Pembayaran
            </a>

            <a href="{{ url('/') }}"
                class="px-6 py-2 text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-100">
                Beranda
            </a>
        </div>
    </div>
</div>
@endsection