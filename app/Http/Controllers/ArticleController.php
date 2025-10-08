<?php

namespace App\Http\Controllers;

use App\Models\Tags;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with(['category', 'tags'])
            ->latest()
            ->paginate(10);

        $sorted = $articles->getCollection()->sortByDesc('published_at');

        $articles = new LengthAwarePaginator(
            $sorted,
            $articles->total(),
            $articles->perPage(),
            $articles->currentPage(),
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return view('admin.articles.index', compact('articles'));
    }

    public function create()
    {
        $categories = Category::all();
        $tags = Tags::all();

        // KIRIM SEBAGAI COLLECTION, HAPUS ->toJson()
        $availableTags = $tags->pluck('name');

        $article = new Article();

        // KIRIM SEBAGAI ARRAY KOSONG BIASA
        $selectedTags = [];

        return view('admin.articles.create', compact(
            'categories',
            'tags',
            'article',
            'availableTags',
            'selectedTags'
        ));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:articles,slug',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
            'tags' => 'nullable|string', // ← Tagify kirim string, bukan array
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        $article = Article::create($validated);

        // Proses tags
        $tags = collect(explode(',', $request->tags))
            ->map(fn($t) => trim($t))
            ->filter()
            ->map(function ($tagName) {
                return Tags::firstOrCreate(
                    ['slug' => Str::slug($tagName)],
                    ['name' => $tagName]
                )->id;
            })->toArray();

        $article->tags()->sync($tags);

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil dibuat');
    }


    public function edit(Article $article)
    {
        $categories = Category::all();
        $tags = Tags::all();

        // KIRIM SEBAGAI COLLECTION, HAPUS ->toJson()
        $availableTags = $tags->pluck('name');

        // Ambil tag yang terpilih dan kirim sebagai PHP Array
        // Gunakan ->all() untuk mengubah collection menjadi array biasa
        $selectedTags = $article->tags->pluck('name')->all();

        return view('admin.articles.edit', compact(
            'article',
            'categories',
            'tags',
            'availableTags',
            'selectedTags'
        ));
    }


    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'category_id'   => 'required|exists:categories,id',
            'title'         => 'required|string|max:255',
            'slug'          => 'nullable|string|max:255|unique:articles,slug,' . $article->id,
            'excerpt'       => 'nullable|string',
            'content'       => 'required|string',
            'thumbnail'     => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'status'        => 'required|in:draft,published',
            'published_at'  => 'nullable|date',
            'tags'          => 'nullable|string', // hasil dari Tagify (comma separated)
        ]);

        // Slug otomatis kalau kosong
        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['title']);

        // Upload thumbnail jika ada
        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        // Update artikel
        $article->update($validated);

        // === Proses Tags ===
        $tagIds = [];
        if ($request->filled('tags')) {
            $tagsInput = array_filter(array_map('trim', explode(',', $request->tags)));

            foreach ($tagsInput as $tagName) {
                $slug = Str::slug($tagName);

                // pastikan slug unik
                $tag = Tags::firstOrCreate(
                    ['slug' => $slug],
                    ['name' => $tagName]
                );

                $tagIds[] = $tag->id;
            }
        }

        // Sync tags (kosong kalau tidak ada tags)
        $article->tags()->sync($tagIds);

        return redirect()
            ->route('admin.articles.index')
            ->with('success', 'Artikel berhasil diperbarui');
    }


    public function destroy(Article $article)
    {
        $article->tags()->detach();
        $article->delete();
        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil dihapus');
    }
}
