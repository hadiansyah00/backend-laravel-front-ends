<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Edit Testimoni
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
            <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <form action="{{ route('admin.testimonials.update', $testimonial->id) }}" method="POST"
                    enctype="multipart/form-data">
                    @csrf
                    @method('PUT')

                    @include('admin.testimonials._form', ['testimonial' => $testimonial])
                </form>
            </div>
        </div>
    </div>
</x-app-layout>