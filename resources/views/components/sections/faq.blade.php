{{--
    Section: FAQ
    Accordion FAQ using Alpine.js.
    
    JSON keys: title, subtitle, items [{question, answer}]
--}}
@php $data = $section->decoded_content ?? $data ?? []; @endphp

<section class="py-16 bg-white">
    <div class="max-w-4xl px-6 mx-auto lg:px-12">
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

        <div class="space-y-4" x-data="{ open: null }">
            @foreach ($data['items'] ?? [] as $index => $item)
            <div class="overflow-hidden bg-gray-50 border border-gray-200 rounded-xl">
                <button @click="open === {{ $index }} ? open = null : open = {{ $index }}"
                    class="flex items-center justify-between w-full px-6 py-5 text-left transition hover:bg-gray-100">
                    <span class="text-lg font-semibold text-gray-800">{{ $item['question'] ?? '' }}</span>
                    <svg class="w-5 h-5 text-gray-500 transition-transform duration-300"
                        :class="{ 'rotate-180': open === {{ $index }} }"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div x-show="open === {{ $index }}"
                    x-transition:enter="transition ease-out duration-200"
                    x-transition:enter-start="opacity-0 -translate-y-2"
                    x-transition:enter-end="opacity-100 translate-y-0"
                    x-cloak
                    class="px-6 pb-5">
                    <div class="prose prose-gray max-w-none">
                        <p>{{ $item['answer'] ?? '' }}</p>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</section>
