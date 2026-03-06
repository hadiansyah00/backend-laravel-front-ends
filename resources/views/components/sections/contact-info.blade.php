{{--
    Section: CONTACT-INFO
    Contact information with optional map embed.
    
    JSON keys: title, subtitle, address, phone, email, whatsapp, map_embed_url,
               social_links [{platform, url, icon}], office_hours
--}}
@php $data = $section->decoded_content ?? $data ?? []; @endphp

<section class="py-16 bg-gray-50">
    <div class="max-w-6xl px-6 mx-auto lg:px-12">
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
        </div>
        @endif

        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {{-- Contact Details --}}
            <div class="p-8 bg-white shadow-md rounded-2xl space-y-6">
                @if(!empty($data['address']))
                <div class="flex items-start space-x-4">
                    <svg class="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                        <h3 class="font-semibold text-gray-800">Alamat</h3>
                        <p class="text-gray-600">{{ $data['address'] }}</p>
                    </div>
                </div>
                @endif

                @if(!empty($data['phone']))
                <div class="flex items-start space-x-4">
                    <svg class="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <div>
                        <h3 class="font-semibold text-gray-800">Telepon</h3>
                        <p class="text-gray-600">{{ $data['phone'] }}</p>
                    </div>
                </div>
                @endif

                @if(!empty($data['email']))
                <div class="flex items-start space-x-4">
                    <svg class="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <div>
                        <h3 class="font-semibold text-gray-800">Email</h3>
                        <p class="text-gray-600">{{ $data['email'] }}</p>
                    </div>
                </div>
                @endif

                @if(!empty($data['office_hours']))
                <div class="flex items-start space-x-4">
                    <svg class="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                        <h3 class="font-semibold text-gray-800">Jam Operasional</h3>
                        <p class="text-gray-600">{{ $data['office_hours'] }}</p>
                    </div>
                </div>
                @endif
            </div>

            {{-- Map --}}
            @if(!empty($data['map_embed_url']))
            <div class="overflow-hidden shadow-md rounded-2xl">
                <iframe src="{{ $data['map_embed_url'] }}" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            @endif
        </div>
    </div>
</section>
