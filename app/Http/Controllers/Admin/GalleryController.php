<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::latest()->paginate(15);

        return Inertia::render('Admin/Galleries/Index', [
            'galleries' => $galleries,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Galleries/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'image' => 'required|string',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->has('is_active');
        $validated['user_id'] = auth()->id();

        if ($request->filled('image')) {
            $parsedPath = parse_url($request->image, PHP_URL_PATH);
            $validated['image'] = ltrim($parsedPath, '/');
        }

        Gallery::create($validated);

        return redirect()->route('admin.galleries.index')->with('success', 'Foto Galeri berhasil ditambahkan!');
    }

    public function edit(Gallery $gallery)
    {
        return Inertia::render('Admin/Galleries/Form', [
            'gallery' => $gallery,
        ]);
    }

    public function update(Request $request, Gallery $gallery)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
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
