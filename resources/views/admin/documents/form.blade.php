<div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama / Judul Dokumen</label>
        <input type="text" id="title" name="title" value="{{ old('title', $document->title ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contoh: Formulir Pendaftaran Mahasiswa Baru" required>
    </div>

    <div>
        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori Dokumen</label>
        <input type="text" id="category" name="category" value="{{ old('category', $document->category ?? '') }}" list="categoryList" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pilih atau ketik kategori baru" required>
        <datalist id="categoryList">
            <option value="Akademik">
            <option value="Kemahasiswaan">
            <option value="Keuangan">
            <option value="SOP / Pedoman">
            <option value="Umum">
        </datalist>
    </div>
</div>

<div class="mb-6">
    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi Singkat (Opsional)</label>
    <textarea id="description" name="description" rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{{ old('description', $document->description ?? '') }}</textarea>
</div>

<div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File Dokumen</label>
    
    @if(isset($document) && $document->file_path)
        <div class="mb-3 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-between">
            <div class="flex items-center text-sm">
                <svg class="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                <span class="text-gray-900 dark:text-white font-medium">File Saat Ini Terlampir</span>
            </div>
            <a href="{{ asset($document->file_path) }}" target="_blank" class="text-blue-600 hover:underline text-sm font-medium">Lihat/Unduh File</a>
        </div>
    @endif
    
    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_path" name="file_path" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" {{ !isset($document) ? 'required' : '' }}>
    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Format yang didukung: PDF, Word, Excel. Maksimal ukuran file 10MB.</p>
</div>

<div class="flex items-center mb-4">
    <input id="is_active" name="is_active" type="checkbox" value="1" {{ old('is_active', $document->is_active ?? true) ? 'checked' : '' }} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    <label for="is_active" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Buat dokumen ini berstatus Publik (dapat dilihat & diunduh)</label>
</div>
