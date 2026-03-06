<div class="grid gap-6 mb-6 md:grid-cols-2">
    <div class="md:col-span-2">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul Event / Kegiatan</label>
        <input type="text" id="title" name="title" value="{{ old('title', $event->title ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contoh: Seminar Nasional Kesehatan 2026" required>
    </div>

    <div>
        <label for="start_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal & Waktu Mulai</label>
        <input type="datetime-local" id="start_date" name="start_date" value="{{ old('start_date', isset($event) ? $event->start_date->format('Y-m-d\TH:i') : '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
    </div>

    <div>
        <label for="end_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal & Waktu Selesai (Opsional)</label>
        <input type="datetime-local" id="end_date" name="end_date" value="{{ old('end_date', isset($event) && $event->end_date ? $event->end_date->format('Y-m-d\TH:i') : '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>

    <div class="md:col-span-2">
        <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lokasi / Tempat (Opsional)</label>
        <input type="text" id="location" name="location" value="{{ old('location', $event->location ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contoh: Aula Utama Kampus / Zoom Meeting">
    </div>
</div>

<div class="mb-6">
    <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi Event (Opsional)</label>
    <textarea id="content" name="content" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tuliskan deskripsi ringkas tentang event ini...">{{ old('content', $event->content ?? '') }}</textarea>
</div>

<div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gambar Poster / Thumbnail (Opsional)</label>
    @if(isset($event) && $event->image)
        <div class="mb-3">
            <img src="{{ asset($event->image) }}" alt="Preview Poster" class="object-cover h-32 rounded-lg w-auto border border-gray-300">
        </div>
    @endif
    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image" name="image" type="file" accept="image/*">
    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Rekomendasi rasio landscape (16:9) atau potret poster (4:5). Maksimal 2MB.</p>
</div>

<div class="flex items-center mb-4">
    <input id="is_active" name="is_active" type="checkbox" value="1" {{ old('is_active', $event->is_active ?? true) ? 'checked' : '' }} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    <label for="is_active" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tampilkan Event di Website</label>
</div>
