<div x-data="{
        title: '{{ old('title', $article->title ?? '') }}',
        slug: '{{ old('slug', $article->slug ?? '') }}',
        status: '{{ old('status', $article->status ?? 'draft') }}',
        imagePreview: '{{ !empty($article->thumbnail) ? asset('storage/' . $article->thumbnail) : '' }}'
    }" x-init="$watch('title', value => { slug = generateSlug(value) })" class="grid grid-cols-1 gap-8 lg:grid-cols-3">

    {{-- ========================== --}}
    {{-- KOLOM UTAMA --}}
    {{-- ========================== --}}
    <div class="space-y-8 lg:col-span-2">
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
                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Judul
                        Artikel</label>
                    <input type="text" name="title" id="title" x-model="title"
                        class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required>
                </div>

                {{-- Slug --}}
                <div>
                    <label for="slug"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Slug</label>
                    <input type="text" name="slug" id="slug" x-model="slug"
                        class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Slug akan dibuat otomatis dari judul, tapi
                        bisa diubah manual.</p>
                </div>

                {{-- Excerpt --}}
                <div>
                    <label for="excerpt"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Ringkasan
                        (Excerpt)</label>
                    <textarea name="excerpt" id="excerpt" rows="3"
                        class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">{{ old('excerpt', $article->excerpt ?? '') }}</textarea>
                </div>

                {{-- Konten --}}
                <div>
                    <label for="content"
                        class="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-200">Konten</label>
                    <textarea name="content" id="editor" rows="12"
                        class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">{{ old('content', $article->content ?? '') }}</textarea>
                </div>
            </div>
        </div>

        {{-- ========================== --}}
        {{-- PENGATURAN SEO --}}
        {{-- ========================== --}}
        <div class="space-y-8">

            {{-- 🧠 SEO SETTINGS --}}
            <div class="bg-white border border-gray-100 shadow-md dark:bg-gray-800 rounded-xl dark:border-gray-700">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        <i class="text-blue-500 bx bx-globe me-1"></i> Pengaturan SEO
                    </h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Atur metadata dasar agar artikel mudah ditemukan di mesin pencari (Google, Bing, dsb).
                    </p>
                </div>

                <div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
                    {{-- Meta Description --}}
                    <div class="md:col-span-2">
                        <x-input-label for="meta_description" value="Meta Description" />
                        <textarea name="meta_description" id="meta_description" rows="2" class="w-full form-textarea"
                            placeholder="Deskripsi singkat artikel untuk SEO">{{ old('meta_description', $article->meta?->meta_description) }}</textarea>
                    </div>

                    {{-- Meta Keywords --}}
                    <div>
                        <x-input-label for="meta_keywords" value="Meta Keywords" />
                        <input type="text" name="meta_keywords" id="meta_keywords"
                            value="{{ old('meta_keywords', $article->meta?->meta_keywords) }}"
                            placeholder="contoh: kesehatan, kampus, bogor" class="w-full form-input">
                    </div>

                    {{-- Robots --}}
                    <div>
                        <x-input-label for="robots" value="Robots" />
                        @php
                        $robotsOptions = ['index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow'];
                        $selectedRobots = old('robots', $article->meta?->robots ?? 'index, follow');
                        @endphp
                        <select name="robots" id="robots" class="w-full form-select">
                            @foreach ($robotsOptions as $opt)
                            <option value="{{ $opt }}" {{ $selectedRobots===$opt ? 'selected' : '' }}>
                                {{ ucfirst($opt) }}
                            </option>
                            @endforeach
                        </select>
                    </div>

                    {{-- Canonical URL --}}
                    <div class="md:col-span-2">
                        <x-input-label for="canonical_url" value="Canonical URL" />
                        <input type="url" name="canonical_url" id="canonical_url"
                            placeholder="https://domainmu.com/artikel-slug"
                            value="{{ old('canonical_url', $article->meta?->canonical_url) }}"
                            class="w-full form-input">
                    </div>
                </div>
            </div>

            {{-- 🧾 OPEN GRAPH (Facebook, LinkedIn) --}}
            <div class="bg-white border border-gray-100 shadow-md dark:bg-gray-800 rounded-xl dark:border-gray-700">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        <i class="text-blue-600 bx bxl-facebook-circle me-1"></i> Open Graph (Facebook, LinkedIn)
                    </h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Informasi yang muncul ketika tautan dibagikan ke media sosial.
                    </p>
                </div>

                <div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                    {{-- OG Title --}}
                    <div>
                        <x-input-label for="og_title" value="OG Title" />
                        <input type="text" name="og_title" id="og_title"
                            value="{{ old('og_title', $article->meta?->og_title) }}"
                            placeholder="Judul saat dibagikan di sosial media" class="w-full form-input">
                    </div>

                    {{-- OG Description --}}
                    <div>
                        <x-input-label for="og_description" value="OG Description" />
                        <textarea name="og_description" id="og_description" rows="2" class="w-full form-textarea"
                            placeholder="Deskripsi singkat untuk tampilan share">{{ old('og_description', $article->meta?->og_description) }}</textarea>
                    </div>

                    {{-- OG Image --}}
                    <div class="md:col-span-2">
                        <x-input-label for="og_image" value="OG Image" />
                        <input type="file" name="og_image" id="og_image" class="w-full form-file">

                        @if(isset($article->meta?->og_image))
                        <div class="mt-2">
                            <img src="{{ asset('storage/'.$article->meta->og_image) }}"
                                class="object-cover h-32 rounded-lg shadow-md">
                            <p class="mt-1 text-xs text-gray-500">
                                <a href="{{ asset('storage/'.$article->meta->og_image) }}" target="_blank"
                                    class="text-blue-600 underline">Lihat gambar lama</a>
                            </p>
                        </div>
                        @endif
                    </div>
                </div>
            </div>

            {{-- 🐦 TWITTER CARD --}}
            <div class="bg-white border border-gray-100 shadow-md dark:bg-gray-800 rounded-xl dark:border-gray-700">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        <i class="bx bxl-twitter text-sky-500 me-1"></i> Twitter Card
                    </h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Pengaturan tampilan saat artikel dibagikan ke Twitter (X).
                    </p>
                </div>

                <div class="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
                    <div>
                        <x-input-label for="twitter_card" value="Twitter Card Type" />
                        <input type="text" name="twitter_card" id="twitter_card" placeholder="summary_large_image"
                            value="{{ old('twitter_card', $article->meta?->twitter_card) }}" class="w-full form-input">
                    </div>

                    <div>
                        <x-input-label for="twitter_site" value="Twitter Site" />
                        <input type="text" name="twitter_site" id="twitter_site" placeholder="@kampusbogor"
                            value="{{ old('twitter_site', $article->meta?->twitter_site) }}" class="w-full form-input">
                    </div>

                    <div class="sm:col-span-2">
                        <x-input-label for="twitter_title" value="Twitter Title" />
                        <input type="text" name="twitter_title" id="twitter_title"
                            value="{{ old('twitter_title', $article->meta?->twitter_title) }}"
                            class="w-full form-input">
                    </div>

                    <div class="sm:col-span-2">
                        <x-input-label for="twitter_description" value="Twitter Description" />
                        <textarea name="twitter_description" id="twitter_description" rows="2"
                            class="w-full form-textarea">{{ old('twitter_description', $article->meta?->twitter_description) }}</textarea>
                    </div>

                    <div class="sm:col-span-2">
                        <x-input-label for="twitter_image" value="Twitter Image" />
                        <input type="file" name="twitter_image" id="twitter_image" class="w-full form-file">
                        @if(isset($article->meta?->twitter_image))
                        <div class="mt-2">
                            <img src="{{ asset('storage/'.$article->meta->twitter_image) }}"
                                class="object-cover h-32 rounded-lg shadow-md">
                            <p class="mt-1 text-xs text-gray-500">
                                <a href="{{ asset('storage/'.$article->meta->twitter_image) }}" target="_blank"
                                    class="text-blue-600 underline">Lihat gambar lama</a>
                            </p>
                        </div>
                        @endif
                    </div>
                </div>
            </div>

        </div>
    </div>

    {{-- ========================== --}}
    {{-- SIDEBAR --}}
    {{-- ========================== --}}
    <div class="space-y-8 lg:col-span-1">
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
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}
</script>