{{--
    Section: FEATURE
    Feature cards in a grid (existing from modular.blade.php).
    
    JSON keys: items [{icon, title, desc}], columns (optional, default 3)
--}}
@php
    $data = $section->decoded_content ?? $data ?? [];
    $columns = $data['columns'] ?? 3;
    $gridClass = match((int)$columns) {
        2 => 'md:grid-cols-2',
        4 => 'md:grid-cols-4',
        default => 'md:grid-cols-3',
    };
@endphp

<section class="py-16 bg-gray-100">
    <div class="container px-6 mx-auto">
        @if(!empty($data['title']))
        <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold text-gray-800">{{ $data['title'] }}</h2>
            @if(!empty($data['subtitle']))
                <p class="mt-2 text-lg text-gray-600">{{ $data['subtitle'] }}</p>
            @endif
        </div>
        @endif

        <div class="grid gap-8 text-center {{ $gridClass }}">
            @foreach ($data['items'] ?? [] as $item)
            <div class="p-6 transition bg-white shadow rounded-xl hover:shadow-lg">
                <i class="{{ $item['icon'] ?? '' }} text-4xl text-purple-600 mb-4"></i>
                <h3 class="mb-2 text-xl font-semibold">{{ $item['title'] ?? '' }}</h3>
                <p class="text-gray-600">{{ $item['desc'] ?? '' }}</p>
            </div>
            @endforeach
        </div>
    </div>
</section>
