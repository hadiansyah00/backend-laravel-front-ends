@if ($section->type === 'hero-sejarah')
<section class="relative w-full overflow-hidden">
    <div class="swiper mySwiper">
        <div class="swiper-wrapper">
            @foreach ($section->decoded_content['slides'] ?? [] as $slide)
            {{-- Ganti h-[500px] dengan min-h-screen dan sesuaikan layout konten --}}
            <div class="relative flex items-center min-h-screen bg-center bg-cover swiper-slide"
                style="background-image:url('{{ asset($slide['background'] ?? '') }}')">

                <div class="absolute inset-0 bg-black/60"></div> {{-- Gelapkan sedikit agar tulisan terbaca --}}

                {{-- Container untuk menjaga konten di tengah dan tidak terlalu lebar --}}
                <div class="container relative z-10 px-6 mx-auto">
                    <div class="max-w-2xl text-center text-white md:text-left">
                        <h1 class="mb-4 text-4xl font-extrabold leading-tight md:text-6xl">
                            {{ $slide['title'] ?? '' }}
                        </h1>
                        <p class="text-lg md:text-xl">
                            {{ $slide['subtitle'] ?? '' }}
                        </p>
                    </div>
                </div>

            </div>
            @endforeach
        </div>
        <div class="text-white swiper-button-next"></div>
        <div class="text-white swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
    </div>
</section>



@endif