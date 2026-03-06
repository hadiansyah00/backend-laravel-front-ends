{{--
    Section: CARD-GRID
    Grid of cards with icon, title, and description.
    Replaces: peluang-kerja (kebidanan/farmasi/gizi), program-studi/program-studi
    
    JSON keys: title, subtitle, background, columns (2/3/4, default 2), items [{title, description, icon_svg, image, link}]
--}}
@php
    $data = $section->decoded_content ?? $data ?? $content ?? [];
    $columns = $data['columns'] ?? 2;
    $gridClass = match((int)$columns) {
        3 => 'md:grid-cols-3',
        4 => 'md:grid-cols-4',
        default => 'md:grid-cols-2',
    };
@endphp

<section class="{{ $data['background'] ?? 'bg-gray-50' }} py-16" id="{{ Str::slug($data['title'] ?? 'cards') }}">
    <div class="max-w-6xl px-6 mx-auto lg:px-12">

        {{-- Section Title --}}
        @if(!empty($data['title']))
        <div class="mb-12 text-center">
            <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                    <img src="{{ asset('assets/img/icon/element.svg') }}" alt="Icon" class="w-8 h-8">
                </div>
                <span class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                    {{ $data['title'] ?? '' }}
                </span>
            </h2>
            @if(!empty($data['subtitle']))
                <p class="max-w-2xl mx-auto mt-4 text-lg text-gray-600">{{ $data['subtitle'] }}</p>
            @endif
        </div>
        @endif

        {{-- Grid Items --}}
        <div class="grid grid-cols-1 gap-8 {{ $gridClass }}">
            @foreach ($data['items'] ?? [] as $item)
            <div class="p-8 space-y-4 transition-all duration-300 ease-in-out bg-white shadow-md rounded-2xl hover:shadow-xl hover:-translate-y-2">
                {{-- Icon --}}
                @if(!empty($item['icon_svg']) || !empty($item['image']))
                <div class="flex-shrink-0">
                    @if(!empty($item['image']))
                        <img src="{{ asset($item['image']) }}" alt="{{ $item['title'] ?? '' }}" class="object-cover w-full h-40 rounded-lg">
                    @elseif(!empty($item['icon_svg']))
                        <span class="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl">
                            {!! $item['icon_svg'] !!}
                        </span>
                    @else
                        <span class="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl">
                            <svg class="text-orange-600 w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                        </span>
                    @endif
                </div>
                @endif

                {{-- Text --}}
                <div>
                    <h3 class="mb-2 text-xl font-bold text-gray-900">{{ $item['title'] ?? '' }}</h3>
                    <p class="text-base leading-relaxed text-gray-600">{{ $item['description'] ?? '' }}</p>
                </div>

                {{-- Optional Link --}}
                @if(!empty($item['link']))
                <a href="{{ $item['link'] }}" class="inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-800">
                    Selengkapnya →
                </a>
                @endif
            </div>
            @endforeach
        </div>
    </div>
</section>
