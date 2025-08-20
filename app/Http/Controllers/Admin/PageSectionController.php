<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pages;
use App\Models\PageSections;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;

class PageSectionController extends Controller
{
    public function index(Pages $page): View

    {
        $sections = $page->sections()->orderBy('order')->get();

        return view('admin.sections.index', compact('page', 'sections'));
    }

    public function create(Pages $page): View

    {
        return view('admin.sections.create', compact('page'));
    }

    public function store(Request $request, Pages $page): RedirectResponse

    {
        $validated = $request->validate([
            'type'    => 'required|string|max:255',
            'content' => 'required|json',
            'order'   => 'required|integer',
        ]);

        $page->sections()->create($validated);
        return redirect()
        ->route('admin.pages.sections.index', ['page' => $page->slug])
            ->with('success', 'Section berhasil ditambahkan.');
    }

    public function edit(PageSections $section): View

    {
            $page = $section->page; // ambil relasi page
             return view('admin.sections.edit', compact('section', 'page'));

    }

    public function update(Request $request, PageSections $section): RedirectResponse
    {
        $validated = $request->validate([
            'type'    => 'required|string|max:255',
            'content' => 'required|json',
            'order'   => 'required|integer',
        ]);
        $page = $section->page; // ambil relasi page
        $section->update($validated);

       return redirect()
        ->route('admin.pages.sections.index', ['page' => $section->page->slug])
        ->with('success', 'Section berhasil diperbarui.');

    }


    public function destroy(PageSections $section): RedirectResponse
    {
        $pageId = $section->slug;
        $section->delete();

        return redirect()
        ->route('admin.pages.sections.index', ['page' => $section->page->slug])
        ->with('success', 'Section berhasil dihapus.');
    }
}
