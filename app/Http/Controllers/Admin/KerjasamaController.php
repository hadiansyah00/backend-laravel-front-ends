<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kerjasama;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KerjasamaController extends Controller
{
    public function index()
    {
        $kerjasamas = Kerjasama::latest()->paginate(15);

        return Inertia::render('Admin/Kerjasamas/Index', [
            'kerjasamas' => $kerjasamas,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Kerjasamas/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'required|string',
            'url' => 'nullable|url|max:255',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->has('is_active');
        
        // Handle MediaPicker string URL parsing
        if ($request->filled('logo')) {
            $parsedPath = parse_url($request->logo, PHP_URL_PATH);
            $validated['logo'] = ltrim($parsedPath, '/');
        }

        Kerjasama::create($validated);

        return redirect()->route('admin.kerjasamas.index')->with('success', 'Mitra Kerjasama berhasil ditambahkan!');
    }

    public function edit(Kerjasama $kerjasama)
    {
        return Inertia::render('Admin/Kerjasamas/Form', [
            'kerjasama' => $kerjasama,
        ]);
    }

    public function update(Request $request, Kerjasama $kerjasama)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'required|string',
            'url' => 'nullable|url|max:255',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->has('is_active');
        
        // Handle MediaPicker string URL parsing
        if ($request->filled('logo')) {
            $parsedPath = parse_url($request->logo, PHP_URL_PATH);
            $validated['logo'] = ltrim($parsedPath, '/');
        }

        $kerjasama->update($validated);

        return redirect()->route('admin.kerjasamas.index')->with('success', 'Mitra Kerjasama berhasil diperbarui!');
    }

    public function destroy(Kerjasama $kerjasama)
    {
        $kerjasama->delete();

        return redirect()->route('admin.kerjasamas.index')->with('success', 'Mitra Kerjasama berhasil dihapus!');
    }
}
