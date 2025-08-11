<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Buat Permissions
        Permission::create(['name' => 'view dashboard']);
        Permission::create(['name' => 'manage users']);
        Permission::create(['name' => 'manage articles']);
        Permission::create(['name' => 'publish articles']);

        // Buat Roles dan berikan permissions
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all()); // Admin dapat semua izin

        $writerRole = Role::create(['name' => 'writer']);
        $writerRole->givePermissionTo(['view dashboard', 'manage articles']);

        $guestRole = Role::create(['name' => 'guest']);
        $guestRole->givePermissionTo('view dashboard');
    }
}
