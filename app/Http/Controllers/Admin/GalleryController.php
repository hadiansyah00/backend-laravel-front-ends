<?php

namespace App\Http\Controllers\Admin;

use App\Models\Gallery;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::latest()->paginate(15);
        return view('admin.galleries.index', compact('galleries'));
    }

    public function create()
    {
        return view('admin.galleries.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120', // Max 5MB
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->has('is_active');
        $validated['user_id'] = auth()->id();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('galleries', 'public');
            $validated['image'] = 'storage/' . $path;
        }

        Gallery::create($validated);

        return redirect()->route('admin.galleries.index')->with('success', 'Foto Galeri berhasil ditambahkan!');
    }

    public function edit(Gallery $gallery)
    {
        return view('admin.galleries.edit', compact('gallery'));
    }

    public function update(Request $request, Gallery $gallery)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->has('is_active');

        if ($request->hasFile('image')) {
            if ($gallery->image && str_starts_with($gallery->image, 'storage/')) {
                Storage::disk('public')->delete(str_replace('storage/', '', $gallery->image));
            }
            $path = $request->file('image')->store('galleries', 'public');
            $validated['image'] = 'storage/' . $path;
        }

        $gallery->update($validated);

        return redirect()->route('admin.galleries.index')->with('success', 'Foto Galeri berhasil diperbarui!');
    }

    public function destroy(Gallery $gallery)
    {
        if ($gallery->image && str_starts_with($gallery->image, 'storage/')) {
            Storage::disk('public')->delete(str_replace('storage/', '', $gallery->image));
        }
        $gallery->delete();

        return redirect()->route('admin.galleries.index')->with('success', 'Foto Galeri berhasil dihapus!');
    }
}
