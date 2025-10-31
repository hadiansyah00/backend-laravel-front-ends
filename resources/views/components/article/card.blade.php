@props(['article'])

<div class="p-4 transition bg-white rounded-lg shadow hover:shadow-md">
    {{-- Thumbnail --}}
    @if ($article->thumbnail)
    <img src="{{ asset('storage/' . $article->thumbnail) }}" alt="{{ $article->title }}"
        class="object-cover w-full h-48 mb-3 rounded-md">
    @endif

    {{-- Judul --}}
    <h3 class="text-lg font-semibold text-gray-900 hover:text-blue-600">
        <a href="{{ route('articles.show', $article->slug) }}">
            {{ $article->title }}
        </a>
    </h3>

    {{-- Excerpt --}}
    <p class="mt-2 text-sm text-gray-600">
        {{ Str::limit(strip_tags($article->excerpt), 120) }}
    </p>

    {{-- Meta --}}
    <div class="flex items-center justify-between mt-3 text-xs text-gray-500">
        <span>{{ $article->category->name ?? 'Tanpa Kategori' }}</span>
        <span>{{ $article->published_at ? $article->published_at->format('d M Y') : 'Draft' }}</span>
    </div>
</div>