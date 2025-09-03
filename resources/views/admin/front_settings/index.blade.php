<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Pengaturan Front Pages
        </h2>
    </x-slot>

    <div class="py-10">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
            {{-- Notifikasi Sukses --}}
            @if (session('success'))
            <div class="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400">
                {{ session('success') }}
            </div>
            @endif

            <form action="{{ route('admin.frontsettings.update') }}" method="POST" enctype="multipart/form-data"
                class="p-6 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                @csrf

                {{-- Logo --}}
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Logo Website
                    </label>
                    <input type="file" name="site_logo"
                        class="block w-full text-sm text-gray-700 border rounded-lg dark:bg-gray-700 dark:text-gray-200">
                    @if(isset($settings['site_logo']))
                    <div class="mt-2">
                        <img src="{{ asset('storage/'.$settings['site_logo']->value) }}" alt="Logo" class="h-12">
                    </div>
                    @endif
                </div>

                {{-- Favicon --}}
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Favicon
                    </label>
                    <input type="file" name="site_favicon"
                        class="block w-full text-sm text-gray-700 border rounded-lg dark:bg-gray-700 dark:text-gray-200">
                    @if(isset($settings['site_favicon']))
                    <div class="mt-2">
                        <img src="{{ asset('storage/'.$settings['site_favicon']->value) }}" alt="Favicon" class="h-8">
                    </div>
                    @endif
                </div>

                {{-- Meta Title --}}
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Meta Title (SEO)
                    </label>
                    <input type="text" name="meta_title"
                        value="{{ old('meta_title', $settings['meta_title']->value ?? '') }}"
                        class="block w-full text-sm text-gray-700 border rounded-lg dark:bg-gray-700 dark:text-gray-200">
                </div>

                {{-- Meta Description --}}
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Meta Description (SEO)
                    </label>
                    <textarea name="meta_description" rows="3"
                        class="block w-full text-sm text-gray-700 border rounded-lg dark:bg-gray-700 dark:text-gray-200">{{ old('meta_description', $settings['meta_description']->value ?? '') }}</textarea>
                </div>

                {{-- Google Analytics --}}
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Google Analytics Script
                    </label>
                    <textarea name="google_analytics" rows="3"
                        class="block w-full text-sm text-gray-700 border rounded-lg dark:bg-gray-700 dark:text-gray-200">{{ old('google_analytics', $settings['google_analytics']->value ?? '') }}</textarea>
                    <p class="mt-1 text-xs text-gray-500">Masukkan kode script GA (misal: G-XXXXXXX).</p>
                </div>

                {{-- Tombol Submit --}}
                <div class="flex justify-end">
                    <x-button variant="blue" type="submit">
                        Simpan Pengaturan
                    </x-button>
                </div>
            </form>
        </div>
    </div>
</x-app-layout>