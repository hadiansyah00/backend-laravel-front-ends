<?php

use App\Http\Controllers\Admin\MetaController;
use App\Http\Controllers\Admin\PagesController;
use App\Http\Controllers\Admin\PageSectionController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FrontPages\FrontSettingController;
use App\Http\Controllers\FrontPagesController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\PendaftaranEmailController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TagsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PublicInfoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ================== FRONTEND (Public) ================== //
Route::get('/', [FrontPagesController::class, 'index'])->name('home');
Route::get('/sitemap.xml', [\App\Http\Controllers\SitemapController::class, 'index'])->name('sitemap');
Route::get('/search', [SearchController::class, 'index'])->name('search');
Route::get('/wilayah-organisasi', [FrontPagesController::class, 'wilayahOrganisasi'])->name('wilayah');

Route::get('/pendidikan/{slug}', [PagesController::class, 'show'])->name('pendidikan.show');

// Pendaftaran Email (Public Form)
Route::prefix('pendaftaran-email')->group(function () {
    Route::get('/create', [PendaftaranEmailController::class, 'create'])->name('pendaftaran-email.create');
    Route::post('/', [PendaftaranEmailController::class, 'store'])->name('pendaftaran-email.store');
});

// Auth routes loaded from routes/auth.php (require at bottom of file)

// ================== DASHBOARD ================== //
Route::get('/dashboard', function () {
    return \Inertia\Inertia::render('Admin/Dashboard', [
        'stats' => [
            'berita' => \App\Models\Article::count(),
            'pengumuman' => \App\Models\Pengumuman::count(),
            'event' => \App\Models\Event::count(),
            'dosen' => \App\Models\Dosen::count(),
            'alumni' => \App\Models\Alumni::count(),
            'pages' => \App\Models\Pages::whereNotIn('category', ['berita'])->count(),
            'users' => \App\Models\User::count(),
            'roles' => \Spatie\Permission\Models\Role::count(),
            'menus' => \App\Models\Menu::count(),
            'fasilitas' => \App\Models\Fasilitas::count(),
        ],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// ================== ADMIN ================== //
Route::middleware(['auth', 'role:admin'])->prefix('admin')->as('admin.')->group(function () {

    // --- Profile ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- Core Resources ---
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('menus', MenuController::class);
    Route::resource('articles', ArticleController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('tags', TagsController::class);

    // --- Content Modules (Phase 4-5) ---
    Route::resource('dosens', \App\Http\Controllers\Admin\DosenController::class);
    Route::resource('pengumumans', \App\Http\Controllers\Admin\PengumumanController::class);
    Route::resource('events', \App\Http\Controllers\Admin\EventController::class);
    Route::resource('documents', \App\Http\Controllers\Admin\DocumentController::class);
    Route::resource('galleries', \App\Http\Controllers\Admin\GalleryController::class);
    Route::resource('program-studis', \App\Http\Controllers\Admin\ProgramStudiController::class);
    Route::resource('alumnis', \App\Http\Controllers\Admin\AlumniController::class);
    Route::resource('lowongans', \App\Http\Controllers\Admin\LowonganController::class);
    Route::resource('kalender', \App\Http\Controllers\Admin\KalenderAkademikController::class);
    Route::resource('fasilitas', \App\Http\Controllers\Admin\FasilitasController::class);
    Route::resource('kerjasamas', \App\Http\Controllers\Admin\KerjasamaController::class);
    // --- Pendaftaran Email (Admin) ---
    Route::get('pendaftaran-email', [PendaftaranEmailController::class, 'index'])->name('pendaftaran-email.index');
    Route::get('pendaftaran-email/{id}', [PendaftaranEmailController::class, 'show'])->name('pendaftaran-email.show');
    Route::delete('pendaftaran-email/{id}', [PendaftaranEmailController::class, 'destroy'])->name('pendaftaran-email.destroy');

    // --- Tentang Kami (Custom CRUD) ---
    Route::get('tentang-kami', [\App\Http\Controllers\Admin\TentangKamiController::class, 'index'])->name('tentang-kami.index');
    Route::post('tentang-kami', [\App\Http\Controllers\Admin\TentangKamiController::class, 'storeOrUpdate'])->name('tentang-kami.store');

    // --- Akademik (Unified Tab Page) ---
    Route::get('akademik', [\App\Http\Controllers\Admin\AkademikController::class, 'index'])->name('akademik.index');
    Route::post('akademik/prodi', [\App\Http\Controllers\Admin\AkademikController::class, 'storeOrUpdateProdi'])->name('akademik.prodi.store');

    // --- Pages & Sections ---
    Route::resource('pages', PagesController::class);
    Route::resource('pages.sections', PageSectionController::class)->shallow();

    // --- Media Library ---
    Route::resource('media', \App\Http\Controllers\MediaController::class)->only(['index', 'store', 'destroy']);

    // --- SEO Meta ---
    Route::prefix('seo')->name('seo.')->group(function () {
        Route::get('{type}/{id}/edit', [MetaController::class, 'edit'])->name('edit');
        Route::put('{type}/{id}', [MetaController::class, 'update'])->name('update');
    });

    // --- Permissions ---
    Route::post('permissions/store-multiple', [PermissionController::class, 'storeMultiple'])->name('permissions.storeMultiple');
    Route::resource('permissions', PermissionController::class)->except('show');

    // --- Front Pages Management ---
    Route::prefix('front-pages')->group(function () {
        // --- Beranda (Unified Homepage Management) ---
        Route::get('beranda', [\App\Http\Controllers\Admin\BerandaController::class, 'index'])->name('beranda.index');
        Route::post('beranda', [\App\Http\Controllers\Admin\BerandaController::class, 'storeOrUpdate'])->name('beranda.store');

        // Front Settings
        Route::get('settings', [FrontSettingController::class, 'index'])->name('settings.index');
        Route::post('settings', [FrontSettingController::class, 'update'])->name('settings.update');

        // Meta (SEO) Settings
        // Route::get('seo/{type}/{id}', [MetaController::class, 'edit'])->name('seo.edit'); // Removed duplicate
        // Route::put('seo/{type}/{id}', [MetaController::class, 'update'])->name('seo.update'); // Removed duplicate
    });
});


// ================== DINAMIS PAGES (Frontend Static via PagesController) ================== //
// Halaman-halaman di bawah ini di-handle oleh PagesController@show (catch-all) via /{slug}
// Semua halaman di bawah ini menggunakan route /{slug} di bagian paling bawah.

// INFORMASI ROUTES
// (Route /artikel sudah dihandle oleh PublicInfoController di bawah)
Route::get('/pengumuman', [PublicInfoController::class, 'pengumuman'])->name('front.pengumuman');
Route::get('/pengumuman/{slug}', [PublicInfoController::class, 'pengumumanShow'])->name('front.pengumuman.show');

Route::get('/event', [PublicInfoController::class, 'event'])->name('front.event');
Route::get('/event/{slug}', [PublicInfoController::class, 'eventShow'])->name('front.event.show');

Route::get('/dokumen', [PublicInfoController::class, 'dokumen'])->name('front.dokumen');
Route::get('/galeri', [PublicInfoController::class, 'galeri'])->name('front.galeri');
Route::get('/kontak', fn() => \Inertia\Inertia::render('Templates/Kontak'))->name('front.kontak');

// TENTANG KAMI ROUTES
Route::name('front.tentang.')->prefix('tentang')->group(function () {
    Route::get('/profil-stikes', [PublicInfoController::class, 'profilStikes'])->name('profil');
    Route::get('/sambutan-ketua', [PublicInfoController::class, 'sambutanKetua'])->name('sambutan');
    Route::get('/visi-misi', [PublicInfoController::class, 'visiMisi'])->name('visi_misi');
    Route::get('/sejarah', [PublicInfoController::class, 'sejarah'])->name('sejarah');
    Route::get('/struktur-organisasi', [PublicInfoController::class, 'strukturOrganisasi'])->name('struktur');
});

// MAHASISWA & ALUMNI ROUTES
Route::get('/alumni', [PublicInfoController::class, 'alumni'])->name('front.alumni');
Route::get('/lowongan', [PublicInfoController::class, 'lowongan'])->name('front.lowongan');
Route::get('/kerjasama', [PublicInfoController::class, 'kerjasama'])->name('front.kerjasama');

// DOSEN ROUTE
Route::get('/dosen', [PublicInfoController::class, 'dosen'])->name('front.dosen');
// ================== AKADEMIK & UNIT LEMBAGA ROUTES ================== //
Route::get('/s1-farmasi', [PublicInfoController::class, 'farmasi'])->name('front.farmasi');
Route::get('/s1-gizi', [PublicInfoController::class, 'gizi'])->name('front.gizi');
Route::get('/d3-kebidanan', [PublicInfoController::class, 'kebidanan'])->name('front.kebidanan');
Route::get('/kalender-akademik', [PublicInfoController::class, 'kalenderAkademik'])->name('front.kalender');

Route::get('/laboratorium', [PublicInfoController::class, 'laboratorium'])->name('front.laboratorium');
Route::get('/perpustakaan', [PublicInfoController::class, 'perpustakaan'])->name('front.perpustakaan');

Route::get('/unit-penelitian-dan-pengabdian-masyarakat', [PublicInfoController::class, 'uppm'])->name('front.uppm');
Route::get('/unit-penjaminan-mutu-internal', [PublicInfoController::class, 'upmi'])->name('front.upmi');

// ================== ARTIKEL ================== //
Route::get('/artikel', [PublicInfoController::class, 'berita'])->name('frontend.berita.index');
Route::get('/artikel/{slug}', [PublicInfoController::class, 'beritaShow'])->name('frontend.berita.show');

// ================== CATCH ALL (WAJIB PALING BAWAH) ================== //

// Untuk halaman program studi / dynamic
Route::get('/prodi/{slug}', [PublicInfoController::class, 'showProgramStudi'])
    ->name('front.prodi.show');

// Untuk halaman CMS (Pages Builder) — nonaktif sementara
// Route::get('/{slug}', [PagesController::class, 'show'])->name('front.pages.show');

require __DIR__ . '/auth.php';
