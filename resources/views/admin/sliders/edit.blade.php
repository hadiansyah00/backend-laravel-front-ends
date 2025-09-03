<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Edit Slider
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <form action="{{ route('admin.sliders.update', $slider->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')

                @include('admin.sliders._form')

                <div class="flex items-center justify-end pt-4 mt-6 border-t">
                    <a href="{{ route('admin.sliders.index') }}"
                        class="px-4 py-2 mr-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500">
                        Batal
                    </a>
                    <button type="submit"
                        class="px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500">
                        Update Slider
                    </button>
                </div>
            </form>
        </div>
    </div>
</x-app-layout>