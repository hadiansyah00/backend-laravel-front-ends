<?php

namespace App\Http\Controllers\FrontPages;

use App\Models\Statistic;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StatisticController extends Controller
{
     /**
     * Tampilkan daftar statistik
     */
    public function index()
    {
        $statistics = Statistic::orderBy('order', 'asc')->paginate(10);

        return view('admin.statistics.index', compact('statistics'));
    }

    /**
     * Form tambah statistik baru
     */
    public function create()
    {
        return view('admin.statistics.create');
    }

    /**
     * Simpan statistik baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'value' => 'required|numeric',
            'icon'  => 'nullable|string|max:255', // misalnya pakai nama class icon
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

        return view('admin.statistics.edit', compact('statistic'));
    }

    /**
     * Update data statistik
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'value' => 'required|numeric',
            'icon'  => 'nullable|string|max:255',
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
