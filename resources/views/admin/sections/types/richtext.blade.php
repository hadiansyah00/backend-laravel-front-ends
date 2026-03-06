{{-- Form untuk tipe: richtext --}}
<div class="space-y-4">
    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul (Opsional)</label>
        <input type="text" name="content[title]" value="{{ old('content.title', $content['title'] ?? '') }}"
            class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
    </div>

    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Isi Konten (Rich Text)</label>
        <textarea name="content[content]" id="richtext_editor" rows="10"
            class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">{!! old('content.content', $content['content'] ?? '') !!}</textarea>
        <p class="mt-1 text-xs text-gray-500">Gunakan tag HTML atau input copy-paste dari editor di sini.</p>
    </div>

    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Warna Latar (Bagian Belakang Teks)</label>
        <input type="text" name="content[background]" value="{{ old('content.background', $content['background'] ?? 'bg-white') }}"
            placeholder="bg-slate-50"
            class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
    </div>
</div>

{{-- Script setup CKEditor jika diperlukan per partial ini --}}
<script>
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof ClassicEditor !== 'undefined') {
            ClassicEditor
                .create(document.querySelector('#richtext_editor'))
                .catch(error => {
                    console.error(error);
                });
        }
    });
</script>
