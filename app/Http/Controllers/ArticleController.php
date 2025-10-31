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
    public function index(Request $request)
    {
        $query = Article::with(['category', 'tags'])
            ->orderBy('published_at', 'desc'); // ← urutkan dari yang paling lama

        // Filter berdasarkan judul
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Filter berdasarkan rentang tanggal
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('published_at', [
                $request->start_date . ' 00:00:00',
                $request->end_date . ' 23:59:59',
            ]);
        } elseif ($request->filled('start_date')) {
            $query->whereDate('published_at', '>=', $request->start_date);
        } elseif ($request->filled('end_date')) {
            $query->whereDate('published_at', '<=', $request->end_date);
        }

        $articles = $query->paginate(10)->withQueryString();

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
            'tags' => 'nullable|string',
            // SEO fields
            'meta_description'    => 'nullable|string|max:255',
            'meta_keywords'       => 'nullable|string|max:255',
            'robots'              => 'nullable|string|max:50',
            'canonical_url'       => 'nullable|url',
            'og_title'            => 'nullable|string|max:255',
            'og_description'      => 'nullable|string|max:255',
            'og_url'              => 'nullable|url',
            'og_type'             => 'nullable|string|max:50',
            'og_site_name'        => 'nullable|string|max:255',
            'twitter_card'        => 'nullable|string|max:50',
            'twitter_title'       => 'nullable|string|max:255',
            'twitter_description' => 'nullable|string|max:255',
            'twitter_site'        => 'nullable|string|max:50',
            'og_image'            => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'twitter_image'       => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        $article = Article::create($validated);

        // === SEO Section ===
        $metaData = collect($validated)->only([
            'meta_description',
            'meta_keywords',
            'robots',
            'canonical_url',
            'og_title',
            'og_description',
            'og_url',
            'og_type',
            'og_site_name',
            'twitter_card',
            'twitter_title',
            'twitter_description',
            'twitter_site'
        ])->toArray();

        if ($request->hasFile('og_image')) {
            $metaData['og_image'] = $request->file('og_image')->store('seo/meta', 'public');
        }
        if ($request->hasFile('twitter_image')) {
            $metaData['twitter_image'] = $request->file('twitter_image')->store('seo/meta', 'public');
        }

        $article->meta()->create($metaData);

        // === Tags ===
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

        return redirect()->route('admin.articles.index')->with('success', 'Artikel & SEO berhasil dibuat');
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
            'tags'          => 'nullable|string',

            // Meta fields
            'meta_description'    => 'nullable|string|max:255',
            'meta_keywords'       => 'nullable|string|max:255',
            'robots'              => 'nullable|string|max:50',
            'canonical_url'       => 'nullable|url',
            'og_title'            => 'nullable|string|max:255',
            'og_description'      => 'nullable|string|max:255',
            'og_url'              => 'nullable|url',
            'og_type'             => 'nullable|string|max:50',
            'og_site_name'        => 'nullable|string|max:255',
            'twitter_card'        => 'nullable|string|max:50',
            'twitter_title'       => 'nullable|string|max:255',
            'twitter_description' => 'nullable|string|max:255',
            'twitter_site'        => 'nullable|string|max:50',
            'og_image'            => 'nullable|mimes:jpg,jpeg,png,webp|max:2048',
            'twitter_image'       => 'nullable|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // === Update artikel ===
        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['title']);
        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }
        $article->update($validated);

        // === Tags ===
        $tagIds = [];
        if ($request->filled('tags')) {
            $tagsInput = array_filter(array_map('trim', explode(',', $request->tags)));
            foreach ($tagsInput as $tagName) {
                $tag = \App\Models\Tags::firstOrCreate(['slug' => Str::slug($tagName)], ['name' => $tagName]);
                $tagIds[] = $tag->id;
            }
        }
        $article->tags()->sync($tagIds);

        // === Meta ===
        $metaData = collect($validated)->only([
            'meta_description',
            'meta_keywords',
            'robots',
            'canonical_url',
            'og_title',
            'og_description',
            'og_url',
            'og_type',
            'og_site_name',
            'twitter_card',
            'twitter_title',
            'twitter_description',
            'twitter_site'
        ])->toArray();

        if ($request->hasFile('og_image')) {
            $metaData['og_image'] = $request->file('og_image')->store('seo/meta', 'public');
        }
        if ($request->hasFile('twitter_image')) {
            $metaData['twitter_image'] = $request->file('twitter_image')->store('seo/meta', 'public');
        }

        $article->meta()->updateOrCreate([], $metaData);

        return redirect()->route('admin.articles.index')->with('success', 'Artikel dan meta berhasil diperbarui.');
    }



    public function destroy(Article $article)
    {
        $article->tags()->detach();
        $article->delete();
        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil dihapus');
    }
}
