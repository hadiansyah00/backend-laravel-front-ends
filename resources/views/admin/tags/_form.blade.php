@if ($errors->any())
<div
    class="p-4 mb-6 text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg dark:bg-red-900 dark:text-red-200 dark:border-red-700">
    <ul class="space-y-1 list-disc list-inside">
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>
</div>
@endif

<div class="space-y-6">

    {{-- Nama Tag --}}
    <div>
        <label for="name" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
            Nama Tag <span class="text-red-500">*</span>
        </label>
        <input type="text" name="name" id="name" value="{{ old('name', $tag->name ?? '') }}" class="block w-full p-3 text-sm rounded-lg border
                      border-gray-300 bg-gray-50 text-gray-900
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white
                      @error('name') border-red-500 focus:ring-red-500 @enderror" required>
        @error('name')
        <p class="mt-1 text-xs text-red-600 dark:text-red-400">{{ $message }}</p>
        @enderror
    </div>
    <div>
        {{-- Slug Tag --}}
        <div>
            <label for="slug" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
                Slug Tag
            </label>
            <input type="text" name="slug" id="slug" value="{{ old('slug', $tag->slug ?? '') }}" class="block w-full p-3 text-sm rounded-lg border
                      border-gray-300 bg-gray-50 text-gray-900
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white
                      @error('slug') border-red-500 focus:ring-red-500 @enderror">
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Slug ini akan digunakan untuk URL tag. Jika dikosongkan, slug akan dibuat otomatis dari nama.
            </p>
            @error('slug')
            <p class="mt-1 text-xs text-red-600 dark:text-red-400">{{ $message }}</p>
            @enderror
        </div>
    </div>