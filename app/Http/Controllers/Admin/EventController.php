<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::latest('start_date')->paginate(15);

        return Inertia::render('Admin/Events/Index', [
            'events' => $events,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Events/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($request->title).'-'.uniqid();
        $validated['is_active'] = $request->has('is_active');
        $validated['user_id'] = auth()->id();

        if ($request->filled('image')) {
            $parsedPath = parse_url($request->image, PHP_URL_PATH);
            $validated['image'] = ltrim($parsedPath, '/');
        }

        Event::create($validated);

        return redirect()->route('admin.events.index')->with('success', 'Event/Agenda berhasil ditambahkan!');
    }

    public function edit(Event $event)
    {
        return Inertia::render('Admin/Events/Form', [
            'event' => $event,
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->has('is_active');

        if ($request->filled('image')) {
            $parsedPath = parse_url($request->image, PHP_URL_PATH);
            $validated['image'] = ltrim($parsedPath, '/');
        } else {
            $validated['image'] = null;
        }

        $event->update($validated);

        return redirect()->route('admin.events.index')->with('success', 'Event/Agenda berhasil diperbarui!');
    }

    public function destroy(Event $event)
    {
        if ($event->image && str_starts_with($event->image, 'storage/')) {
            Storage::disk('public')->delete(str_replace('storage/', '', $event->image));
        }
        $event->delete();

        return redirect()->route('admin.events.index')->with('success', 'Event/Agenda berhasil dihapus!');
    }
}
