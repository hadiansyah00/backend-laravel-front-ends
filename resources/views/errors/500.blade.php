@extends('layouts.app-front')

@section('title', 'Kesalahan Server')

@section('content')
<div class="flex items-center justify-center min-h-screen px-6 bg-gray-50">
    <div class="max-w-md text-center">
        <h1 class="mb-4 font-bold text-red-500 text-7xl">500</h1>

        <h2 class="mb-3 text-2xl font-semibold text-gray-800">
            Terjadi Kesalahan Server
        </h2>

        <p class="mb-6 text-gray-600">
            Sistem sedang mengalami gangguan internal.
            Tim kami akan segera menanganinya.
        </p>

        <div class="flex justify-center gap-4">
            <a href="{{ url('/') }}" class="px-6 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600">
                Beranda
            </a>

            <a href="javascript:history.back()"
                class="px-6 py-2 text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-100">
                Kembali
            </a>
        </div>
    </div>
</div>
@endsection