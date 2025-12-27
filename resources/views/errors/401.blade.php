@extends('layouts.app-front')
@section('title', 'Akses Ditolak')

@section('content')
<div class="flex items-center justify-center min-h-screen px-6 bg-gray-50">
    <div class="max-w-md text-center">
        <h1 class="mb-4 font-bold text-red-500 text-7xl">401</h1>

        <h2 class="mb-3 text-2xl font-semibold text-gray-800">
            Akses Tidak Diizinkan
        </h2>

        <p class="mb-6 text-gray-600">
            Anda tidak memiliki izin untuk mengakses halaman ini.
            Silakan login menggunakan akun yang memiliki hak akses.
        </p>

        <div class="flex justify-center gap-4">
            <a href="{{ route('login') }}"
                class="px-6 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600">
                Login
            </a>

            <a href="{{ url('/') }}"
                class="px-6 py-2 text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-100">
                Beranda
            </a>
        </div>
    </div>
</div>
@endsection