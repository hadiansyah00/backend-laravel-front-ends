{{--
    Section: TITLE
    Title section with background overlay.
    
    JSON keys: title, subtitle, background (image URL)
--}}
@php $data = $section->decoded_content ?? $data ?? []; @endphp

<section class="relative py-20 text-white bg-center bg-cover"
    style="background-image:url('{{ asset($data['background'] ?? '') }}')">
    <div class="absolute inset-0 bg-black/50"></div>
    <div class="relative z-10 max-w-3xl mx-auto text-center">
        <h2 class="mb-4 text-4xl font-extrabold">
            {{ $data['title'] ?? '' }}
        </h2>
        <p class="text-lg">
            {{ $data['subtitle'] ?? '' }}
        </p>
    </div>
</section>
