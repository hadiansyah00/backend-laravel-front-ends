{{-- Menggunakan layout utama aplikasi kita --}}
<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            {{ __('Akses Ditolak') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div class="p-6 text-center text-gray-900">

                    <div class="mb-4">
                        {{-- Anda bisa menggunakan SVG atau gambar di sini --}}
                        <svg class="w-16 h-16 mx-auto text-red-500" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                    </div>

                    <h1 class="mb-2 text-2xl font-bold text-red-600">403 | AKSES DITOLAK</h1>
                    <p class="mb-6 text-gray-700">
                        Maaf, Anda tidak memiliki izin yang diperlukan untuk mengakses halaman ini.
                    </p>

                    <a href="{{ route('dashboard') }}"
                        class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring ring-blue-300 disabled:opacity-25">
                        Kembali ke Dashboard
                    </a>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>
