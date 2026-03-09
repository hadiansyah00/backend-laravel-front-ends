<?php

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TestimoniController;

// --- Testimoni ---
Route::get('/testimoni', [TestimoniController::class, 'index']);
Route::get('/testimoni/{id}', [TestimoniController::class, 'show']);

// --- Articles (Berita) ---
Route::get('/articles', function (Request $request) {
    $query = Article::with(['category:id,name,slug'])
        ->where('status', 'published')
        ->latest('published_at');

    if ($request->filled('category')) {
        $category = $request->category;
        $query->whereHas('category', fn($q) => $q->where('slug', $category));
    }

    if ($request->filled('year')) {
        $query->whereYear('published_at', $request->year);
    }

    if ($request->filled('search')) {
        $query->where(function ($q) use ($request) {
            $q->where('title', 'like', '%' . $request->search . '%')
              ->orWhere('excerpt', 'like', '%' . $request->search . '%');
        });
    }

    $articles = $query->paginate(6);

    return response()->json([
        'data' => $articles->items(),
        'pagination' => [
            'current_page'  => $articles->currentPage(),
            'last_page'     => $articles->lastPage(),
            'per_page'      => $articles->perPage(),
            'total'         => $articles->total(),
            'next_page_url' => $articles->nextPageUrl(),
            'prev_page_url' => $articles->previousPageUrl(),
        ]
    ]);
});