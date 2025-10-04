{{--
Catatan:
1. Pastikan Anda sudah menginstall Alpine.js di proyek Laravel Anda.
- npm install alpinejs
- import 'alpinejs' di resources/js/app.js Anda.
2. Kode JavaScript untuk generate slug ada di bagian bawah.
--}}

<div x-data="{
        title: '{{ old('title', $article->title ?? '') }}',
        slug: '{{ old('slug', $article->slug ?? '') }}',
        status: '{{ old('status', $article->status ?? 'draft') }}',
        imagePreview: '{{ !empty($article->thumbnail) ? asset('storage/' . $article->thumbnail) : '' }}'
    }" x-init="$watch('title', value => { slug = generateSlug(value) })" class="grid grid-cols-1 gap-8 lg:grid-cols-3">

    {{-- Kolom Utama --}}
    <div class="space-y-8 lg:col-span-2">
        {{-- Kartu Konten Utama --}}
        <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="space-y-6">
                {{-- Error Messages --}}
                @if ($errors->any())
                <div
                    class="p-4 text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg dark:bg-red-900 dark:text-red-200 dark:border-red-700">
                    <span class="font-medium">Oops! Ada beberapa kesalahan:</span>
                    <ul class="mt-1.5 space-y-1 list-disc list-inside">
                        @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
                @endif

                {{-- Judul --}}
                <div>
                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                        Judul Artikel
                    </label>
                    <input type="text" name="title" id="title" x-model="title"
                        class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                </div>

                {{-- Slug --}}
                <div>
                    <label for="slug" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                        Slug
                    </label>
                    <input type="text" name="slug" id="slug" x-model="slug"
                        class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Slug akan dibuat otomatis dari judul. Bisa
                        diubah manual jika perlu.</p>
                </div>

                {{-- Excerpt --}}
                <div>
                    <label for="excerpt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                        Ringkasan (Excerpt)
                    </label>
                    <textarea name="excerpt" id="excerpt" rows="3"
                        class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{{ old('excerpt', $article->excerpt ?? '') }}</textarea>
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Ringkasan singkat tentang artikel ini.</p>
                </div>

                {{-- Konten --}}
                <div x-cloak>
                    <label for="content" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
                        Konten
                    </label>
                    <textarea name="content" id="editor" rows="12"
                        class="block w-full p-3 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white @error('content') border-red-500 focus:ring-red-500 @enderror">{{ old('content', $article->content ?? '') }}</textarea>
                    @error('content')
                    <p class="mt-1 text-xs text-red-600 dark:text-red-400">{{ $message }}</p>
                    @enderror
                </div>
            </div>
        </div>
    </div>

    {{-- Sidebar --}}
    <div class="space-y-8 lg:col-span-1">
        {{-- Kartu Publikasi --}}
        <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Publikasi</h3>
            <div class="space-y-6">
                {{-- Status --}}
                <div>
                    <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                        Status
                    </label>
                    <select name="status" id="status" x-model="status"
                        class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                {{-- Tanggal Publikasi (Conditional) --}}
                <div x-show="status === 'published'" x-transition>
                    <label for="published_at" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                        Tanggal Publikasi
                    </label>
                    <input type="datetime-local" name="published_at" id="published_at"
                        value="{{ old('published_at', isset($article->published_at) ? $article->published_at->format('Y-m-d\TH:i') : now()->format('Y-m-d\TH:i')) }}"
                        class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
            </div>
        </div>

        {{-- Kartu Kategori & Tags --}}
        {{-- Kartu Kategori & Tags --}}
        <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="space-y-6">
                {{-- Kategori (tidak berubah) --}}
                <div>
                    <label for="category_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                        Kategori
                    </label>
                    <select name="category_id" id="category_id"
                        class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">-- Pilih Kategori --</option>
                        @foreach($categories as $category)
                        <option value="{{ $category->id }}" {{ old('category_id', $article->category_id ?? '') ==
                            $category->id
                            ? 'selected' : '' }}>
                            {{ $category->name }}
                        </option>
                        @endforeach
                    </select>
                </div>

                {{-- Tags (INI BAGIAN YANG BARU) --}}
                <div x-data="{
                    initTagify() {
                        let input = this.$refs.tagsInput;
                        let tagify = new Tagify(input, {
                            whitelist: JSON.parse(input.dataset.whitelist),
                            originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(','),
                            dropdown: {
                                maxItems: 20,
                                classname: 'tags-look', // class untuk styling dropdown
                                enabled: 0,
                                closeOnSelect: false
                            }
                        });
                    }
                }" x-init="initTagify()">
                    <label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                        Tags
                    </label>
                    <input x-ref="tagsInput" name="tags" id="tags"
                        value="{{ old('tags', $selectedTags ? implode(',', $selectedTags) : '') }}"
                        data-whitelist="{{ $availableTags }}"
                        class="block w-full p-3 text-sm text-gray-900 border rounded-lg" />
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Ketik untuk menambah tag baru atau pilih
                        dari
                        daftar. Tekan enter atau koma untuk konfirmasi.</p>
                </div>
            </div>
        </div>

        {{-- Kartu Thumbnail --}}
        <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Thumbnail</h3>
            {{-- Image Preview --}}
            <div class="w-full p-2 mb-4 border border-dashed rounded-lg dark:border-gray-600"
                :class="{'hidden': !imagePreview}">
                <img :src="imagePreview" alt="Preview Thumbnail" class="object-cover w-full rounded">
            </div>

            {{-- Placeholder --}}
            <div x-show="!imagePreview" class="flex items-center justify-center w-full mb-4">
                <div
                    class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <svg class="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Preview akan tampil di sini</p>
                </div>
            </div>


            <input type="file" name="thumbnail" id="thumbnail"
                @change="let reader = new FileReader(); reader.onload = (e) => { imagePreview = e.target.result }; reader.readAsDataURL($event.target.files[0])"
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400" id="file_input_help">PNG, JPG, atau WEBP (MAX.
                2MB).</p>
        </div>
    </div>
</div>


<script>
    function generateSlug(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Ganti spasi dengan -
            .replace(/[^\w\-]+/g, '')       // Hapus karakter yang tidak valid
            .replace(/\-\-+/g, '-')         // Ganti beberapa - dengan satu -
            .replace(/^-+/, '')             // Trim - dari awal
            .replace(/-+$/, '');            // Trim - dari akhir
    }
</script>