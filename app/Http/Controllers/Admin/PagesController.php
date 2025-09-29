<?php

namespace App\Http\Controllers\Admin;

use App\Models\Menu;
use App\Models\Pages;
use Illuminate\View\View;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class PagesController extends Controller
{
    public function index(): View
    {
        $pages = Pages::latest()->get();
        return view('admin.pages.index', compact('pages'));
    }

    public function create(): View
    {
        return view('admin.pages.create');
    }

    public function store(Request $request): RedirectResponse
    {
        // Validasi disederhanakan, hanya untuk field Page
        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:pages,title',
            'type' => 'required|in:standard,modular',
            'content' => 'nullable|string',
            'is_published' => 'required|boolean',
        ]);

        // Slug dibuat otomatis dari title
        $validated['slug'] = Str::slug($request->title);

        Pages::create($validated);

        return redirect()->route('admin.pages.index')->with('success', 'Halaman berhasil dibuat.');
    }

    public function edit(Pages $page): View
    {
        return view('admin.pages.edit', compact('page'));
    }

    public function update(Request $request, Pages $page): RedirectResponse
    {
        // Validasi disederhanakan, hanya untuk field Page
        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:pages,title,' . $page->id,
            'type' => 'required|in:standard,modular',
            'content' => 'nullable|string',
            'is_published' => 'required|boolean',
        ]);

        $validated['slug'] = Str::slug($request->title);

        $page->update($validated);

        return redirect()->route('admin.pages.index')->with('success', 'Halaman berhasil diperbarui.');
    }

    public function destroy(Pages $page): RedirectResponse
    {
        $page->delete();
        return redirect()->route('admin.pages.index')->with('success', 'Halaman berhasil dihapus.');
    }

    public function show($slug)
    {
        $page = Pages::where('slug', $slug)
            ->where('is_published', 1)
            ->firstOrFail();

        $menus = Menu::whereNull('parent_id')
            ->active()
            ->with('children')
            ->orderBy('order')
            ->get();

        if ($page->type === 'modular') {
            $sections = $page->sections()->orderBy('order')->get()
                ->map(function ($section) {
                    $content = $section->content;

                    $section->decoded_content = match (true) {
                        is_string($content) => json_decode($content, true) ?? [],
                        is_array($content) => $content,
                        default => []
                    };

                    return $section;
                });

            $jsonContent = is_string($page->content)
                ? json_decode($page->content, true)
                : $page->content;

            return view('admin.pages.modular', compact('page', 'sections', 'menus', 'jsonContent'));
        }

        return view('front-pages.standard', compact('page', 'menus'));
    }
}
