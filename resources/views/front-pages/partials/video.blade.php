{{-- Video Section with Thumbnail and Popup Player (Improved & Fixed) --}}
<section class="py-20 bg-white" x-data="{ videoOpen: false, videoUrl: '' }">
    <div class="container px-6 mx-auto">
        <div class="items-center grid-cols-1 gap-12 md:grid md:grid-cols-2">

            {{-- Text Content --}}
            <div class="mb-10 text-center md:text-left md:mb-0">
                <h2 class="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
                    Peran Perempuan Adat dalam Penjagaan Pengetahuan
                </h2>
                <p class="text-lg leading-relaxed text-gray-600">
                    Perempuan Adat sebagai peran kunci penentu kesejahteraan komunitas adatnya adalah melalui
                    kemandirian ekonomi keluarga dengan terus-menerus mempraktekan pengetahuan yang dimiliki melalui
                    kegiatan bertadang, bertani, bercocok tanam, berkebun, dan bahkan aktivitas mencari ikan disungai.
                </p>
            </div>

            {{-- Video Thumbnail --}}
            <div>
                <div @click="videoOpen = true; videoUrl = 'https://www.youtube.com/embed/N1icc_fN5GE?autoplay=1&mute=1&rel=0'"
                    class="relative overflow-hidden transition-all duration-300 ease-in-out bg-gray-200 shadow-lg cursor-pointer rounded-2xl group hover:shadow-2xl">
                    {{-- YouTube Thumbnail with Fallback --}}
                    <img src="{{ asset('assets/img/background/thumb_video.png') }}"
                        alt="Video Thumbnail Peran Perempuan Adat" class="object-cover w-full h-auto min-h-[300px]" {{--
                        PERBAIKAN: Menggunakan 'onerror' standar, bukan '@error' --}}
                        onerror="this.onerror=null; this.src='https://img.youtube.com/vi/D1So0f4g3uQ/hqdefault.jpg';"
                        loading="lazy">

                    {{-- Play Button Overlay --}}
                    <div class="absolute inset-0 flex items-center justify-center w-full h-full bg-black/30">
                        <div
                            class="flex items-center justify-center w-20 h-20 text-white transition-all duration-300 transform bg-purple-600 rounded-full group-hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="w-10 h-10 ml-1">
                                <path fill-rule="evenodd"
                                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.722-2.779-.217-2.779-1.643V5.653Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
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
            <div class="overflow-hidden bg-black rounded-lg shadow-2xl aspect-video">
                {{-- PERBAIKAN: Hanya memuat iframe jika videoUrl ada, untuk performa lebih baik --}}
                <template x-if="videoUrl">
                    <iframe class="w-full h-full" :src="videoUrl" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                </template>
            </div>
        </div>
    </div>
</section>