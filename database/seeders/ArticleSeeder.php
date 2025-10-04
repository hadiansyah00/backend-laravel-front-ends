<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Article;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $articles = [
            [
                'category_id' => 2,
                'title'       => 'Tips Menjaga Kesehatan Mata di Era Gadget',
                'slug'        => Str::slug('Tips Menjaga Kesehatan Mata di Era Gadget'),
                'excerpt'     => 'Penggunaan gadget berlebihan dapat memengaruhi kesehatan mata.',
                'content'     => 'Lindungi kesehatan mata dengan aturan 20-20-20, perbanyak konsumsi vitamin A, dan kurangi penggunaan gadget sebelum tidur.',
                'thumbnail'   => 'articles/kesehatan-mata.jpg',
                'status'      => 'published',
                'published_at' => Carbon::now(),
            ],
            [
                'category_id' => 2,
                'title'       => 'Manfaat Yoga untuk Tubuh dan Pikiran',
                'slug'        => Str::slug('Manfaat Yoga untuk Tubuh dan Pikiran'),
                'excerpt'     => 'Yoga membantu meningkatkan fleksibilitas tubuh sekaligus menenangkan pikiran.',
                'content'     => 'Rutin melakukan yoga dapat mengurangi stres, memperbaiki postur tubuh, dan menjaga kesehatan jantung.',
                'thumbnail'   => 'articles/yoga.jpg',
                'status'      => 'published',
                'published_at' => Carbon::now(),
            ],
            [
                'category_id' => 3,
                'title'       => 'Bahaya Konsumsi Gula Berlebihan',
                'slug'        => Str::slug('Bahaya Konsumsi Gula Berlebihan'),
                'excerpt'     => 'Konsumsi gula berlebih dapat meningkatkan risiko obesitas dan diabetes.',
                'content'     => 'Kurangi minuman manis, periksa label makanan, dan ganti dengan pemanis alami seperti madu.',
                'thumbnail'   => 'articles/gula-berlebihan.jpg',
                'status'      => 'published',
                'published_at' => Carbon::now(),
            ],
            [
                'category_id' => 3,
                'title'       => 'Pentingnya Sarapan Sehat Sebelum Beraktivitas',
                'slug'        => Str::slug('Pentingnya Sarapan Sehat Sebelum Beraktivitas'),
                'excerpt'     => 'Sarapan sehat memberikan energi dan fokus lebih baik.',
                'content'     => 'Sarapan ideal terdiri dari karbohidrat kompleks, protein, serat, dan vitamin agar tubuh lebih siap menghadapi aktivitas sehari-hari.',
                'thumbnail'   => 'articles/sarapan-sehat.jpg',
                'status'      => 'published',
                'published_at' => Carbon::now(),
            ],
            [
                'category_id' => 3,
                'title'       => 'Mengelola Berat Badan dengan Pola Hidup Sehat',
                'slug'        => Str::slug('Mengelola Berat Badan dengan Pola Hidup Sehat'),
                'excerpt'     => 'Berat badan ideal dapat dicapai dengan pola hidup sehat.',
                'content'     => 'Atur pola makan seimbang, olahraga rutin, cukup tidur, dan kurangi stres untuk menjaga berat badan ideal.',
                'thumbnail'   => 'articles/berat-badan.jpg',
                'status'      => 'published',
                'published_at' => Carbon::now(),
            ],
            [
                'category_id' => 4,
                'title'       => 'Pentingnya Vaksinasi untuk Kesehatan Masyarakat',
                'slug'        => Str::slug('Pentingnya Vaksinasi untuk Kesehatan Masyarakat'),
                'excerpt'     => 'Vaksinasi melindungi individu sekaligus mencegah penyebaran penyakit.',
                'content'     => 'Vaksin terbukti efektif menurunkan angka kesakitan dan kematian akibat penyakit menular. Pastikan jadwal vaksinasi keluarga terpenuhi.',
                'thumbnail'   => 'articles/vaksinasi.jpg',
                'status'      => 'published',
                'published_at' => Carbon::now(),
            ],
            [
                'category_id' => 4,
                'title'       => 'Tips Aman Berolahraga di Rumah',
                'slug'        => Str::slug('Tips Aman Berolahraga di Rumah'),
                'excerpt'     => 'Berolahraga di rumah bisa tetap efektif dan menyenangkan.',
                'content'     => 'Gunakan peralatan sederhana, lakukan pemanasan sebelum mulai, dan tetap perhatikan postur tubuh agar terhindar dari cedera.',
                'thumbnail'   => 'articles/olahraga-rumah.jpg',
                'status'      => 'published',
                'published_at' => Carbon::now(),
            ],
            [
                'category_id' => 4,
                'title'       => 'Cara Menjaga Kesehatan Kulit Secara Alami',
                'slug'        => Str::slug('Cara Menjaga Kesehatan Kulit Secara Alami'),
                'excerpt'     => 'Kulit sehat dapat diperoleh dengan perawatan sederhana.',
                'content'     => 'Konsumsi makanan bergizi, cukup minum air, gunakan tabir surya, dan rajin membersihkan wajah adalah kunci kulit sehat.',
                'thumbnail'   => 'articles/kulit-sehat.jpg',
                'status'      => 'published',
                'published_at' => Carbon::now(),
            ],
            [
                'category_id' => 5,
                'title'       => 'Manfaat Jalan Kaki 30 Menit Setiap Hari',
                'slug'        => Str::slug('Manfaat Jalan Kaki 30 Menit Setiap Hari'),
                'excerpt'     => 'Jalan kaki sederhana namun banyak manfaatnya.',
                'content'     => 'Jalan kaki dapat membantu menurunkan berat badan, meningkatkan kesehatan jantung, dan memperbaiki suasana hati.',
                'thumbnail'   => 'articles/jalan-kaki.jpg',
                'status'      => 'published',
                'published_at' => Carbon::now(),
            ],
            [
                'category_id' => 5,
                'title'       => 'Mengatur Pola Tidur Agar Lebih Produktif',
                'slug'        => Str::slug('Mengatur Pola Tidur Agar Lebih Produktif'),
                'excerpt'     => 'Tidur yang teratur membuat tubuh lebih bugar.',
                'content'     => 'Tidur cukup selama 7-8 jam dengan jam tidur konsisten membantu meningkatkan konsentrasi, energi, dan produktivitas.',
                'thumbnail'   => 'articles/pola-tidur.jpg',
                'status'      => 'published',
                'published_at' => Carbon::now(),
            ],
        ];

        foreach ($articles as $article) {
            Article::create($article);
        }
    }
}
