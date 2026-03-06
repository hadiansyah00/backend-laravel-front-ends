{{--
    Section: TEAM-GRID
    Grid of team member cards with tabbed prodi navigation.
    Replaces: dosen/sdm-stikes
    
    JSON keys: title, subtitle, background, dosen [{prodi, tetap [{name, photo, position, expertise []}], tidak_tetap [...]}]
--}}
@php $data = $section->decoded_content ?? $data ?? []; @endphp

<section class="py-20 lg:py-24 {{ $data['background'] ?? 'bg-gray-50' }}">
    <div class="container px-6 mx-auto lg:px-12">

        {{-- Section Title --}}
        <div class="max-w-4xl mx-auto mb-16 text-center">
            <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                    <img src="{{ asset('assets/img/icon/element.svg') }}" alt="Icon" class="w-8 h-8">
                </div>
                <span class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                    {{ $data['title'] ?? 'Tim Kami' }}
                </span>
            </h2>
            @if(!empty($data['subtitle']))
                <p class="mt-4 text-xl text-gray-600">{{ $data['subtitle'] }}</p>
            @endif
        </div>

        @php
            // Ambil data groups dari JSON
            $groups = $data['groups'] ?? [];

            // Jika kosong, coba load dinamis dari database Dosen
            if (empty($groups)) {
                $allDosens = \App\Models\Dosen::where('is_active', true)->orderBy('order')->orderBy('name')->get();
                if ($allDosens->count() > 0) {
                    $grouped = $allDosens->groupBy('prodi');
                    foreach ($grouped as $prodiName => $members) {
                        $groups[] = [
                            'title' => $prodiName ?: 'Umum / Lainnya',
                            'members' => $members->map(function($d) {
                                return [
                                    'name' => $d->name,
                                    'position' => $d->position,
                                    // Compatibility mapping photo -> image/photo
                                    'photo' => $d->photo ? asset($d->photo) : null,
                                ];
                            })->toArray()
                        ];
                    }
                }
            }
        @endphp

        {{-- Tabbed Groups Navigation --}}
        @if(!empty($groups))
        <div x-data="{ activeTab: '{{ Str::slug($groups[0]['title'] ?? 'tab-0') }}' }" class="w-full mx-auto max-w-7xl">
            <div class="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">

                {{-- Sidebar Tabs --}}
                <aside class="mb-12 lg:col-span-1 lg:mb-0">
                    <h3 class="px-4 mb-4 text-lg font-semibold text-gray-800">Kategori</h3>
                    <ul class="space-y-2">
                        @foreach ($groups as $index => $group)
                        <li>
                            <a href="#" @click.prevent="activeTab = '{{ Str::slug($group['title'] ?? 'tab-'.$index) }}'"
                                :class="{ 'bg-orange-600 text-white shadow-md': activeTab === '{{ Str::slug($group['title'] ?? 'tab-'.$index) }}', 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600': activeTab !== '{{ Str::slug($group['title'] ?? 'tab-'.$index) }}' }"
                                class="flex items-center w-full px-4 py-3 font-medium transition duration-150 rounded-lg">
                                <span>{{ $group['title'] ?? 'Group ' . ($index + 1) }}</span>
                            </a>
                        </li>
                        @endforeach
                    </ul>
                </aside>

                {{-- Content Panels --}}
                <main class="lg:col-span-3">
                    @foreach ($groups as $index => $group)
                    <div x-show="activeTab === '{{ Str::slug($group['title'] ?? 'tab-'.$index) }}'" style="display: none;" x-transition.opacity>
                        
                        @if (!empty($group['members']))
                        <div>
                            <h2 class="mb-8 text-2xl font-bold text-gray-800">{{ $group['title'] }}</h2>
                            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                                @foreach ($group['members'] as $dosen)
                                    @include('components.sections.partials.team-card', ['dosen' => $dosen])
                                @endforeach
                            </div>
                        </div>
                        @else
                            <p class="text-gray-500 italic">Belum ada data anggota di kategori ini.</p>
                        @endif

                    </div>
                    @endforeach
                </main>
            </div>
        </div>
        @elseif(!empty($data['members']))
        {{-- Fallback: Simple members grid without tabs --}}
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            @foreach ($data['members'] as $member)
                @include('components.sections.partials.team-card', ['dosen' => $member])
            @endforeach
        </div>
        @else
        <div class="text-center text-gray-500">
            <p>Belum ada data dosen/tim yang ditambahkan.</p>
        </div>
        @endif
    </div>
</section>
