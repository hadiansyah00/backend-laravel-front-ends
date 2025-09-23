{{--
<section class="relative py-20 bg-fixed bg-center bg-cover sm:py-24"
    style="background-image: url('{{ asset('assets/img/background/title.jpg') }}')">

    <div class="absolute inset-0 bg-slate-900/75"></div>

    <div class="relative z-10 max-w-4xl px-6 mx-auto text-center text-white">

        <h2 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Mengenal STIKes Bogor Husada
        </h2>
        <p class="max-w-3xl mx-auto mt-6 text-lg leading-8 text-slate-200">
            Berkomitmen mencetak tenaga kesehatan profesional, unggul, dan berdaya saing untuk memberikan kontribusi
            nyata bagi masyarakat.
        </p>

        <div class="grid grid-cols-1 gap-6 mt-12 text-left sm:grid-cols-2 lg:grid-cols-3">
            <div class="p-6 transition duration-300 bg-white/10 rounded-xl hover:bg-white/20">
                <h3 class="text-lg font-semibold text-emerald-300">S1 Farmasi</h3>
                <p class="mt-1 text-slate-100">Terakreditasi Baik</p>
            </div>
            <div class="p-6 transition duration-300 bg-white/10 rounded-xl hover:bg-white/20">
                <h3 class="text-lg font-semibold text-emerald-300">S1 Gizi</h3>
                <p class="mt-1 text-slate-100">Terakreditasi Baik</p>
            </div>
            <div class="p-6 transition duration-300 bg-white/10 rounded-xl hover:bg-white/20">
                <h3 class="text-lg font-semibold text-emerald-300">D3 Kebidanan</h3>
                <p class="mt-1 text-slate-100">Terakreditasi Baik</p>
            </div>
        </div>

        <blockquote
            class="max-w-2xl pl-6 mx-auto mt-12 text-xl italic text-center border-l-4 text-slate-100 border-emerald-500">
            “Menjadi Perguruan Tinggi Kesehatan yang Unggul, Mandiri, dan Berdaya Saing di Tingkat Nasional Tahun 2045.”
        </blockquote>

        <div class="flex flex-wrap items-center justify-center gap-4 mt-12">
            <a href="#"
                class="px-8 py-3 font-semibold text-white transition duration-300 shadow-lg bg-emerald-600 rounded-xl hover:bg-emerald-700 hover:scale-105">
                Daftar PMB
            </a>
            <a href="https://wa.me/6281234567890" target="_blank"
                class="px-8 py-3 font-semibold text-white transition duration-300 bg-white/10 rounded-xl hover:bg-white/20 hover:scale-105">
                Chat via WhatsApp
            </a>
        </div>
    </div>
</section> --}}
{{--
Improved "Tentang Kami" Section dengan Efek Glassmorphism (Blur Transparan) pada Kartu Akreditasi.
- Gambar background tetap dengan efek parallax (bg-fixed).
- Overlay gelap untuk keterbacaan teks.
- Layout terpusat.
- Kartu Akreditasi kini memiliki background transparan dengan efek blur (backdrop-filter).
- Sudut kartu dibuat lebih membulat (rounded-2xl).
--}}
{{--
Hero Section - Clean & Modern
- Layout dua kolom yang responsif.
- Kolom kiri disiapkan dengan background gradien untuk gambar PNG transparan Anda.
- Kolom kanan memiliki tipografi yang jelas dan ikonografi modern.
- Palet warna terfokus untuk tampilan yang profesional.
--}}
<section class="bg-white">
    <div class="container px-6 py-16 mx-auto max-w-7xl sm:py-24">
        <div class="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

            <div>
                <img src="{{ asset('assets/img/hero/hero-2.jpg') }}" {{-- PASTIKAN PATH GAMBAR INI BENAR --}}
                    alt="Suasana Kampus STIKes Bogor Husada" class="object-cover w-full h-full shadow-2xl rounded-3xl">
            </div>

            <div class="text-left">
                <p class="font-semibold text-orange-600">PROFIL SINGKAT</p>
                <h1 class="mt-2 text-4xl font-bold tracking-tight text-orange-700 sm:text-5xl">
                    STIKes Bogor Husada
                </h1>
                <p class="mt-6 text-lg leading-relaxed text-gray-600">
                    Perguruan tinggi kesehatan yang berkomitmen mencetak tenaga kesehatan profesional, unggul, dan
                    berdaya saing untuk memberikan kontribusi nyata bagi masyarakat.
                </p>

                <div class="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2">
                    <div class="flex items-start gap-4">
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-12 h-12 text-orange-600 bg-orange-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-900">Program Studi Terakreditasi</h3>
                            <p class="mt-1 text-sm text-gray-600">Farmasi, Gizi, & Kebidanan.</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-4">
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-12 h-12 text-orange-600 bg-orange-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-900">Fasilitas Mahasiswa</h3>
                            <p class="mt-1 text-sm text-gray-600">Ruangan Kelas yang Nyaman, Perpustakaan Modern, dan
                                Laboratorium Lengkap.</p>
                        </div>
                    </div>
                </div>

                <blockquote class="pl-4 mt-8 border-l-4 border-orange-600">
                    <p class="text-lg italic font-medium text-gray-800">
                        “Menjadi Perguruan Tinggi Kesehatan yang Unggul, Mandiri, dan Berdaya Saing di Tingkat Nasional
                        Tahun 2045.”
                    </p>
                </blockquote>

                <div class="flex flex-wrap items-center gap-4 mt-10">
                    <a href="#"
                        class="px-6 py-3 font-semibold text-center text-white transition duration-300 rounded-lg shadow-md bg-emerald-600 hover:bg-emerald-700">
                        Daftar PMB →
                    </a>
                    <a href="https://wa.me/6281234567890"
                        class="flex items-center gap-2 px-6 py-3 font-semibold text-center text-gray-800 transition duration-300 border border-gray-300 rounded-lg hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-500" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M10.25 1.75a.75.75 0 00-1.5 0V2a.75.75 0 001.5 0V1.75zM10 18.25a.75.75 0 01.75-.75h.01a.75.75 0 010 1.5H10.75a.75.75 0 01-.75-.75zM15.383 3.617a.75.75 0 00-1.06 1.06l.001.001.01.01.002.002c.036.035.074.068.114.1.037.032.075.062.115.09a3.486 3.486 0 011.83 2.914.75.75 0 001.498-.058 5.002 5.002 0 00-4.46-4.46.015.015 0 00-.002-.002l-.01-.01-.001-.001zM4.617 15.383a.75.75 0 001.06-1.06l-.001-.001-.01-.01-.002-.002a3.486 3.486 0 01-2.914-1.83.75.75 0 10-1.498.058 5.002 5.002 0 004.46 4.46l.002.002.01.01.001.001z" />
                            <path fill-rule="evenodd"
                                d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                                clip-rule="evenodd" />
                        </svg>
                        Hubungi Kami
                    </a>
                </div>
            </div>

        </div>
    </div>
</section>