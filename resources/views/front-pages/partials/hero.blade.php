{{--
Slider Otomatis & Interaktif menggunakan Alpine.js

- activeSlide: Menunjukkan slide yang sedang aktif.
- slideCount: Jumlah total slide.
- autoplayInterval: Durasi perpindahan slide otomatis (dalam milidetik).
- interval: Untuk menyimpan ID dari setInterval agar bisa di-reset.

Fungsi:
- next(): Pindah ke slide berikutnya.
- prev(): Pindah ke slide sebelumnya.
- goToSlide(slide): Lompat ke slide spesifik.
- resetAutoplay(): Mereset timer setiap kali pengguna berinteraksi (klik tombol/dots).
- init(): Memulai autoplay saat komponen dimuat.
--}}
<section x-data="{
        activeSlide: 1,
        slideCount: {{ $sliders->count() }},
        autoplayInterval: 5000,
        interval: null,

        next() {
            this.activeSlide = (this.activeSlide % this.slideCount) + 1;
            this.resetAutoplay();
        },
        prev() {
            this.activeSlide = this.activeSlide === 1 ? this.slideCount : this.activeSlide - 1;
            this.resetAutoplay();
        },
        goToSlide(slide) {
            this.activeSlide = slide;
            this.resetAutoplay();
        },
        resetAutoplay() {
            clearInterval(this.interval);
            this.startAutoplay();
        },
        startAutoplay() {
            this.interval = setInterval(() => {
                this.activeSlide = (this.activeSlide % this.slideCount) + 1;
            }, this.autoplayInterval);
        },
        init() {
            if (this.slideCount > 1) {
                this.startAutoplay();
            }
        }
    }" x-init="init()" class="relative flex items-center justify-center h-screen overflow-hidden bg-gray-900">

    <div class="absolute inset-0 w-full h-full">
        @foreach($sliders as $i => $slider)
        <div x-show="activeSlide === {{ $i + 1 }}" x-transition:enter="transition ease-out duration-1000"
            x-transition:enter-start="opacity-0 scale-105" x-transition:enter-end="opacity-100 scale-100"
            x-transition:leave="transition ease-in duration-500" x-transition:leave-start="opacity-100 scale-100"
            x-transition:leave-end="opacity-0 scale-95" class="absolute inset-0 w-full h-full" style="z-index: 1;">

            <div class="absolute inset-0 bg-center bg-cover"
                style="background-image: url('{{ asset('storage/'.$slider->image) }}');">
            </div>

            <div class="absolute inset-0 bg-black/50"></div>

            <div
                class="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 text-center text-white">
                <h1 class="text-5xl font-bold leading-tight tracking-wider md:text-7xl">
                    {{ $slider->title }}
                </h1>
                <p class="mt-4 text-xl font-light md:text-2xl">
                    {{ $slider->subtitle }}
                </p>
                @if($slider->link)
                <a href="{{ $slider->link }}"
                    class="inline-block px-8 py-3 mt-8 text-lg font-semibold text-white transition duration-300 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105">
                    Selengkapnya
                </a>
                @endif
            </div>
        </div>
        @endforeach
    </div>

    <div x-show="slideCount > 1" class="absolute inset-0 z-20 flex items-center justify-between w-full px-4">
        <button @click="prev()"
            class="p-2 text-white transition rounded-full bg-black/20 hover:bg-black/50 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <button @click="next()"
            class="p-2 text-white transition rounded-full bg-black/20 hover:bg-black/50 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </div>

    <div x-show="slideCount > 1" class="absolute z-20 flex justify-center space-x-3 bottom-5">
        <template x-for="i in slideCount" :key="i">
            <button @click="goToSlide(i)" class="w-3 h-3 transition rounded-full"
                :class="{'bg-white': activeSlide === i, 'bg-white/50 hover:bg-white': activeSlide !== i}">
            </button>
        </template>
    </div>

</section>