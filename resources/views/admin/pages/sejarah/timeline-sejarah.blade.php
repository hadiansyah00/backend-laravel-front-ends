@php
/**
* FIX UTAMA:
* - support time_line
* - support items
* - support array langsung
*/
$items = $data['items']
?? $data['time_line']
?? [];

@endphp
<section id="timeline-sejarah" class="{{ $data['background'] ?? 'bg-slate-50' }} py-24 overflow-hidden font-sans">

    <div class="container px-4 mx-auto max-w-8xl md:px-12">

        {{-- Header Section (Optional: Jika ada judul section di luar snippet ini, bisa diabaikan) --}}
        <div class="mb-16 text-center">
            <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                    <img src="{{ asset('assets/img/icon/element.svg') }}" alt="Icon" class="w-8 h-8">
                </div>
                <span
                    class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                    {{ $data['title'] ?? '' }}
                </span>
            </h2>
        </div>

        @if (count($items))
        <div class="relative">

            {{-- Garis Timeline Utama --}}
            {{-- Menggunakan absolute center line untuk mobile, atau left line seperti sebelumnya namun lebih rapi --}}
            <div class="absolute top-0 bottom-0 w-px left-8 bg-slate-200 md:left-8"></div>

            <div class="space-y-12">
                @foreach ($items as $index => $item)
                <div class="relative pl-24 group md:pl-28">

                    {{-- Timeline Dot / Marker --}}
                    {{-- Dot dengan border tebal dan isi putih memberikan kesan "connected node" --}}
                    <div
                        class="absolute left-8 top-0 flex items-center justify-center -translate-x-1/2 mt-1.5 w-6 h-6 rounded-full bg-white border-4 border-orange-100 group-hover:border-orange-500 group-hover:scale-110 transition-all duration-300 z-10">
                        <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>

                    {{-- Content Card --}}
                    <div
                        class="relative p-6 transition-all duration-300 bg-white border shadow-sm border-slate-100 rounded-2xl group-hover:shadow-xl group-hover:border-orange-100 group-hover:-translate-y-1">

                        {{-- Year Badge --}}
                        <div
                            class="absolute -left-[4.5rem] top-0 md:-left-[5.5rem] flex items-center justify-end w-16 md:w-20 pt-1">
                            <span
                                class="px-3 py-1 text-xs font-bold tracking-wide text-orange-600 transition-colors duration-300 border border-orange-100 rounded-full bg-orange-50 group-hover:bg-orange-500 group-hover:text-white">
                                {{ $item['year'] ?? 'N/A' }}
                            </span>
                        </div>

                        {{-- Mobile Year (Fallback jika layout responsif berantakan di layar sangat kecil) --}}
                        <div class="mb-3 md:hidden">
                            <span class="text-sm font-semibold text-orange-600">
                                {{ $item['year'] ?? '' }}
                            </span>
                        </div>

                        {{-- Title --}}
                        <h3 class="mb-3 text-xl font-bold transition-colors text-slate-800 group-hover:text-orange-600">
                            {{ $item['title'] ?? '' }}
                        </h3>

                        {{-- Description --}}
                        <div class="leading-relaxed prose-sm prose prose-slate max-w-none text-slate-600">
                            {{ $item['description'] ?? '' }}
                        </div>

                        {{-- Image Optional --}}
                        @if (!empty($item['image']))
                        <div class="mt-6 overflow-hidden border rounded-xl border-slate-100">
                            {{-- Menggunakan aspect-video agar rasio gambar konsisten dan profesional --}}
                            <div class="relative w-full overflow-hidden aspect-video bg-slate-100">
                                <img src="{{ asset($item['image']) }}" alt="{{ $item['title'] }}" loading="lazy"
                                    class="object-cover w-full h-full transition-transform duration-700 transform group-hover:scale-105">
                            </div>
                        </div>
                        @endif

                    </div>
                </div>
                @endforeach
            </div>

        </div>
        @else
        {{-- Empty State yang lebih estetik --}}
        <div
            class="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
            <div class="p-4 mb-4 bg-white rounded-full shadow-sm">
                <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <p class="font-medium text-slate-500">
                Timeline sejarah belum tersedia saat ini.
            </p>
        </div>
        @endif

    </div>
</section>
