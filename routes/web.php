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
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

// ================== FRONTEND ================== //
Route::get('/', [FrontPagesController::class, 'index'])->name('home');
Route::get('/berita', [FrontPagesController::class, 'berita'])->name('berita');
Route::get('/wilayah-organisasi', [FrontPagesController::class, 'wilayahOrganisasi'])->name('wilayah');

// ================== AUTH ================== //
// Register
Route::get('/register', [RegisteredUserController::class, 'create'])
    ->middleware('guest')
    ->name('register');
Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest');

// Login
Route::get('/login', [AuthenticatedSessionController::class, 'create'])
    ->middleware('guest')
    ->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest');

// Logout
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// Dashboard
Route::get('/dashboard', fn() => view('dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// ================== ADMIN ================== //
Route::middleware(['auth', 'role:admin'])->prefix('admin')->as('admin.')->group(function () {

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Users, Roles, Menus, Pages
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('menus', MenuController::class);

    // Index semua halaman (admin list)
    Route::get('/admin/pages', [PagesController::class, 'index'])->name('pages.index');
    // Form tambah page
    Route::get('/admin/pages/create', [PagesController::class, 'create'])->name('pages.create');
    // Simpan page baru
    Route::post('/admin/pages', [PagesController::class, 'store'])->name('pages.store');
    // Edit page
    Route::get('/admin/pages/{page}/edit', [PagesController::class, 'edit'])->name('pages.edit');
    // Update page
    Route::put('/admin/pages/{page}', [PagesController::class, 'update'])->name('pages.update');
    // Hapus page
    Route::delete('/admin/pages/{page}', [PagesController::class, 'destroy'])->name('pages.destroy');


    Route::resource('pages.sections', PageSectionController::class)->shallow();
    Route::resource('meta', MetaController::class)->only(['index','edit','update'])
        ->parameters(['meta' => 'page']);

    // Permissions
    Route::post('permissions/store-multiple', [PermissionController::class, 'storeMultiple'])->name('permissions.storeMultiple');
    Route::resource('permissions', PermissionController::class)->except('show');
});

// ================== DYNAMIC PAGES ================== //
// HARUS PALING BAWAH supaya tidak menimpa /login & /register
// Route::get('/{page}', [PagesController::class, 'show'])->name('pages.show');
Route::get('/{slug}', [PagesController::class, 'show'])->name('front.pages.show');

require __DIR__.'/auth.php';
