{{--
    Section: CTA-BANNER
    Call-to-action banner with background, heading, description, and button.
    
    JSON keys: title, description, button_text, button_url, background_image, background_color
--}}
@php $data = $section->decoded_content ?? $data ?? []; @endphp

<section class="relative py-20 overflow-hidden {{ $data['background_color'] ?? 'bg-orange-600' }}"
    @if(!empty($data['background_image']))
    style="background-image: url('{{ asset($data['background_image']) }}'); background-size: cover; background-position: center;"
    @endif>

    @if(!empty($data['background_image']))
        <div class="absolute inset-0 bg-orange-600/85"></div>
    @endif

    <div class="container relative z-10 px-6 mx-auto text-center">
        <h2 class="text-3xl font-extrabold text-white md:text-4xl">
            {{ $data['title'] ?? '' }}
        </h2>
        @if(!empty($data['description']))
            <p class="max-w-2xl mx-auto mt-4 text-lg text-orange-100">
                {{ $data['description'] }}
            </p>
        @endif

        @if(!empty($data['button_text']))
        <div class="mt-8">
            <a href="{{ $data['button_url'] ?? '#' }}"
                class="inline-flex items-center px-8 py-4 text-lg font-bold text-orange-600 transition bg-white rounded-full hover:bg-gray-100 hover:shadow-lg">
                {{ $data['button_text'] }}
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
            </a>
        </div>
        @endif
    </div>
</section>
