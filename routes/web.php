<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\MetaController;
use App\Http\Controllers\FrontPagesController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\Admin\PagesController;
use App\Http\Controllers\Admin\PageSectionController;

// ================== FRONTEND ================== //
Route::get('/', [FrontPagesController::class, 'index'])->name('home');
Route::get('/berita', [FrontPagesController::class, 'berita'])->name('berita');
Route::get('/wilayah-organisasi', [FrontPagesController::class, 'wilayahOrganisasi'])->name('wilayah');

// Dynamic pages (harus di paling bawah)
Route::get('/{slug}', [PagesController::class, 'show'])->name('page.show');

// ================== BACKEND ================== //
Route::get('/dashboard', fn() => view('dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth', 'role:admin'])->prefix('admin')->as('admin.')->group(function () {

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Users, Roles, Menus, Pages
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('menus', MenuController::class);
    Route::resource('pages', PagesController::class);
    Route::resource('pages.sections', PageSectionController::class)->shallow();
    Route::resource('meta', MetaController::class)->only(['index','edit','update'])
        ->parameters(['meta' => 'page']);

    // Permissions
    Route::post('permissions/store-multiple', [PermissionController::class, 'storeMultiple'])->name('permissions.storeMultiple');
    Route::resource('permissions', PermissionController::class)->except('show');

    // Contoh khusus
    Route::get('/users-test', fn() => '<h1>Halaman Kelola User (Hanya Admin)</h1>')
        ->middleware('role:admin')
        ->name('users.test');

    Route::get('/publish', fn() => '<h1>Halaman Publikasi Artikel (Hanya Publisher)</h1>')
        ->middleware('permission:publish articles')
        ->name('publish');

    // Articles backend
    Route::resource('articles', ArticleController::class)->middleware('role:admin|writer');
});

require __DIR__.'/auth.php';
