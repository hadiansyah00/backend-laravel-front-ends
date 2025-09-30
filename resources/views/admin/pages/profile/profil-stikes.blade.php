<section class="py-20 lg:py-24 {{ $data['background'] ?? 'bg-white' }}">
    <div class="container px-6 mx-auto lg:px-12">
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

            {{-- Kolom Kiri: Konten Teks (Intro, Visi, Misi) --}}
            <div class="space-y-10">
                {{-- Judul dengan aksen warna --}}
                <div>
                    <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                        <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                            <img src="{{ asset('assets/img/icon/element.svg') }}" alt="Icon" class="w-8 h-8">
                        </div>
                        <span
                            class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                            {{ $data['title'] ?? '' }}
                        </span>
                    </h2>
                    @if (!empty($data['subtitle']))
                    <p class="mt-4 text-lg text-gray-600">
                        {{ $data['subtitle'] }}
                    </p>
                    @endif
                </div>

                @if (!empty($data['introduction']))
                <p class="text-lg leading-relaxed text-gray-700">
                    {{ $data['introduction'] }}
                </p>
                @endif

                {{-- Blok Visi & Misi yang disatukan --}}
                <div class="space-y-8">
                    @if (!empty($data['vision']))
                    <div class="p-6 border-l-4 border-orange-500 rounded-r-lg bg-gray-50">
                        <h3 class="mb-2 text-xl font-bold text-gray-800">Visi</h3>
                        <p class="italic text-gray-700">"{{ $data['vision'] }}"</p>
                    </div>
                    @endif

                    @if (!empty($data['mission']))
                    <div>
                        <h3 class="mb-4 text-xl font-bold text-gray-800">Misi</h3>
                        <ul class="space-y-4">
                            @foreach ($data['mission'] as $mission)
                            <li class="flex items-start">
                                {{-- Icon check SVG untuk tampilan lebih tajam --}}
                                <svg class="flex-shrink-0 w-6 h-6 mt-1 text-orange-500"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p class="ml-3 text-gray-700">{{ $mission }}</p>
                            </li>
                            @endforeach
                        </ul>
                    </div>
                    @endif
                </div>
            </div>

            {{-- Kolom Kanan: Gambar dengan Aksen Dekoratif --}}
            @if (!empty($data['image']))
            <div class="relative">
                {{-- Elemen dekoratif di belakang gambar --}}
                <div class="absolute top-0 right-0 w-11/12 h-full -mt-8 -mr-8 bg-orange-100 rounded-3xl"></div>
                <div class="relative overflow-hidden shadow-xl rounded-2xl">
                    <img src="{{ asset($data['image']) }}" alt="Profil STIKes Bogor Husada"
                        class="object-cover w-full h-auto">
                </div>
            </div>
            @endif
        </div>
    </div>
</section>