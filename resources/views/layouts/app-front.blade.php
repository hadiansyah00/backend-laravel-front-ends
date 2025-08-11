<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Title & Metadata --}}
    <title>PEREMPUAN AMAN</title>
    <meta name="description"
        content="PEREMPUAN AMAN adalah organisasi sayap dari AMAN yang memfasilitasi perempuan adat untuk mengorganisir diri, pengetahuan, dan hak-haknya demi menjaga ketahanan hidup komunitas adat secara turun-temurun.">
    <meta name="keywords"
        content="Perempuan Adat, AMAN, Nusantara, Komunitas Adat, Hukum Adat, Hak Perempuan, Lingkungan, Organisasi">
    <meta name="author" content="PEREMPUAN AMAN">

    {{-- Favicon --}}
    <link rel="icon" type="image/png" href="{{ asset('assets/img/icon/logo.png') }}">
    <link rel="apple-touch-icon" href="{{ asset('assets/img/icon/logo.png') }}">

    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600,700&display=swap" rel="stylesheet" />

    {{-- Styles --}}
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    {{-- Carousel & Animations --}}
    <style>
        .carousel-container {
            scroll-behavior: smooth;
            scrollbar-width: none;
            /* Firefox */
        }

        .carousel-container::-webkit-scrollbar {
            display: none;
            /* Chrome/Safari */
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

    {{-- Alpine.js --}}
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>

<body class="font-sans antialiased">

    <main>
        @yield('content')
    </main>

</body>
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.x.x/dist/cdn.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
<script>
    // Letakkan ini di file JS Anda atau di dalam tag <script>
    document.addEventListener('alpine:init', () => {
    Alpine.data('bookCarousel', () => ({
        currentIndex: 0,
        totalItems: 0,

        // Fungsi yang berjalan saat komponen dimuat
        init() {
            // Menghitung jumlah buku di dalam slider
            this.totalItems = this.$refs.slider.children.length;

            // Menambahkan listener untuk mendeteksi scroll manual
            // agar tombol bisa update statusnya (aktif/nonaktif)
            this.$refs.slider.addEventListener('scroll', () => {
                const itemWidth = this.$refs.slider.children[0].offsetWidth;
                this.currentIndex = Math.round(this.$refs.slider.scrollLeft / itemWidth);
            });
        },

        // Fungsi untuk scroll ke kanan (Next)
        scrollNext() {
            const itemWidth = this.$refs.slider.children[0].offsetWidth + 24; // 24 adalah gap (6 * 4)
            this.$refs.slider.scrollBy({ left: itemWidth, behavior: 'smooth' });
        },

        // Fungsi untuk scroll ke kiri (Prev)
        scrollPrev() {
            const itemWidth = this.$refs.slider.children[0].offsetWidth + 24; // 24 adalah gap (6 * 4)
            this.$refs.slider.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        }
    }));
});
</script>
@vite(['resources/css/app.css', 'resources/js/app.js'])


</html>