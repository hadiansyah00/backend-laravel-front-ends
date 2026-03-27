<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MetaSettings;
use App\Models\Pages;
use App\Models\ProgramStudi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PagesController extends Controller
{
    /**
     * Daftar semua section types yang tersedia untuk dynamic pages.
     */
    public const SECTION_TYPES = [
        'hero' => 'Hero Banner (dengan background & breadcrumbs)',
        'title' => 'Title Section (dengan overlay)',
        'content-with-image' => 'Konten dengan Gambar (2 kolom)',
        'visi-misi' => 'Visi & Misi',
        'timeline' => 'Timeline / Sejarah',
        'team-grid' => 'Grid Tim / Dosen',
        'image-text' => 'Sambutan / Pesan (gambar + teks)',
        'card-grid' => 'Grid Kartu (program / peluang)',
        'org-chart' => 'Struktur Organisasi',
        'prodi-profile' => 'Profil Program Studi',
        'feature' => 'Feature Cards',
        'richtext' => 'Rich Text (CKEditor)',
        'gallery' => 'Galeri Foto / Video',
        'faq' => 'FAQ (Accordion)',
        'cta-banner' => 'Call-to-Action Banner',
        'document-list' => 'Daftar Dokumen / Download',
        'contact-info' => 'Informasi Kontak',
        'stats' => 'Statistik Angka',
        'testimonial' => 'Testimonial',
    ];

    /**
     * Kategori Template Halaman.
     */
    public const PAGE_TEMPLATES = [
        'default' => 'Template Standar (Universal Builder)',
        'profil_institusi' => 'Profil Institusi (Visi, Misi, Sejarah)',
        'fasilitas' => 'Fasilitas Kampus',
        'unit_lembaga' => 'Unit & Lembaga',
        'kontak' => 'Hubungi Kami',
    ];

    /**
     * Kategori halaman untuk pengelompokan.
     */
    public const PAGE_CATEGORIES = [
        'tentang' => 'Tentang',
        'akademik' => 'Akademik',
        'unit' => 'Unit & Lembaga',
        'informasi' => 'Informasi',
        'pmb' => 'PMB',
        'fasilitas' => 'Fasilitas',
        'alumni' => 'Alumni & Karir',
        'lainnya' => 'Lainnya',
    ];

    public function index()
    {
        $pages = Pages::with('menu')->latest()->get();

        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages,
        ]);
    }

    public function create()
    {
        $menus = Menu::whereNull('parent_id')->with('children')->orderBy('order')->get();
        $templates = self::PAGE_TEMPLATES;

        return Inertia::render('Admin/Pages/Form', [
            'menus' => $menus,
            'templates' => $templates,
            'page' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'menu_id' => 'required|exists:menus,id',
            'title' => 'required|string|max:255|unique:pages,title',
            'slug' => 'nullable|string|max:255|unique:pages,slug',
            'template' => 'required|string|max:100',
            'is_published' => 'required|boolean',
            'hero_title' => 'nullable|string|max:255',
            'hero_subtitle' => 'nullable|string',
        ]);

        if ($request->hasFile('hero_bg_image')) {
            $validated['hero_bg_image'] = $request->file('hero_bg_image')->store('uploads/pages/hero', 'public');
        }

        Pages::create($validated);

        return redirect()->route('admin.pages.index')->with('success', 'Halaman berhasil dibuat.');
    }

    public function edit(Pages $page)
    {
        $menus = Menu::whereNull('parent_id')->with('children')->orderBy('order')->get();
        $templates = self::PAGE_TEMPLATES;

        return Inertia::render('Admin/Pages/Form', [
            'page' => $page,
            'menus' => $menus,
            'templates' => $templates,
        ]);
    }

    public function update(Request $request, Pages $page): RedirectResponse
    {
        $validated = $request->validate([
            'menu_id' => 'required|exists:menus,id',
            'title' => 'required|string|max:255|unique:pages,title,'.$page->id,
            'slug' => 'nullable|string|max:255|unique:pages,slug,'.$page->id,
            'template' => 'required|string|max:100',
            'is_published' => 'required|boolean',
            'hero_title' => 'nullable|string|max:255',
            'hero_subtitle' => 'nullable|string',
        ]);

        if ($request->hasFile('hero_bg_image')) {
            $validated['hero_bg_image'] = $request->file('hero_bg_image')->store('uploads/pages/hero', 'public');
        }

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
