<?php

namespace App\Http\Controllers\Admin;

use App\Models\Menu;
use App\Models\Pages;
use Illuminate\View\View;
use Illuminate\Support\Str;
use App\Models\MetaSettings;
use App\Models\ProgramStudi;
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
            'slug' => 'nullable|string|max:255|unique:pages,slug',
            'content' => 'nullable|string',
            'is_published' => 'required|boolean',
        ]);

        // Slug dibuat otomatis dari title
        // $validated['slug'] = Str::slug($request->title);

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
            'slug' => 'nullable|string|max:255|unique:pages,slug,' . $page->id,
            'type' => 'required|in:standard,modular',
            'content' => 'nullable|string',
            'is_published' => 'required|boolean',
        ]);

        // $validated['slug'] = Str::slug($request->title);

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
            ->with('meta')
            ->firstOrFail();

        // fallback meta default
        $meta = $page->meta ?? MetaSettings::default()->first();


        $menus = Menu::whereNull('parent_id')
            ->active()
            ->with('children')
            ->orderBy('order')
            ->get();

        if ($page->type === 'modular') {
            $sections = $page->sections()
                ->orderBy('order')
                ->get()
                ->map(function ($section) {
                    // Pastikan content selalu array
                    if (is_string($section->content)) {
                        $decoded = json_decode($section->content, true);
                        $section->decoded_content = is_array($decoded) ? $decoded : [];
                    } elseif (is_array($section->content)) {
                        $section->decoded_content = $section->content;
                    } else {
                        $section->decoded_content = [];
                    }
                    return $section;
                });
            $programStudis = ProgramStudi::all();

            return view('admin.pages.modular', [
                'page' => $page,
                'sections' => $sections,
                'menus' => $menus,
                'meta' => $meta,
                'programStudis' => $programStudis,
            ]);
        }

        return view('admin.pages.standard', [
            'page' => $page,
            'menus' => $menus,
            'meta' => $meta,
        ]);
    }
}
