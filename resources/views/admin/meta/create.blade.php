<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold">Create Meta</h2>
    </x-slot>

    <div class="py-6">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <form action="{{ route('admin.meta.store') }}" method="POST" enctype="multipart/form-data"
                class="p-6 bg-white rounded shadow">
                @include('admin.meta._form', ['meta' => new \App\Models\Page, 'buttonLabel' => 'Create Meta'])
            </form>
        </div>
    </div>
    @vite(['resources/js/ckeditor.js'])
</x-app-layout>