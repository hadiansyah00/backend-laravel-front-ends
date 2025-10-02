<main>
    <section class="py-16 bg-gray-50 sm:py-20 md:py-24">
        <div class="container px-4 mx-auto sm:px-6 lg:px-8">

            {{-- Judul Section --}}
            <div class="max-w-3xl mx-auto mb-12 text-center md:mb-16">
                <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                    <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                        <img src="{{ asset('assets/img/icon/element.svg') }}" alt="Icon" class="w-8 h-8">
                    </div>
                    <span
                        class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                        {{ $data['title'] ?? '' }}
                    </span>
                </h2>
                <p class="mt-4 text-lg text-gray-600">
                    Temukan program studi yang sesuai dengan minat dan bakat Anda untuk meraih masa depan yang gemilang.
                </p>
            </div>

            {{-- Grid untuk Kartu --}}
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

                {{-- Loop untuk setiap program studi --}}
                @foreach ($data['programs'] as $program)
                {{-- Setiap kartu adalah tautan --}}
                <a href="{{ url('pendidikan/' . $program['slug']) }}" class="block group">
                    <div
                        class="flex flex-col h-full overflow-hidden transition-all duration-300 transform bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2">

                        {{-- Gambar Program Studi --}}
                        {{-- PERBAIKAN DI SINI: hapus h-56, tambahkan aspect-square --}}
                        <div class="relative overflow-hidden aspect-square">
                            <img src="{{ asset($program['image']) }}" alt="{{ $program['name'] }}" {{-- Pastikan class
                                w-full h-full tetap ada agar gambar mengisi div --}}
                                class="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110">

                            {{-- Badge Akreditasi --}}
                            @php
                            $grade = $program['accreditation']['grade'];
                            $badgeDetails = match ($grade) {
                            'Baik Sekali' => ['class' => 'bg-green-100 text-green-800'],
                            'Unggul' => ['class' => 'bg-yellow-100 text-yellow-800'],
                            default => ['class' => 'bg-blue-100 text-blue-800'], /* Saya perbaiki text-green-800 jadi
                            text-blue-800 */
                            };
                            @endphp
                            <div
                                class="absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full shadow-sm {{ $badgeDetails['class'] }}">
                                {{ $grade }}
                            </div>
                        </div>

                        {{-- Konten Teks Kartu --}}
                        <div class="flex flex-col flex-grow p-6">
                            {{-- Nama dan Jenjang --}}
                            <div>
                                <p class="text-sm font-semibold tracking-wider text-orange-600 uppercase">{{
                                    $program['level'] }}</p>
                                <h3
                                    class="mt-1 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-orange-700">
                                    {{ $program['name'] }}</h3>
                            </div>

                            {{-- Deskripsi --}}
                            <p class="flex-grow mt-4 text-gray-600 line-clamp-3">
                                {{ $program['description'] }}
                            </p>

                            {{-- Tombol --}}
                            <div class="mt-6">
                                <span
                                    class="inline-flex items-center px-5 py-2 text-sm font-semibold text-white transition duration-300 bg-orange-600 rounded-lg shadow-md group-hover:bg-orange-700 group-hover:shadow-lg">
                                    Selengkapnya
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </div>

                            {{-- Ketua Program Studi --}}
                            <div class="pt-4 mt-6 border-t border-gray-200">
                                <p class="text-sm text-gray-500">Ketua Program Studi</p>
                                <p class="font-semibold text-gray-800">{{ $program['head'] }}</p>
                            </div>
                        </div>
                    </div>
                </a>
                @endforeach
            </div>
        </div>
    </section>
</main>