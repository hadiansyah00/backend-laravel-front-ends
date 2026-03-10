<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Beranda;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BerandaController extends Controller
{
    public function index()
    {
        $berandas = Beranda::all()->keyBy('type');
        return Inertia::render('Admin/Beranda/Index', [
            'data' => $berandas,
            'types' => Beranda::TYPES,
        ]);
    }

    public function storeOrUpdate(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|in:' . implode(',', array_keys(Beranda::TYPES)),
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        Beranda::updateOrCreate(
            ['type' => $validated['type']],
            [
                'title' => $validated['title'],
                'content' => $validated['content'],
                'image' => $validated['image'] ?? null,
                'is_active' => $validated['is_active'] ?? true,
            ]
        );

        return redirect()->back()->with('success', 'Data ' . Beranda::TYPES[$validated['type']] . ' berhasil disimpan.');
    }
}
