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


// Halaman utama pakai FrontPagesController
Route::get('/', [FrontPagesController::class, 'index'])->name('home');
Route::get('/berita', [FrontPagesController::class, 'berita'])->name('berita');
Route::get('/wilayah-organisasi', [FrontPagesController::class, 'wilayahOrganisasi'])->name('wilayah');

// Berita dipisah ke path khusus (misal /berita)
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'role:admin'])->prefix('admin')->as('admin.')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('menus', MenuController::class);
    Route::resource('pages', PagesController::class);
    Route::resource('pages.sections', PageSectionController::class)->shallow();
    Route::resource('meta', MetaController::class)->only(['index','edit','update'])
        ->parameters(['meta' => 'page']); 


    // Untuk Permission, kita definisikan route custom di atas resource
    Route::post('permissions/store-multiple', [PermissionController::class, 'storeMultiple'])->name('permissions.storeMultiple');
    Route::resource('permissions', PermissionController::class)->except('show');


    Route::get('/admin/users', function() {
        return '<h1>Halaman Kelola User (Hanya Admin)</h1>';
    })->middleware('role:admin')->name('admin.users');

    // Hanya bisa diakses oleh user dengan izin 'publish articles'
    // Role 'admin' bisa, tapi 'writer' tidak bisa
    Route::get('/admin/publish', function() {
        return '<h1>Halaman Publikasi Artikel (Hanya Publisher)</h1>';
    })->middleware('permission:publish articles')->name('admin.publish');

    // Bisa diakses oleh role 'admin' ATAU 'writer'
    Route::get('/articles', function() {
        return '<h1>Halaman Kelola Artikel (Admin & Writer)</h1>';
    })->middleware('role:admin|writer')->name('articles.index');

});



    // --- CONTOH PROTEKSI ROUTE ---

    // Hanya bisa diakses oleh user dengan role 'admin'



require __DIR__.'/auth.php';
