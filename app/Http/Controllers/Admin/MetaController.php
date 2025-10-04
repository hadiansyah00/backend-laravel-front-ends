<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pages;
use App\Models\MetaSettings;

class MetaController extends Controller
{
    public function index()
    {
        $pages = Pages::with('meta')->paginate(10);

        return view('admin.meta.index', compact('pages'));
    }

    public function edit(string $type, int $id)
    {
        $modelClass = [
            'pages'    => \App\Models\Pages::class,
            'articles' => \App\Models\Article::class,
        ][$type] ?? abort(404);

        $model = $modelClass::findOrFail($id);
        $meta = $model->meta ?? new MetaSettings();

        return view('admin.meta.edit', compact('model', 'meta', 'type'));
    }


    public function update(Request $request, string $type, int $id)
    {
        $modelClass = [
            'pages'    => \App\Models\Pages::class,
            'articles' => \App\Models\Article::class,
        ][$type] ?? abort(404);

        $model = $modelClass::findOrFail($id);

        $validated = $request->validate([
            'meta_description'    => 'nullable|string|max:255',
            'meta_keywords'       => 'nullable|string|max:255',
            'robots'              => 'nullable|string|max:50',
            'canonical_url'       => 'nullable|url',
            'og_title'            => 'nullable|string|max:255',
            'og_description'      => 'nullable|string|max:255',
            'og_url'              => 'nullable|url',
            'og_type'             => 'nullable|string|max:50',
            'og_site_name'        => 'nullable|string|max:255',
            'twitter_card'        => 'nullable|string|max:50',
            'twitter_title'       => 'nullable|string|max:255',
            'twitter_description' => 'nullable|string|max:255',
            'twitter_site'        => 'nullable|string|max:50',
            'og_image'            => 'nullable|mimes:jpg,jpeg,png,webp|max:2048',
            'twitter_image'       => 'nullable|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // Simpan file kalau ada
        if ($request->hasFile('og_image')) {
            $validated['og_image'] = $request->file('og_image')->store('seo/meta', 'public');
        }
        if ($request->hasFile('twitter_image')) {
            $validated['twitter_image'] = $request->file('twitter_image')->store('seo/meta', 'public');
        }

        // Gunakan relasi morphOne langsung, biar otomatis isi seoable_id + seoable_type
        $model->meta()->updateOrCreate([], $validated);

        return redirect()
            ->back()
            ->with('success', 'SEO berhasil disimpan.');
    }
}
