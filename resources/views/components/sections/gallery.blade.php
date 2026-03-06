{{--
    Section: GALLERY
    Photo/video gallery grid with lightbox support.
    
    JSON keys: title, subtitle, items [{image, thumbnail, caption, type (image/video/youtube), url}]
--}}
@php $data = $section->decoded_content ?? $data ?? []; @endphp

<section class="py-16 bg-gray-50">
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

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            @foreach ($data['items'] ?? [] as $item)
            <div class="overflow-hidden transition-all duration-300 bg-white shadow-md group rounded-xl hover:shadow-xl hover:-translate-y-1">
                <div class="relative aspect-video">
                    <img src="{{ asset($item['thumbnail'] ?? $item['image'] ?? '') }}"
                        alt="{{ $item['caption'] ?? '' }}"
                        class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        loading="lazy">

                    @if(($item['type'] ?? 'image') === 'video' || ($item['type'] ?? '') === 'youtube')
                    <div class="absolute inset-0 flex items-center justify-center bg-black/20">
                        <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                    @endif
                </div>

                @if(!empty($item['caption']))
                <div class="p-4">
                    <p class="text-sm text-gray-600">{{ $item['caption'] }}</p>
                </div>
                @endif
            </div>
            @endforeach
        </div>
    </div>
</section>
