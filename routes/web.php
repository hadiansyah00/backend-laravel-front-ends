<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TagsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Admin\MetaController;
use App\Http\Controllers\FrontPagesController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\Admin\PagesController;
use App\Http\Controllers\PendaftaranEmailController;
use App\Http\Controllers\Admin\PageSectionController;
use App\Http\Controllers\FrontPages\SliderController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\FrontPages\StatisticController;
use App\Http\Controllers\FrontPages\TestimonialController;
use App\Http\Controllers\FrontPages\FrontSettingController;
use App\Http\Controllers\FrontPages\ProgramStudiController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\FrontPages\CompanyProfileVideoController;







// ================== FRONTEND ================== //
Route::get('/', [FrontPagesController::class, 'index'])->name('home');
Route::get('/search', [App\Http\Controllers\SearchController::class, 'index'])->name('search');

Route::get('/berita/{slug}', [FrontPagesController::class, 'beritaDetail'])->name('berita.detail');
Route::get('/wilayah-organisasi', [FrontPagesController::class, 'wilayahOrganisasi'])->name('wilayah');
Route::prefix('pendaftaran-email')->group(function () {
    Route::get('/create', [PendaftaranEmailController::class, 'create'])->name('pendaftaran-email.create');
    Route::post('/', [PendaftaranEmailController::class, 'store'])->name('pendaftaran-email.store');
});
Route::get('/pendidikan/{slug}', [PagesController::class, 'show'])
    ->name('pendidikan.show');

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
    Route::resource('articles', ArticleController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('tags', TagsController::class);

    Route::get('pendaftaran-email', [PendaftaranEmailController::class, 'index'])->name('pendaftaran-email.index');
    Route::get('pendaftaran-email/{id}', [PendaftaranEmailController::class, 'show'])->name('endaftaran-email.show');
    Route::delete('pendaftaran-email/{id}', [PendaftaranEmailController::class, 'destroy'])->name('pendaftaran-email.destroy');
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
    Route::prefix('seo')->name('seo.')->group(function () {
        Route::get('{type}/{id}/edit', [MetaController::class, 'edit'])->name('edit');
        Route::put('{type}/{id}', [MetaController::class, 'update'])->name('update');
    });


    // Permissions
    Route::post('permissions/store-multiple', [PermissionController::class, 'storeMultiple'])->name('permissions.storeMultiple');
    Route::resource('permissions', PermissionController::class)->except('show');
    Route::prefix('front-pages')->group(function () {
        // Sliders
        Route::prefix('sliders')->group(function () {
            Route::get('/', [SliderController::class, 'index'])->name('sliders.index');
            Route::get('/create', [SliderController::class, 'create'])->name('sliders.create');
            Route::post('/', [SliderController::class, 'store'])->name('sliders.store');
            Route::get('/{id}/edit', [SliderController::class, 'edit'])->name('sliders.edit');
            Route::put('/{id}', [SliderController::class, 'update'])->name('sliders.update');
            Route::delete('/{id}', [SliderController::class, 'destroy'])->name('sliders.destroy');
        });

        // Testimonials
        Route::prefix('testimonials')->group(function () {
            Route::get('/', [TestimonialController::class, 'index'])->name('testimonials.index');
            Route::get('/create', [TestimonialController::class, 'create'])->name('testimonials.create');
            Route::post('/', [TestimonialController::class, 'store'])->name('testimonials.store');
            Route::get('/{id}/edit', [TestimonialController::class, 'edit'])->name('testimonials.edit');
            Route::put('/{id}', [TestimonialController::class, 'update'])->name('testimonials.update');
            Route::delete('/{id}', [TestimonialController::class, 'destroy'])->name('testimonials.destroy');
        });

        // Front Settings
        Route::prefix('settings')->group(function () {
            Route::get('/', [FrontSettingController::class, 'index'])->name('frontsettings.index');
            Route::post('/', [FrontSettingController::class, 'update'])->name('frontsettings.update');
        });


        // Program Studi
        Route::prefix('program-studi')->group(function () {
            Route::get('/', [ProgramStudiController::class, 'index'])->name('programstudi.index');
            Route::get('/create', [ProgramStudiController::class, 'create'])->name('programstudi.create');
            Route::post('/', [ProgramStudiController::class, 'store'])->name('programstudi.store');
            Route::get('/{id}/edit', [ProgramStudiController::class, 'edit'])->name('programstudi.edit');
            Route::put('/{id}', [ProgramStudiController::class, 'update'])->name('programstudi.update');
            Route::delete('/{id}', [ProgramStudiController::class, 'destroy'])->name('programstudi.destroy');
        });

        // Statistics
        Route::prefix('statistics')->group(function () {
            Route::get('/', [StatisticController::class, 'index'])->name('statistics.index');
            Route::get('/create', [StatisticController::class, 'create'])->name('statistics.create');
            Route::post('/', [StatisticController::class, 'store'])->name('statistics.store');
            Route::get('/{id}/edit', [StatisticController::class, 'edit'])->name('statistics.edit');
            Route::put('/{id}', [StatisticController::class, 'update'])->name('statistics.update');
            Route::delete('/{id}', [StatisticController::class, 'destroy'])->name('statistics.destroy');
        });

        // Company Profile Video
        Route::prefix('company-profile-videos')->group(function () {
            Route::get('/', [CompanyProfileVideoController::class, 'index'])->name('companyprofile.index');
            Route::get('/create', [CompanyProfileVideoController::class, 'create'])->name('companyprofile.create');
            Route::post('/', [CompanyProfileVideoController::class, 'store'])->name('companyprofile.store');
            Route::get('/{id}/edit', [CompanyProfileVideoController::class, 'edit'])->name('companyprofile.edit');
            Route::put('/{id}', [CompanyProfileVideoController::class, 'update'])->name('companyprofile.update');
            Route::delete('/{id}', [CompanyProfileVideoController::class, 'destroy'])->name('companyprofile.destroy');
        });
    });
});




// ================== DYNAMIC PAGES ================== //
// HARUS PALING BAWAH supaya tidak menimpa /login & /register
// Route::get('/{page}', [PagesController::class, 'show'])->name('pages.show');
Route::get('/{slug}', [PagesController::class, 'show'])->name('front.pages.show');

require __DIR__ . '/auth.php';
