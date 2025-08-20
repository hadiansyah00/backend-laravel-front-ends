<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Meta Settings
        </h2>
    </x-slot>

    <div class="py-8">
        <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
            <div class="p-6 bg-white shadow dark:bg-gray-800 sm:rounded-lg">

                <table class="w-full border border-collapse">
                    <thead>
                        <tr class="text-left bg-gray-100 dark:bg-gray-700">
                            <th class="p-2 border">Page</th>
                            <th class="p-2 border">Meta Description</th>
                            <th class="p-2 border">OG Title</th>
                            <th class="p-2 border">Twitter Title</th>
                            <th class="p-2 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($pages as $page)
                        <tr>
                            <td class="p-2 border">{{ $page->title }}</td>
                            <td class="p-2 border">{{ $page->meta->meta_description ?? '-' }}</td>
                            <td class="p-2 border">{{ $page->meta->og_title ?? '-' }}</td>
                            <td class="p-2 border">{{ $page->meta->twitter_title ?? '-' }}</td>
                            <td class="p-2 border">
                                <a href="{{ route('admin.meta.edit', $page->slug) }}"
                                    class="px-3 py-1 text-white bg-blue-600 rounded">
                                    Edit
                                </a>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>

                <div class="mt-4">
                    {{ $pages->links() }}
                </div>

            </div>
        </div>
    </div>
</x-app-layout>