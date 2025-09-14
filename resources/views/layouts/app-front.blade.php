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
</body>

</html>