{{-- Section Mitra dengan Carousel Logo --}}
<section class="py-20 bg-white">
    <div class="container px-6 mx-auto">
        <h2 class="mb-12 text-3xl font-bold text-center text-gray-800">Mitra Kami</h2>

        {{-- Pastikan ada data di variabel $mitra sebelum menampilkan carousel --}}
        @if(isset($mitra) && count($mitra) > 0)
        <div x-data="{}" @mouseenter="$refs.scroller.style.animationPlayState = 'paused'"
            @mouseleave="$refs.scroller.style.animationPlayState = 'running'" class="relative w-full overflow-hidden">

            {{-- Efek gradien di sisi kiri dan kanan --}}
            <div class="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent"></div>
            <div class="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent"></div>

            {{-- Container yang dianimasikan --}}
            <div x-ref="scroller" class="flex w-max animate-infinite-scroll">

                {{-- Loop Pertama: Menampilkan semua logo mitra --}}
                @foreach($mitra as $item)
                <div class="flex items-center justify-center flex-shrink-0 px-8">
                    <img src="{{ asset('assets/img/mitra/' . $item['logo']) }}" alt="{{ $item['nama'] }}"
                        class="object-contain h-16 transition-all duration-300 max-w-40 filter grayscale hover:grayscale-0"
                        loading="lazy">
                </div>
                @endforeach

                {{-- Loop Kedua: Duplikasi logo untuk efek infinite scroll --}}
                @foreach($mitra as $item)
                <div class="flex items-center justify-center flex-shrink-0 px-8">
                    <img src="{{ asset('assets/img/mitra/' . $item['logo']) }}" alt="{{ $item['nama'] }}"
                        class="object-contain h-16 transition-all duration-300 max-w-40 hover:grayscale-0"
                        loading="lazy">
                </div>
                @endforeach

            </div>
        </div>
        @else
        <p class="text-center text-gray-500">Daftar mitra belum tersedia.</p>
        @endif
    </div>
</section>