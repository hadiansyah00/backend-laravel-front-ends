@foreach ($sections as $section)
@php $data = $section->decoded_content; @endphp

<section class="py-16 bg-white sm:py-24">
    <div class="container px-6 mx-auto">
        {{-- Judul Utama --}}
        <div class="max-w-3xl mx-auto mb-12 text-center">
            <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {{ $data['title'] ?? 'Sejarah Institusi' }}
            </h2>
            <hr class="w-24 mx-auto mt-4 border-t-2 border-orange-500">
        </div>

        {{-- Konten Dua Kolom --}}
        <div class="grid max-w-5xl grid-cols-1 gap-12 mx-auto md:grid-cols-2 md:gap-16">
            {{-- Kolom Kiri --}}
            <div class="prose prose-lg text-gray-600">
                <p>{{ $data['introduction'] ?? '' }}</p>
                <p>{{ $data['vision'] ?? '' }}</p>
            </div>

            {{-- Kolom Kanan --}}
            <div>
                <div class="p-8 border bg-gray-50 rounded-2xl">
                    <h3 class="mb-6 text-xl font-bold text-gray-800">
                        {{ $data['pillars_title'] ?? 'Pilar Utama' }}
                    </h3>
                    <ul class="space-y-6">
                        @foreach ($data['pillars'] ?? [] as $pillar)
                        <li class="flex items-start">
                            <div class="flex-shrink-0">
                                <div
                                    class="flex items-center justify-center w-12 h-12 text-orange-600 bg-orange-100 rounded-full">
                                    <i class="{{ $pillar['icon'] }} fa-lg"></i>
                                </div>
                            </div>
                            <div class="ml-4">
                                <p class="text-base text-gray-700">
                                    {{ $pillar['text'] }}
                                </p>
                            </div>
                        </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
@endforeach