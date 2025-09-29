-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 29, 2025 at 07:44 AM
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
(6, 'Beranda', 'beranda', 'https://sbh.ac.id', 1, 'page', NULL, 1, 1, '2025-07-09 22:37:56', '2025-09-29 00:37:44'),
(7, 'Profile', 'profile', NULL, 2, 'page', NULL, 2, 1, '2025-07-09 22:37:56', '2025-09-28 23:52:14'),
(8, 'Akademik', 'akademik', NULL, 3, 'page', NULL, 3, 1, '2025-07-09 22:37:56', '2025-09-29 00:07:33'),
(9, 'Kontak', 'kontak', NULL, 4, 'page', NULL, 4, 0, '2025-07-09 22:37:56', '2025-08-19 01:10:06'),
(10, 'Visi Misi', 'visi-misi', 'https://www.youtube.com/', NULL, 'page', 7, 2, 1, '2025-08-18 21:26:12', '2025-09-29 00:04:45'),
(13, 'Dosen & Tenaga Kependidikan', 'dosen-tenaga-kependidikan', NULL, 4, 'page', 7, 6, 1, '2025-08-19 01:02:58', '2025-09-29 00:06:40'),
(14, 'Program Studi', 'program-studi', 'https://perempuanaman.or.id/', NULL, 'page', 8, 1, 1, '2025-08-19 19:17:48', '2025-09-29 00:08:40'),
(15, 'Sambutan Kaprodi', 'sambutan-kaprodi', NULL, NULL, 'page', 7, 4, 1, '2025-09-25 02:18:58', '2025-09-29 00:05:49'),
(16, 'Sejarah', 'sejarah', NULL, NULL, 'page', 7, 1, 1, '2025-09-29 00:02:35', '2025-09-29 00:02:35'),
(18, 'Struktur Organisasi', 'struktur-organisasi', NULL, NULL, 'page', 7, 3, 1, '2025-09-29 00:03:57', '2025-09-29 00:03:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `menus_slug_unique` (`slug`),
  ADD KEY `menus_parent_id_index` (`parent_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
