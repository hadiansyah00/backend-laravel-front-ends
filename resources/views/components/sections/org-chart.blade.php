{{--
    Section: ORG-CHART
    Organizational structure with tabbed sidebar navigation.
    Replaces: struktur-organisasi/struktur-organisasi
    
    JSON keys: title, description, hierarchy (array of keys), 
               struktur_organisasi { key: { title, description, members [{name, position, photo, unit, order}] } }
--}}
@php
    $data = $section->decoded_content ?? $data ?? [];
    $hierarchy = $data['hierarchy'] ?? array_keys($data['struktur_organisasi'] ?? []);
@endphp

<section class="py-16 bg-gray-50 lg:py-24">
    <div class="container px-6 mx-auto max-w-7xl">

        {{-- Header --}}
        <div class="max-w-3xl mx-auto mb-12 text-center">
            <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                    <img src="{{ asset('assets/img/icon/element.svg') }}" class="w-8 h-8" alt="Icon">
                </div>
                <span class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                    {{ $data['title'] ?? 'Struktur Organisasi' }}
                </span>
            </h2>
            @if(!empty($data['description']))
                <p class="mt-4 text-lg text-gray-600">{{ $data['description'] }}</p>
            @endif
        </div>

        {{-- Tabs --}}
        @if(!empty($data['struktur_organisasi']))
        <div x-data="{ activeTab: '{{ $hierarchy[0] ?? '' }}' }" class="w-full max-w-6xl mx-auto">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">

                {{-- Sidebar --}}
                <div class="md:col-span-1">
                    <div class="flex flex-col space-y-2">
                        @foreach ($hierarchy as $key)
                            @if(isset($data['struktur_organisasi'][$key]))
                            @php $orgSection = $data['struktur_organisasi'][$key]; @endphp
                            <button @click="activeTab = '{{ $key }}'"
                                :class="activeTab === '{{ $key }}'
                                    ? 'bg-orange-600 text-white shadow-md'
                                    : 'bg-white text-gray-800 hover:bg-gray-100'"
                                class="w-full px-4 py-3 text-left transition-all duration-300 rounded-lg">
                                <span class="font-semibold">{{ $orgSection['title'] }}</span>
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
                            $orgSection = $data['struktur_organisasi'][$key];
                            $members = collect($orgSection['members'] ?? [])->sortBy('order');
                        @endphp

                        <div x-show="activeTab === '{{ $key }}'"
                            x-transition:enter="transition ease-out duration-300"
                            x-transition:enter-start="opacity-0 translate-y-4"
                            x-transition:enter-end="opacity-100 translate-y-0"
                            class="space-y-10">

                            @if (!empty($orgSection['description']))
                                <p class="pb-6 text-gray-600 border-b">{{ $orgSection['description'] }}</p>
                            @endif

                            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                @foreach ($members as $member)
                                <div class="relative p-6 text-center transition-transform bg-white shadow-md rounded-xl hover:-translate-y-1">
                                    <img src="{{ $member['photo'] ? asset($member['photo']) : asset('assets/img/defaults/default-avatar.png') }}"
                                        alt="{{ $member['name'] }}"
                                        class="object-cover w-32 h-32 mx-auto rounded-full ring-4 ring-orange-500">

                                    <h4 class="mt-4 text-lg font-bold text-gray-900">{{ $member['name'] }}</h4>
                                    <p class="text-sm font-semibold text-orange-600">{{ $member['position'] }}</p>

                                    @if (!empty($member['unit']))
                                    <span class="inline-block px-3 py-1 mt-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
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
        @endif
    </div>
</section>
