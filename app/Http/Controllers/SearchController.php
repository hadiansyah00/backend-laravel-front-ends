<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Dosen;
use App\Models\Event;
use App\Models\Pages;
use App\Models\Pengumuman;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;
use Illuminate\Support\Str;

class SearchController extends Controller
{
    public function __construct()
    {
        Inertia::setRootView('app-inertia');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $q = trim($request->input('q', ''));
        $filter = $request->input('filter', 'all'); // 'all', 'berita', 'pengumuman', 'event', 'prodi', 'dosen', 'halaman'
        
        $results = collect();

        // Jika query pencarian cukup panjang dan tidak kosong
        if (strlen($q) >= 2) {
            
            // 1. Articles / Berita
            if ($filter === 'all' || $filter === 'berita') {
                $articles = Article::where('status', 'published')
                    ->where(function ($query) use ($q) {
                        $query->where('title', 'like', "%{$q}%")
                            ->orWhere('excerpt', 'like', "%{$q}%")
                            ->orWhere('content', 'like', "%{$q}%");
                    })
                    ->get()
                    ->map(function ($item) {
                        return [
                            'id' => 'article_' . $item->id,
                            'type' => 'Berita',
                            'title' => $item->title,
                            'url' => route('frontend.berita.show', $item->slug),
                            'snippet' => Str::limit(strip_tags($item->excerpt ?: $item->content), 150),
                            'date' => optional($item->published_at)->format('Y-m-d') ?? optional($item->created_at)->format('Y-m-d'),
                            'image' => $item->thumbnail ? (str_starts_with($item->thumbnail, 'http') ? $item->thumbnail : asset('storage/' . $item->thumbnail)) : null,
                        ];
                    });
                $results = $results->concat($articles);
            }

            // 2. Pengumuman
            if ($filter === 'all' || $filter === 'pengumuman') {
                $pengumumans = Pengumuman::where('is_active', 1)
                    ->where(function ($query) use ($q) {
                        $query->where('title', 'like', "%{$q}%")
                            ->orWhere('content', 'like', "%{$q}%");
                    })
                    ->get()
                    ->map(function ($item) {
                        return [
                            'id' => 'pengumuman_' . $item->id,
                            'type' => 'Pengumuman',
                            'title' => $item->title,
                            'url' => route('front.pengumuman.show', $item->slug),
                            'snippet' => Str::limit(strip_tags($item->content), 150),
                            'date' => optional($item->created_at)->format('Y-m-d'),
                            'image' => null,
                        ];
                    });
                $results = $results->concat($pengumumans);
            }

            // 3. Event
            if ($filter === 'all' || $filter === 'event') {
                $events = Event::where('is_active', 1)
                    ->where(function ($query) use ($q) {
                        $query->where('title', 'like', "%{$q}%")
                            ->orWhere('description', 'like', "%{$q}%")
                            ->orWhere('location', 'like', "%{$q}%");
                    })
                    ->get()
                    ->map(function ($item) {
                        return [
                            'id' => 'event_' . $item->id,
                            'type' => 'Event',
                            'title' => $item->title,
                            'url' => route('front.event.show', $item->slug),
                            'snippet' => Str::limit(strip_tags($item->description), 150),
                            'date' => optional($item->start_date)->format('Y-m-d'),
                            'image' => $item->thumbnail ? (str_starts_with($item->thumbnail, 'http') ? $item->thumbnail : asset('storage/' . $item->thumbnail)) : null,
                        ];
                    });
                $results = $results->concat($events);
            }

            // 4. Program Studi
            if ($filter === 'all' || $filter === 'prodi') {
                $prodis = ProgramStudi::where('name', 'like', "%{$q}%")
                    ->orWhere('description', 'like', "%{$q}%")
                    ->get()
                    ->map(function ($item) {
                        return [
                            'id' => 'prodi_' . $item->id,
                            'type' => 'Program Studi',
                            'title' => 'Program Studi: ' . $item->name,
                            'url' => route('front.prodi.show', $item->slug),
                            'snippet' => Str::limit(strip_tags($item->description), 150),
                            'date' => null,
                            'image' => $item->image ? (str_starts_with($item->image, 'http') ? $item->image : asset('storage/' . $item->image)) : null,
                        ];
                    });
                $results = $results->concat($prodis);
            }

            // 5. Dosen
            if ($filter === 'all' || $filter === 'dosen') {
                $dosens = Dosen::where('is_active', 1)
                    ->where(function ($query) use ($q) {
                        $query->where('name', 'like', "%{$q}%")
                            ->orWhere('nip', 'like', "%{$q}%")
                            ->orWhere('prodi', 'like', "%{$q}%")
                            ->orWhere('jabatan', 'like', "%{$q}%");
                    })
                    ->get()
                    ->map(function ($item) {
                        return [
                            'id' => 'dosen_' . $item->id,
                            'type' => 'Dosen',
                            'title' => $item->name . ' (' . implode(', ', array_filter([$item->jabatan, $item->prodi])) . ')',
                            'url' => route('front.dosen') . '?search=' . urlencode($item->name),
                            'snippet' => 'Dosen program studi ' . $item->prodi,
                            'date' => null,
                            'image' => $item->photo ? (str_starts_with($item->photo, 'http') ? $item->photo : asset('storage/' . $item->photo)) : null,
                        ];
                    });
                $results = $results->concat($dosens);
            }

            // 6. Halaman Dinamis (Pages)
            if ($filter === 'all' || $filter === 'halaman') {
                $pages = Pages::where('title', 'like', "%{$q}%")
                    ->orWhere('content', 'like', "%{$q}%")
                    ->get()
                    ->map(function ($item) {
                        return [
                            'id' => 'page_' . $item->id,
                            'type' => 'Halaman',
                            'title' => $item->title,
                            'url' => url('/pendidikan/' . $item->slug),
                            'snippet' => Str::limit(strip_tags($item->content), 150),
                            'date' => null,
                            'image' => null,
                        ];
                    });
                $results = $results->concat($pages);
            }
        }

        // Hitung total dari setiap kategori (jika filter all) untuk Tabs
        $counts = [
            'all' => $filter === 'all' ? $results->count() : 0,
            'berita' => 0,
            'pengumuman' => 0,
            'event' => 0,
            'prodi' => 0,
            'dosen' => 0,
            'halaman' => 0,
        ];

        if ($filter === 'all' && strlen($q) >= 2) {
            $counts['berita'] = $results->where('type', 'Berita')->count();
            $counts['pengumuman'] = $results->where('type', 'Pengumuman')->count();
            $counts['event'] = $results->where('type', 'Event')->count();
            $counts['prodi'] = $results->where('type', 'Program Studi')->count();
            $counts['dosen'] = $results->where('type', 'Dosen')->count();
            $counts['halaman'] = $results->where('type', 'Halaman')->count();
        }

        // Urutkan (opsional: bisa diurutkan dari yang terbaru jika diinginkan)
        // Di sini kita biarkan seperti urutan penambahan

        // Paginasi manual untuk collection
        $perPage = 10;
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $pagedData = $results->slice(($currentPage - 1) * $perPage, $perPage)->values();

        $paginatedResults = new LengthAwarePaginator(
            $pagedData,
            $results->count(),
            $perPage,
            $currentPage,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        return Inertia::render('Frontend/Search', [
            'q' => $q,
            'filter' => $filter,
            'counts' => $counts,
            'results' => $paginatedResults,
        ])->withViewData('seo', [
            'title'       => 'Pencarian: ' . ($q ? $q : '...') . ' - STIKes Bogor Husada',
            'description' => 'Hasil pencarian untuk kata kunci: ' . $q,
            'robots'      => 'noindex, follow', // Jangan index halaman search
        ]);
    }
}
