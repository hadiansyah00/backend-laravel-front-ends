@props([
'href' => null,
'variant' => 'primary', // default color
])

@php
// Base classes for all icon buttons: padding, shape, transition
$baseClasses = 'p-2 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2
focus:ring-offset-2';

// Different color variants based on purpose
$variantClasses = [
'default' => 'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 focus:ring-gray-500',
'yellow' => 'text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 focus:ring-yellow-500',
'red' => 'text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 focus:ring-red-500',
'blue' => 'text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50 focus:ring-blue-500',
'green' => 'text-green-500 hover:bg-green-100 dark:hover:bg-green-900/50 focus:ring-green-500',
];

$classes = $baseClasses . ' ' . ($variantClasses[$variant] ?? $variantClasses['default']);
@endphp

@if ($href)
<a href="{{ $href }}" {{ $attributes->merge(['class' => $classes]) }}>
    {{ $slot }}
</a>
@else
<button {{ $attributes->merge(['type' => 'submit', 'class' => $classes]) }}>
    {{ $slot }}
</button>
@endif