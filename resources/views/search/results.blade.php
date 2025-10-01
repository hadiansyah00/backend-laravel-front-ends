@extends('layouts.app-front')

@section('content')
<div class="container px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-24">
    @if($results->isNotEmpty())
    {{-- Header yang lebih informatif --}}
    <h1 class="mb-8 text-2xl font-bold text-gray-800">
        Menampilkan <span class="text-orange-600">{{ $results->total() }}</span> hasil untuk
        <span class="text-orange-600">"{{ $q }}"</span>
    </h1>

    {{-- Tata Letak Grid Responsif --}}
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        @foreach($results as $item)
        {{-- Kartu Hasil yang Lebih Dinamis --}}
        <a href="{{ $item->url }}"
            class="block p-5 bg-white border border-gray-200 rounded-lg shadow-sm group transition-all duration-300 hover:shadow-xl hover:border-orange-400 hover:-translate-y-1">
            <div class="flex flex-col h-full">
                {{-- Badge Tipe Hasil --}}
                <span @class([ 'px-2 py-0.5 mb-3 text-xs font-semibold rounded-full self-start'
                    , 'bg-blue-100 text-blue-800'=> $item->type == 'Halaman',
                    'bg-green-100 text-green-800' => $item->type == 'Menu',
                    ])>
                    {{ $item->type }}
                </span>

                {{-- Judul --}}
                <h2 class="flex-grow text-lg font-semibold text-gray-800 transition-colors group-hover:text-orange-600">
                    {!! $item->title !!}
                </h2>

                {{-- Snippet --}}
                <p class="mt-2 text-sm leading-relaxed text-gray-600">
                    {{ $item->snippet }}
                </p>
            </div>
        </a>
        @endforeach
    </div>

    {{-- Pagination --}}
    <div class="mt-20">
        {{ $results->links() }}
    </div>

    @else
    {{-- Blok "Tidak Ditemukan" yang Interaktif --}}
    <div
        class="flex flex-col items-center justify-center p-8  text-center bg-white border-2 border-dashed rounded-lg pt-10 mt-4">
        <svg class="w-20 h-20 mb-4 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10l.01.01" />
        </svg>
        <h2 class="text-3xl font-bold text-gray-800">Tidak Ada Hasil</h2>
        <p class="max-w-md mt-2 text-gray-600">
            Maaf, kami tidak menemukan hasil apapun untuk pencarian <strong class="text-gray-900">"{{ $q }}"</strong>.
        </p>
        <div class="w-full max-w-sm mt-8">
            <p class="mb-2 font-semibold text-gray-700">Coba cari lagi?</p>
            <form action="{{-- Arahkan ke route pencarian Anda --}}" method="GET" class="flex items-center">
                <input type="text" name="q" value="{{ $q }}"
                    class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-l-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Kata kunci lain...">
                <button type="submit"
                    class="px-4 py-2 font-semibold text-white bg-orange-600 border border-orange-600 rounded-r-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">Cari</button>
            </form>
        </div>
    </div>
    @endif
</div>
@endsection