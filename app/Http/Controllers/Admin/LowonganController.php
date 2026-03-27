<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lowongan;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LowonganController extends Controller
{
    public function index()
    {
        $lowongans = Lowongan::latest()->paginate(15);

        return Inertia::render('Admin/Lowongans/Index', [
            'lowongans' => $lowongans,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Lowongans/Form', [
            'lowongan' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'type' => 'required|in:full-time,part-time,magang,kontrak',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'salary_range' => 'nullable|string|max:100',
            'deadline' => 'nullable|date',
            'contact_info' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($request->title).'-'.uniqid();
        $validated['is_active'] = $request->has('is_active');

        Lowongan::create($validated);

        return redirect()->route('admin.lowongans.index')->with('success', 'Lowongan berhasil ditambahkan!');
    }

    public function edit(Lowongan $lowongan)
    {
        return Inertia::render('Admin/Lowongans/Form', [
            'lowongan' => $lowongan,
        ]);
    }

    public function update(Request $request, Lowongan $lowongan)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'type' => 'required|in:full-time,part-time,magang,kontrak',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'salary_range' => 'nullable|string|max:100',
            'deadline' => 'nullable|date',
            'contact_info' => 'nullable|string|max:255',
            'is_active' => 'boolean',
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
