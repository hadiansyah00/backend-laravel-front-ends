<main>



    {{-- 2. DAFTAR PROGRAM STUDI --}}
    <section class="py-20 bg-gray-50">
        <div class="container px-6 mx-auto lg:px-12">
            <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">

                @foreach ($data['programs'] as $program)
                <div
                    class="flex flex-col overflow-hidden transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-2">

                    {{-- Gambar Program Studi --}}
                    <div class="relative h-56">
                        <img src="{{ asset($program['image']) }}" alt="{{ $program['name'] }}"
                            class="aspect-[16/16] w-full object-cover transition-transform duration-300">

                        {{-- Badge Akreditasi --}}
                        @php
                        $grade = $program['accreditation']['grade'];
                        $badgeColor = 'bg-blue-600'; // Default color
                        if ($grade === 'Baik Sekali') $badgeColor = 'bg-green-600';
                        if ($grade === 'Unggul') $badgeColor = 'bg-yellow-500';
                        @endphp
                        <div
                            class="absolute top-4 right-4 px-3 py-1 text-sm font-semibold text-white {{ $badgeColor }} rounded-full shadow-md">
                            Akreditasi: {{ $grade }}
                        </div>
                    </div>

                    {{-- Konten Teks Kartu --}}
                    <div class="flex flex-col flex-grow p-6">
                        {{-- Nama dan Jenjang --}}
                        <div>
                            <p class="text-sm font-semibold text-orange-600">{{ $program['level'] }}</p>
                            <h3 class="mt-1 text-2xl font-bold text-gray-900">{{ $program['name'] }}</h3>
                        </div>

                        {{-- Deskripsi --}}
                        <p class="flex-grow mt-4 text-gray-600">
                            {{ $program['description'] }}
                        </p>

                        {{-- Ketua Program Studi --}}
                        <div class="pt-4 mt-6 border-t border-gray-200">
                            <p class="text-sm text-gray-500">Ketua Program Studi</p>
                            <p class="font-semibold text-gray-800">{{ $program['head'] }}</p>
                        </div>
                    </div>
                </div>
                @endforeach

            </div>
        </div>
    </section>
</main>