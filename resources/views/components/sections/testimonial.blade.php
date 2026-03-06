{{--
    Section: TESTIMONIAL
    Testimonial carousel/grid section.
    
    JSON keys: title, subtitle, items [{name, position, quote, photo}]
--}}
@php $data = $section->decoded_content ?? $data ?? []; @endphp

<section class="py-16 bg-white">
    <div class="container px-6 mx-auto lg:px-12">
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
            @if(!empty($data['subtitle']))
                <p class="mt-4 text-lg text-gray-600">{{ $data['subtitle'] }}</p>
            @endif
        </div>
        @endif

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            @foreach ($data['items'] ?? [] as $item)
            <div class="p-8 bg-gray-50 rounded-2xl">
                {{-- Quote icon --}}
                <svg class="w-10 h-10 mb-4 text-orange-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z"/>
                </svg>

                <p class="mb-6 text-gray-600 leading-relaxed italic">"{{ $item['quote'] ?? '' }}"</p>

                <div class="flex items-center">
                    @if(!empty($item['photo']))
                    <img src="{{ asset($item['photo']) }}" alt="{{ $item['name'] ?? '' }}"
                        class="w-12 h-12 rounded-full object-cover mr-4">
                    @endif
                    <div>
                        <h4 class="font-bold text-gray-800">{{ $item['name'] ?? '' }}</h4>
                        <p class="text-sm text-orange-600">{{ $item['position'] ?? '' }}</p>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</section>
