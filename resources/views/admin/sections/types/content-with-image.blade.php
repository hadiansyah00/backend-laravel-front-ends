{{-- Form untuk tipe: content-with-image --}}
<div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2">
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul</label>
            <input type="text" name="content[title]" value="{{ old('content.title', $content['title'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" required>
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Subjudul (Opsional)</label>
            <input type="text" name="content[subtitle]" value="{{ old('content.subtitle', $content['subtitle'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
    </div>

    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Teks Perkenalan (Introduction - Opsional)</label>
        <textarea name="content[introduction]" rows="2"
            class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">{{ old('content.introduction', $content['introduction'] ?? '') }}</textarea>
    </div>

    {{-- Paragraf Konten Khusus (Alpine Array Builder) --}}
    <div x-data="{ paragraphs: {{ json_encode(old('content.content', $content['content'] ?? [])) }} }" class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Paragraf Konten</h4>
            <button type="button" @click="paragraphs.push('')" class="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">Tambah Paragraf</button>
        </div>
        
        <template x-for="(paragraph, index) in paragraphs" :key="index">
            <div class="flex items-start gap-2 mb-2">
                <textarea x-model="paragraphs[index]" :name="`content[content][${index}]`" rows="2" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="Isi paragraf..."></textarea>
                <button type="button" @click="paragraphs.splice(index, 1)" class="p-2 text-red-600 hover:bg-red-50 rounded-md">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        </template>
        <p x-show="paragraphs.length === 0" class="text-sm italic text-gray-500">Tidak ada paragraf.</p>
    </div>

    {{-- Optional Visi Misi Blocks (for profil-stikes compatibility) --}}
    <div class="grid gap-4 md:grid-cols-2">
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Visi (Opsional)</label>
            <textarea name="content[vision]" rows="3"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white mb-2">{{ old('content.vision', $content['vision'] ?? '') }}</textarea>
                
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Misi (Pisahkan dengan baris baru)</label>
            @php 
                $missionText = is_array($content['mission'] ?? '') ? implode("\n", $content['mission']) : ($content['mission'] ?? '');
            @endphp
            <textarea name="content_mission_raw" rows="4" placeholder="1. Misi pertama&#10;2. Misi kedua..."
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">{{ old('content_mission_raw', $missionText) }}</textarea>
            <p class="mt-1 text-xs text-gray-500">Tiap baris otomatis jadi item misi terpisah.</p>
        </div>
        
        <div class="space-y-4">
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">URL Gambar Samping</label>
                <input type="text" name="content[image]" value="{{ old('content.image', $content['image'] ?? '') }}"
                    placeholder="assets/img/side-image.jpg"
                    class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            </div>
            
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Posisi Layout Teks</label>
                <select name="content[layout]" class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                    <option value="left" {{ (old('content.layout', $content['layout'] ?? 'left') === 'left') ? 'selected' : '' }}>Teks di Kiri, Gambar Kanan</option>
                    <option value="right" {{ (old('content.layout', $content['layout'] ?? 'left') === 'right') ? 'selected' : '' }}>Teks di Kanan, Gambar Kiri</option>
                </select>
            </div>
            
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Gaya Background (Class Tailwind)</label>
                <input type="text" name="content[background]" value="{{ old('content.background', $content['background'] ?? 'bg-white') }}"
                    placeholder="bg-slate-50"
                    class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            </div>
        </div>
    </div>
</div>
