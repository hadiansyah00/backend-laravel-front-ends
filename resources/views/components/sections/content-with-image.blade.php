{{--
    Section: CONTENT-WITH-IMAGE
    Two-column layout with text (title, subtitle, content paragraphs) and an image.
    Replaces: title-sejarah, profil-stikes
    
    JSON keys: title, subtitle, content (array of paragraphs), image, layout (left/right), background,
               introduction (optional), vision (optional), mission (optional array)
--}}
@php
    $data = $section->decoded_content ?? $data ?? [];
    $layout = $data['layout'] ?? 'left';
@endphp

<section id="{{ Str::slug($data['title'] ?? 'content') }}" class="{{ $data['background'] ?? 'bg-white' }} py-20 lg:py-24 overflow-hidden">
    <div class="container px-6 mx-auto lg:px-12">
        <div class="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

            {{-- Text Column --}}
            <div class="@if($layout === 'right') order-2 @endif">
                <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                    <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                        <img src="{{ asset('assets/img/icon/element.svg') }}" alt="Icon" class="w-8 h-8">
                    </div>
                    <span class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                        {{ $data['title'] ?? '' }}
                    </span>
                </h2>

                <div class="mt-8 space-y-6">
                    @if(!empty($data['subtitle']))
                        <p class="text-xl font-light text-gray-600">{{ $data['subtitle'] }}</p>
                    @endif

                    @if(!empty($data['introduction']))
                        <p class="text-lg leading-relaxed text-gray-700">{{ $data['introduction'] }}</p>
                    @endif

                    @if(!empty($data['content']))
                        <div class="prose max-w-none prose-gray">
                            @foreach($data['content'] as $paragraph)
                                <p>{{ $paragraph }}</p>
                            @endforeach
                        </div>
                    @endif

                    {{-- Optional Visi & Misi block (for profil-stikes compatibility) --}}
                    @if(!empty($data['vision']) || !empty($data['mission']))
                    <div class="space-y-8">
                        @if(!empty($data['vision']))
                        <div class="p-6 border-l-4 border-orange-500 rounded-r-lg bg-gray-50">
                            <h3 class="mb-2 text-xl font-bold text-gray-800">Visi</h3>
                            <p class="italic text-gray-700">"{{ $data['vision'] }}"</p>
                        </div>
                        @endif

                        @if(!empty($data['mission']))
                        <div>
                            <h3 class="mb-4 text-xl font-bold text-gray-800">Misi</h3>
                            <ul class="space-y-4">
                                @foreach($data['mission'] as $mission)
                                <li class="flex items-start">
                                    <svg class="flex-shrink-0 w-6 h-6 mt-1 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p class="ml-3 text-gray-700">{{ $mission }}</p>
                                </li>
                                @endforeach
                            </ul>
                        </div>
                        @endif
                    </div>
                    @endif
                </div>
            </div>

            {{-- Image Column --}}
            @if(!empty($data['image']))
            <div class="@if($layout === 'right') order-1 @endif">
                <div class="p-4 bg-gray-100 shadow-xl rounded-2xl sm:p-6">
                    <img src="{{ asset($data['image']) }}" alt="{{ $data['title'] ?? '' }}" class="object-cover w-full h-full rounded-lg">
                </div>
            </div>
            @endif
        </div>
    </div>
</section>
