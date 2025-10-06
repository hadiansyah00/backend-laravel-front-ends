<section x-data="{
        activeSlide: 1,
        slideCount: {{ $sliders->count() }},
        autoplayInterval: 5000,
        interval: null,
        next() {
            this.activeSlide = this.activeSlide >= this.slideCount ? 1 : this.activeSlide + 1;
            this.resetAutoplay();
        },
        prev() {
            this.activeSlide = this.activeSlide <= 1 ? this.slideCount : this.activeSlide - 1;
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
            if (this.slideCount > 1) {
                this.interval = setInterval(() => {
                    this.next();
                }, this.autoplayInterval);
            }
        },
        init() {
            this.startAutoplay();
        }
    }" x-init="init()" class="relative w-full py-12 pt-10 bg-white">
    <div class="relative w-full mt-5 overflow-hidden ">
        <div class="flex transition-transform duration-500 ease-in-out"
            :style="`transform: translateX(-${(activeSlide - 1) * 100}%)`">
            @foreach($sliders as $i => $slider)
            <div class="relative flex-shrink-0 w-full px-4 md:px-8">
                <div class="relative w-full h-auto transition-all duration-500 ease-in-out transform" :class="{
                            'scale-100 opacity-100': activeSlide === {{ $i + 1 }},
                            'scale-90 opacity-60': activeSlide !== {{ $i + 1 }}
                        }">
                    <div class="aspect-[4/1] w-full overflow-hidden rounded-2xl shadow-lg"> <img
                            src="{{ asset('storage/'.$slider->image) }}" alt="{{ $slider->title }}"
                            class="object-cover w-full h-full" loading="lazy">
                    </div>
                    @if($slider->title || $slider->description)
                    <div
                        class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl">
                        <h2 class="text-lg font-bold text-white">{{ $slider->title }}</h2>
                        <p class="text-sm text-white">{{ $slider->description }}</p>
                    </div>
                    @endif
                </div>
            </div>
            @endforeach
        </div>
    </div>

    @if($sliders->count() > 1)
    <div class="absolute inset-0 z-20 flex items-center justify-between px-4 pointer-events-none md:px-10">
        <button @click="prev()"
            class="p-2 text-white transition rounded-full pointer-events-auto bg-black/30 hover:bg-black/60 focus:outline-none"
            aria-label="Previous Slide">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <button @click="next()"
            class="p-2 text-white transition rounded-full pointer-events-auto bg-black/30 hover:bg-black/60 focus:outline-none"
            aria-label="Next Slide">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </div>
    <div class="absolute z-20 flex justify-center space-x-2 -translate-x-1/2 bottom-6 left-1/2">
        <template x-for="i in slideCount" :key="i">
            <button @click="goToSlide(i)" class="w-2.5 h-2.5 transition rounded-full"
                :class="{'bg-purple-400': activeSlide === i, 'bg-gray-500/50 hover:bg-gray-500': activeSlide !== i}"
                :aria-label="`Go to slide ${i}`"></button>
        </template>
    </div>
    @endif
</section>