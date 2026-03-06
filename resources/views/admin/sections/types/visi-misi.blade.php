{{-- Form untuk tipe: visi-misi --}}
<div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2">
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul Section</label>
            <input type="text" name="content[title]" value="{{ old('content.title', $content['title'] ?? 'Visi & Misi') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" required>
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Subjudul (Opsional)</label>
            <input type="text" name="content[subtitle]" value="{{ old('content.subtitle', $content['subtitle'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
    </div>

    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Teks Visi</label>
        <textarea name="content[visi]" rows="3"
            class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" required>{{ old('content.visi', $content['visi'] ?? $content['vision'] ?? '') }}</textarea>
    </div>

    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Daftar Misi (Pisahkan dengan baris baru / enter)</label>
        @php 
            $misiItems = $content['misi'] ?? $content['mission'] ?? [];
            $misiText = is_array($misiItems) ? implode("\n", $misiItems) : $misiItems;
        @endphp
        <textarea name="content_misi_raw" rows="6" placeholder="1. Menyelenggarakan pendidikan unggul...&#10;2. Melakukan penelitian inovatif..."
            class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" required>{{ old('content_misi_raw', $misiText) }}</textarea>
        <p class="mt-1 text-xs text-gray-500">Setiap baris kode di atas akan otomatis dikonversi menjadi satu poin misi yang terpisah. Kosongkan baris ekstra.</p>
    </div>
</div>
