@php
// 🔒 HIERARKI DIKUNCI DI BLADE (JSON BEBAS URUTAN)
$hierarchy = [
'yayasan',
'pimpinan',
'wakil_ketua',
'unit_penjaminan',
'sek_prodi',
'kaprodi',
'laboran',
'unit_pelaksana',
];
@endphp

<section class="py-16 bg-gray-50 lg:py-24 dark:bg-gray-900">
    <div class="container px-6 mx-auto max-w-7xl">

        {{-- Header --}}
        <div class="max-w-3xl mx-auto mb-12 text-center">
            <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                    <img src="{{ asset('assets/img/icon/element.svg') }}" class="w-8 h-8" alt="Icon">
                </div>
                <span
                    class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                    {{ $data['title'] }}
                </span>
            </h2>
            <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
                {{ $data['description'] }}
            </p>
        </div>

        {{-- Tabs Wrapper --}}
        <div x-data="{ activeTab: '{{ $hierarchy[0] }}' }" class="w-full max-w-6xl mx-auto">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">

                {{-- Sidebar --}}
                <div class="md:col-span-1">
                    <div class="flex flex-col space-y-2">
                        @foreach ($hierarchy as $key)
                        @if(isset($data['struktur_organisasi'][$key]))
                        @php $section = $data['struktur_organisasi'][$key]; @endphp

                        <button @click="activeTab = '{{ $key }}'"
                            :class="activeTab === '{{ $key }}'
                                        ? 'bg-orange-600 text-white shadow-md'
                                        : 'bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'"
                            class="w-full px-4 py-3 text-left transition-all duration-300 rounded-lg">
                            <span class="font-semibold">{{ $section['title'] }}</span>
                        </button>
                        @endif
                        @endforeach
                    </div>
                </div>

                {{-- Content --}}
                <div class="md:col-span-3">
                    @foreach ($hierarchy as $key)
                    @if(isset($data['struktur_organisasi'][$key]))
                    @php
                    $section = $data['struktur_organisasi'][$key];
                    $members = collect($section['members'])->sortBy('order');
                    @endphp

                    <div x-show="activeTab === '{{ $key }}'" x-transition:enter="transition ease-out duration-300"
                        x-transition:enter-start="opacity-0 translate-y-4"
                        x-transition:enter-end="opacity-100 translate-y-0" class="space-y-10">

                        {{-- Section Description --}}
                        @if (!empty($section['description']))
                        <p class="pb-6 text-gray-600 border-b dark:text-gray-400 dark:border-gray-700">
                            {{ $section['description'] }}
                        </p>
                        @endif

                        {{-- Members --}}
                        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            @foreach ($members as $member)
                            <div
                                class="relative p-6 text-center transition-transform bg-white shadow-md rounded-xl hover:-translate-y-1 dark:bg-gray-800">
                                <img src="{{ $member['photo'] ? asset($member['photo']) : asset('assets/img/defaults/default-avatar.png') }}"
                                    alt="{{ $member['name'] }}"
                                    class="object-cover w-32 h-32 mx-auto rounded-full ring-4 ring-orange-500">

                                <h4 class="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                                    {{ $member['name'] }}
                                </h4>

                                <p class="text-sm font-semibold text-orange-600 dark:text-orange-400">
                                    {{ $member['position'] }}
                                </p>

                                @if (!empty($member['unit']))
                                <span
                                    class="inline-block px-3 py-1 mt-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                    {{ $member['unit'] }}
                                </span>
                                @endif
                            </div>
                            @endforeach
                        </div>

                    </div>
                    @endif
                    @endforeach
                </div>

            </div>
        </div>
    </div>
</section>