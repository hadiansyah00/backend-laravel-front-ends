<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pages;
use App\Models\PageSections;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageSectionController extends Controller
{
    public function index(Pages $page)
    {
        $sections = $page->sections()->orderBy('order')->get();
        $sectionTypes = PagesController::SECTION_TYPES;

        return Inertia::render('Admin/Sections/Index', [
            'page' => $page,
            'sections' => $sections,
            'sectionTypes' => $sectionTypes,
        ]);
    }

    public function create(Pages $page)
    {
        $sectionTypes = PagesController::SECTION_TYPES;

        return Inertia::render('Admin/Sections/Form', [
            'page' => $page,
            'sectionTypes' => $sectionTypes,
            'section' => null,
        ]);
    }

    public function store(Request $request, Pages $page): RedirectResponse
    {
        $validated = $request->validate([
            'type' => 'required|string|max:255',
            'content' => 'nullable|array',
            'order' => 'required|integer',
        ]);

        $page->sections()->create($validated);

        return redirect()
            ->route('admin.pages.sections.index', ['page' => $page->slug])
            ->with('success', 'Section berhasil ditambahkan.');
    }

    public function edit(PageSections $section)
    {
        $page = $section->page; // ambil relasi page
        $sectionTypes = PagesController::SECTION_TYPES;

        return Inertia::render('Admin/Sections/Form', [
            'section' => $section,
            'page' => $page,
            'sectionTypes' => $sectionTypes,
        ]);
    }

    public function update(Request $request, PageSections $section): RedirectResponse
    {
        $validated = $request->validate([
            'type' => 'required|string|max:255',
            'content' => 'nullable|array',
            'order' => 'required|integer',
        ]);

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
