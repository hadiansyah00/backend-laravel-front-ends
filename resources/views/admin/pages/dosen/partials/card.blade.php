<div
    class="overflow-hidden text-center transition-all duration-300 transform bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2">

    {{-- Bagian Foto Dosen --}}
    <div class="h-56">
        <img src="{{ asset($dosen['photo']) }}" alt="{{ $dosen['name'] }}" class="object-cover w-full h-full"
            loading="lazy">
    </div>

    {{-- Bagian Informasi Teks --}}
    <div class="p-6">

        {{-- Nama Dosen --}}
        <h3 class="text-lg font-bold text-gray-800">{{ $dosen['name'] }}</h3>

        {{-- Jabatan --}}
        <p class="text-sm text-orange-600">{{ $dosen['position'] }}</p>

        {{-- Bidang Keahlian (ditampilkan sebagai "pills") --}}
        <div class="flex flex-wrap items-center justify-center gap-2 pt-4 mt-4 border-t border-gray-100">
            @foreach ($dosen['expertise'] as $bidang)
            <span class="px-3 py-1 text-xs font-medium text-orange-800 bg-orange-100 rounded-full">
                {{ $bidang }}
            </span>
            @endforeach
        </div>

    </div>
</div>