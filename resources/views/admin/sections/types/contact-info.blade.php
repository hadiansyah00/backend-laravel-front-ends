{{-- Form untuk tipe: contact-info --}}
<div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2">
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul Kontak</label>
            <input type="text" name="content[title]" value="{{ old('content.title', $content['title'] ?? 'Hubungi Kami') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" required>
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Subjudul (Opsional)</label>
            <input type="text" name="content[subtitle]" value="{{ old('content.subtitle', $content['subtitle'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
        <div class="md:col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Alamat Lengkap</label>
            <textarea name="content[address]" rows="2"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">{{ old('content.address', $content['address'] ?? '') }}</textarea>
        </div>
        
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Telepon / WhatsApp Lengkap</label>
            <input type="text" name="content[phone]" value="{{ old('content.phone', $content['phone'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="+62 8... / (0251)...">
        </div>
        
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email Utama</label>
            <input type="email" name="content[email]" value="{{ old('content.email', $content['email'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="info@kampus.ac.id">
        </div>
        
        <div class="md:col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Jam Operasional</label>
            <input type="text" name="content[office_hours]" value="{{ old('content.office_hours', $content['office_hours'] ?? 'Senin - Jumat: 08:00 - 16:00 WIB') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>

        <div class="md:col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Google Map Embed URL (SRC)</label>
            <input type="text" name="content[map_embed_url]" value="{{ old('content.map_embed_url', $content['map_embed_url'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="https://www.google.com/maps/embed?pb=...">
            <p class="mt-1 text-xs text-gray-500">Copy isi `src` dari Google Maps iframe (embed map).</p>
        </div>
    </div>
</div>
