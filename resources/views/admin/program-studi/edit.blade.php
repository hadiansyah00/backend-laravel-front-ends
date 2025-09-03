<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Edit Program
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
            <div class="p-6 bg-white rounded shadow dark:bg-gray-800">
                <form action="{{ route('admin.programstudi.update', $program->id) }}" method="POST"
                    enctype="multipart/form-data">
                    @method('PUT')
                    @include('admin.program-studi._form')
                </form>
            </div>
        </div>
    </div>
</x-app-layout>