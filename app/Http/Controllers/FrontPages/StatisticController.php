<?php

namespace App\Http\Controllers\FrontPages;

use App\Http\Controllers\Controller;
use App\Models\Statistic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatisticController extends Controller
{
    /**
     * Tampilkan daftar statistik
     */
    public function index()
    {
        $statistics = Statistic::orderBy('order', 'asc')->paginate(10);

        return Inertia::render('Admin/Statistics/Index', [
            'statistics' => $statistics,
        ]);
    }

    /**
     * Form tambah statistik baru
     */
    public function create()
    {
        return Inertia::render('Admin/Statistics/Form', [
            'statistic' => null,
        ]);
    }

    /**
     * Simpan statistik baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'value' => 'required|numeric',
            'icon' => 'nullable|string|max:255', // misalnya pakai nama class icon
            'order' => 'nullable|integer',
        ]);

        Statistic::create($request->only('title', 'value', 'icon', 'order'));

        return redirect()->route('admin.statistics.index')
            ->with('success', 'Data statistik berhasil ditambahkan.');
    }

    /**
     * Form edit statistik
     */
    public function edit($id)
    {
        $statistic = Statistic::findOrFail($id);

        return Inertia::render('Admin/Statistics/Form', [
            'statistic' => $statistic,
        ]);
    }

    /**
     * Update data statistik
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'value' => 'required|numeric',
            'icon' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
        ]);

        $statistic = Statistic::findOrFail($id);
        $statistic->update($request->only('title', 'value', 'icon', 'order'));

        return redirect()->route('admin.statistics.index')
            ->with('success', 'Data statistik berhasil diperbarui.');
    }

    /**
     * Hapus data statistik
     */
    public function destroy($id)
    {
        $statistic = Statistic::findOrFail($id);
        $statistic->delete();

        return redirect()->route('admin.statistics.index')
            ->with('success', 'Data statistik berhasil dihapus.');
    }
}
