<section class="py-16 bg-white sm:py-24">
    <div class="px-6 mx-auto max-w-7xl lg:px-8">
        <div class="px-6 mx-auto max-w-7xl lg:px-8">

            {{-- Judul Halaman --}}
            <div class="max-w-2xl mx-auto text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Program Studi Kami</h2>
                <p class="mt-4 text-lg leading-8 text-gray-600">
                    Temukan passion dan keahlianmu di salah satu program studi unggulan kami.
                </p>
            </div>

            {{-- Kontainer Grid untuk Kartu --}}
            <div
                class="grid max-w-2xl grid-cols-1 mx-auto mt-16 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">

                {{-- Looping Data Program Studi --}}
                @forelse ($programStudis as $prodi)
                <a href="{{ $prodi->link ?? '#' }}"
                    class="block transition-all duration-300 bg-white shadow-lg rounded-xl ring-1 ring-gray-900/5 hover:shadow-2xl hover:-translate-y-1">
                    <article class="flex flex-col items-start justify-between h-full">
                        <div class="w-full">
                            {{-- Gambar Program Studi --}}
                            <div class="relative w-full">
                                <img src="{{ asset('storage/' . $prodi->image) }}" alt="Gambar {{ $prodi->name }}"
                                    class="aspect-[4/5] sm:aspect-[2/3] lg:aspect-[3/4] w-full rounded-t-xl bg-gray-100 object-cover">
                                <div class="absolute inset-0 rounded-t-xl ring-1 ring-inset ring-gray-900/10">
                                </div>
                            </div>

                            {{-- Konten Teks --}}
                            <div class="p-6">
                                <div class="relative group">
                                    <h3 class="text-xl font-semibold leading-6 text-gray-900 group-hover:text-blue-600">
                                        {{ $prodi->name }}
                                    </h3>
                                    <p class="mt-3 text-sm leading-6 text-gray-600 line-clamp-3">
                                        {{ $prodi->description }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {{-- Tombol Aksi / Footer Kartu --}}
                        <div class="p-6 pt-0 mt-auto">
                            <span class="font-semibold text-blue-600">
                                Lihat Detail &rarr;
                            </span>
                        </div>
                    </article>
                </a>
                @empty
                {{-- Tampilan jika tidak ada data --}}
                <div class="col-span-1 py-12 text-center md:col-span-2 lg:col-span-3">
                    <p class="text-gray-500">Belum ada program studi yang tersedia.</p>
                </div>
                @endforelse

            </div>
        </div>
        {{--
        </x-app-layout> --}}
    </div>
</section>