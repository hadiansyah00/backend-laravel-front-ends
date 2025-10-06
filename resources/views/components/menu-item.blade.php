{{-- resources/views/components/menu-item.blade.php --}}
@props(['menu', 'variant' => 'desktop'])
{{-- variant bisa 'desktop' atau 'mobile' --}}

@if($menu->children->count())
@if($variant === 'desktop')
{{-- DESKTOP: Dropdown Hover --}}
<div x-data="{ isOpen: false }" class="relative group">
    <button @mouseenter="isOpen = true" @mouseleave="isOpen = false"
        class="flex items-center transition-colors duration-200 hover:text-orange-600">
        {{ $menu->name }}
        <svg class="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="currentColor"
            viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414
                           1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
    </button>

    <div x-show="isOpen" x-cloak @mouseenter="isOpen = true" @mouseleave="isOpen = false"
        x-transition:enter="transition ease-out duration-200"
        x-transition:enter-start="opacity-0 scale-95 -translate-y-1"
        x-transition:enter-end="opacity-100 scale-100 translate-y-0"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="opacity-100 scale-100 translate-y-0"
        x-transition:leave-end="opacity-0 scale-95 -translate-y-1"
        class="absolute left-0 z-50 w-56 mt-2 origin-top-left bg-white border border-gray-100 shadow-lg rounded-xl">
        <div class="py-2">
            @foreach($menu->children as $child)
            <x-menu-item :menu="$child" variant="desktop" />
            @endforeach
        </div>
    </div>
</div>
@else
{{-- MOBILE: Accordion --}}
<div x-data="{ open: false }">
    <button @click="open = !open"
        class="flex items-center justify-between w-full px-4 py-2 text-base font-medium text-left text-black rounded-md hover:bg-orange-50 hover:text-orange-600 focus:outline-none">
        <span>{{ $menu->name }}</span>
        <svg class="w-5 h-5 text-gray-500 transition-transform duration-300 transform" :class="{ 'rotate-180': open }"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
    </button>

    <div x-show="open" x-transition class="pt-1 pb-2 pl-6 mt-1 space-y-1 border-l-2 border-orange-100">
        @foreach($menu->children as $child)
        <x-menu-item :menu="$child" variant="mobile" />
        @endforeach
    </div>
</div>
@endif
@else
{{-- Link Biasa --}}
<a href="{{ $menu->link }}"
    class="{{ $variant === 'desktop'
            ? 'block px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-orange-50 hover:text-orange-600'
            : 'block px-4 py-2 text-base font-medium text-black rounded-md hover:bg-orange-50 hover:text-orange-600' }}">
    {{ $menu->name }}
</a>
@endif