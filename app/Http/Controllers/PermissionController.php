<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $permissions = Permission::latest()->paginate(10);

        return Inertia::render('Admin/Permissions/Index', [
            'permissions' => $permissions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Permissions/Form', [
            'isEdit' => false,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * Method ini tetap ada untuk form edit/single add jika diperlukan.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:permissions,name',
        ]);

        Permission::create(['name' => $request->name]);

        return redirect()->route('admin.permissions.index')->with('success', 'Permission berhasil dibuat.');
    }

    /**
     * [BARU] Method untuk menyimpan banyak permission sekaligus via AJAX.
     */
    public function storeMultiple(Request $request)
    {
        // Validasi bahwa input adalah array dan setiap itemnya unik di database
        $request->validate([
            'permissions' => 'required|array|min:1',
            'permissions.*.name' => [ // Validasi setiap item dalam array
                'required',
                'string',
                Rule::unique('permissions', 'name'),
            ],
        ]);

        $permissionsData = collect($request->permissions)->map(function ($permission) {
            return ['name' => $permission['name'], 'guard_name' => 'web'];
        })->all();

        Permission::insert($permissionsData);

        // Mengembalikan respon JSON untuk ditangani oleh JavaScript
        return response()->json(['message' => count($permissionsData).' permission berhasil dibuat.']);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permission $permission): Response
    {
        return Inertia::render('Admin/Permissions/Form', [
            'permission' => $permission,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Permission $permission)
    {
        $request->validate([
            'name' => 'required|string|unique:permissions,name,'.$permission->id,
        ]);

        $permission->update(['name' => $request->name]);

        return redirect()->route('admin.permissions.index')->with('success', 'Permission berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        $permission->delete();

        return redirect()->route('admin.permissions.index')->with('success', 'Permission berhasil dihapus.');
    }
}
