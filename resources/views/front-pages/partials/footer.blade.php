<footer class="text-white" id="page-footer">
    {{-- ============================================= --}}
    {{-- == Bagian Atas (Partner Logos) - bg-orange-800 == --}}
    {{-- ============================================= --}}
    <div class="bg-orange-700">
        <div class="container px-6 py-8 mx-auto">
            @php
            $partners = [
            [
            'logo' => asset('assets/img/icon/logo_putih_sbh.png'),
            'alt' => 'Sekolah Tinggi Ilmu Kesehatan Bogor Husada'
            ],
            [
            'logo' => asset('assets/img/icon/logo_putih_diktisaintek.webp'),
            'url' => 'https://kemdiktisaintek.go.id/',
            'alt' => 'DIKTISAINTEK BERDAMPAK'
            ],
            [
            'logo' => asset('assets/img/icon/rs-azra.png'),
            'url' => 'https://rsazra.co.id/',
            'alt' => 'Rumah Sakit AZRA Bogor'
            ],
            [
            'logo' => asset('assets/img/icon/logo-tagline-sbh.png'),
            'alt' => 'Sustainable Development Goals'
            ],
            ];
            @endphp

            <div class="flex flex-wrap items-center justify-center gap-8 md:justify-around">
                @foreach ($partners as $partner)
                @if (!empty($partner['url']))
                <a href="{{ $partner['url'] }}" target="_blank" rel="noopener noreferrer" class="block">
                    <img src="{{ $partner['logo'] }}" alt="{{ $partner['alt'] }}"
                        class="h-10 transition duration-300 md:h-12 opacity-80 hover:opacity-100">
                </a>
                @else
                <div class="block">
                    <img src="{{ $partner['logo'] }}" alt="{{ $partner['alt'] }}"
                        class="h-10 transition duration-300 md:h-12 opacity-80 hover:opacity-100">
                </div>
                @endif
                @endforeach
            </div>
        </div>
    </div>

    {{-- ============================================= --}}
    {{-- == Bagian Bawah (Informasi Utama) - bg-orange-600 == --}}
    {{-- ============================================= --}}
    <div class="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900">
        <div class="container px-6 py-12 mx-auto">
            {{-- Baris Grid Utama (Kontak & Links) --}}
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

                {{-- Kolom 1: Info Kontak --}}
                <div>
                    <p class="mt-4 text-sm text-white">
                        {{ setting('contact_address', 'Jl. Contoh No. 123, Kota Bogor, Jawa Barat 16161') }}
                    </p>
                    <div class="mt-4 space-y-2 text-sm">
                        <a href="tel:{{ setting('contact_phone_link', '#') }}"
                            class="flex items-center gap-2 text-white transition-colors duration-300 hover:text-white">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                                </path>
                            </svg>
                            <span>{{ setting('contact_phone', 'Nomor Telepon Belum Diatur') }}</span>
                        </a>
                        <a href="mailto:{{ setting('contact_email_link', '#') }}"
                            class="flex items-center gap-2 text-white transition-colors duration-300 hover:text-white">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                </path>
                            </svg>
                            <span>{{ setting('contact_email', 'Email Belum Diatur') }}</span>
                        </a>
                    </div>
                </div>

                {{-- Kolom 2, 3, 4: Link Lists dari JSON --}}
                @php
                $footerLinkGroups = json_decode(setting('footer_links', '[]'), true);
                @endphp
                @foreach ($footerLinkGroups as $linkGroup)
                <div>
                    <h3 class="font-semibold text-white uppercase">{{ $linkGroup['title'] ?? 'Judul' }}</h3>
                    <ul class="mt-4 space-y-2 text-sm">
                        @foreach ($linkGroup['links'] ?? [] as $link)
                        <li>
                            <a href="{{ $link['url'] ?? '#' }}"
                                class="text-white transition-colors duration-300 hover:text-white">
                                {{ $link['text'] ?? 'Link' }}
                            </a>
                        </li>
                        @endforeach
                    </ul>
                </div>
                @endforeach
            </div>

            {{-- Garis Pemisah --}}
            <hr class="my-10 border-white">

            {{-- Baris Copyright & Socials --}}
            <div class="flex flex-col items-center sm:flex-row sm:justify-between">
                <p class="text-sm text-white">{{ setting('copyright_text', '© Copyright ' . date('Y') . '. All
                    Rights Reserved.') }}</p>

                @php
                $socials = json_decode(setting('social_links', '[]'), true);
                @endphp
                <div class="flex items-center mt-4 -mx-2 sm:mt-0">
                    @foreach ($socials as $social)
                    <a href="{{ $social['url'] ?? '#' }}"
                        class="px-2 text-white transition-colors duration-300 hover:text-white"
                        aria-label="{{ $social['name'] ?? 'Social Media' }}">
                        <i class="{{ $social['icon'] ?? '' }} w-5 h-5"></i>
                    </a>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</footer>