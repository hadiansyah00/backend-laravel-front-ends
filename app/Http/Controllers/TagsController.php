<?php

namespace App\Http\Controllers;

use App\Models\Tags;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TagsController extends Controller
{
    public function index()
    {
        $tags = Tags::latest()->paginate(10);

        return Inertia::render('Admin/Tags/Index', [
            'tags' => $tags
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Tags/Form', [
            'tag' => null
        ]);
    }

    /**
     * Store a newly created tag in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:tags,name',
            'slug' => 'nullable|string|max:255|unique:tags,slug',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        Tags::create($validated);

        return redirect()->route('admin.tags.index')
            ->with('success', 'Tag Artikel berhasil dibuat.');
    }

    public function edit(Tags $tag)
    {
        return Inertia::render('Admin/Tags/Form', [
            'tag' => $tag
        ]);
    }

    /**
     * Update the specified tag in storage.
     */
    public function update(Request $request, Tags $tag)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:tags,name,'.$tag->id,
            'slug' => 'nullable|string|max:255|unique:tags,slug,'.$tag->id,
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $tag->update($validated);

        return redirect()->route('admin.tags.index')
            ->with('success', 'Tag Artikel berhasil diperbarui.');
    }

    public function destroy(Tags $tag)
    {
        $tag->delete();

        return redirect()->route('admin.tags.index')
            ->with('success', 'Tag Artikel berhasil dihapus.');
    }
}
