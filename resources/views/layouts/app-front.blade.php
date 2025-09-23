<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Title & Metadata --}}
    <title>{{ setting('meta_title', 'STIKes Bogor Husada') }}</title>
    <meta name="description" content="{{ setting('meta_description', 'Deskripsi default website') }}">
    <meta name="keywords" content="{{ setting('meta_keywords', 'kampus, kesehatan, bogor, stikeshusada') }}">
    <meta name="author" content="STIKes Bogor Husada">

    {{-- Open Graph (Facebook, LinkedIn, WhatsApp) --}}
    <meta property="og:title" content="{{ setting('og_title', setting('meta_title', 'STIKes Bogor Husada')) }}">
    <meta property="og:description"
        content="{{ setting('og_description', setting('meta_description', 'Deskripsi default website')) }}">
    <meta property="og:image"
        content="{{ setting('og_image') ? asset('storage/' . setting('og_image')) : asset('assets/img/icon/logo_sbh_persegi.png') }}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="{{ setting('twitter_card', 'summary_large_image') }}">
    <meta name="twitter:title" content="{{ setting('meta_title', 'STIKes Bogor Husada') }}">
    <meta name="twitter:description" content="{{ setting('meta_description', 'Deskripsi default website') }}">
    <meta name="twitter:image"
        content="{{ setting('og_image') ? asset('storage/' . setting('og_image')) : asset('assets/img/icon/logo_sbh_persegi.png') }}">

    {{-- Favicon & App Icons --}}
    <link rel="icon" type="image/png"
        href="{{ setting('site_favicon') ? asset('storage/' . setting('site_favicon')) : asset('assets/img/icon/logo_sbh_persegi.png') }}">
    <link rel="apple-touch-icon"
        href="{{ setting('site_logo') ? asset('storage/' . setting('site_logo')) : asset('assets/img/icon/logo_sbh_persegi.png') }}">
    <link rel="manifest" href="{{ asset('manifest.json') }}">
    <meta name="theme-color" content="#ffffff">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    {{-- Google Analytics (jika ada) --}}
    @if(setting('google_analytics'))
    {!! setting('google_analytics') !!}
    @endif

    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
    <link href="https://fonts.bunny.net/css?family=figtree:400,600,700&display=swap" rel="stylesheet" />

    {{-- Styles --}}
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

    {{-- Custom Styles --}}
    <style>
        .carousel-container {
            scroll-behavior: smooth;
            scrollbar-width: none;
        }

        .carousel-container::-webkit-scrollbar {
            display: none;
        }

        .carousel-item {
            transition: transform 0.3s ease;
        }

        .carousel-btn[disabled] {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .fade-in-up {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }

        .fade-in-up.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
    </style>

</head>

<body class="font-sans antialiased">

    <main>
        @yield('content')
    </main>

    {{-- Alpine.js + Intersect Plugin --}}
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.x.x/dist/cdn.min.js"></script>

    {{-- Alpine Component (Book Carousel) --}}
    <script>
        document.addEventListener('alpine:init', () => {
            Alpine.data('bookCarousel', () => ({
                currentIndex: 0,
                totalItems: 0,
                init() {
                    this.totalItems = this.$refs.slider.children.length;
                    this.$refs.slider.addEventListener('scroll', () => {
                        const itemWidth = this.$refs.slider.children[0].offsetWidth;
                        this.currentIndex = Math.round(this.$refs.slider.scrollLeft / itemWidth);
                    });
                },
                scrollNext() {
                    const itemWidth = this.$refs.slider.children[0].offsetWidth + 24;
                    this.$refs.slider.scrollBy({ left: itemWidth, behavior: 'smooth' });
                },
                scrollPrev() {
                    const itemWidth = this.$refs.slider.children[0].offsetWidth + 24;
                    this.$refs.slider.scrollBy({ left: -itemWidth, behavior: 'smooth' });
                }
            }));
        });
    </script>

    {{-- SwiperJS --}}
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>
        new Swiper(".mySwiper", {
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                640: { slidesPerView: 1.2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    </script>
    {{-- ======================================================= --}}
    {{-- == KOMPONEN CHAT TOGGLE FLOAT == --}}
    {{-- ======================================================= --}}
    <div x-data="{
    showButton: false,
    chatOpen: false
}" x-init="window.addEventListener('scroll', () => { showButton = (window.scrollY > 300) })"
        @keydown.escape.window="chatOpen = false" class="fixed z-50 bottom-8 right-8">

        <template x-if="showButton">
            <div x-show="showButton" x-transition:enter="transition ease-out duration-300"
                x-transition:enter-start="opacity-0 transform translate-y-4"
                x-transition:enter-end="opacity-100 transform translate-y-0"
                x-transition:leave="transition ease-in duration-200"
                x-transition:leave-start="opacity-100 transform translate-y-0"
                x-transition:leave-end="opacity-0 transform translate-y-4">

                {{-- Jendela Chat --}}
                <div x-show="chatOpen" x-transition @click.outside="chatOpen = false"
                    class="absolute right-0 flex flex-col overflow-hidden bg-white border border-gray-200 shadow-2xl bottom-20 w-80 rounded-xl">

                    {{-- Header Chat --}}
                    <div class="flex items-center justify-between p-4 text-white bg-orange-600">
                        <div class="flex items-center gap-3">
                            <div class="relative">
                                <img class="w-10 h-10 p-1 bg-orange-200 rounded-full"
                                    src="{{ asset('assets/img/icon/logo_sbh.png') }}" alt="Avatar Admin">
                                <span
                                    class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-gray-800"></span>
                            </div>
                            <div>
                                <p class="text-sm text-gray-300">Mengobrol dengan</p>
                                <p class="font-semibold">Halo STIKes</p>
                            </div>
                        </div>
                        <button @click="chatOpen = false" class="text-gray-400 hover:text-white">&times;</button>
                    </div>

                    {{-- Isi Pesan --}}
                    <div class="h-64 p-4 overflow-y-auto bg-gray-50">
                        <div class="max-w-xs p-3 text-sm text-gray-800 bg-gray-200 rounded-lg">
                            Halo, <br>
                            Dengan Layanan Bantuan STIKes Bogor Husada. Ada yang bisa kami bantu hari ini?
                            <div class="mt-1 text-xs text-right text-gray-500">- Admin</div>
                        </div>
                    </div>

                    {{-- Area Input Pesan (Link ke WhatsApp) --}}
                    <div class="p-4 bg-white border-t">
                        <form action="https://api.whatsapp.com/send" method="get" target="_blank">
                            <input type="hidden" name="phone" value="6281110111560">
                            <textarea name="text"
                                class="w-full p-2 text-sm border rounded-md focus:ring-orange-500 focus:border-orange-500"
                                rows="2" placeholder="Ketik pesanmu disini..."></textarea>
                            <button type="submit"
                                class="w-full px-4 py-2 mt-2 font-semibold text-white bg-orange-600 rounded-md hover:bg-orange-700">
                                KIRIM
                            </button>
                        </form>
                    </div>
                </div>

                {{-- Tombol Toggle Awal (Floating Button) --}}
                <button @click="chatOpen = !chatOpen"
                    class="flex items-center justify-center w-16 h-16 text-white transition-transform duration-300 bg-orange-600 rounded-full shadow-lg hover:bg-orange-700 hover:scale-110">
                    {{-- Ikon close saat chat terbuka --}}
                    <svg x-show="chatOpen" x-transition class="w-8 h-8" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                    {{-- Ikon chat saat chat tertutup --}}
                    <svg x-show="!chatOpen" x-transition class="w-8 h-8" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                        </path>
                    </svg>
                </button>
            </div>
        </template>
    </div>
</body>

</html>