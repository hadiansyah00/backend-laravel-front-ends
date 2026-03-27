<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TentangKami;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TentangKamiController extends Controller
{
    /**
     * Display the Tentang Kami dashboard.
     */
    public function index()
    {
        $tentangKamis = TentangKami::all()->keyBy('type');
        
        return Inertia::render('Admin/TentangKami/Index', [
            'data' => $tentangKamis,
            'types' => TentangKami::TYPES,
        ]);
    }

    /**
     * Store or update a specific Tentang Kami section.
     */
    public function storeOrUpdate(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|in:' . implode(',', array_keys(TentangKami::TYPES)),
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'image' => 'nullable|string', // Path from MediaLibrary or uploaded directly
            'is_active' => 'boolean'
        ]);

        $tentangKami = TentangKami::updateOrCreate(
            ['type' => $validated['type']],
            [
                'title' => $validated['title'],
                'content' => $validated['content'],
                'image' => $validated['image'] ?? null,
                'is_active' => $validated['is_active'] ?? true,
            ]
        );

        return redirect()->back()->with('success', 'Data ' . TentangKami::TYPES[$validated['type']] . ' berhasil disimpan.');
    }
}
