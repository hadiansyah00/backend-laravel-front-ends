<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DosenController extends Controller
{
    protected $prodiList = [
        'D3 Kebidanan',
        'S1 Farmasi',
        'S1 Gizi',
        'Umum / Struktural',
    ];

    public function index()
    {
        $dosens = Dosen::orderBy('order')->orderBy('name')->paginate(15);

        return Inertia::render('Admin/Dosens/Index', [
            'dosens' => $dosens,
        ]);
    }

    public function create()
    {
        $prodis = $this->prodiList;

        return Inertia::render('Admin/Dosens/Form', [
            'dosen' => null,
            'prodis' => $prodis,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nip' => 'nullable|string|max:255|unique:dosens,nip',
            'nidn' => 'nullable|string|max:255|unique:dosens,nidn',
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'prodi' => 'nullable|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'bio' => 'nullable|string',
            'linkedin_url' => 'nullable|url',
            'email' => 'nullable|email|max:255',
            'order' => 'required|integer',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->has('is_active');

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('dosens', 'public');
            $validated['photo'] = 'storage/'.$path;
        }

        Dosen::create($validated);

        return redirect()->route('admin.dosens.index')->with('success', 'Data Dosen berhasil ditambahkan!');
    }

    public function edit(Dosen $dosen)
    {
        $prodis = $this->prodiList;

        return Inertia::render('Admin/Dosens/Form', [
            'dosen' => $dosen,
            'prodis' => $prodis,
        ]);
    }

    public function update(Request $request, Dosen $dosen)
    {
        $validated = $request->validate([
            'nip' => 'nullable|string|max:255|unique:dosens,nip,'.$dosen->id,
            'nidn' => 'nullable|string|max:255|unique:dosens,nidn,'.$dosen->id,
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'prodi' => 'nullable|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'bio' => 'nullable|string',
            'linkedin_url' => 'nullable|url',
            'email' => 'nullable|email|max:255',
            'order' => 'required|integer',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->has('is_active');

        if ($request->hasFile('photo')) {
            if ($dosen->photo && str_starts_with($dosen->photo, 'storage/')) {
                Storage::disk('public')->delete(str_replace('storage/', '', $dosen->photo));
            }
            $path = $request->file('photo')->store('dosens', 'public');
            $validated['photo'] = 'storage/'.$path;
        }

        $dosen->update($validated);

        return redirect()->route('admin.dosens.index')->with('success', 'Data Dosen berhasil diperbarui!');
    }

    public function destroy(Dosen $dosen)
    {
        if ($dosen->photo && str_starts_with($dosen->photo, 'storage/')) {
            Storage::disk('public')->delete(str_replace('storage/', '', $dosen->photo));
        }
        $dosen->delete();

        return redirect()->route('admin.dosens.index')->with('success', 'Data Dosen berhasil dihapus!');
    }
}
