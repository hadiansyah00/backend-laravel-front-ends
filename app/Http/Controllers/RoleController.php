<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource and a form to create new roles.
     */
    public function index(): Response
    {
        // Ambil semua role dan semua permission
        $roles = Role::with('permissions')->orderBy('name')->get();
        $permissions = Permission::orderBy('name')->get();

        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Store a newly created role in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'nullable|array',
        ]);

        // Buat role baru
        $role = Role::create(['name' => $request->name]);

        // Tetapkan permission yang dipilih
        $role->syncPermissions($request->input('permissions', []));

        return redirect()->route('admin.roles.index')->with('success', 'Role baru berhasil dibuat.');
    }

    /**
     * Show the form for editing the specified role.
     * (Ini sama seperti jawaban sebelumnya, tetap diperlukan)
     */
    public function edit(Role $role): Response
    {
        $permissions = Permission::orderBy('name')->get();

        return Inertia::render('Admin/Roles/Form', [
            'role' => $role,
            'permissions' => $permissions,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified role in storage.
     * (Ini sama seperti jawaban sebelumnya, tetap diperlukan)
     */
    public function update(Request $request, Role $role): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,'.$role->id,
            'permissions' => 'nullable|array',
        ]);

        $role->update(['name' => $request->name]);
        $role->syncPermissions($request->input('permissions', []));

        return redirect()->route('admin.roles.index')->with('success', 'Role berhasil diperbarui.');
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

        return redirect()->route('admin.roles.index')->with('success', 'Role berhasil dihapus.');
    }
}
