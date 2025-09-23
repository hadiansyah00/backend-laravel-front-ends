<section class="relative py-16 bg-white sm:py-24" style="
        background-image: url('{{ asset('assets/img/background/hero-bg_2.png') }}');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover; /* bikin fit penuh section */
    ">
    <div class="px-6 mx-auto max-w-7xl lg:px-8">
        {{-- Judul Halaman --}}
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold tracking-tight text-orange-600 sm:text-4xl">
                Program Studi Kami
            </h2>
            <p class="mt-4 text-lg leading-8 text-orange-600">
                Jelajahi berbagai program studi yang kami tawarkan untuk membantu Anda mencapai tujuan akademis dan
                profesional Anda.
            </p>
        </div>

        {{-- Kontainer Grid untuk Kartu --}}
        <div
            class="grid max-w-2xl grid-cols-1 mx-auto mt-16 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">

            {{-- Looping Data Program Studi --}}
            @forelse ($programStudis as $prodi)
            <a href="{{ $prodi->link ?? '#' }}" class="block group">
                {{-- ======================================================= --}}
                {{-- == KARTU UTAMA DENGAN SHADOW & BACKGROUND == --}}
                {{-- ======================================================= --}}
                <article
                    class="flex flex-col h-full overflow-hidden transition-all duration-300 bg-white shadow-md rounded-2xl group-hover:shadow-xl group-hover:-translate-y-2">

                    {{-- Gambar Program Studi --}}
                    <div class="relative">
                        {{-- Mengubah rasio aspek agar lebih profesional (seperti 16:10) --}}
                        <img src="{{ asset('storage/' . $prodi->image) }}" alt="Gambar {{ $prodi->name }}"
                            class="aspect-[16/16] w-full object-cover transition-transform duration-300 group-hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                        {{-- ======================================================= --}}
                        {{-- == BADGE UNTUK NAMA PRODI == --}}
                        {{-- ======================================================= --}}
                        <div class="absolute top-4 left-4">

                        </div>
                    </div>

                    {{-- Konten Teks (menggunakan flexbox agar tombol selalu di bawah) --}}
                    <div class="flex flex-col flex-grow p-6">
                        {{-- Deskripsi (dibuat flex-grow agar mendorong tombol ke bawah) --}}
                        <div class="flex-grow">
                            <p class="text-sm leading-6 text-gray-600 line-clamp-3">
                                {{ $prodi->description }}
                            </p>
                        </div>

                        {{-- ======================================================= --}}
                        {{-- == TOMBOL "SELENGKAPNYA" == --}}
                        {{-- ======================================================= --}}
                        <div class="mt-6">
                            <span
                                class="inline-block px-5 py-2 text-sm font-semibold text-white transition duration-300 bg-orange-600 rounded-lg shadow group-hover:bg-orange-700">
                                Selengkapnya
                            </span>
                        </div>
                    </div>

                </article>
            </a>
            @empty
            {{-- Tampilan jika tidak ada data --}}
            <div class="col-span-1 py-12 text-center text-gray-500 md:col-span-2 lg:col-span-3">
                <p>Belum ada program studi yang tersedia.</p>
            </div>
            @endforelse

        </div>
    </div>
</section>