{{-- Letakkan kode ini di dalam @section('content') di bawah @include('front-pages.partials.hero') --}}

<section id="tentang-kami" class="py-20 bg-white">
    <div class="container px-6 mx-auto">
        <div class="md:grid md:grid-cols-2 md:items-center md:gap-16">

            <div class="mb-10 md:mb-0">
                {{-- Ganti dengan URL gambar yang relevan, misal: kegiatan perempuan adat --}}
                <img src="{{ asset('assets/img/background/title.jpg') }}" alt="Kegiatan Perempuan Adat"
                    class="object-cover w-full h-full rounded-lg shadow-lg">
            </div>

            <div>
                <h2 class="mb-4 text-3xl font-bold tracking-tight text-gray-800">
                    Mengenal <span class="text-purple-600">PEREMPUAN AMAN</span>
                </h2>

                <p class="mb-6 leading-relaxed text-gray-600">
                    Perempuan Adat adalah perempuan yang memiliki peran dan fungsi menjaga ketahanan hidup komunitasnya
                    berdasarkan asal usul leluhur secara turun temurun diatas wilayah Adat yang memiliki kedaulatan atas
                    tanah dan kekayaan alam, kehidupan sosial budaya yang diatur oleh hukum Adat dan Lembaga yang
                    mengelola keberlangsungan Kehidupan.
                </p>

                <p class="mb-6 leading-relaxed text-gray-600">
                    Persekutuan Perempuan Adat Nusantara AMAN (<strong>PEREMPUAN AMAN</strong>) adalah organisasi sayap
                    Aliansi Masyarakat Adat Nusantara (AMAN) yang dideklarasikan pada tanggal 16 April 2012 di Tobelo,
                    Halmahera Utara Provinsi Maluku Utara. Organisasi ini didirikan berdasar pengalaman bahwa perempuan
                    adat membutuhkan wadah selain AMAN sebagai tempat belajar dan mengkonsolidasikan diri untuk mampu
                    menyuarakan kepentingannya sendiri.
                </p>

                <p class="leading-relaxed text-gray-600">
                    Dalam rangka itulah, <strong>PEREMPUAN AMAN</strong> didirikan untuk mampu memfasilitasi
                    perempuan-perempuan adat mengorganisir diri, pengetahuan dan hak-haknya. Organisasi ini
                    beranggotakan individu perempuan adat yang berasal dari komunitas anggota AMAN.
                </p>
            </div>

        </div>
    </div>
</section>
