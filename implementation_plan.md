# Sinkronisasi Data Berita Halaman Utama (Beranda)

## Identifikasi Masalah
Pengguna melaporkan bahwa:
1. Data Berita di Beranda (Halaman Utama) **tidak sama/sinkron** dengan data Berita yang dikelola di Dashboard Admin.
2. Link "Semua Berita", "list berita", dan "slug berita" (*detail click*) tidak merender dengan benar.

## Perbaikan yang Telah Dilakukan
1. Backend (`App\Http\Controllers\FrontPagesController.php`): Mengganti *API call WP* dengan query ke database internal.
2. Frontend ([resources/js/Pages/Home.jsx](file:///home/user/Documents/Github/backend-laravel-front-ends/resources/js/Pages/Home.jsx)): Menyesuaikan property JSON respons menjadi format *Eloquent Model* (`thumbnail`, `title`, `published_at`). Navigasi URL sudah diintegrasikan ke `/berita/{slug}`.

---

# Perbaikan CRUD Artikel/Berita & Form Lengkap (Tugas Saat Ini)

## Identifikasi Masalah
1. Pengguna melaporkan bahwa fitur CRUD (Simpan/Update) untuk Berita di admin panel **masih terjadi error**.
2. Pengguna meminta layout form Artikel (Berita) di-improve agar selengkap versi Blade sebelumnya, serta **menggunakan *Media Picker*** untuk memilih gambar (`thumbnail`, `og_image`, `twitter_image`) alih-alih meng-upload file fisik dari komputer secara langsung.

## Rencana Perbaikan (Implementation Plan)

### 1. Perbaikan Validasi Controller (`App\Http\Controllers\ArticleController.php`)
#### [MODIFY] [app/Http/Controllers/ArticleController.php](file:///home/user/Documents/Github/backend-laravel-front-ends/app/Http/Controllers/ArticleController.php)
- **Validasi Media:** Ubah tipe validasi `thumbnail`, `og_image`, `twitter_image` pada fungsi [store](file:///home/user/Documents/Github/backend-laravel-front-ends/app/Http/Controllers/ArticleController.php#66-147) dan [update](file:///home/user/Documents/Github/backend-laravel-front-ends/app/Http/Controllers/Admin/PagesController.php#120-140). Sebelumnya membutuhkan file gambar fisik (`image|mimes...`), kini diubah menjadi `nullable|string` karena path URL akan disuplai dari *Media Picker*.
- **Penyimpanan:** Hapus metode pemrosesan file bawaan (`$request->file(...)->store(...)`) untuk ketiga *field* gambar tersebut.
- **Perbaikan Tagging:** Menambahkan pengecekan *null* saksama pada saat explode input `$tags` yang berpotensi memicu *fatal error* jika user mengirimkan tag kosong.

### 2. Peningkatan Integrasi Form ([resources/js/Pages/Admin/Articles/Form.jsx](file:///home/user/Documents/Github/backend-laravel-front-ends/resources/js/Pages/Admin/Articles/Form.jsx))
#### [MODIFY] [resources/js/Pages/Admin/Articles/Form.jsx](file:///home/user/Documents/Github/backend-laravel-front-ends/resources/js/Pages/Admin/Articles/Form.jsx)
- **Integrasi MediaPicker:** Mengimpor [MediaPicker](file:///home/user/Documents/Github/backend-laravel-front-ends/resources/js/Components/MediaPicker.jsx#24-211) (lokasi: `@/Components/MediaPicker`). Mengganti input dengan tipe `<input type="file" ... />` pada halaman utama dan tab *SEO* menjadi komponen *MediaPicker*.
- **Live Preview:** Memperbarui visual *preview* gambar agar membaca state URL (string) dari *MediaPicker*, menampilkan gambar yang baru saja di-*select* dari perpustakaan Media Library.
- **Form Kelengkapan:** Memastikan *fields* seperti SEO meta (*OG properties*, *Twitter cards*) 100% konsisten dengan versi lama Blade untuk memenuhi request form *"Lengkap"*.
