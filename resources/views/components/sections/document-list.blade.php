{{--
    Section: DOCUMENT-LIST
    List of downloadable documents grouped by category.
    
    JSON keys: title, subtitle, items [{title, description, file_url, file_type, file_size}]
--}}
@php $data = $section->decoded_content ?? $data ?? []; @endphp

<section class="py-16 bg-white">
    <div class="max-w-5xl px-6 mx-auto lg:px-12">
        @if(!empty($data['title']))
        <div class="mb-12 text-center">
            <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                    <img src="{{ asset('assets/img/icon/element.svg') }}" alt="Icon" class="w-8 h-8">
                </div>
                <span class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                    {{ $data['title'] }}
                </span>
            </h2>
        </div>
        @endif

        <div class="space-y-4">
            @foreach ($data['items'] ?? [] as $item)
            <div class="flex items-center justify-between p-5 transition bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 hover:shadow-sm">
                <div class="flex items-center space-x-4">
                    {{-- File type icon --}}
                    <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg">
                        <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>

                    <div>
                        <h3 class="font-semibold text-gray-800">{{ $item['title'] ?? '' }}</h3>
                        @if(!empty($item['description']))
                            <p class="text-sm text-gray-500">{{ $item['description'] }}</p>
                        @endif
                        @if(!empty($item['file_type']) || !empty($item['file_size']))
                            <p class="text-xs text-gray-400 mt-1">
                                {{ strtoupper($item['file_type'] ?? '') }}
                                @if(!empty($item['file_size'])) · {{ $item['file_size'] }} @endif
                            </p>
                        @endif
                    </div>
                </div>

                @if(!empty($item['file_url']))
                <a href="{{ asset($item['file_url']) }}" target="_blank" download
                    class="flex items-center px-4 py-2 text-sm font-semibold text-orange-600 transition bg-white border border-orange-200 rounded-lg hover:bg-orange-50">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    Unduh
                </a>
                @endif
            </div>
            @endforeach
        </div>
    </div>
</section>
