@csrf
@method('PUT')

{{-- Bagian Meta Dasar --}}
<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
    {{-- Kolom Kiri: Judul dan Deskripsi --}}
    <div class="md:col-span-1">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Meta Dasar</h3>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Pengaturan SEO fundamental untuk mesin pencari seperti Google.
        </p>
    </div>

    {{-- Kolom Kanan: Input Form --}}
    <div class="p-6 bg-white rounded-lg shadow-md md:col-span-2 dark:bg-gray-800">
        {{-- Meta Description --}}
        <div class="mb-4">
            <label for="meta_description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Meta
                Description</label>
            <textarea id="meta_description" name="meta_description" rows="3"
                class="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Deskripsi singkat halaman...">{{ old('meta_description', $meta->meta_description) }}</textarea>
            @error('meta_description')<p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ $message }}</p>@enderror
        </div>

        {{-- Keywords --}}
        <div class="mb-4">
            <label for="keywords" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Keywords</label>
            <input type="text" id="keywords" name="keywords"
                class="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value="{{ old('keywords', $meta->keywords) }}" placeholder="keyword1, keyword2, keyword3">
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Pisahkan setiap keyword dengan koma.</p>
            @error('keywords')<p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ $message }}</p>@enderror
        </div>

        {{-- Robots --}}
        <div class="mb-4">
            <label for="robots" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Robots</label>
            <input type="text" id="robots" name="robots"
                class="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value="{{ old('robots', $meta->robots) }}" placeholder="index, follow">
            @error('robots')<p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ $message }}</p>@enderror
        </div>

        {{-- Canonical URL --}}
        <div>
            <label for="canonical_url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Canonical
                URL</label>
            <input type="url" id="canonical_url" name="canonical_url"
                class="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value="{{ old('canonical_url', $meta->canonical_url) }}" placeholder="https://domain.com/url-halaman">
            @error('canonical_url')<p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ $message }}</p>@enderror
        </div>
    </div>
</div>

<hr class="my-8 border-gray-200 dark:border-gray-700">

{{-- Bagian Open Graph --}}
<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
    <div class="md:col-span-1">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Open Graph</h3>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Pengaturan untuk tampilan saat link dibagikan di media sosial seperti Facebook & LinkedIn.
        </p>
    </div>

    <div class="p-6 bg-white rounded-lg shadow-md md:col-span-2 dark:bg-gray-800">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <label for="og_title" class="block mb-2 text-sm font-medium">OG Title</label>
                <input type="text" id="og_title" name="og_title"
                    class="block w-full p-2.5 text-sm rounded-lg border bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value="{{ old('og_title', $meta->og_title) }}">
            </div>
            <div>
                <label for="og_type" class="block mb-2 text-sm font-medium">OG Type</label>
                <input type="text" id="og_type" name="og_type"
                    class="block w-full p-2.5 text-sm rounded-lg border bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value="{{ old('og_type', $meta->og_type) }}" placeholder="website / article">
            </div>
        </div>

        <div class="mt-4">
            <label for="og_description" class="block mb-2 text-sm font-medium">OG Description</label>
            <textarea id="og_description" name="og_description" rows="2"
                class="block w-full p-2.5 text-sm rounded-lg border bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">{{ old('og_description', $meta->og_description) }}</textarea>
        </div>

        <div class="mt-4">
            <label for="og_url" class="block mb-2 text-sm font-medium">OG URL</label>
            <input type="url" id="og_url" name="og_url"
                class="block w-full p-2.5 text-sm rounded-lg border bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value="{{ old('og_url', $meta->og_url) }}">
        </div>

        <div class="mt-4">
            <label for="og_site_name" class="block mb-2 text-sm font-medium">OG Site Name</label>
            <input type="text" id="og_site_name" name="og_site_name"
                class="block w-full p-2.5 text-sm rounded-lg border bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value="{{ old('og_site_name', $meta->og_site_name) }}">
        </div>

        <div class="mt-4">
            <label for="og_image" class="block mb-2 text-sm font-medium">OG Image</label>
            @if($meta->og_image)
            <div class="mb-2">
                <img src="{{ asset('storage/'.$meta->og_image) }}" alt="OG Image Preview"
                    class="object-cover h-24 rounded-lg">
            </div>
            @endif
            <input type="file" id="og_image" name="og_image"
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Rekomendasi ukuran: 1200x630 pixels.</p>
        </div>
    </div>
</div>

<hr class="my-8 border-gray-200 dark:border-gray-700">

{{-- Bagian Twitter Card --}}
<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
    <div class="md:col-span-1">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Twitter Card</h3>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Pengaturan untuk tampilan saat link dibagikan di Twitter.
        </p>
    </div>

    <div class="p-6 bg-white rounded-lg shadow-md md:col-span-2 dark:bg-gray-800">
        {{-- Inputs for Twitter Card --}}
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <label for="twitter_card" class="block mb-2 text-sm font-medium">Twitter Card</label>
                <input type="text" id="twitter_card" name="twitter_card"
                    class="block w-full p-2.5 text-sm rounded-lg border bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value="{{ old('twitter_card', $meta->twitter_card) }}" placeholder="summary_large_image">
            </div>
            <div>
                <label for="twitter_site" class="block mb-2 text-sm font-medium">Twitter Site</label>
                <input type="text" id="twitter_site" name="twitter_site"
                    class="block w-full p-2.5 text-sm rounded-lg border bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value="{{ old('twitter_site', $meta->twitter_site) }}" placeholder="@username">
            </div>
        </div>
        <div class="mt-4">
            <label for="twitter_title" class="block mb-2 text-sm font-medium">Twitter Title</label>
            <input type="text" id="twitter_title" name="twitter_title"
                class="block w-full p-2.5 text-sm rounded-lg border bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value="{{ old('twitter_title', $meta->twitter_title) }}">
        </div>
        <div class="mt-4">
            <label for="twitter_description" class="block mb-2 text-sm font-medium">Twitter Description</label>
            <textarea id="twitter_description" name="twitter_description" rows="2"
                class="block w-full p-2.5 text-sm rounded-lg border bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">{{ old('twitter_description', $meta->twitter_description) }}</textarea>
        </div>
        <div class="mt-4">
            <label for="twitter_image" class="block mb-2 text-sm font-medium">Twitter Image</label>
            @if($meta->twitter_image)
            <div class="mb-2">
                <img src="{{ asset('storage/'.$meta->twitter_image) }}" alt="Twitter Image Preview"
                    class="object-cover h-24 rounded-lg">
            </div>
            @endif
            <input type="file" id="twitter_image" name="twitter_image"
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Rekomendasi ukuran: 800x418 pixels.</p>
        </div>
    </div>
</div>

{{-- Tombol Aksi --}}
<div class="flex items-center justify-end pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
    <a href="{{ route('admin.pages.index') }}"
        class="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        Kembali
    </a>
    <button type="submit"
        class="px-5 py-2.5 ml-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Simpan Perubahan
    </button>
</div>