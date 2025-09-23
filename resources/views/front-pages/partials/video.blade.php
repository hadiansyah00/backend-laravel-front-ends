{{-- Video Section with Thumbnail and Popup Player (Improved & Fixed) --}}
<section class="py-16 bg-orange-100 sm:py-24" x-data="{ videoOpen: false, videoUrl: '' }">
    <div class="px-6 mx-auto max-w-7xl lg:px-8">
        <div class="items-center grid-cols-1 gap-12 md:grid md:grid-cols-2">

            {{-- Text Content --}}
            <div class="mb-10 text-center md:text-left md:mb-0">
                {{-- Menggunakan data dinamis untuk judul --}}
                <h2 class="mb-4 text-3xl font-bold text-orange-600 md:text-4xl">
                    {!! $videoContent->title ?? 'Judul Video Tidak Tersedia' !!}
                </h2>
                {{-- Menggunakan data dinamis untuk deskripsi --}}
                <p class="text-lg leading-relaxed text-gray-600">
                    {!! $videoContent->description ?? 'Deskripsi video tidak tersedia.' !!}
                </p>
            </div>

            {{-- Video Thumbnail --}}
            <div>
                @if(isset($videoContent) && $videoContent->video_url)
                @php
                // Ekstraksi ID video dari URL YouTube
                $videoId = '';
                $pattern =
                '/(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/';
                if (preg_match($pattern, $videoContent->video_url, $matches)) {
                $videoId = $matches[1];
                }

                // URL thumbnail dan embed yang dinamis
                $dynamicThumbnailUrl = $videoId ? "https://img.youtube.com/vi/{$videoId}/hqdefault.jpg" :
                asset('assets/img/background/default_video_thumb.png');
                $embedUrl = $videoId ? "https://www.youtube.com/embed/{$videoId}?autoplay=1&mute=1&rel=0" : '#';
                @endphp

                <div @click="videoOpen = true; videoUrl = '{{ $embedUrl }}'"
                    class="relative overflow-hidden transition-all duration-300 ease-in-out bg-gray-200 shadow-lg cursor-pointer rounded-2xl group hover:shadow-2xl">
                    {{-- YouTube Thumbnail Dinamis dengan Fallback --}}
                    <img src="{{ $dynamicThumbnailUrl }}" alt="Video Thumbnail {!! $videoContent->title ?? '' !!}"
                        class="object-cover w-full h-auto min-h-[300px]"
                        onerror="this.onerror=null; this.src='{{ asset('assets/img/background/default_video_thumb.png') }}';"
                        loading="lazy">

                    {{-- Play Button Overlay --}}
                    <div class="absolute inset-0 flex items-center justify-center w-full h-full bg-black/30">
                        <div
                            class="flex items-center justify-center w-20 h-20 text-white transition-all duration-300 transform bg-orange-600 rounded-full group-hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="w-10 h-10 ml-1">
                                <path fill-rule="evenodd"
                                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.722-2.779-.217-2.779-1.643V5.653Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
                @else
                {{-- Tampilan jika tidak ada video yang tersedia --}}
                <div
                    class="flex items-center justify-center w-full min-h-[300px] text-gray-500 bg-gray-100 rounded-2xl shadow-lg">
                    <span>Video tidak tersedia.</span>
                </div>
                @endif
            </div>
        </div>
    </div>

    {{-- Video Popup Modal --}}
    <div x-show="videoOpen" x-transition class="fixed inset-0 z-50 flex items-center justify-center p-4" x-cloak
        @keydown.escape.window="videoOpen = false; videoUrl = ''">
        <div @click="videoOpen = false; videoUrl = ''" class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

        <div class="relative w-full max-w-4xl">
            {{-- Tombol Close --}}
            <button @click="videoOpen = false; videoUrl = ''"
                class="absolute right-0 z-10 p-2 text-white -top-10 hover:text-gray-300 focus:outline-none"
                aria-label="Tutup video">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </button>

            {{-- Video Iframe --}}
            <div class="overflow-hidden bg-black rounded-lg shadow-2xl aspect-w-16 aspect-h-9">
                <template x-if="videoUrl">
                    <iframe class="w-full h-full" :src="videoUrl" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                </template>
            </div>
        </div>
    </div>
</section>