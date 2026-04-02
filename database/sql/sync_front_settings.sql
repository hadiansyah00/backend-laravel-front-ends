-- ============================================================
-- SQL: Sinkronisasi front_settings untuk Hosting
-- Jalankan di phpMyAdmin atau MySQL CLI pada database hosting
-- 
-- Script ini AMAN dijalankan berulang:
-- - INSERT IGNORE = skip jika key sudah ada
-- - Data yang sudah diisi admin TIDAK akan ditimpa
-- ============================================================

-- ========== BRANDING ==========
INSERT IGNORE INTO `front_settings` (`key`, `value`, `type`, `created_at`, `updated_at`) VALUES
('site_name', 'STIKes Bogor Husada', 'text', NOW(), NOW()),
('logo_main', NULL, 'image', NOW(), NOW()),
('logo_sticky', NULL, 'image', NOW(), NOW()),
('site_logo', NULL, 'image', NOW(), NOW()),
('site_favicon', NULL, 'image', NOW(), NOW());

-- ========== CONTACT ==========
INSERT IGNORE INTO `front_settings` (`key`, `value`, `type`, `created_at`, `updated_at`) VALUES
('contact_email', 'info@sbh.ac.id', 'text', NOW(), NOW()),
('contact_email_link', 'mailto:info@sbh.ac.id', 'text', NOW(), NOW()),
('contact_phone', '081110111560', 'text', NOW(), NOW()),
('contact_phone_link', '081110111560', 'text', NOW(), NOW()),
('contact_address', 'Jl. Sholeh Iskandar No.4, Kedungbadak, Kec. Tanah Sereal, Kota Bogor, Jawa Barat 16164', 'text', NOW(), NOW()),
('copyright_text', '© 2025 STIKes Bogor Husada. All rights reserved.', 'text', NOW(), NOW());

-- ========== SEO META ==========
INSERT IGNORE INTO `front_settings` (`key`, `value`, `type`, `created_at`, `updated_at`) VALUES
('meta_title', 'STIKes Bogor Husada', 'text', NOW(), NOW()),
('meta_description', 'Website resmi STIKes Bogor Husada untuk informasi akademik, PMB, dan kegiatan kampus.', 'text', NOW(), NOW()),
('meta_keywords', 'STIKes, Bogor Husada, PMB, Kampus Kesehatan, Pendidikan Kesehatan', 'text', NOW(), NOW());

-- ========== OPEN GRAPH ==========
INSERT IGNORE INTO `front_settings` (`key`, `value`, `type`, `created_at`, `updated_at`) VALUES
('og_title', 'STIKes Bogor Husada - Kampus Kesehatan Unggul', 'text', NOW(), NOW()),
('og_description', 'Tempat belajar dan berkembang di bidang kesehatan bersama STIKes Bogor Husada.', 'text', NOW(), NOW()),
('og_image', NULL, 'image', NOW(), NOW());

-- ========== TWITTER ==========
INSERT IGNORE INTO `front_settings` (`key`, `value`, `type`, `created_at`, `updated_at`) VALUES
('twitter_card', 'summary_large_image', 'text', NOW(), NOW());

-- ========== ANALYTICS ==========
INSERT IGNORE INTO `front_settings` (`key`, `value`, `type`, `created_at`, `updated_at`) VALUES
('google_analytics', NULL, 'text', NOW(), NOW()),
('google_analytics_id', NULL, 'text', NOW(), NOW());

-- ========== SOCIAL MEDIA (Individual URLs) ==========
INSERT IGNORE INTO `front_settings` (`key`, `value`, `type`, `created_at`, `updated_at`) VALUES
('social_facebook', 'https://www.facebook.com/stikesboda', 'text', NOW(), NOW()),
('social_instagram', 'https://www.instagram.com/stikesbogorhusada/', 'text', NOW(), NOW()),
('social_youtube', 'https://www.youtube.com/channel/UCLVS17eZrNYWgiAuMCYkkXA', 'text', NOW(), NOW()),
('social_twitter', NULL, 'text', NOW(), NOW()),
('social_tiktok', 'https://www.tiktok.com/@stikesbogorhusada', 'text', NOW(), NOW());

-- ========== JSON FIELDS ==========
INSERT IGNORE INTO `front_settings` (`key`, `value`, `type`, `created_at`, `updated_at`) VALUES
('footer_links', '[{"title":"Tentang Kampus","links":[{"text":"Sejarah Singkat","url":"/sejarah"},{"text":"Visi & Misi","url":"/visi-misi"},{"text":"Pimpinan","url":"/pimpinan-sbh"},{"text":"Kontak & Lokasi","url":"/kontak"}]},{"title":"Akademik & Pendaftaran","links":[{"text":"Program Studi","url":"/pendidikan"},{"text":"Pendaftaran Mahasiswa Baru","url":"https://pmb.sbh.ac.id/"},{"text":"Informasi Beasiswa","url":"/beasiswa"}]},{"title":"Kehidupan Kampus","links":[{"text":"Portal Mahasiswa","url":"https://students-portal.sbh.ac.id/"},{"text":"E-Learning","url":"https://lmsstikes.sbh.ac.id/"},{"text":"Perpustakaan","url":"https://library.sbh.ac.id/"},{"text":"Kegiatan Mahasiswa","url":"/kemahasiswaan/kegiatan"}]},{"title":"Informasi & Layanan","links":[{"text":"Berita & Agenda","url":"/berita"},{"text":"Karier & Lowongan","url":"/karier"},{"text":"PPID (Pusat Informasi)","url":"/ppid"},{"text":"Pusat Bantuan","url":"/pusat-bantuan"}]}]', 'json', NOW(), NOW()),

('social_links', '[{"name":"Instagram","url":"https://www.instagram.com/stikesbogorhusada/","icon":"fab fa-instagram"},{"name":"TikTok","url":"https://www.tiktok.com/@stikesbogorhusada","icon":"fab fa-tiktok"},{"name":"YouTube","url":"https://www.youtube.com/channel/UCLVS17eZrNYWgiAuMCYkkXA","icon":"fab fa-youtube"},{"name":"Facebook","url":"https://www.facebook.com/stikesboda","icon":"fab fa-facebook-f"}]', 'json', NOW(), NOW());

-- ============================================================
-- Selesai! Total: 27 key setting.
-- Semua key yang SUDAH ADA di database Anda akan di-SKIP.
-- Hanya key yang BELUM ADA yang akan ditambahkan.
-- ============================================================
