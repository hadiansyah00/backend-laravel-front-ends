<?php

namespace App\Http\Controllers\Admin;

use App\Models\Lowongan;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LowonganController extends Controller
{
    public function index()
    {
        $lowongans = Lowongan::latest()->paginate(15);
        return view('admin.lowongans.index', compact('lowongans'));
    }

    public function create()
    {
        return view('admin.lowongans.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'company'      => 'required|string|max:255',
            'location'     => 'nullable|string|max:255',
            'type'         => 'required|in:full-time,part-time,magang,kontrak',
            'description'  => 'nullable|string',
            'requirements' => 'nullable|string',
            'salary_range' => 'nullable|string|max:100',
            'deadline'     => 'nullable|date',
            'contact_info' => 'nullable|string|max:255',
            'is_active'    => 'boolean',
        ]);

        $validated['slug']      = Str::slug($request->title) . '-' . uniqid();
        $validated['is_active'] = $request->has('is_active');

        Lowongan::create($validated);

        return redirect()->route('admin.lowongans.index')->with('success', 'Lowongan berhasil ditambahkan!');
    }

    public function edit(Lowongan $lowongan)
    {
        return view('admin.lowongans.edit', compact('lowongan'));
    }

    public function update(Request $request, Lowongan $lowongan)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'company'      => 'required|string|max:255',
            'location'     => 'nullable|string|max:255',
            'type'         => 'required|in:full-time,part-time,magang,kontrak',
            'description'  => 'nullable|string',
            'requirements' => 'nullable|string',
            'salary_range' => 'nullable|string|max:100',
            'deadline'     => 'nullable|date',
            'contact_info' => 'nullable|string|max:255',
            'is_active'    => 'boolean',
        ]);

        $validated['is_active'] = $request->has('is_active');
        $lowongan->update($validated);

        return redirect()->route('admin.lowongans.index')->with('success', 'Lowongan berhasil diperbarui!');
    }

    public function destroy(Lowongan $lowongan)
    {
        $lowongan->delete();
        return redirect()->route('admin.lowongans.index')->with('success', 'Lowongan berhasil dihapus!');
    }
}
