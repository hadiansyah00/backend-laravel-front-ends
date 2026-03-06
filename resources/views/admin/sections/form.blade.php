@if ($errors->any())
<div class="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg dark:text-red-400" role="alert">
    <ul class="list-disc list-inside">
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>
</div>
@endif

<div class="grid gap-6 md:grid-cols-2">
    <div>
        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Tipe Section
        </label>
        <select name="type" id="type" x-model="selectedType"
            class="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white @error('type') border-red-500 @enderror"
            required>
            <option value="" disabled>Pilih Tipe Section</option>
            @foreach($sectionTypes as $key => $label)
                <option value="{{ $key }}">{{ $label }} ({{ $key }})</option>
            @endforeach
            {{-- Backward compatibility options --}}
            @if(isset($section) && !array_key_exists($section->type, $sectionTypes))
                <option value="{{ $section->type }}" selected>{{ $section->type }} (Legacy)</option>
            @endif
        </select>
        @error('type')
        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
        @enderror
    </div>

    <div>
        <label for="order" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Urutan Tampilan
        </label>
        <input type="number" name="order" id="order" value="{{ old('order', $section->order ?? 0) }}"
            class="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white @error('order') border-red-500 @enderror"
            required min="0">
        <p class="mt-1 text-xs text-gray-500">Angka lebih kecil tampil lebih dulu (di atas).</p>
        @error('order')
        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
        @enderror
    </div>
</div>

<hr class="my-8 border-gray-200 dark:border-gray-700">

<div class="p-6 rounded-lg bg-gray-50 dark:bg-gray-900">
    <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Konten Section</h3>
    
    @php
        $content = isset($section) ? $section->content : [];
        if (!is_array($content)) {
            $content = json_decode($content, true) ?? [];
        }
    @endphp

    {{-- Render partials untuk setiap tipe --}}
    @foreach(array_keys($sectionTypes) as $type)
        <div x-show="selectedType === '{{ $type }}'" x-cloak>
            @if(view()->exists("admin.sections.types.{$type}"))
                @include("admin.sections.types.{$type}", ['content' => old('content', $content)])
            @else
                <div class="p-4 text-orange-800 bg-orange-100 rounded-lg">
                    Form editor khusus untuk tipe <strong>{{ $type }}</strong> belum tersedia. Silakan gunakan raw JSON di bawah ini sementara waktu.
                </div>
            @endif
        </div>
    @endforeach

    {{-- Fallback untuk Raw JSON (tipe lama / belum ada form) --}}
    <div x-show="!['{{ implode("','", array_keys($sectionTypes)) }}'].includes(selectedType)" x-cloak class="mt-4">
        <label for="content_raw" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Raw JSON Configuration (Legacy Mode)
        </label>
        <textarea name="content_raw" id="content_raw" rows="12"
            class="block w-full p-2.5 font-mono text-sm text-gray-900 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder='{"key": "value"}'>{{ old('content_raw', json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) }}</textarea>
        @error('content')
        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
        @enderror
    </div>
</div>

{{-- Skrip untuk menangani pemisahan pengiriman form antara array vs. json --}}
<script>
    document.addEventListener('alpine:init', () => {
        // Logika tambahan Alpine jika diperlukan nantinya
    });
</script>