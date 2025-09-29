-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 29, 2025 at 06:31 AM
-- Server version: 8.0.43-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `website_utama`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-settings.contact_address', 's:70:\"Jl. Indragiri No. 4, Babakan, Bogor Tim., Kota Bogor, Jawa Barat 16128\";', 2074486120),
('laravel-cache-settings.contact_email', 's:14:\"info@sbh.ac.id\";', 2074486120),
('laravel-cache-settings.contact_email_link', 's:21:\"mailto:info@sbh.ac.id\";', 2074486120),
('laravel-cache-settings.contact_phone', 's:15:\"+62 251 8312xxx\";', 2074486120),
('laravel-cache-settings.contact_phone_link', 's:13:\"+622518312xxx\";', 2074486120),
('laravel-cache-settings.copyright_text', 's:49:\"© 2025 STIKes Bogor Husada. All rights reserved.\";', 2074486120),
('laravel-cache-settings.footer_links', 's:1453:\"[\r\n    {\r\n        \"title\": \"Tentang Kampus\",\r\n        \"links\": [\r\n            { \"text\": \"Sejarah Singkat\", \"url\": \"/sejarah\" },\r\n            { \"text\": \"Visi & Misi\", \"url\": \"/visi-misi\" },\r\n            { \"text\": \"Pimpinan\", \"url\": \"/pimpinan\" },\r\n            { \"text\": \"Kontak & Lokasi\", \"url\": \"/kontak\" }\r\n        ]\r\n    },\r\n    {\r\n        \"title\": \"Akademik & Pendaftaran\",\r\n        \"links\": [\r\n            { \"text\": \"Fakultas & Program Studi\", \"url\": \"/akademik/program-studi\" },\r\n            { \"text\": \"Kalender Akademik\", \"url\": \"/akademik/kalender\" },\r\n            { \"text\": \"Pendaftaran Mahasiswa Baru\", \"url\": \"/pmb\" },\r\n            { \"text\": \"Informasi Beasiswa\", \"url\": \"/beasiswa\" }\r\n        ]\r\n    },\r\n    {\r\n        \"title\": \"Kehidupan Kampus\",\r\n        \"links\": [\r\n            { \"text\": \"Portal Mahasiswa\", \"url\": \"https://portal.kampus.ac.id\" },\r\n            { \"text\": \"E-Learning\", \"url\": \"https://elearning.kampus.ac.id\" },\r\n            { \"text\": \"Perpustakaan\", \"url\": \"/perpustakaan\" },\r\n            { \"text\": \"Kegiatan Mahasiswa\", \"url\": \"/kemahasiswaan/kegiatan\" }\r\n        ]\r\n    },\r\n    {\r\n        \"title\": \"Informasi & Layanan\",\r\n        \"links\": [\r\n            { \"text\": \"Berita & Agenda\", \"url\": \"/berita\" },\r\n            { \"text\": \"Karier & Lowongan\", \"url\": \"/karier\" },\r\n            { \"text\": \"PPID (Pusat Informasi)\", \"url\": \"/ppid\" },\r\n            { \"text\": \"Pusat Bantuan\", \"url\": \"/pusat-bantuan\" }\r\n        ]\r\n    }\r\n]\";', 2074486120),
('laravel-cache-settings.google_analytics', 'N;', 2074487429),
('laravel-cache-settings.logo_main', 's:61:\"uploads/settings/bybiVgCSpBDLrxnnyKv9mag6q1NzhFGbuXmb0RSG.png\";', 2074486118),
('laravel-cache-settings.logo_sticky', 's:61:\"uploads/settings/wCyNxPcdIVvD6rnLLXVgBPtxApZSFWHCqwz4fmEz.png\";', 2074486118),
('laravel-cache-settings.meta_description', 's:85:\"Website resmi STIKes Bogor Husada untuk informasi akademik, PMB, dan kegiatan kampus.\";', 2074486119),
('laravel-cache-settings.meta_keywords', 's:65:\"STIKes, Bogor Husada, PMB, Kampus Kesehatan, Pendidikan Kesehatan\";', 2074486119),
('laravel-cache-settings.meta_title', 's:19:\"STIKes Bogor Husada\";', 2074486119),
('laravel-cache-settings.og_description', 's:78:\"Tempat belajar dan berkembang di bidang kesehatan bersama STIKes Bogor Husada.\";', 2074486119),
('laravel-cache-settings.og_image', 's:61:\"uploads/settings/ANTvqYRUv7KsvGPqFsdutcEKmFgrubpBOga7amR7.png\";', 2074486119),
('laravel-cache-settings.og_title', 's:45:\"STIKes Bogor Husada - Kampus Kesehatan Unggul\";', 2074486119),
('laravel-cache-settings.site_favicon', 's:61:\"uploads/settings/KTgnWoDyKa33iXnbZ59HFyYIn9yfF38BflTvuobm.png\";', 2074486119),
('laravel-cache-settings.site_logo', 'N;', 2074487429),
('laravel-cache-settings.social_links', 's:573:\"[\r\n    {\r\n        \"name\": \"Instagram\",\r\n        \"url\": \"https://www.instagram.com/stikesbogorhusada/\",\r\n        \"icon\": \"fab fa-instagram\"\r\n    },\r\n    {\r\n        \"name\": \"Tiktok\",\r\n        \"url\": \"https://www.tiktok.com/@stikesbogorhusada\",\r\n        \"icon\": \"fab fa-tiktok\"\r\n    },\r\n    {\r\n        \"name\": \"YouTube\",\r\n        \"url\": \"https://www.youtube.com/channel/UCLVS17eZrNYWgiAuMCYkkXA\",\r\n        \"icon\": \"fab fa-youtube\"\r\n    },\r\n    {\r\n        \"name\": \"Facebook\",\r\n        \"url\": \"https://www.facebook.com/stikesboda\",\r\n        \"icon\": \"fab fa-facebook-f\"\r\n    }\r\n]\";', 2074486120),
('laravel-cache-settings.twitter_card', 's:19:\"summary_large_image\";', 2074486119),
('laravel-cache-spatie.permission.cache', 'a:3:{s:5:\"alias\";a:4:{s:1:\"a\";s:2:\"id\";s:1:\"b\";s:4:\"name\";s:1:\"c\";s:10:\"guard_name\";s:1:\"r\";s:5:\"roles\";}s:11:\"permissions\";a:10:{i:0;a:4:{s:1:\"a\";i:1;s:1:\"b\";s:14:\"view dashboard\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:1;a:4:{s:1:\"a\";i:2;s:1:\"b\";s:12:\"manage users\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:2;a:4:{s:1:\"a\";i:3;s:1:\"b\";s:15:\"manage articles\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:3;a:4:{s:1:\"a\";i:4;s:1:\"b\";s:16:\"publish articles\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:4;a:4:{s:1:\"a\";i:5;s:1:\"b\";s:11:\"edit header\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:4;}}i:5;a:3:{s:1:\"a\";i:6;s:1:\"b\";s:13:\"tambah berita\";s:1:\"c\";s:3:\"web\";}i:6;a:4:{s:1:\"a\";i:7;s:1:\"b\";s:10:\"view menus\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:7;a:4:{s:1:\"a\";i:8;s:1:\"b\";s:12:\"create menus\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:8;a:4:{s:1:\"a\";i:9;s:1:\"b\";s:10:\"edit menus\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:9;a:4:{s:1:\"a\";i:10;s:1:\"b\";s:12:\"delete menus\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}}s:5:\"roles\";a:4:{i:0;a:3:{s:1:\"a\";i:1;s:1:\"b\";s:5:\"admin\";s:1:\"c\";s:3:\"web\";}i:1;a:3:{s:1:\"a\";i:2;s:1:\"b\";s:6:\"writer\";s:1:\"c\";s:3:\"web\";}i:2;a:3:{s:1:\"a\";i:3;s:1:\"b\";s:5:\"guest\";s:1:\"c\";s:3:\"web\";}i:3;a:3:{s:1:\"a\";i:4;s:1:\"b\";s:6:\"editor\";s:1:\"c\";s:3:\"web\";}}}', 1759212902);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `company_profile_videos`
--

CREATE TABLE `company_profile_videos` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `video_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `company_profile_videos`
--

INSERT INTO `company_profile_videos` (`id`, `title`, `description`, `video_url`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'STIKes Bogor Husada: Mencetak Tenaga Kesehatan Profesional, Berkarakter, dan Berwawasan Global', 'Video profil ini memperkenalkan STIKes Bogor Husada, sebuah institusi pendidikan tinggi kesehatan yang berlokasi di Kota Bogor, berkomitmen untuk menghasilkan tenaga kesehatan profesional.', 'https://www.youtube.com/watch?v=JKkfJVV4RHQ&feature=youtu.be', 1, '2025-09-03 00:58:13', '2025-09-22 20:33:30'),
(2, 'Kegiatan Mahasiswa', 'Dokumentasi kegiatan mahasiswa selama perkuliahan.', 'https://www.youtube.com/watch?v=YYYYYYY', 0, '2025-09-03 00:58:13', '2025-09-03 00:58:13');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `front_settings`
--

CREATE TABLE `front_settings` (
  `id` bigint UNSIGNED NOT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'text',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `front_settings`
--

INSERT INTO `front_settings` (`id`, `key`, `value`, `type`, `created_at`, `updated_at`) VALUES
(8, 'logo_main', 'uploads/settings/bybiVgCSpBDLrxnnyKv9mag6q1NzhFGbuXmb0RSG.png', 'text', NULL, '2025-09-25 01:09:15'),
(9, 'logo_sticky', 'uploads/settings/wCyNxPcdIVvD6rnLLXVgBPtxApZSFWHCqwz4fmEz.png', 'text', NULL, '2025-09-25 01:09:15'),
(10, 'site_favicon', 'uploads/settings/KTgnWoDyKa33iXnbZ59HFyYIn9yfF38BflTvuobm.png', 'text', NULL, '2025-09-25 00:54:30'),
(11, 'meta_title', 'STIKes Bogor Husada', 'text', NULL, NULL),
(12, 'meta_description', 'Website resmi STIKes Bogor Husada untuk informasi akademik, PMB, dan kegiatan kampus.', 'text', NULL, NULL),
(13, 'meta_keywords', 'STIKes, Bogor Husada, PMB, Kampus Kesehatan, Pendidikan Kesehatan', 'text', NULL, NULL),
(14, 'og_title', 'STIKes Bogor Husada - Kampus Kesehatan Unggul', 'text', NULL, NULL),
(15, 'og_description', 'Tempat belajar dan berkembang di bidang kesehatan bersama STIKes Bogor Husada.', 'text', NULL, NULL),
(16, 'og_image', 'uploads/settings/ANTvqYRUv7KsvGPqFsdutcEKmFgrubpBOga7amR7.png', 'text', NULL, '2025-09-25 01:09:15'),
(17, 'twitter_card', 'summary_large_image', 'text', NULL, NULL),
(18, 'google_analytics', NULL, 'text', NULL, NULL),
(19, 'contact_address', 'Jl. Indragiri No. 4, Babakan, Bogor Tim., Kota Bogor, Jawa Barat 16128', 'text', NULL, NULL),
(20, 'contact_phone', '+62 251 8312xxx', 'text', NULL, NULL),
(21, 'contact_phone_link', '+622518312xxx', 'text', NULL, NULL),
(22, 'contact_email', 'info@sbh.ac.id', 'text', NULL, NULL),
(23, 'contact_email_link', 'mailto:info@sbh.ac.id', 'text', NULL, NULL),
(24, 'footer_links', '[\r\n    {\r\n        \"title\": \"Tentang Kampus\",\r\n        \"links\": [\r\n            { \"text\": \"Sejarah Singkat\", \"url\": \"/sejarah\" },\r\n            { \"text\": \"Visi & Misi\", \"url\": \"/visi-misi\" },\r\n            { \"text\": \"Pimpinan\", \"url\": \"/pimpinan\" },\r\n            { \"text\": \"Kontak & Lokasi\", \"url\": \"/kontak\" }\r\n        ]\r\n    },\r\n    {\r\n        \"title\": \"Akademik & Pendaftaran\",\r\n        \"links\": [\r\n            { \"text\": \"Fakultas & Program Studi\", \"url\": \"/akademik/program-studi\" },\r\n            { \"text\": \"Kalender Akademik\", \"url\": \"/akademik/kalender\" },\r\n            { \"text\": \"Pendaftaran Mahasiswa Baru\", \"url\": \"/pmb\" },\r\n            { \"text\": \"Informasi Beasiswa\", \"url\": \"/beasiswa\" }\r\n        ]\r\n    },\r\n    {\r\n        \"title\": \"Kehidupan Kampus\",\r\n        \"links\": [\r\n            { \"text\": \"Portal Mahasiswa\", \"url\": \"https://portal.kampus.ac.id\" },\r\n            { \"text\": \"E-Learning\", \"url\": \"https://elearning.kampus.ac.id\" },\r\n            { \"text\": \"Perpustakaan\", \"url\": \"/perpustakaan\" },\r\n            { \"text\": \"Kegiatan Mahasiswa\", \"url\": \"/kemahasiswaan/kegiatan\" }\r\n        ]\r\n    },\r\n    {\r\n        \"title\": \"Informasi & Layanan\",\r\n        \"links\": [\r\n            { \"text\": \"Berita & Agenda\", \"url\": \"/berita\" },\r\n            { \"text\": \"Karier & Lowongan\", \"url\": \"/karier\" },\r\n            { \"text\": \"PPID (Pusat Informasi)\", \"url\": \"/ppid\" },\r\n            { \"text\": \"Pusat Bantuan\", \"url\": \"/pusat-bantuan\" }\r\n        ]\r\n    }\r\n]', 'text', NULL, '2025-09-23 01:23:04'),
(25, 'social_links', '[\r\n    {\r\n        \"name\": \"Instagram\",\r\n        \"url\": \"https://www.instagram.com/stikesbogorhusada/\",\r\n        \"icon\": \"fab fa-instagram\"\r\n    },\r\n    {\r\n        \"name\": \"Tiktok\",\r\n        \"url\": \"https://www.tiktok.com/@stikesbogorhusada\",\r\n        \"icon\": \"fab fa-tiktok\"\r\n    },\r\n    {\r\n        \"name\": \"YouTube\",\r\n        \"url\": \"https://www.youtube.com/channel/UCLVS17eZrNYWgiAuMCYkkXA\",\r\n        \"icon\": \"fab fa-youtube\"\r\n    },\r\n    {\r\n        \"name\": \"Facebook\",\r\n        \"url\": \"https://www.facebook.com/stikesboda\",\r\n        \"icon\": \"fab fa-facebook-f\"\r\n    }\r\n]', 'text', NULL, '2025-09-23 02:51:29'),
(26, 'copyright_text', '© 2025 STIKes Bogor Husada. All rights reserved.', 'text', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `page_id` bigint UNSIGNED DEFAULT NULL,
  `type` enum('page','link') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'page',
  `parent_id` bigint UNSIGNED DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `name`, `slug`, `url`, `page_id`, `type`, `parent_id`, `order`, `is_active`, `created_at`, `updated_at`) VALUES
(6, 'Beranda', 'home', NULL, 1, 'page', NULL, 1, 1, '2025-07-09 22:37:56', '2025-08-25 21:39:51'),
(7, 'Tentang Kami', 'tentang-kami', NULL, 2, 'page', NULL, 2, 1, '2025-07-09 22:37:56', '2025-07-09 22:37:56'),
(8, 'Layanan', 'layanan', NULL, 3, 'page', NULL, 3, 1, '2025-07-09 22:37:56', '2025-07-09 22:37:56'),
(9, 'Kontak', 'kontak', NULL, 4, 'page', NULL, 4, 0, '2025-07-09 22:37:56', '2025-08-19 01:10:06'),
(10, 'Visi Misi', 'visi-misi', 'https://www.youtube.com/', NULL, 'link', 7, 5, 1, '2025-08-18 21:26:12', '2025-08-18 21:26:12'),
(13, 'tes', 'tes', NULL, 4, 'page', 7, 6, 1, '2025-08-19 01:02:58', '2025-08-19 01:02:58'),
(14, 'Menu baru', 'menu-baru', 'https://perempuanaman.or.id/', NULL, 'link', 8, 0, 1, '2025-08-19 19:17:48', '2025-08-19 19:17:48'),
(15, 'Selayang Pandang', 'selayang-pandang', NULL, NULL, 'page', 7, 3, 1, '2025-09-25 02:18:58', '2025-09-25 02:18:58');

-- --------------------------------------------------------

--
-- Table structure for table `meta_settings`
--

CREATE TABLE `meta_settings` (
  `id` bigint UNSIGNED NOT NULL,
  `pages_id` bigint NOT NULL DEFAULT '0',
  `meta_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `meta_keywords` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `robots` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'index, follow',
  `og_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `og_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `og_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `og_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `og_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `og_site_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter_card` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `twitter_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter_site` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `canonical_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `meta_settings`
--

INSERT INTO `meta_settings` (`id`, `pages_id`, `meta_description`, `meta_keywords`, `robots`, `og_title`, `og_description`, `og_image`, `og_url`, `og_type`, `og_site_name`, `twitter_card`, `twitter_title`, `twitter_description`, `twitter_image`, `twitter_site`, `canonical_url`, `created_at`, `updated_at`) VALUES
(1, 1, 'Ini adalah halaman utama website company profile Anda.2', 'beranda, home, company profile', NULL, 'Beranda - Company Name', 'Website resmi yang menyajikan informasi tentang kami.', 'https://example.com/images/og-home.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-09 22:39:00', '2025-08-19 19:16:26'),
(2, 2, 'Website resmi perusahaan.', 'profil perusahaan, layanan, kontak', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-09 22:39:00', '2025-07-09 22:39:00');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_07_09_123633_create_permission_tables', 2),
(5, '2025_07_10_030533_create_menus_table', 3),
(6, '2025_07_10_053038_create_pages_table', 4),
(7, '2025_07_10_053053_create_meta_settings_table', 4),
(8, '2025_07_10_053112_create_page_sections_table', 4),
(9, '2025_07_10_054516_add_parent_id_to_menus_table', 5),
(10, '2025_09_01_043907_create_sliders_table', 6),
(11, '2025_09_01_043911_create_testimonials_table', 6),
(12, '2025_09_01_043915_create_front_settings_table', 6),
(13, '2025_09_01_043922_create_statistics_table', 6),
(14, '2025_09_01_043929_create_program_studis_table', 6),
(15, '2025_09_01_044050_create_company_profile_videos_table', 6),
(16, '2025_09_04_032017_create_pendaftaran_email_table', 7),
(17, '2025_09_04_050013_add_email_to_pendaftaran_email_table', 8),
(18, '2025_09_25_082444_add_image_mobile_to_sliders_table', 9);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 2);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('standard','modular') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'standard',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_published` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `title`, `slug`, `type`, `content`, `is_published`, `created_at`, `updated_at`) VALUES
(1, 'Beranda', 'beranda', 'modular', NULL, 1, '2025-07-09 22:39:00', '2025-07-09 22:39:00'),
(2, 'Tentang Kami', 'tentang-kami', 'modular', '<p>Ini adalah halaman Tentang Kami.</p>', 1, '2025-07-09 22:39:00', '2025-08-18 21:11:45'),
(3, 'Layanan', 'layanan', 'standard', '<blockquote><ul><li>Layanan A</li></ul></blockquote><blockquote><ul><li>Layanan B</li></ul></blockquote><ul><li><figure class=\"table\"><table><tbody><tr><td><figure class=\"table\"><table><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure></td></tr></tbody></table></figure></li></ul>', 1, '2025-07-09 22:39:00', '2025-08-25 21:37:50'),
(4, 'Kontak', 'kontak', 'standard', '<p>Hubungi Kami</p>', 1, '2025-07-09 22:39:00', '2025-08-19 23:55:41');

-- --------------------------------------------------------

--
-- Table structure for table `page_sections`
--

CREATE TABLE `page_sections` (
  `id` bigint UNSIGNED NOT NULL,
  `page_id` bigint UNSIGNED NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` json NOT NULL,
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `page_sections`
--

INSERT INTO `page_sections` (`id`, `page_id`, `type`, `content`, `order`, `created_at`, `updated_at`) VALUES
(1, 1, 'hero', '{\"slides\": [{\"title\": \"Slide Pertama\", \"subtitle\": \"Layanan terbaik untuk Anda.\", \"background\": \"/assets/img/background/bg-1.jpg\"}, {\"title\": \"Slide Kedua\", \"subtitle\": \"Solusi cepat dan responsif.\", \"background\": \"/assets/img/background/bg-2.jpg\"}, {\"title\": \"Slide Ketiga\", \"subtitle\": \"Tim profesional siap membantu.\", \"background\": \"/assets/img/background/bg-3.jpg\"}]}', 1, '2025-07-09 22:40:34', '2025-08-25 21:26:35'),
(2, 1, 'feature', '{\"items\": [{\"desc\": \"Layan2an yang cepat dan efisien.\", \"icon\": \"fas fa-bolt\", \"title\": \"Cepat\"}, {\"desc\": \"Dukungan pelanggan 24/7.\", \"icon\": \"fas fa-headset\", \"title\": \"Responsif\"}, {\"desc\": \"Keamanan data terjamin.\", \"icon\": \"fas fa-shield-alt\", \"title\": \"Aman\"}]}', 2, '2025-07-09 22:40:34', '2025-08-26 01:30:51'),
(5, 2, 'title', '{\"title\": \"Tentang Kami Kami\", \"subtitle\": \"Kami hadir memberikan solusi terbaik.\", \"background\": \"/assets/img/background/bg-1.jpg\"}', 1, '2025-08-26 01:30:25', '2025-08-26 01:31:26');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pendaftaran_email`
--

CREATE TABLE `pendaftaran_email` (
  `id` bigint UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `program_studi` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pendaftaran_email`
--

INSERT INTO `pendaftaran_email` (`id`, `first_name`, `last_name`, `program_studi`, `phone`, `email`, `status`, `created_at`, `updated_at`) VALUES
(4, 'ardana', 'tesdulu', 'KEBIDANAN', '081311468814', 'ardana.tesdulu@sbh.ac.id', 'failed', '2025-09-03 22:04:07', '2025-09-03 22:04:08'),
(5, 'ardana123', 'das2', 'KEBIDANAN', '081311468814', 'ardana123.das2@sbh.ac.id', 'failed', '2025-09-03 22:05:38', '2025-09-03 22:05:39'),
(6, 'Hadi', 'hadiansyah', '12345', '089613045369', 'hadi.hadiansyah@sbh.ac.id', 'failed', '2025-09-03 22:06:35', '2025-09-03 22:06:36'),
(7, 'Hadi', 'hadiansyah2', '12345', '089613045369', 'hadi.hadiansyah2@sbh.ac.id', 'failed', '2025-09-03 22:14:17', '2025-09-03 22:14:18'),
(8, 'Hadi', 'hadiansyah231', '12345', '089613045369', 'hadi.hadiansyah231@sbh.ac.id', 'created', '2025-09-03 22:20:39', '2025-09-03 22:20:42');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'view dashboard', 'web', '2025-07-09 06:13:58', '2025-07-09 06:13:58'),
(2, 'manage users', 'web', '2025-07-09 06:13:58', '2025-07-09 06:13:58'),
(3, 'manage articles', 'web', '2025-07-09 06:13:58', '2025-07-09 06:13:58'),
(4, 'publish articles', 'web', '2025-07-09 06:13:58', '2025-07-09 06:13:58'),
(5, 'edit header', 'web', NULL, NULL),
(6, 'tambah berita', 'web', NULL, NULL),
(7, 'view menus', 'web', NULL, NULL),
(8, 'create menus', 'web', NULL, NULL),
(9, 'edit menus', 'web', NULL, NULL),
(10, 'delete menus', 'web', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `program_studis`
--

CREATE TABLE `program_studis` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `program_studis`
--

INSERT INTO `program_studis` (`id`, `name`, `description`, `image`, `link`, `created_at`, `updated_at`) VALUES
(1, 'Kebidanan', 'Program Studi Kebidanan STIKes Bogor Husada berfokus pada pendidikan bidan profesional yang kompeten di bidang kesehatan ibu dan anak.', 'programs/bOsywFqdNkt4OzZRx65SnRGtIiPQOSrnWVGiyTn6.jpg', 'https://stikesbogor.ac.id/kebidanan', '2025-09-03 01:00:15', '2025-09-13 20:28:13'),
(2, 'Farmasi', 'Program Studi Farmasi menghasilkan tenaga profesional di bidang farmasi klinis, industri, dan penelitian.', 'programs/qpNNe3tPeaMmmiLAH0z7CyHruQusPkMQSgMOSWQi.jpg', 'https://stikesbogor.ac.id/farmasi', '2025-09-03 01:00:15', '2025-09-13 20:29:23'),
(3, 'Gizi', 'Program Studi Gizi mempersiapkan lulusan yang kompeten dalam pelayanan gizi masyarakat, klinis, dan penelitian.', 'programs/bZn3v7HWwoZhtY1ZQ0F9c9zSn6lklUtmPFncaz7V.jpg', 'https://stikesbogor.ac.id/gizi', '2025-09-03 01:00:15', '2025-09-13 20:30:06');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2025-07-09 06:13:58', '2025-07-09 06:13:58'),
(2, 'writer', 'web', '2025-07-09 06:13:58', '2025-07-09 06:13:58'),
(3, 'guest', 'web', '2025-07-09 06:13:58', '2025-07-09 06:13:58'),
(4, 'editor', 'web', '2025-07-09 19:21:17', '2025-07-09 19:21:17');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(1, 2),
(3, 2),
(1, 3),
(5, 4);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('2DWQs7pUyMzQNtiBHsYYcpvo5qV4sLwma00XjjvL', NULL, '127.0.0.1', 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/17.5 Mobile/15A5370a Safari/602.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYmhUcHRTVUx0ZHJqVjhBM3RtY0Q2SXlBOUhJeG1SWE95YkdtYzFuUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1758789071),
('aAQE1Yt9mzWAilDVrcu7zp1quPg70Zs1l48zVrVl', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQWs2bEw5WDVxRzZMVUpwOGJRSXpwdWdBZ1lETkRPZG92VEZRYXhFQyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1758787908),
('csJWQ3UZUKDGtX4DkcxapEvMZWAS7z1Stjx1KtPP', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiam15b051enl2S2Q4Tk9jSjJpVVljYkh0WEFjNWQ0aWhBQWh5eFFGZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1759126142),
('DhXkAZEwqUWsNY2CAPYUruBwXPheQ46vxGvsZuiO', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTWlRNFFVQmU1Nm5vOW45TzlJQW5uV1J6M3Nxd3prY0o3RDJXN0dCdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9iZXJhbmRhIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1759126121),
('Fo9lBAVGDcCI2AIJLbRbLaCE6Dwz29vQWjY4HOtg', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieEMyYlRFVlpjZWtuSmZmZXJUWUpWdEhRVjBrNGdpOXF3N1YycURxUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1758787154),
('gy3kKP0o4F7dDQVBx1dM3jrVfrURs9kzj0hLLFfB', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNExKblNoTW5qcDZ4Ykd6d3FaUmF2djlTSUowM3FBSGY0WTRHaUxSUyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1758785050),
('hExkdQminZCPnn4PFsUbp8KctAONFxOw1eKQ5TTo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieDl2eEdON0JFd2VpdEMxNTBRSjZzRDZVU0VOTmw1OEJxUHkwdFpUTiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1759127014),
('I89gh3JuAAuoSJJ8wrgpn9ggSXte13uoazhZreZC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiazZzNU9qZjdsaDVOME5SSkIybTNCUkFOSHd1S3VlcGxZTVBsRXUxeSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1759126891),
('Ig3Cnq0qTCU46j1aQjfZfJ36X0c0Wzi6G36dUlHo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVVExdXpVc1FwV2lJamFXRXg4SnVDVXc4dEgwb3d4SHFROHRGSm1RSCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1758788250),
('JD2TBE4rWH7QFajz0dG3jAjld84xkpFIkhGzN2m7', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieGNrQk1OV3FXZFVYbmhKM3UwanVmeUV1bkxtcDRnQm5NVzdpeW1MQyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1759112158),
('jS4IoJciijSqbGrnM6tcDq4hU0COINnMx1GJaC6v', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVXpnNWdkZUVLZGthWGNFU0Y3STBYUW50UlNVOG9UMWxJc0cwNFZ1NiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1759111456),
('kepT0mcCRi9mEOenqYQM2sraVmXqlxqPFnHkIPVX', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiRDNZZ0dyQVVxaU00ZFI5Q2VBOWJiRVFUdlJ3ZXZmQzBTdE5GbGhOQSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1759111350),
('Mlfhsxr3jnO9RbZZxUJFkMt7c56AFyW4zCyyrGqj', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZjhJeVNPUWZJQlByUWdFTE1aSjIyWXFRREgzWVZRMXkxbHlGM0FHeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1758787564),
('NnUwrKC11u7gG2uxy38gSI0BwXJwzkvtjABLC8fR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVXhCSTJDck5TM2tHYk1nbTRIUnhvMWxabWs4Ulh3Sm4wWFE3am5NWCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHA6Ly9iYWNrZW5kLWxhcmF2ZWwtZnJvbnQtZW5kcy50ZXN0L2JlcmFuZGEiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1759126990),
('O73EQhyC28HtQeUaV9TTKgVQnAq0ESj0IsmtwOIo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZHpQVFFZQzcycXM2eTBPSWVTR3pjanNXUDN1dDVDcVBWRFlFUDEwTSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1759112089),
('p3ZYzzdkDvwxQGzbk7JBGPwAcSc6esFplcDqviUD', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoicWdKODF1N1ZPZTEzNkNyQWdUVW5aWFFiUDlRd3diWXQxRHF1ZVpNMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9hZG1pbi9wYWdlcyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1759112434),
('p7PZ3te9wWuzBIRevc5eaDOsTKCJpC1FHS0ga5XS', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWFVqQnNYb05GN2Q1S1F0S3RpMmRJaVhabm90UkZibzkxQ1pXMndtRSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1758792082),
('Pu76XO5VWERco4sdrrbzjVGN4NjTYpTX3Z5RSpRV', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRjJhY2hNaEdlNG5LMUFxejhMOE96b3lycUFiOE9GWkphbGh4bEkxbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1758791690),
('rSgAEhyFBUhUdKlVNvql0MgTmHewmnOta8cqinDe', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVWFDUnVPVWxya0JZOXkyd2VuYzBBUUFkQXdybXB3YWNlSHhyM3R0USI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1758787266),
('WHJ6p2Ny0zFBgApSVsyjpPadZYd4OcV76ptehyUz', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVFVaVEcwNHlnNW9tcDFjaGt2NUxWUnVDU21ZcFgxMlBCT2JnS2R1MCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1759126842),
('Yo0TWn9WAv0dFxDoIB8UQVmlYlEwUAsFGWI22vOF', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiazlrU2VsWUllYjNVbllyanRGTFlVblEzS1dTclNrSzlLZlVYS29veCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1758791997),
('z53VLf0vdeBpdshNhvtz8hXw7mBMYQvRWJogTbUI', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZVJxcVRZbXFZdUFPOHN5OFFEQlFycFZLWUJkajZEV1hLbkpCQ1lmTSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYW5pZmVzdC5qc29uIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1758789466),
('zsIhbT2N7mwtsm6Ukt9xulWkZm7wvF5sK4SP8SVQ', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiaEphTEl2ZmtpMkUyR0dycDFFVXdpcG5RWk92RDdjVlp3S1k4ekhTOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1759127430);

-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_mobile` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sliders`
--

INSERT INTO `sliders` (`id`, `title`, `subtitle`, `image`, `image_mobile`, `link`, `order`, `created_at`, `updated_at`) VALUES
(1, 'Selamat Datang di Website Kami', 'STIKes Bogor Husada', 'sliders/xH6s9ZQ9eSnxtKw9uYHP0riRz0z75LI1K8hRAYxF.jpg', 'sliders/mobile/74X7WABXidZ4XyQH8WFpCiICEnsJL1HvcKLc29SS.jpg', 'https://sbh.ac.id', 1, '2025-09-03 00:58:13', '2025-09-25 01:37:30'),
(2, 'Penerimaan Mahasiswa Baru', 'Ayo daftar sekarang juga!', 'sliders/Ytt97MHO8Tirj4P7dGLl4vC2vxL9V3OTKCfn7Otf.jpg', NULL, 'https://pmb.sbh.ac.id', 2, '2025-09-03 00:58:13', '2025-09-22 00:05:43');

-- --------------------------------------------------------

--
-- Table structure for table `statistics`
--

CREATE TABLE `statistics` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` int NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `statistics`
--

INSERT INTO `statistics` (`id`, `title`, `value`, `icon`, `order`, `created_at`, `updated_at`) VALUES
(1, 'Mahasiswa', 1200, 'fa-solid fa-user-graduate', 1, '2025-09-03 00:43:09', '2025-09-22 00:29:54'),
(2, 'Alumni', 3500, 'fa-solid fa-users', 2, '2025-09-03 00:43:09', '2025-09-22 00:26:23'),
(3, 'Dosen', 80, 'fas fa-user-graduate', 3, '2025-09-03 00:43:09', '2025-09-22 00:25:51'),
(4, 'Program Studi', 5, 'fas fa-book', 4, '2025-09-03 00:43:09', '2025-09-03 00:43:09');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `role`, `message`, `photo`, `created_at`, `updated_at`) VALUES
(1, 'Budi', 'Alumni', 'Belajar di sini sangat menyenangkan dan bermanfaat untuk karir saya.', 'testimonials/TYvmZucpjvttN2tz6Dssdb9aaeWAZQp2iU5nmLXZ.jpg', '2025-09-22 20:43:32', '2025-09-22 21:45:20'),
(2, 'Siti', 'Mahasiswa', 'Dosen-dosen sangat ramah dan profesional!', 'testimonials/7bDDKLL0XCfYBftV2Mwa7xgMDIFijPUUh3dlMA6l.jpg', '2025-09-22 20:43:32', '2025-09-22 23:10:41'),
(3, 'Andi Pratama', 'Alumni', 'Lingkungan kampus sangat mendukung pengembangan diri.', 'testimonials/andi.jpg', '2025-09-22 20:43:32', '2025-09-22 20:43:32'),
(4, 'Dewi Lestari', 'Mahasiswa', 'Fasilitas kampus lengkap dan nyaman untuk belajar.', 'testimonials/dewi.jpg', '2025-09-22 20:43:32', '2025-09-22 20:43:32'),
(5, 'Rizky Nugroho', 'Mahasiswa', 'Kegiatan organisasi di kampus sangat membantu softskill saya.', 'testimonials/rizky.jpg', '2025-09-22 20:43:32', '2025-09-22 20:43:32'),
(6, 'Nur Aisyah', 'Alumni', 'Ilmu yang saya dapat di sini sangat bermanfaat di dunia kerja.', 'testimonials/aisyah.jpg', '2025-09-22 20:43:32', '2025-09-22 20:43:32'),
(7, 'Fajar Ramadhan', 'Mahasiswa', 'Teman-teman sekelas kompak dan suasana belajar menyenangkan.', 'testimonials/fajar.jpg', '2025-09-22 20:43:32', '2025-09-22 20:43:32');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'hadi', 'admin@gmail.com', NULL, '$2y$12$5FEj0294sLufMTtkvUhlPejNn8BUp6toQEwAhoUXbH2mFQNWDr0Zq', NULL, '2025-07-09 05:35:25', '2025-07-09 05:35:25'),
(2, 'admintes', 'hadi@gmail.com', NULL, '$2y$12$9moV3yjncir2ip.i.GMD5Ok0JBFwycoHuMT05glN/PCSdHQVoDP.u', NULL, '2025-07-09 06:48:45', '2025-07-09 06:48:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `company_profile_videos`
--
ALTER TABLE `company_profile_videos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `front_settings`
--
ALTER TABLE `front_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `front_settings_key_unique` (`key`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `menus_slug_unique` (`slug`),
  ADD KEY `menus_parent_id_index` (`parent_id`);

--
-- Indexes for table `meta_settings`
--
ALTER TABLE `meta_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pages_slug_unique` (`slug`);

--
-- Indexes for table `page_sections`
--
ALTER TABLE `page_sections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `page_sections_page_id_foreign` (`page_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `pendaftaran_email`
--
ALTER TABLE `pendaftaran_email`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pendaftaran_email_email_unique` (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `program_studis`
--
ALTER TABLE `program_studis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company_profile_videos`
--
ALTER TABLE `company_profile_videos`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `front_settings`
--
ALTER TABLE `front_settings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `meta_settings`
--
ALTER TABLE `meta_settings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `page_sections`
--
ALTER TABLE `page_sections`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pendaftaran_email`
--
ALTER TABLE `pendaftaran_email`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `program_studis`
--
ALTER TABLE `program_studis`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `statistics`
--
ALTER TABLE `statistics`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `page_sections`
--
ALTER TABLE `page_sections`
  ADD CONSTRAINT `page_sections_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
