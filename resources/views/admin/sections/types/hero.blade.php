{{-- Form untuk tipe: hero --}}
<div class="space-y-4">
    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul Utama</label>
        <input type="text" name="content[title]" value="{{ old('content.title', $content['title'] ?? '') }}"
            class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" required>
    </div>
    
    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Subjudul (Opsional)</label>
        <input type="text" name="content[subtitle]" value="{{ old('content.subtitle', $content['subtitle'] ?? '') }}"
            class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
    </div>

    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Warna Gradien (Opsional)</label>
        <input type="text" name="content[gradient_from]" value="{{ old('content.gradient_from', $content['gradient_from'] ?? 'orange-600') }}"
            placeholder="Contoh: orange-600, blue-500"
            class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        <p class="mt-1 text-xs text-gray-500">Gunakan class color Tailwind, misalnya: blue-600, red-500. Default: orange-600.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Background Image (Desktop)</label>
            <input type="text" name="content[background_image]" value="{{ old('content.background_image', $content['background_image'] ?? '') }}"
                placeholder="assets/img/hero.jpg"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Background Image (Mobile)</label>
            <input type="text" name="content[background_image_mobile]" value="{{ old('content.background_image_mobile', $content['background_image_mobile'] ?? '') }}"
                placeholder="assets/img/hero-mobile.jpg"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
    </div>

    {{-- Breadcrumbs Builder (Alpine) --}}
    <div x-data="{ breadcrumbs: {{ json_encode(old('content.breadcrumbs', $content['breadcrumbs'] ?? [])) }} }" class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Breadcrumbs</h4>
            <button type="button" @click="breadcrumbs.push({text: '', url: '#'})" class="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">Tambah Link</button>
        </div>
        
        <template x-for="(crumb, index) in breadcrumbs" :key="index">
            <div class="flex items-center gap-2 mb-2">
                <input type="text" x-model="crumb.text" :name="`content[breadcrumbs][${index}][text]`" placeholder="Label (ex: Tentang Kami)" class="w-1/2 p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                <input type="text" x-model="crumb.url" :name="`content[breadcrumbs][${index}][url]`" placeholder="URL (ex: /tentang)" class="w-1/2 p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                <button type="button" @click="breadcrumbs.splice(index, 1)" class="p-2 text-red-600 hover:bg-red-50 rounded-md">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        </template>
        
        <p x-show="breadcrumbs.length === 0" class="text-sm italic text-gray-500">Belum ada breadcrumb.</p>
    </div>
</div>
