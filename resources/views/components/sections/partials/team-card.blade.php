{{-- Team member card partial --}}
<div class="overflow-hidden text-center transition-all duration-300 transform bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2">
    {{-- Photo --}}
    <div class="h-56">
        <img src="{{ asset($dosen['photo'] ?? '') }}"
            onerror="this.onerror=null;this.src='{{ asset('assets/img/defaults/default-avatar.png') }}';"
            alt="{{ $dosen['name'] ?? '' }}" class="object-cover w-full h-full" loading="lazy">
    </div>

    {{-- Info --}}
    <div class="p-6">
        <h3 class="text-lg font-bold text-gray-800">{{ $dosen['name'] ?? '' }}</h3>
        <p class="text-sm text-orange-600">{{ $dosen['position'] ?? '' }}</p>

        @if(!empty($dosen['expertise']))
        <div class="flex flex-wrap items-center justify-center gap-2 pt-4 mt-4 border-t border-gray-100">
            @foreach ($dosen['expertise'] as $bidang)
            <span class="px-3 py-1 text-xs font-medium text-orange-800 bg-orange-100 rounded-full">
                {{ $bidang }}
            </span>
            @endforeach
        </div>
        @endif

        @if(!empty($dosen['unit']))
        <span class="inline-block px-3 py-1 mt-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
            {{ $dosen['unit'] }}
        </span>
        @endif
    </div>
</div>
