<section class="py-16 bg-gray-50 lg:py-24 dark:bg-gray-900">
    <div class="container px-6 mx-auto max-w-7xl">

        {{-- Judul Utama --}}
        <div class="max-w-3xl mx-auto mb-12 text-center">
            <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                    <img src="{{ asset('assets/img/icon/element.svg') }}" alt="Icon" class="w-8 h-8">
                </div>
                <span
                    class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                    {{ $data['title'] ?? '' }}
                </span>
            </h2>
            <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Mengenal lebih dekat jajaran pimpinan yang berdedikasi untuk kemajuan institusi.
            </p>
        </div>

        {{-- Tabs Struktur Organisasi --}}
        <div x-data="{ activeTab: 'yayasan' }" class="w-full max-w-6xl mx-auto">

            {{-- Layout utama --}}
            <div class="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">

                {{-- Sidebar Navigasi --}}
                <div class="md:col-span-1">
                    <div class="flex flex-col space-y-2">
                        @foreach (['yayasan', 'manajemen', 'kaprodi'] as $key)
                        @php $section = $data['struktur_organisasi'][$key]; @endphp
                        <button @click="activeTab = '{{ $key }}'"
                            :class="activeTab === '{{ $key }}' ? 'bg-orange-600 text-white shadow-md' : 'bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'"
                            class="w-full px-4 py-3 text-left transition-colors duration-300 rounded-lg focus:outline-none">
                            <span class="font-semibold">{{ $section['title'] }}</span>
                        </button>
                        @endforeach
                    </div>
                </div>

                {{-- Konten Tiap Tab --}}
                <div class="md:col-span-3">
                    @foreach (['yayasan', 'manajemen', 'kaprodi'] as $key)
                    @php $section = $data['struktur_organisasi'][$key]; @endphp
                    <div x-show="activeTab === '{{ $key }}'" x-transition:enter="transition ease-out duration-300"
                        x-transition:enter-start="opacity-0 transform -translate-x-4"
                        x-transition:enter-end="opacity-100 transform translate-x-0" class="space-y-12">

                        {{-- Deskripsi Section --}}
                        @if (!empty($section['description']))
                        <p class="pb-6 text-gray-600 border-b dark:text-gray-400 dark:border-gray-700">
                            {{ $section['description'] }}
                        </p>
                        @endif

                        {{-- Grid Anggota --}}
                        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            @foreach ($section['members'] as $member)
                            <div class="p-6 text-center bg-white rounded-lg shadow-md dark:bg-gray-800">
                                <img src="{{ asset($member['photo']) }}" alt="{{ $member['name'] }}"
                                    class="object-cover w-32 h-32 mx-auto rounded-full shadow-lg"
                                    onerror="this.onerror=null;this.src='{{ asset('assets/img/defaults/default-avatar.png') }}';">
                                <h4 class="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                                    {{ $member['name'] }}
                                </h4>
                                <p class="text-sm font-medium text-orange-600 dark:text-orange-400">
                                    {{ $member['position'] }}
                                </p>
                            </div>
                            @endforeach
                        </div>
                    </div>
                    @endforeach
                </div>

            </div>
        </div>
    </div>
</section>