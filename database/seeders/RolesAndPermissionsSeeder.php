<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

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
        $permissions = [
            'view dashboard',
            'manage users',
            'manage articles',
            'publish articles',
            'manage pages',
            'manage menus',
            'manage media',
            'manage settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Buat Roles dan berikan permissions
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->syncPermissions(Permission::all()); // Admin dapat semua izin

        $writerRole = Role::firstOrCreate(['name' => 'writer']);
        $writerRole->syncPermissions(['view dashboard', 'manage articles']);

        $guestRole = Role::firstOrCreate(['name' => 'guest']);
        $guestRole->syncPermissions(['view dashboard']);

        // ====================================================
        // Buat / Update default admin user
        // ====================================================
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Pastikan user admin punya role admin
        if (!$adminUser->hasRole('admin')) {
            $adminUser->assignRole('admin');
        }

        // ====================================================
        // Assign role admin ke SEMUA user yang belum punya role
        // (untuk fix user lama yang sudah terdaftar)
        // ====================================================
        $usersWithoutRole = User::whereDoesntHave('roles')->get();
        foreach ($usersWithoutRole as $user) {
            $user->assignRole('admin');
        }

        $this->command->info('✅ Roles & permissions berhasil di-setup!');
        $this->command->info("   Admin user: admin@admin.com / password");
        $this->command->info("   {$usersWithoutRole->count()} user lama di-assign role admin.");
    }
}

