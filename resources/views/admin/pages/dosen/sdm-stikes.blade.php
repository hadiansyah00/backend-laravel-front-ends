<section class="py-20 lg:py-24 {{ $data['background'] ?? 'bg-gray-50' }}">
    <div class="container px-6 mx-auto lg:px-12">

        {{-- 1. Judul Utama Halaman (Tetap sama) --}}
        <div class="max-w-4xl mx-auto mb-16 text-center">
            <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                    <img src="{{ asset('assets/img/icon/element.svg') }}" alt="Icon" class="w-8 h-8">
                </div>
                <span
                    class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                    {{ $data['title'] ?? '' }}
                </span>
            </h2>
            <p class="mt-4 text-xl text-gray-600">
                {{ $data['subtitle'] ?? '' }}
            </p>
        </div>

        {{-- 2. Layout Dua Kolom untuk Dosen --}}
        <div x-data="{ activeTab: '{{ $data['dosen'][0]['prodi'] ?? '' }}' }" class="w-full mx-auto max-w-7xl">
            <div class="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">

                {{-- KOLOM KIRI: Navigasi Sidebar Prodi --}}
                <aside class="mb-12 lg:col-span-1 lg:mb-0">
                    <h3 class="px-4 mb-4 text-lg font-semibold text-gray-800">Program Studi</h3>
                    <ul class="space-y-2">
                        @foreach ($data['dosen'] as $prodi)
                        <li>
                            <a href="#" @click.prevent="activeTab = '{{ $prodi['prodi'] }}'"
                                :class="{ 'bg-orange-600 text-white shadow-md': activeTab === '{{ $prodi['prodi'] }}', 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600': activeTab !== '{{ $prodi['prodi'] }}' }"
                                class="flex items-center w-full px-4 py-3 font-medium transition duration-150 rounded-lg">
                                <span>{{ $prodi['prodi'] }}</span>
                            </a>
                        </li>
                        @endforeach
                    </ul>
                </aside>

                {{-- KOLOM KANAN: Konten Daftar Dosen --}}
                <main class="lg:col-span-3">
                    @foreach ($data['dosen'] as $prodi)
                    <div x-show="activeTab === '{{ $prodi['prodi'] }}'" style="display: none;">

                        @if (!empty($prodi['tetap']))
                        <div class="mb-16">
                            <h2 class="mb-8 text-2xl font-bold text-gray-800">Dosen Tetap</h2>
                            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                                @foreach ($prodi['tetap'] as $dosen)
                                @include('admin.pages.dosen.partials.card', ['dosen' => $dosen])
                                @endforeach
                            </div>
                        </div>
                        @endif

                        @if (!empty($prodi['tidak_tetap']))
                        <div>
                            <h2 class="mb-8 text-2xl font-bold text-gray-800">Dosen Tidak Tetap</h2>
                            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                                @foreach ($prodi['tidak_tetap'] as $dosen)
                                @include('admin.pages.dosen.partials.card', ['dosen' => $dosen])
                                @endforeach
                            </div>
                        </div>
                        @endif
                    </div>
                    @endforeach
                </main>
            </div>
        </div>
        {{-- End Layout Dua Kolom untuk Dosen --}}

        {{-- 3. Bagian Tenaga Kependidikan (Tetap sama) --}}
        @if (!empty($data['tenaga_kependidikan']))

        <div
            class="pt-20 mt-20 border shadow-2xl rounded-3xl bg-gradient-to-b from-orange-100/60 to-orange-50/60 backdrop-blur-lg border-white/20">
            <div class="max-w-4xl mx-auto mb-16 text-center">
                <h2 class="text-3xl font-extrabold text-gray-900">Tenaga Kependidikan</h2>
                <p class="mt-3 text-lg text-gray-600">
                    Staf profesional yang mendukung operasional kampus.
                </p>
            </div>

            <div class="grid max-w-5xl grid-cols-1 gap-8 mx-auto mb-10 sm:grid-cols-2 lg:grid-cols-3">
                @foreach ($data['tenaga_kependidikan'] as $staff)
                <div class="text-center">
                    <img src="{{ asset($staff['photo']) }}" alt="{{ $staff['name'] }}"
                        class="object-cover w-40 h-40 mx-auto border-4 rounded-full shadow-lg border-white/50"
                        onerror="this.onerror=null;this.src='{{ asset('assets/img/defaults/default-avatar.png') }}';">
                    <h3 class="mt-4 text-xl font-bold text-gray-800">{{ $staff['name'] }}</h3>
                    <p class="font-semibold text-orange-800">{{ $staff['position'] }}</p>
                </div>
                @endforeach
            </div>
        </div>
        @endif
    </div>
</section>