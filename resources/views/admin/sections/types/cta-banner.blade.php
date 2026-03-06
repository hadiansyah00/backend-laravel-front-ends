{{-- Form untuk tipe: cta-banner --}}
<div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2">
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul Utama CTA</label>
            <input type="text" name="content[title]" value="{{ old('content.title', $content['title'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" required>
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi Ajakan</label>
            <input type="text" name="content[description]" value="{{ old('content.description', $content['description'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
        
        <hr class="col-span-2 my-2 border-gray-200 dark:border-gray-700">

        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Teks Tombol</label>
            <input type="text" name="content[button_text]" value="{{ old('content.button_text', $content['button_text'] ?? 'Daftar Sekarang') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">URL Tujuan Tombol</label>
            <input type="text" name="content[button_url]" value="{{ old('content.button_url', $content['button_url'] ?? '#') }}"
                placeholder="/pmb/daftar"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>

        <hr class="col-span-2 my-2 border-gray-200 dark:border-gray-700">
        
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Warna Background</label>
            <input type="text" name="content[background_color]" value="{{ old('content.background_color', $content['background_color'] ?? 'bg-orange-600') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            <p class="mt-1 text-xs text-gray-500">Gunakan class color Tailwind, e.g. bg-blue-700. Default: bg-orange-600.</p>
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Gambar Latar (Background Image)</label>
            <input type="text" name="content[background_image]" value="{{ old('content.background_image', $content['background_image'] ?? '') }}"
                placeholder="assets/img/bg-cta.jpg"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
    </div>
</div>
