{{--
Slider otomatis menggunakan Alpine.js
- activeSlide: Menunjukkan slide yang sedang aktif.
- slideCount: Jumlah total slide.
- x-init: Menjalankan timer (setInterval) saat komponen dimuat.
Setiap 5 detik (5000ms), 'activeSlide' akan berganti.
--}}
<section x-data="{ activeSlide: 1, slideCount: 2 }"
    x-init="() => { setInterval(() => { activeSlide = (activeSlide % slideCount) + 1 }, 5000) }"
    class="relative flex items-center justify-center h-screen bg-gray-200">

    <div x-show="activeSlide === 1" x-transition:enter="transition ease-in-out duration-1000"
        x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in-out duration-1000" x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0" class="absolute inset-0 bg-center bg-cover"
        style="background-image: url('{{ asset('assets/img/background/bg-1.jpg') }}');">
    </div>

    <div x-show="activeSlide === 2" x-transition:enter="transition ease-in-out duration-1000"
        x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in-out duration-1000" x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0" class="absolute inset-0 bg-center bg-cover"
        style="background-image: url('{{ asset('assets/img/background/bg-2.jpg') }}');">
    </div>

    <div class="absolute inset-0 bg-black/50"></div>

    <div class="relative z-10 px-4 text-center text-white">
        <h1 class="text-5xl font-bold leading-tight tracking-wider md:text-7xl">
            PEREMPUAN AMAN
        </h1>
        <p class="mt-4 text-xl font-light md:text-2xl">
            Persekutuan Perempuan Adat Nusantara </p>
    </div>
</section>