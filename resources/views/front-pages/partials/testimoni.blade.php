<section class="py-16 bg-white sm:py-24" id="testimonials">
<div class="px-6 mx-auto max-w-7xl lg:px-8">
        {{-- Wrapper Alpine.js sekarang berada di level grid untuk mengontrol kedua kolom --}}
        <div x-data="{
            atBeginning: true,
            atEnd: false,
            intervalId: null,
            autoplayInterval: 5000,

            updateButtons() {
                const slider = this.$refs.slider;
                this.atBeginning = slider.scrollLeft === 0;
                this.atEnd = Math.ceil(slider.scrollLeft + slider.clientWidth) >= slider.scrollWidth;
            },
            startAutoplay() {
                this.intervalId = setInterval(() => { this.next(); }, this.autoplayInterval);
            },
            stopAutoplay() {
                clearInterval(this.intervalId);
            },
            next() {
                const slider = this.$refs.slider;
                if (this.atEnd) {
                    slider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    slider.scrollBy({ left: slider.clientWidth / 2, behavior: 'smooth' }); // Geser setengah lebar
                }
            },
            prev() {
                 const slider = this.$refs.slider;
                 slider.scrollBy({ left: -slider.clientWidth / 2, behavior: 'smooth' }); // Geser setengah lebar
            },
            resetAutoplay() {
                this.stopAutoplay();
                this.startAutoplay();
            }
        }" x-init="startAutoplay(); updateButtons()" class="grid items-center grid-cols-1 gap-12 lg:grid-cols-3">

            {{-- ============================================= --}}
            {{-- == KOLOM KIRI: Judul, Deskripsi & Navigasi == --}}
            {{-- ============================================= --}}
            <div class="text-center lg:text-left">
                <p class="inline-block px-3 py-1 mb-4 text-sm font-semibold text-orange-600 bg-orange-100 rounded-md">
                    ALUMNI STIKES BOGOR HUSADA
                </p>
                <h2 class="text-3xl font-bold text-gray-800">Cerita Alumni Kami</h2>
                <p class="mt-4 text-gray-600">
                    Dengar langsung pengalaman alumni STIKes Bogor Husada yang sukses berkarier di bidang kesehatan.
                </p>
                <div class="flex justify-center mt-8 space-x-3 lg:justify-start">
                    <button @click="prev(); resetAutoplay()" :disabled="atBeginning"
                        class="p-3 transition duration-300 bg-purple-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-200 focus:outline-none">
                        <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button @click="next(); resetAutoplay()" :disabled="atEnd"
                        class="p-3 transition duration-300 bg-purple-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-200 focus:outline-none">
                        <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {{-- ============================================= --}}
            {{-- == KOLOM KANAN: Slider Testimoni == --}}
            {{-- ============================================= --}}
            <div class="lg:col-span-2">
                @if(isset($testimonials) && count($testimonials) > 0)
                <div x-ref="slider" @scroll.debounce.300ms="updateButtons()" @mouseover="stopAutoplay()"
                    @mouseleave="startAutoplay()"
                    class="flex w-full gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth">

                    @foreach($testimonials as $testimonial)
                    <div class="flex-shrink-0 w-full carousel-item snap-start sm:w-[48%] lg:w-[31%]">
                        <div class="h-full overflow-hidden bg-white border border-gray-200 shadow-md rounded-2xl">
                            {{-- Bagian Gambar dengan Ikon Overlay --}}
                            <div class="relative">
                                <img class="object-cover w-full aspect-[4/4]"
                                    src="{{ asset('storage/' . $testimonial->photo) }}"
                                    alt="Foto {{ $testimonial->name }}"
                                    onerror="this.onerror=null; this.src='{{ asset('assets/img/default-avatar.png') }}';">
                                <div class="absolute p-3 rounded-lg top-4 left-4 bg-gray-900/60 backdrop-blur-sm">
                                    <svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.455-2.456L12.75 18l1.178-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" />
                                    </svg>
                                </div>
                            </div>
                            {{-- Bagian Teks --}}
                            <div class="p-6 text-center">
                                <blockquote class="text-base leading-relaxed text-gray-700">"{{ $testimonial->message
                                    }}"</blockquote>
                                <figcaption class="mt-4">
                                    <cite class="text-lg font-bold text-amber-500">{{ $testimonial->name }}</cite>
                                    <p class="mt-1 text-sm not-italic text-gray-500">{{ $testimonial->role }}</p>
                                </figcaption>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
                @else
                <div class="p-8 text-center bg-white rounded-lg shadow-md">
                    <p class="text-gray-500">Belum ada testimoni yang tersedia.</p>
                </div>
                @endif
            </div>
        </div>
    </div>
</section>
