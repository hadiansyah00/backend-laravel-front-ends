<?php

namespace App\Http\Controllers\FrontPages;

use App\Http\Controllers\Controller;
use App\Models\CompanyProfileVideo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyProfileVideoController extends Controller
{
    /**
     * Tampilkan semua video company profile
     */
    public function index()
    {
        $videos = CompanyProfileVideo::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/CompanyProfile/Index', [
            'videos' => $videos,
        ]);
    }

    /**
     * Form tambah video baru
     */
    public function create()
    {
        return Inertia::render('Admin/CompanyProfile/Form', [
            'video' => null,
        ]);
    }

    /**
     * Simpan video baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'required|url',
            'is_active' => 'boolean',
        ]);

        CompanyProfileVideo::create([
            'title' => $request->title,
            'description' => $request->description,
            'video_url' => $request->video_url,
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()->route('admin.companyprofile.index')
            ->with('success', 'Video company profile berhasil ditambahkan.');
    }

    /**
     * Form edit video
     */
    public function edit($id)
    {
        $video = CompanyProfileVideo::findOrFail($id);

        return Inertia::render('Admin/CompanyProfile/Form', [
            'video' => $video,
        ]);
    }

    /**
     * Update video
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'required|url',
            'is_active' => 'boolean',
        ]);

        $video = CompanyProfileVideo::findOrFail($id);

        $video->update([
            'title' => $request->title,
            'description' => $request->description,
            'video_url' => $request->video_url,
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()->route('admin.companyprofile.index')
            ->with('success', 'Video company profile berhasil diperbarui.');
    }

    /**
     * Hapus video
     */
    public function destroy($id)
    {
        $video = CompanyProfileVideo::findOrFail($id);
        $video->delete();

        return redirect()->route('admin.companyprofile.index')
            ->with('success', 'Video company profile berhasil dihapus.');
    }
}
