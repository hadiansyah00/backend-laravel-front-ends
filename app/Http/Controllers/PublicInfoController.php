<?php

namespace App\Http\Controllers;

use App\Models\Pengumuman;
use App\Models\Event;
use App\Models\Document;
use App\Models\Gallery;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicInfoController extends Controller
{
    /**
     * Display a listing of Pengumuman (Announcements).
     */
    public function pengumuman(Request $request)
    {
        $pengumumans = Pengumuman::where('is_active', 1)
            ->latest()
            ->paginate(10);

        return Inertia::render('Frontend/Pengumuman', [
            'pengumumans' => $pengumumans,
        ]);
    }

    /**
     * Display a single Pengumuman.
     */
    public function pengumumanShow($slug)
    {
        $pengumuman = Pengumuman::where('slug', $slug)
            ->where('is_active', 1)
            ->firstOrFail();

        $recentPengumumans = Pengumuman::where('is_active', 1)
            ->where('id', '!=', $pengumuman->id)
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Frontend/PengumumanDetail', [
            'pengumuman' => $pengumuman,
            'recentPengumumans' => $recentPengumumans,
        ]);
    }

    /**
     * Display a listing of Events.
     */
    public function event(Request $request)
    {
        $events = Event::where('is_published', 1)
            ->orderBy('start_date', 'asc')
            ->paginate(9);

        return Inertia::render('Frontend/Event', [
            'events' => $events,
        ]);
    }

    /**
     * Display a single Event.
     */
    public function eventShow($slug)
    {
        $event = Event::where('slug', $slug)
            ->where('is_published', 1)
            ->firstOrFail();

        $upcomingEvents = Event::where('is_published', 1)
            ->where('id', '!=', $event->id)
            ->where('start_date', '>=', now())
            ->orderBy('start_date', 'asc')
            ->take(3)
            ->get();

        return Inertia::render('Frontend/EventDetail', [
            'event' => $event,
            'upcomingEvents' => $upcomingEvents,
        ]);
    }

    /**
     * Display a listing of Documents (Unduhan).
     */
    public function dokumen(Request $request)
    {
        $query = Document::where('is_active', 1);

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $documents = $query->latest()->paginate(12);
        
        // Get unique categories for filter
        $categories = Document::where('is_active', 1)
            ->whereNotNull('category')
            ->select('category')
            ->distinct()
            ->pluck('category');

        return Inertia::render('Frontend/Dokumen', [
            'documents' => $documents,
            'categories' => $categories,
            'filters' => $request->only(['category', 'search']),
        ]);
    }

    /**
     * Display a listing of Galleries.
     */
    public function galeri(Request $request)
    {
        $query = Gallery::where('is_active', 1);

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $galleries = $query->latest()->paginate(12);

        // Get unique categories for filter
        $categories = Gallery::where('is_active', 1)
            ->whereNotNull('category')
            ->select('category')
            ->distinct()
            ->pluck('category');

        return Inertia::render('Frontend/Galeri', [
            'galleries' => $galleries,
            'categories' => $categories,
            'filters' => $request->only(['category']),
        ]);
    }
}
