{{--
    Section: STATS
    Statistics counter section.
    
    JSON keys: title, subtitle, background, items [{value, label, icon, suffix}]
--}}
@php $data = $section->decoded_content ?? $data ?? []; @endphp

<section class="{{ $data['background'] ?? 'bg-orange-600' }} py-16">
    <div class="container px-6 mx-auto lg:px-12">
        @if(!empty($data['title']))
        <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold text-white">{{ $data['title'] }}</h2>
            @if(!empty($data['subtitle']))
                <p class="mt-2 text-lg text-orange-100">{{ $data['subtitle'] }}</p>
            @endif
        </div>
        @endif

        <div class="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            @foreach ($data['items'] ?? [] as $item)
            <div class="p-6">
                @if(!empty($item['icon']))
                <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full">
                    <i class="{{ $item['icon'] }} text-2xl text-white"></i>
                </div>
                @endif
                <div class="text-4xl font-extrabold text-white">
                    {{ $item['value'] ?? '0' }}{{ $item['suffix'] ?? '' }}
                </div>
                <p class="mt-2 text-sm font-medium text-orange-100 uppercase tracking-wider">
                    {{ $item['label'] ?? '' }}
                </p>
            </div>
            @endforeach
        </div>
    </div>
</section>
