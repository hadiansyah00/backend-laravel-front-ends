<?php

namespace App\Http\Controllers;

use App\Models\Tags;
use App\Models\Article;
use App\Models\Category;
use App\Models\MetaSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http; // Pastikan ini diimport

class BeritaController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::with(['category', 'tags', 'meta'])
            ->where('status', 'published');

        // filter search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('excerpt', 'like', '%' . $request->search . '%')
                    ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }

        // filter kategori
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        // filter tahun
        if ($request->filled('year')) {
            $query->whereYear('published_at', $request->year);
        }

        $articles = $query->orderBy('published_at', 'desc')->paginate(6);

        $categories = Category::all();
        $latestArticles = Article::where('status', 'published')
            ->latest('published_at')
            ->take(5)
            ->get();
        $meta = MetaSettings::default()->first();


        // ✅ untuk ajax return JSON (supaya cocok sama JS fetch)
        if ($request->ajax()) {
            return response()->json([
                'html'       => view('berita.partials.list', compact('articles'))->render(),
                'pagination' => (string) $articles->links(),
            ]);
        }

        return view('berita.index', compact('articles', 'meta', 'categories', 'latestArticles'));
    }


    public function filter(Request $request)
    {
        $query = Article::with(['category', 'tags'])
            ->where('status', 'published');

        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        if ($request->filled('year')) {
            $query->whereYear('published_at', $request->year);
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('excerpt', 'like', '%' . $request->search . '%')
                    ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }

        $articles = $query->orderBy('published_at', 'desc')->paginate(6);

        if ($request->ajax()) {
            return response()->json([
                'html'       => view('berita.partials.list', compact('articles'))->render(),
                'pagination' => (string) $articles->links(),
            ]);
        }

        return redirect()->route('berita.index');
    }

    public function show(Article $article)
    {
        // Ambil berita terkait (dari kategori yang sama)
        $related = Article::where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->where('status', 'published')
            ->latest('published_at')
            ->take(4)
            ->get();

        // -- TAMBAHAN UNTUK WIDGET BARU --

        // Ambil berita terbaru (selain yang sedang dibuka)
        $recentPosts = Article::where('status', 'published')
            ->where('id', '!=', $article->id)
            ->latest('published_at')
            ->take(4)
            ->get();

        // Ambil semua kategori beserta jumlah artikelnya
        $categories = Category::withCount('articles')->orderBy('name', 'asc')->get();

        // Ambil 10 tag paling populer (paling banyak digunakan)
        $popularTags = Tags::withCount('articles')->orderBy('articles_count', 'desc')->take(10)->get();

        // Kirim semua data ke view
        return view('berita.show', compact(
            'article',
            'related',
            'recentPosts',
            'categories',
            'popularTags'
        ));
    }
}
