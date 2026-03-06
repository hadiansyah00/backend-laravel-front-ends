<div class="mb-6">
    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul Pengumuman</label>
    <input type="text" id="title" name="title" value="{{ old('title', $pengumuman->title ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contoh: Pengumuman Registrasi Ulang" required>
</div>

<div class="mb-6">
    <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Isi Pengumuman</label>
    <textarea id="content" name="content" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tuliskan isi pengumuman/surat edaran secara lengkap di sini...">{{ old('content', $pengumuman->content ?? '') }}</textarea>
    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Anda dapat mendeksripsikan pengumuman atau membiarkannya kosong jika hanya mengunggah lampiran PDF.</p>
</div>

<div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lampiran (Opsional)</label>
    
    @if(isset($pengumuman) && $pengumuman->attachment)
        <div class="mb-3 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-between">
            <div class="flex items-center text-sm">
                <svg class="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                <span class="text-gray-900 dark:text-white font-medium">File Saat Ini Terlampir</span>
            </div>
            <a href="{{ asset($pengumuman->attachment) }}" target="_blank" class="text-blue-600 hover:underline text-sm font-medium">Lihat File</a>
        </div>
    @endif
    
    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="attachment" name="attachment" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png">
    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Format yang didukung: PDF, Word (DOC/DOCX), Gambar (JPG/PNG). Maksimal ukuran file 5MB.</p>
</div>

<div class="flex items-center mb-4">
    <input id="is_active" name="is_active" type="checkbox" value="1" {{ old('is_active', $pengumuman->is_active ?? true) ? 'checked' : '' }} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    <label for="is_active" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Terbitkan Pengumuman Sekarang</label>
</div>
