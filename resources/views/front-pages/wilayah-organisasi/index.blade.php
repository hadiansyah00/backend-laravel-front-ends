@extends('layouts.app-front')

@section('content')
{{-- Panggil Navbar --}}
@include('front-pages.partials.navbar')

{{-- Header Halaman --}}
<header class="pt-32 pb-16 text-center bg-purple-800">
    <div class="container px-6 mx-auto">
        <h1 class="text-4xl font-bold tracking-tight text-purple-50 md:text-5xl">
            Sebaran Anggota
            dan Wilayah Pengorganisasian
            PEREMPUAN AMAN
        </h1>
        <p class="max-w-3xl mx-auto mt-4 text-lg text-purple-50">
            Jelajahi sebaran anggota dan komunitas PEREMPUAN AMAN di seluruh Nusantara. Klik pada setiap titik untuk
            melihat detail wilayah, jumlah anggota, dan informasi penting lainnya. Bersama kita kuat, bersama kita
            membangun masa depan yang lebih baik untuk perempuan adat di Indonesia.
        </p>
    </div>
</header>

{{-- Section Peta Interaktif --}}
{{-- Section Peta Interaktif --}}
<section class="py-20 bg-white" x-data="{
    modalOpen: false,
    modalData: {},
    pins: [
        {
            id: 'sumatera',
            title: 'Wilayah Adat Sumatera',
            y: 45, x: 15,
            mapImage: '{{ asset('assets/img/wilayah/sumatera.png') }}',
            stats: { desa: 72, komunitas: 49, wilayah: 21, totalAnggota: 789, usia: { pemuda: { count: 250, range: '17-35' }, dewasa: { count: 400, range: '36-55' }, lansia: { count: 139, range: '> 55' }, tidakDiketahui: { count: 0, range: 'N/A' }}},
            detailUrl: '#'
        },
        {
            id: 'kalimantan',
            title: 'Pengorganisasian Kalimantan',
            y: 42, x: 40,
            mapImage: '{{ asset('assets/img/wilayah/kalimantan.png') }}',
            stats: { desa: 55, komunitas: 30, wilayah: 15, totalAnggota: 550, usia: { pemuda: { count: 150, range: '17-35' }, dewasa: { count: 300, range: '36-55' }, lansia: { count: 100, range: '> 55' }, tidakDiketahui: { count: 0, range: 'N/A' }}},
            detailUrl: '#'
        },
        {
            id: 'jawa',
            title: 'Komunitas Adat Jawa',
            y: 75, x: 35,
            mapImage: '{{ asset('assets/img/wilayah/jawa.png') }}',
            stats: { desa: 40, komunitas: 25, wilayah: 10, totalAnggota: 450, usia: { pemuda: { count: 180, range: '17-35' }, dewasa: { count: 200, range: '36-55' }, lansia: { count: 70, range: '> 55' }, tidakDiketahui: { count: 0, range: 'N/A' }}},
            detailUrl: '#'
        },
        {
            id: 'sulawesi',
            title: 'Sulawesi Solid',
            y: 45, x: 55,
            mapImage: '{{ asset('assets/img/wilayah/sulawesi.png') }}',
            stats: { desa: 60, komunitas: 40, wilayah: 18, totalAnggota: 620, usia: { pemuda: { count: 220, range: '17-35' }, dewasa: { count: 300, range: '36-55' }, lansia: { count: 100, range: '> 55' }, tidakDiketahui: { count: 0, range: 'N/A' }}},
            detailUrl: '#'
        },
        {
            id: 'maluku',
            title: 'Maluku Bersatu',
            y: 42, x: 70,
            mapImage: '{{ asset('assets/img/wilayah/maluku.png') }}',
            stats: { desa: 30, komunitas: 20, wilayah: 8, totalAnggota: 250, usia: { pemuda: { count: 80, range: '17-35' }, dewasa: { count: 120, range: '36-55' }, lansia: { count: 50, range: '> 55' }, tidakDiketahui: { count: 0, range: 'N/A' }}},
            detailUrl: '#'
        },
        {
            id: 'bali_nusra',
            title: 'Region Bali - Nusra',
            y: 80, x: 55,
            mapImage: '{{ asset('assets/img/wilayah/ntt.png') }}',
            stats: { desa: 25, komunitas: 15, wilayah: 7, totalAnggota: 200, usia: { pemuda: { count: 70, range: '17-35' }, dewasa: { count: 100, range: '36-55' }, lansia: { count: 30, range: '> 55' }, tidakDiketahui: { count: 0, range: 'N/A' }}},
            detailUrl: '#'
        },
        {
            id: 'papua',
            title: 'Papua Tanah Damai',
            y: 50, x: 90,
            mapImage: '{{ asset('assets/img/wilayah/ntt.png') }}',
            stats: { desa: 80, komunitas: 50, wilayah: 25, totalAnggota: 950, usia: { pemuda: { count: 350, range: '17-35' }, dewasa: { count: 500, range: '36-55' }, lansia: { count: 100, range: '> 55' }, tidakDiketahui: { count: 0, range: 'N/A' }}},
            detailUrl: '#'
        }
    ]
}">
    <div class="container px-6 mx-auto">
        <div class="relative max-w-6xl mx-auto">
            <img src="{{ asset('assets/img/wilayah/peta-indonesia-2.png') }}" alt="Peta Wilayah Pengorganisasian"
                class="w-full h-auto">

            <template x-for="pin in pins" :key="pin.id">
                <button @click="modalOpen = true; modalData = pin"
                    class="absolute z-10 transition-transform duration-300 ease-in-out hover:scale-125 focus:outline-none"
                    :style="`top: ${pin.y}%; left: ${pin.x}%;`">

                    <div class="relative w-6 h-6">

                        <img src="{{ asset('assets/img/wilayah/pin.png') }}" alt="Pin Lokasi"
                            class="relative w-full h-full drop-shadow-lg">
                    </div>
                </button>
            </template>
        </div>
    </div>

    <div x-show="modalOpen" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100" x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0"
        class="fixed inset-0 z-50 flex items-center justify-center p-4" x-cloak>

        <div @click="modalOpen = false" class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        <div @click.away="modalOpen = false" class="relative w-full max-w-md bg-gray-100 shadow-xl">

            <button @click="modalOpen = false"
                class="absolute z-20 p-1.5 text-gray-500 bg-white rounded-full shadow-md top-3 right-3 hover:text-gray-800 hover:scale-110 transition-transform">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div class="p-6">
                <div class="grid grid-cols-3 gap-4 p-4 text-center text-gray-700 bg-white shadow-sm rounded-xl">
                    <div>
                        <div
                            class="flex items-center justify-center w-12 h-12 mx-auto mb-2 text-purple-600 bg-purple-100 rounded-full">
                            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M12 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                        </div>
                        <div class="text-2xl font-bold" x-text="modalData.stats?.desa || 0"></div>
                        <div class="text-sm font-semibold">Desa</div>
                    </div>
                    <div>
                        <div
                            class="flex items-center justify-center w-12 h-12 mx-auto mb-2 text-purple-600 bg-purple-100 rounded-full">
                            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div class="text-2xl font-bold" x-text="modalData.stats?.komunitas || 0"></div>
                        <div class="text-sm font-semibold">Komunitas</div>
                    </div>
                    <div>
                        <div
                            class="flex items-center justify-center w-12 h-12 mx-auto mb-2 text-purple-600 bg-purple-100 rounded-full">
                            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div class="text-2xl font-bold" x-text="modalData.stats?.wilayah || 0"></div>
                        <div class="text-sm font-semibold">Wilayah</div>
                    </div>
                </div>

                <div class="mt-6 text-center">
                    <h3 class="text-lg font-bold text-gray-800">Jumlah Anggota Berdasarkan Usia</h3>
                    <div class="grid grid-cols-4 gap-2 mt-4 text-gray-600">
                        <template x-for="(group, name) in modalData.stats?.usia" :key="name">
                            <div>
                                <div class="flex items-center justify-center w-12 h-12 mx-auto">
                                    <svg class="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd">
                                        </path>
                                    </svg>
                                </div>
                                <div class="mt-1 text-sm font-bold capitalize"
                                    x-text="name.replace('tidakDiketahui', 'Lainnya')"></div>
                                <div class="text-xs" x-text="group.range"></div>
                                <div class="font-bold" x-text="group.count"></div>
                            </div>
                        </template>
                    </div>
                </div>

                <div class="p-4 mt-6 text-center text-gray-800 bg-gray-200/50 rounded-xl">
                    <h3 class="font-bold" x-text="'Total Anggota Di ' + modalData.title"></h3>
                    <img :src="modalData.mapImage" class="h-16 mx-auto my-2 opacity-70" alt="Peta Region">
                    <div class="text-4xl font-extrabold" x-text="(modalData.stats?.totalAnggota || 0) + ' Anggota'">
                    </div>
                </div>
            </div>

            {{-- Tombol Selengkapnya --}}
            <a :href="modalData.detailUrl"
                class="block w-full py-3 font-bold text-center text-white transition-colors bg-purple-600 hover:bg-purple-700">
                Selengkapnya
            </a>
        </div>
    </div>
</section>
@include('front-pages.partials.footer')
@endsection