{{-- Section Hero Video dengan Efek Diagonal --}}
<section x-data="{ videoOpen: false, videoUrl: '' }" class="relative h-[75vh] w-full overflow-hidden bg-gray-800">

    @if(isset($videoContent) && $videoContent->video_url)
    @php
    // Ekstraksi ID video dari URL YouTube
    $videoId = '';
    $pattern =
    '/(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/';
    if (preg_match($pattern, $videoContent->video_url, $matches)) {
    $videoId = $matches[1];
    }

    // URL thumbnail & embed
    $dynamicThumbnailUrl = $videoId
    ? "https://img.youtube.com/vi/{$videoId}/maxresdefault.jpg"
    : asset('assets/img/background/default_video_thumb.png');
    $embedUrl = $videoId
    ? "https://www.youtube.com/embed/{$videoId}?autoplay=1&mute=1&rel=0"
    : '#';
    @endphp

    {{-- 1. GAMBAR LATAR KANAN --}}
    <div class="absolute inset-0">
        <img src="{{ $dynamicThumbnailUrl }}" alt="Video Thumbnail {!! $videoContent->title ?? '' !!}"
            onerror="this.onerror=null; this.src='{{ asset('assets/img/background/default_video_thumb.png') }}';"
            class="object-cover w-full h-full" loading="lazy">
    </div>

    {{-- 2. GAMBAR LATAR KIRI (MASK DIAGONAL) --}}
    {{-- <div class="absolute inset-0" style="clip-path: polygon(0 0, 50% 0, 35% 100%, 0% 100%)">
        <img src="{{ asset('assets/img/hero-left-bg.jpg') }}" alt="Latar Belakang Mahasiswa Berdiskusi"
            class="object-cover w-full h-full">
    </div> --}}

    {{-- 3. OVERLAY --}}
    <div class="absolute inset-0 bg-black/30"></div>

    {{-- 4. GARIS PEMISAH --}}
    <div class="absolute top-1/2 left-1/2 h-[150%] w-32
                    -translate-x-1/2 -translate-y-1/2 transform
                    -rotate-[15deg] bg-teal-900/80 border-y-4
                    border-amber-400 backdrop-blur-sm">
    </div>

    {{-- 5. TOMBOL PLAY --}}
    <div class="relative z-20 flex items-center justify-center w-full h-full">
        <button @click="videoUrl='{{ $embedUrl }}'; videoOpen = true"
            class="flex items-center justify-center p-5 text-white transition-all duration-300 transform bg-orange-600 rounded-full shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300 hover:scale-110 hover:bg-orange-700 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 ml-1">
                <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33
                          2.779-1.643l11.54 6.647c1.295.742
                          1.295 2.545 0 3.286L7.279 20.99c-1.25.722-2.779-.217-2.779-1.643V5.653Z"
                    clip-rule="evenodd" />
            </svg>
            <span class="sr-only">Putar Video</span>
        </button>
    </div>

    @else
    {{-- Fallback jika tidak ada video --}}
    <div class="relative z-10 flex flex-col items-center justify-center h-full max-w-xl px-6 mx-auto text-center">
        <h2 class="mb-4 text-3xl font-bold text-white">Video Tidak Tersedia</h2>
        <p class="text-lg text-orange-100">Mohon maaf, saat ini belum ada video untuk ditampilkan.</p>
        <div class="mt-8 flex items-center justify-center w-full min-h-[250px]
                        text-gray-500 bg-gray-200 rounded-lg shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-16 h-16 text-gray-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0
                          011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5
                          18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25
                          2.25 0 00-2.25-2.25h-9A2.25
                          2.25 0 002.25 7.5v9a2.25
                          2.25 0 002.25 2.25z" />
            </svg>
        </div>
    </div>
    @endif

    {{-- MODAL VIDEO PLAYER --}}
    <div x-show="videoOpen" x-transition
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" x-cloak
        @keydown.escape.window="videoOpen = false; videoUrl=''">
        <div class="relative w-full max-w-4xl">
            <button @click="videoOpen = false; videoUrl=''"
                class="absolute right-0 z-10 p-2 text-white -top-10 hover:text-gray-300 focus:outline-none"
                aria-label="Tutup video">
                <svg class="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0
                          011.414 0L10 8.586l4.293-4.293a1 1
                          0 111.414 1.414L11.414 10l4.293
                          4.293a1 1 0 01-1.414 1.414L10
                          11.414l-4.293 4.293a1 1 0
                          01-1.414-1.414L8.586 10
                          4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
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