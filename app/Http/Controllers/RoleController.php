<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource and a form to create new roles.
     */
    public function index(): View
    {
        // Ambil semua role dan semua permission
        $roles = Role::with('permissions')->orderBy('name')->get();
        $permissions = Permission::orderBy('name')->get();

        return view('roles.index', compact('roles', 'permissions'));
    }

    /**
     * Store a newly created role in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'nullable|array'
        ]);

        // Buat role baru
        $role = Role::create(['name' => $request->name]);

        // Tetapkan permission yang dipilih
        $role->syncPermissions($request->input('permissions', []));

        return redirect()->route('roles.index')->with('success', 'Role baru berhasil dibuat.');
    }

    /**
     * Show the form for editing the specified role.
     * (Ini sama seperti jawaban sebelumnya, tetap diperlukan)
     */
    public function edit(Role $role): View
    {
        $permissions = Permission::orderBy('name')->get();
        return view('roles.edit', compact('role', 'permissions'));
    }

    /**
     * Update the specified role in storage.
     * (Ini sama seperti jawaban sebelumnya, tetap diperlukan)
     */
    public function update(Request $request, Role $role): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'permissions' => 'nullable|array'
        ]);

        $role->update(['name' => $request->name]);
        $role->syncPermissions($request->input('permissions', []));

        return redirect()->route('roles.index')->with('success', 'Role berhasil diperbarui.');
    }

    /**
     * Remove the specified role from storage.
     */
    public function destroy(Role $role): RedirectResponse
    {
        // Hindari menghapus role super-admin jika ada
        if ($role->name === 'admin') {
            return back()->with('error', 'Role Admin tidak dapat dihapus.');
        }

        $role->delete();

        return redirect()->route('roles.index')->with('success', 'Role berhasil dihapus.');
    }
}
