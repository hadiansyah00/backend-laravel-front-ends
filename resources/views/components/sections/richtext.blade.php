{{--
    Section: RICHTEXT
    Rich text content section with CKEditor output.
    
    JSON keys: title (optional), content (HTML string), background (optional)
--}}
@php $data = $section->decoded_content ?? $data ?? []; @endphp

<section class="{{ $data['background'] ?? 'bg-white' }} py-16">
    <div class="container max-w-4xl px-6 mx-auto lg:px-12">
        @if(!empty($data['title']))
        <div class="mb-10 text-center">
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

        <div class="prose prose-lg max-w-none prose-gray prose-headings:text-gray-800 prose-a:text-orange-600">
            {!! $data['content'] ?? '' !!}
        </div>
    </div>
</section>
