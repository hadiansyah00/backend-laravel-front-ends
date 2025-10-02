<?php

namespace App\Http\Controllers;

// "use" statement ini sudah benar
use App\Models\Menu;
use Illuminate\View\View;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class MenuController extends Controller
{

    public function index(): View
    {
        // Mengambil hanya menu induk untuk tampilan utama yang lebih rapi
        $menus = Menu::whereNull('parent_id')->orderBy('order')->get();
        // Menggunakan path view yang benar sesuai struktur admin panel
        return view('menu.index', compact('menus'));
    }

    /**
     * Tampilkan form untuk membuat menu baru.
     */
    public function create(): View
    {
        // Mengirimkan daftar menu yang bisa menjadi induk
        $parentMenus = Menu::whereNull('parent_id')->orderBy('name')->get();
        return view('menu.create', compact('parentMenus'));
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

        // Menggunakan nama route yang benar
        return redirect()->route('admin.menus.index')->with('success', 'Menu berhasil dibuat.');
    }

    /**
     * Tampilkan form untuk mengedit menu.
     */
    public function edit(Menu $menu): View
    {
        // Mengirimkan daftar menu induk, kecuali menu itu sendiri
        $parentMenus = Menu::whereNull('parent_id')->where('id', '!=', $menu->id)->orderBy('name')->get();
        return view('menu.edit', compact('menu', 'parentMenus'));
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
            'slug' => 'nullable|string|max:255|unique:menus,slug,' . $menu->id,
            'parent_id' => 'nullable|exists:menus,id',
            'url' => 'nullable|url',
            'type' => 'required|in:page,link',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        // $validated['slug'] = Str::slug($request->name);

        $menu->update($validated);

        return redirect()->route('admin.menus.index')->with('success', 'Menu berhasil diperbarui.');
    }

    /**
     * Hapus menu dari database.
     */
    public function destroy(Menu $menu): RedirectResponse
    {
        $menu->delete();
        return redirect()->route('admin.menus.index')->with('success', 'Menu berhasil dihapus.');
    }
}
