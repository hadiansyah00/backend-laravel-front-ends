@forelse ($articles as $article)
<div class="flex flex-col overflow-hidden bg-white rounded-lg shadow-md md:flex-row dark:bg-gray-800">
    {{-- Thumbnail --}}
    <div class="w-full md:w-1/3">
        <a href="{{ route('berita.show', $article->slug) }}">
            <img src="{{ asset('storage/'.$article->thumbnail) }}" alt="{{ $article->title }}"
                class="object-cover w-full h-full min-h-[200px]">
        </a>
    </div>

    {{-- Konten --}}
    <div class="flex flex-col justify-between w-full p-6 md:w-2/3">
        <div>
            {{-- Tags --}}
            <div class="flex flex-wrap items-center gap-2 mb-2">
                @foreach ($article->tags as $tag)
                <a href="#"
                    class="px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded-full hover:bg-green-700">
                    {{ $tag->name }}
                </a>
                @endforeach
            </div>

            {{-- Judul --}}
            <h2 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                <a href="{{ route('berita.show', $article->slug) }}" class="hover:text-green-700">
                    {{ $article->title }}
                </a>
            </h2>

            {{-- Excerpt --}}
            <p class="mb-4 text-gray-600 dark:text-gray-300">
                {{ Str::limit($article->excerpt, 120) }}
            </p>
        </div>

        {{-- Tanggal Publish --}}
        <div class="flex items-center pt-4 mt-auto border-t border-gray-200 dark:border-gray-700">
            <p class="text-sm text-gray-500 dark:text-gray-400">
                <span>{{ $article->published_at->format('d M Y') }}</span>
            </p>
        </div>
    </div>
</div>
@empty
<div class="p-12 text-center bg-white rounded-lg shadow-md dark:bg-gray-800">
    <p class="text-lg text-gray-500 dark:text-gray-400">Belum ada berita yang ditemukan.</p>
</div>
@endforelse

{{-- Pagination --}}
@if ($articles instanceof \Illuminate\Pagination\LengthAwarePaginator)
<div class="mt-6">
    {{ $articles->links() }}
</div>
@endif