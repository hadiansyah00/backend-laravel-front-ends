@extends('layouts.app-front')

@section('title', 'Sesi Berakhir')

@section('content')
<div class="flex items-center justify-center min-h-screen px-6 bg-gray-50">
    <div class="max-w-md text-center">
        <h1 class="mb-4 font-bold text-orange-500 text-7xl">419</h1>

        <h2 class="mb-3 text-2xl font-semibold text-gray-800">
            Sesi Anda Telah Berakhir
        </h2>

        <p class="mb-6 text-gray-600">
            Demi keamanan, sesi Anda telah kedaluwarsa.
            Silakan login kembali untuk melanjutkan.
        </p>

        <div class="flex justify-center gap-4">
            <a href="{{ route('login') }}"
                class="px-6 py-2 text-white transition bg-orange-500 rounded-lg hover:bg-orange-600">
                Login Ulang
            </a>

            <a href="{{ url('/') }}"
                class="px-6 py-2 text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-100">
                Beranda
            </a>
        </div>
    </div>
</div>
@endsection