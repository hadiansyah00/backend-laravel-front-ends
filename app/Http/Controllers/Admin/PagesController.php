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
use Inertia\Inertia;

class PagesController extends Controller
{
    /**
     * Daftar semua section types yang tersedia untuk dynamic pages.
     */
    public const SECTION_TYPES = [
        'hero'               => 'Hero Banner (dengan background & breadcrumbs)',
        'title'              => 'Title Section (dengan overlay)',
        'content-with-image' => 'Konten dengan Gambar (2 kolom)',
        'visi-misi'          => 'Visi & Misi',
        'timeline'           => 'Timeline / Sejarah',
        'team-grid'          => 'Grid Tim / Dosen',
        'image-text'         => 'Sambutan / Pesan (gambar + teks)',
        'card-grid'          => 'Grid Kartu (program / peluang)',
        'org-chart'          => 'Struktur Organisasi',
        'prodi-profile'      => 'Profil Program Studi',
        'feature'            => 'Feature Cards',
        'richtext'           => 'Rich Text (CKEditor)',
        'gallery'            => 'Galeri Foto / Video',
        'faq'                => 'FAQ (Accordion)',
        'cta-banner'         => 'Call-to-Action Banner',
        'document-list'      => 'Daftar Dokumen / Download',
        'contact-info'       => 'Informasi Kontak',
        'stats'              => 'Statistik Angka',
        'testimonial'        => 'Testimonial',
    ];

    /**
     * Kategori halaman untuk pengelompokan.
     */
    public const PAGE_CATEGORIES = [
        'tentang'    => 'Tentang',
        'akademik'   => 'Akademik',
        'unit'       => 'Unit & Lembaga',
        'informasi'  => 'Informasi',
        'pmb'        => 'PMB',
        'fasilitas'  => 'Fasilitas',
        'alumni'     => 'Alumni & Karir',
        'lainnya'    => 'Lainnya',
    ];

    public function index(): View
    {
        $pages = Pages::latest()->get();
        return view('admin.pages.index', compact('pages'));
    }

    public function create(): View
    {
        $sectionTypes = self::SECTION_TYPES;
        $categories = self::PAGE_CATEGORIES;
        return view('admin.pages.create', compact('sectionTypes', 'categories'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255|unique:pages,title',
            'type'         => 'required|in:standard,modular',
            'slug'         => 'nullable|string|max:255|unique:pages,slug',
            'content'      => 'nullable|string',
            'is_published' => 'required|boolean',
            'template'     => 'nullable|string|max:100',
            'category'     => 'nullable|string|max:100',
            'icon'         => 'nullable|string|max:255',
            'order'        => 'nullable|integer',
            'parent_slug'  => 'nullable|string|max:255',
        ]);

        Pages::create($validated);

        return redirect()->route('admin.pages.index')->with('success', 'Halaman berhasil dibuat.');
    }

    public function edit(Pages $page): View
    {
        $sectionTypes = self::SECTION_TYPES;
        $categories = self::PAGE_CATEGORIES;
        return view('admin.pages.edit', compact('page', 'sectionTypes', 'categories'));
    }

    public function update(Request $request, Pages $page): RedirectResponse
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255|unique:pages,title,' . $page->id,
            'slug'         => 'nullable|string|max:255|unique:pages,slug,' . $page->id,
            'type'         => 'required|in:standard,modular',
            'content'      => 'nullable|string',
            'is_published' => 'required|boolean',
            'template'     => 'nullable|string|max:100',
            'category'     => 'nullable|string|max:100',
            'icon'         => 'nullable|string|max:255',
            'order'        => 'nullable|integer',
            'parent_slug'  => 'nullable|string|max:255',
        ]);

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

            return Inertia::render('DynamicPage', [
                'page' => $page,
                'sections' => $sections,
                'menus' => $menus,
                'meta' => $meta,
                'programStudis' => clone $programStudis, // clone to avoid mutation
            ]);
        }

        return Inertia::render('DynamicPage', [
            'page' => $page,
            'sections' => [],
            'menus' => $menus,
            'meta' => $meta,
        ]);
    }
}
