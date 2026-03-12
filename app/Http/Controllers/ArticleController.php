<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tags;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::with(['category', 'tags'])
            ->orderBy('published_at', 'desc');

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

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

        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles,
            'filters'  => $request->only(['search', 'start_date', 'end_date']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Articles/Form', [
            'categories'    => Category::all(),
            'tags'          => Tags::all(),
            'availableTags' => Tags::pluck('name'),
            'selectedTags'  => [],
            'article'       => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateArticle($request);

        // Siapkan data artikel
        $articleData = [
            'category_id'  => $validated['category_id'],
            'title'        => $validated['title'],
            'slug'         => empty($validated['slug']) ? Str::slug($validated['title']) : Str::slug($validated['slug']),
            'excerpt'      => $validated['excerpt'] ?? null,
            'content'      => $validated['content'],
            'status'       => $validated['status'],
            'published_at' => $validated['published_at'] ?? null,
            'thumbnail'    => $request->filled('thumbnail') ? $this->cleanImagePath($request->thumbnail) : null,
        ];

        try {
            DB::beginTransaction(); // Mulai transaksi database yang aman

            // 1. Simpan Artikel
            $article = Article::create($articleData);

            // 2. Simpan Meta SEO (Tanpa meta_keywords)
            $metaData = collect($validated)->only([
                'meta_description',
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
            $metaData['page_slug'] = $article->slug;
            $metaData['og_image'] = $request->filled('og_image') ? $this->cleanImagePath($request->og_image) : null;
            $metaData['twitter_image'] = $request->filled('twitter_image') ? $this->cleanImagePath($request->twitter_image) : null;

            $article->meta()->create($metaData);

            // 3. Simpan Tags
            $this->syncTags($article, $request->tags);

            DB::commit(); // Simpan permanen ke database

            return redirect()->route('articles.index')->with('success', 'Artikel berhasil diterbitkan!');
        } catch (\Exception $e) {
            DB::rollBack(); // Batalkan semua query jika terjadi error

            // Catat error ke file log agar developer bisa mengecek penyebabnya
            Log::error('Gagal menyimpan artikel: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);

            return back()->withInput()->with('error', 'Terjadi kesalahan sistem saat menyimpan artikel. Silakan cek error log.');
        }
    }

    public function edit(Article $article)
    {
        $article->load('meta');

        return Inertia::render('Admin/Articles/Form', [
            'article'       => $article,
            'categories'    => Category::all(),
            'tags'          => Tags::all(),
            'availableTags' => Tags::pluck('name'),
            'selectedTags'  => $article->tags->pluck('name')->all(),
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $validated = $this->validateArticle($request, $article->id);

        // Siapkan data update artikel
        $articleData = [
            'category_id'  => $validated['category_id'],
            'title'        => $validated['title'],
            'slug'         => empty($validated['slug']) ? Str::slug($validated['title']) : Str::slug($validated['slug']),
            'excerpt'      => $validated['excerpt'] ?? null,
            'content'      => $validated['content'],
            'status'       => $validated['status'],
            'published_at' => $validated['published_at'] ?? null,
        ];

        // Hanya update thumbnail jika ada input baru dari request
        if ($request->filled('thumbnail')) {
            $articleData['thumbnail'] = $this->cleanImagePath($request->thumbnail);
        }

        try {
            DB::beginTransaction();

            // 1. Update Artikel
            $article->update($articleData);

            // 2. Update Meta SEO (Tanpa meta_keywords)
            $metaData = collect($validated)->only([
                'meta_description',
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

            if ($request->filled('og_image')) {
                $metaData['og_image'] = $this->cleanImagePath($request->og_image);
            }
            if ($request->filled('twitter_image')) {
                $metaData['twitter_image'] = $this->cleanImagePath($request->twitter_image);
            }

            $article->meta()->updateOrCreate([], $metaData);

            // 3. Update Tags
            $this->syncTags($article, $request->tags);

            DB::commit();

            return redirect()->route('articles.index')->with('success', 'Artikel berhasil diperbarui!');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Gagal memperbarui artikel ID ' . $article->id . ': ' . $e->getMessage());

            return back()->withInput()->with('error', 'Gagal memperbarui artikel. Silakan coba lagi atau cek error log.');
        }
    }

    public function destroy(Article $article)
    {
        try {
            DB::beginTransaction();

            $article->tags()->detach();
            $article->meta()->delete(); // Hapus meta sekalian biar tidak jadi file yatim di DB
            $article->delete();

            DB::commit();

            return redirect()->route('articles.index')->with('success', 'Artikel berhasil dihapus!');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Gagal menghapus artikel ID ' . $article->id . ': ' . $e->getMessage());

            return back()->with('error', 'Gagal menghapus artikel.');
        }
    }

    // ==========================================
    // PRIVATE HELPER METHODS (Merapikan Kode)
    // ==========================================

    /**
     * Reusable Validation Rules for Store & Update
     */
    private function validateArticle(Request $request, $articleId = null)
    {
        $slugRule = 'nullable|string|max:255|unique:articles,slug';
        if ($articleId) {
            $slugRule .= ',' . $articleId;
        }

        return $request->validate([
            'category_id'      => 'required|exists:categories,id',
            'title'            => 'required|string|max:255',
            'slug'             => $slugRule,
            'excerpt'          => 'nullable|string',
            'content'          => 'required|string',
            'status'           => 'required|in:draft,published',
            'published_at'     => 'nullable|date',
            'tags'             => 'nullable|string',

            // SEO Meta (Tanpa meta_keywords)
            'meta_description' => 'nullable|string|max:255',
            'robots'           => 'nullable|string|max:50',
            'canonical_url'    => 'nullable|url',
            'og_title'         => 'nullable|string|max:255',
            'og_description'   => 'nullable|string|max:255',
            'og_url'           => 'nullable|url',
            'og_type'          => 'nullable|string|max:50',
            'og_site_name'     => 'nullable|string|max:255',
            'twitter_card'     => 'nullable|string|max:50',
            'twitter_title'    => 'nullable|string|max:255',
            'twitter_description' => 'nullable|string|max:255',
            'twitter_site'     => 'nullable|string|max:50',
        ]);
    }

    /**
     * Membersihkan URL lengkap menjadi path storage relatif
     */
    private function cleanImagePath($imageUrl)
    {
        return str_replace(url('/storage') . '/', '', $imageUrl);
    }

    /**
     * Sinkronisasi data tag yang dipisahkan dengan koma
     */
    private function syncTags(Article $article, $tagsInput)
    {
        $tagIds = [];

        if (!empty($tagsInput)) {
            $tagsArray = array_filter(array_map('trim', explode(',', $tagsInput)));

            foreach ($tagsArray as $tagName) {
                $tag = Tags::firstOrCreate(
                    ['slug' => Str::slug($tagName)],
                    ['name' => $tagName]
                );
                $tagIds[] = $tag->id;
            }
        }

        $article->tags()->sync($tagIds);
    }
}
