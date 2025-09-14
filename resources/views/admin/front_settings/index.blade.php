<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Pengaturan Front Pages & SEO
        </h2>
    </x-slot>

    <div class="py-10">
        <div class="max-w-5xl mx-auto sm:px-6 lg:px-8">
            {{-- Notifikasi Sukses --}}
            @if (session('success'))
            <div class="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400">
                {{ session('success') }}
            </div>
            @endif

            <form action="{{ route('admin.frontsettings.update') }}" method="POST" enctype="multipart/form-data"
                class="p-6 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                @csrf

                {{-- === Bagian Logo & Branding === --}}
                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Branding</h3>
                <div class="grid gap-6 sm:grid-cols-2">
                    {{-- Logo Main --}}
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Logo
                            Utama</label>
                        <input type="file" name="logo_main"
                            class="block w-full text-sm text-gray-700 border rounded-lg dark:bg-gray-700 dark:text-gray-200">
                        @if(isset($settings['logo_main']))
                        <div class="mt-2">
                            <img src="{{ asset('storage/'.$settings['logo_main']->value) }}" alt="Logo Main"
                                class="h-12">
                        </div>
                        @endif
                    </div>

                    {{-- Logo Sticky --}}
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Logo
                            Sticky</label>
                        <input type="file" name="logo_sticky"
                            class="block w-full text-sm text-gray-700 border rounded-lg dark:bg-gray-700 dark:text-gray-200">
                        @if(isset($settings['logo_sticky']))
                        <div class="mt-2">
                            <img src="{{ asset('storage/'.$settings['logo_sticky']->value) }}" alt="Logo Sticky"
                                class="h-12">
                        </div>
                        @endif
                    </div>

                    {{-- Favicon --}}
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Favicon</label>
                        <input type="file" name="site_favicon"
                            class="block w-full text-sm text-gray-700 border rounded-lg dark:bg-gray-700 dark:text-gray-200">
                        @if(isset($settings['site_favicon']))
                        <div class="mt-2">
                            <img src="{{ asset('storage/'.$settings['site_favicon']->value) }}" alt="Favicon"
                                class="h-8">
                        </div>
                        @endif
                    </div>
                </div>

                {{-- === SEO Meta === --}}
                <h3 class="pt-6 text-lg font-semibold text-gray-800 dark:text-gray-200">SEO Meta</h3>
                <div class="space-y-4">
                    {{-- Meta Title --}}
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Meta
                            Title</label>
                        <input type="text" name="meta_title"
                            value="{{ old('meta_title', $settings['meta_title']->value ?? '') }}"
                            class="block w-full text-sm text-gray-700 border rounded-lg dark:bg-gray-700 dark:text-gray-200">
                    </div>

                    {{-- Meta Description --}}
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Meta
                            Description</label>
                        <textarea name="meta_description" rows="3"
                            class="block w-full text-sm text-gray-700 border rounded-lg dark:bg-gray-700 dark:text-gray-200">{{ old('meta_description', $settings['meta_description']->value ?? '') }}</textarea>
                    </div>

                    {{-- Meta Keywords --}}
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Meta
                            Keywords</label>
                        <input type="text" name="meta_keywords"
                            value="{{ old('meta_keywords', $settings['meta_keywords']->value ?? '') }}"
                            placeholder="contoh: kampus, kesehatan, bogor, pmb"
                            class="block w-full text-sm text-gray-700 border rounded-lg dark:bg-gray-700 dark:text-gray-200">
                        <p class="mt-1 text-xs text-gray-500">Pisahkan dengan koma.</p>
                    </div>
                </div>

                {{-- === Open Graph (Facebook, WhatsApp) === --}}
                <h3 class="pt-6 text-lg font-semibold text-gray-800 dark:text-gray-200">Open Graph (Facebook / WhatsApp)
                </h3>
                <div class="space-y-4">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">OG Title</label>
                        <input type="text" name="og_title"
                            value="{{ old('og_title', $settings['og_title']->value ?? '') }}"
                            class="block w-full text-sm text-gray-700 border rounded-lg dark:bg-gray-700 dark:text-gray-200">
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">OG
                            Description</label>
                        <textarea name="og_description" rows="3"
                            class="block w-full text-sm text-gray-700 border rounded-lg dark:bg-gray-700 dark:text-gray-200">{{ old('og_description', $settings['og_description']->value ?? '') }}</textarea>
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">OG Image</label>
                        <input type="file" name="og_image"
                            class="block w-full text-sm text-gray-700 border rounded-lg dark:bg-gray-700 dark:text-gray-200">
                        @if(isset($settings['og_image']))
                        <div class="mt-2">
                            <img src="{{ asset('storage/'.$settings['og_image']->value) }}" alt="OG Image"
                                class="h-16 rounded">
                        </div>
                        @endif
                    </div>
                </div>

                {{-- === Twitter Card === --}}
                <h3 class="pt-6 text-lg font-semibold text-gray-800 dark:text-gray-200">Twitter Card</h3>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Tipe Twitter
                        Card</label>
                    <select name="twitter_card"
                        class="block w-full text-sm text-gray-700 border rounded-lg dark:bg-gray-700 dark:text-gray-200">
                        <option value="summary" {{ (old('twitter_card', $settings['twitter_card']->value ?? '') ==
                            'summary') ? 'selected' : '' }}>Summary</option>
                        <option value="summary_large_image" {{ (old('twitter_card', $settings['twitter_card']->value ??
                            '') == 'summary_large_image') ? 'selected' : '' }}>Summary Large Image</option>
                        <option value="app" {{ (old('twitter_card', $settings['twitter_card']->value ?? '') == 'app') ?
                            'selected' : '' }}>App</option>
                        <option value="player" {{ (old('twitter_card', $settings['twitter_card']->value ?? '') ==
                            'player') ? 'selected' : '' }}>Player</option>
                    </select>
                </div>

                {{-- === Google Analytics === --}}
                <h3 class="pt-6 text-lg font-semibold text-gray-800 dark:text-gray-200">Google Analytics</h3>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Google Analytics
                        Script</label>
                    <textarea name="google_analytics" rows="3"
                        class="block w-full text-sm text-gray-700 border rounded-lg dark:bg-gray-700 dark:text-gray-200">{{ old('google_analytics', $settings['google_analytics']->value ?? '') }}</textarea>
                    <p class="mt-1 text-xs text-gray-500">Masukkan kode script GA (misal: G-XXXXXXX).</p>
                </div>

                {{-- Tombol Submit --}}
                <div class="flex justify-end pt-6">
                    <x-button variant="blue" type="submit">
                        Simpan Pengaturan
                    </x-button>
                </div>
            </form>
        </div>
    </div>
</x-app-layout>