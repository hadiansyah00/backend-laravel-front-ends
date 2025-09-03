<?php

namespace App\Http\Controllers\FrontPages;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    /**
     * Tampilkan daftar testimoni.
     */
    public function index()
    {
        $testimonials = Testimonial::latest()->paginate(10);

        return view('admin.testimonials.index', compact('testimonials'));
    }

    /**
     * Form tambah testimoni.
     */
    public function create()
    {
        return view('admin.testimonials.create');
    }

    /**
     * Simpan testimoni baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'role'    => 'nullable|string|max:255',
            'message' => 'required|string',
            'photo'   => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('testimonials', 'public');
        }

        Testimonial::create($validated);

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimoni berhasil ditambahkan.');
    }

    /**
     * Form edit testimoni.
     */
     public function edit($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        return view('admin.testimonials.edit', compact('testimonial'));
    }

    /**
     * Update testimoni.
     */
    public function update(Request $request, $id)
        {
            $testimonial = Testimonial::findOrFail($id);

            $validated = $request->validate([
                'name'    => 'required|string|max:255',
                'role'    => 'nullable|string|max:255',
                'message' => 'required|string',
                'photo'   => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            ]);

            if ($request->hasFile('photo')) {
                // hapus foto lama jika ada
                if ($testimonial->photo && Storage::disk('public')->exists($testimonial->photo)) {
                    Storage::disk('public')->delete($testimonial->photo);
                }

                $validated['photo'] = $request->file('photo')->store('testimonials', 'public');
            }

            $testimonial->update($validated);

            return redirect()->route('admin.testimonials.index')->with('success', 'Testimoni berhasil diperbarui.');
        }

    /**
     * Hapus testimoni.
     */
    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->photo && Storage::disk('public')->exists($testimonial->photo)) {
            Storage::disk('public')->delete($testimonial->photo);
        }

        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimoni berhasil dihapus.');
    }
}