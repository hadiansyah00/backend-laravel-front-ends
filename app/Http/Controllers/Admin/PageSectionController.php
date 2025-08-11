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
            ->route('admin.sections.index', ['page' => $page->id])
            ->with('success', 'Section berhasil ditambahkan.');
    }

    public function edit(PageSections $section): View
    {
        return view('admin.sections.edit', compact('section'));
    }

    public function update(Request $request, PageSections $section): RedirectResponse
    {
        $validated = $request->validate([
            'type'    => 'required|string|max:255',
            'content' => 'required|json',
            'order'   => 'required|integer',
        ]);

        $section->update($validated);

        return redirect()
            ->route('admin.sections.index', ['page' => $section->page_id])
            ->with('success', 'Section berhasil diperbarui.');
    }

    public function destroy(PageSections $section): RedirectResponse
    {
        $pageId = $section->page_id;
        $section->delete();

        return redirect()
            ->route('admin.sections.index', ['page' => $pageId])
            ->with('success', 'Section berhasil dihapus.');
    }
}