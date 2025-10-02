<?php

namespace App\Http\Controllers;

use App\Models\Tags;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with(['category', 'tags'])->latest()->paginate(10);
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
            'tags' => 'nullable|string', // ubah jadi string
        ]);

        if (!$validated['slug']) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $validated['thumbnail'] = $path;
        } else {
            // pastikan kita tidak menimpa kolom thumbnail ketika tidak ada upload
            unset($validated['thumbnail']);
        }


        $article = Article::create($validated);

        // proses tags
        if ($request->filled('tags')) {
            $tagsInput = explode(',', $request->tags);
            $tagIds = [];
            foreach ($tagsInput as $tagName) {
                $tag = Tags::firstOrCreate(['name' => trim($tagName)]);
                $tagIds[] = $tag->id;
            }
            $article->tags()->sync($tagIds);
        }

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
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:articles,slug,' . $article->id,
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
            'tags' => 'nullable|string', // ubah jadi string
        ]);

        if (!$validated['slug']) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        $article->update($validated);

        // proses tags
        if ($request->filled('tags')) {
            $tagsInput = explode(',', $request->tags);
            $tagIds = [];
            foreach ($tagsInput as $tagName) {
                $tag = Tags::firstOrCreate(['name' => trim($tagName)]);
                $tagIds[] = $tag->id;
            }
            $article->tags()->sync($tagIds);
        } else {
            $article->tags()->sync([]); // kosongkan kalau tidak ada tags
        }

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil diperbarui');
    }


    public function destroy(Article $article)
    {
        $article->tags()->detach();
        $article->delete();
        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil dihapus');
    }
}
