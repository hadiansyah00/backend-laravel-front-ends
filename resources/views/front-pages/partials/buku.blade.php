{{-- Carousel Buku (Final Fixed Version) --}}
<section class="py-20 bg-gray-50" id="carousel-buku">
    <div class="container px-6 mx-auto">

        {{-- Wrapper Alpine.js untuk seluruh komponen --}}
        <div x-data="{
            atBeginning: true,
            atEnd: false,
            updateButtons() {
                const slider = this.$refs.slider;
                this.atBeginning = slider.scrollLeft === 0;
                this.atEnd = Math.ceil(slider.scrollLeft + slider.clientWidth) >= slider.scrollWidth;
            }
        }" x-init="updateButtons()">

            <div class="flex items-center justify-between mb-8">
                <h2 class="text-3xl font-bold text-gray-800">Koleksi Buku</h2>

                <div class="flex items-center space-x-3">
                    <button @click="$refs.slider.scrollBy({ left: -$refs.slider.clientWidth, behavior: 'smooth' })"
                        :disabled="atBeginning"
                        class="p-2 transition duration-300 bg-white rounded-full shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button @click="$refs.slider.scrollBy({ left: $refs.slider.clientWidth, behavior: 'smooth' })"
                        :disabled="atEnd"
                        class="p-2 transition duration-300 bg-white rounded-full shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            @if(isset($buku) && count($buku) > 0)
            <div x-ref="slider" @scroll.debounce.300ms="updateButtons()"
                class="flex w-full gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth">

                @foreach($buku as $post)
                <div class="flex-shrink-0 w-4/5 carousel-item snap-start sm:w-1/2 md:w-1/3 lg:w-1/4">
                    <a href="{{ $post['link'] ?? '#' }}" target="_blank" rel="noopener noreferrer"
                        class="block h-full group">
                        <div
                            class="flex flex-col h-full overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl group-hover:shadow-xl group-hover:-translate-y-2">
                            <div class="overflow-hidden">
                                @if(isset($post['_embedded']['wp:featuredmedia'][0]['source_url']))
                                <img src="{{ $post['_embedded']['wp:featuredmedia'][0]['source_url'] }}"
                                    alt="{!! $post['title']['rendered'] !!}"
                                    class="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-105">
                                @else
                                <div class="flex items-center justify-center w-full h-64 text-gray-500 bg-gray-200">
                                    <span>No Image</span>
                                </div>
                                @endif
                            </div>
                            <div class="flex flex-col flex-grow p-5">
                                <h3
                                    class="mb-2 text-lg font-bold text-gray-800 transition-colors duration-300 line-clamp-2 group-hover:text-purple-600">
                                    {!! $post['title']['rendered'] !!}
                                </h3>
                                <div class="mt-auto">
                                    <span class="inline-block mt-2 font-semibold text-purple-600">
                                        Lihat Detail &rarr;
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                @endforeach
            </div>
            @else
            <div class="p-4 text-center border-t">
                <p class="text-gray-500">Koleksi buku belum tersedia.</p>
            </div>
            @endif
        </div>
    </div>
</section>