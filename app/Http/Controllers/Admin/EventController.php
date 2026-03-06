<?php

namespace App\Http\Controllers\Admin;

use App\Models\Event;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::latest('start_date')->paginate(15);
        return view('admin.events.index', compact('events'));
    }

    public function create()
    {
        return view('admin.events.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($request->title) . '-' . uniqid();
        $validated['is_active'] = $request->has('is_active');
        $validated['user_id'] = auth()->id();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('events', 'public');
            $validated['image'] = 'storage/' . $path;
        }

        Event::create($validated);

        return redirect()->route('admin.events.index')->with('success', 'Event/Agenda berhasil ditambahkan!');
    }

    public function edit(Event $event)
    {
        return view('admin.events.edit', compact('event'));
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->has('is_active');

        if ($request->hasFile('image')) {
            if ($event->image && str_starts_with($event->image, 'storage/')) {
                Storage::disk('public')->delete(str_replace('storage/', '', $event->image));
            }
            $path = $request->file('image')->store('events', 'public');
            $validated['image'] = 'storage/' . $path;
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
