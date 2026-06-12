<?php

namespace App\Http\Controllers;

// "use" statement ini sudah benar
use App\Models\Menu;
// Remove Illuminate\View\View and add Inertia
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(): Response
    {
        // Mengambil hanya menu induk untuk tampilan utama, dan include children
        $menus = Menu::with('children')->whereNull('parent_id')->orderBy('order')->get();

        // Return Inertia render
        return Inertia::render('Admin/Menus/Index', [
            'menus' => $menus,
        ]);
    }

    /**
     * Tampilkan form untuk membuat menu baru.
     */
    public function create(): Response
    {
        // Mengirimkan daftar menu yang bisa menjadi induk
        $parentMenus = Menu::whereNull('parent_id')->orderBy('name')->get();

        return Inertia::render('Admin/Menus/Form', [
            'parentMenus' => $parentMenus,
            'isEdit' => false,
        ]);
    }

    /**
     * Simpan menu baru ke database.
     */
    public function store(Request $request): RedirectResponse
    {
        // Validasi yang lebih lengkap sesuai struktur tabel baru
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon_svg' => 'nullable|string',
            'slug' => 'nullable|string|max:255|unique:menus,slug',
            'parent_id' => 'nullable|exists:menus,id',
            'url' => 'nullable|url',
            'type' => 'required|in:page,link',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        // Tambahkan slug secara otomatis dari nama
        // $validated['slug'] = Str::slug($request->name);

        Menu::create($validated);
        $this->clearMenuCache();

        // Menggunakan nama route yang benar
        return redirect()->route('admin.menus.index')->with('success', 'Menu berhasil dibuat.');
    }

    /**
     * Tampilkan form untuk mengedit menu.
     */
    public function edit(Menu $menu): Response
    {
        // Mengirimkan daftar menu induk, kecuali menu itu sendiri
        $parentMenus = Menu::whereNull('parent_id')->where('id', '!=', $menu->id)->orderBy('name')->get();

        return Inertia::render('Admin/Menus/Form', [
            'menu' => $menu,
            'parentMenus' => $parentMenus,
            'isEdit' => true,
        ]);
    }

    /**
     * Update menu yang ada di database.
     */
    public function update(Request $request, Menu $menu): RedirectResponse
    {
        // Validasi yang lebih lengkap sesuai struktur tabel baru
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon_svg' => 'nullable|string',
            'slug' => 'nullable|string|max:255|unique:menus,slug,'.$menu->id,
            'parent_id' => 'nullable|exists:menus,id',
            'url' => 'nullable|url',
            'type' => 'required|in:page,link',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        // $validated['slug'] = Str::slug($request->name);

        $menu->update($validated);
        $this->clearMenuCache();

        return redirect()->route('admin.menus.index')->with('success', 'Menu berhasil diperbarui.');
    }

    /**
     * Hapus menu dari database.
     */
    public function destroy(Menu $menu): RedirectResponse
    {
        $menu->delete();
        $this->clearMenuCache();

        return redirect()->route('admin.menus.index')->with('success', 'Menu berhasil dihapus.');
    }

    private function clearMenuCache(): void
    {
        Cache::forget('menus.active_tree');
        Cache::forget('menus_active');
    }
}
