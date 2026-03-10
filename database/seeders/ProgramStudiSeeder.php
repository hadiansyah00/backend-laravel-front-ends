<?php

namespace Database\Seeders;

use App\Models\ProgramStudi;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProgramStudiSeeder extends Seeder
{
    public function run(): void
    {
        ProgramStudi::truncate();

        // 1. D3 Kebidanan
        ProgramStudi::create([
            'name' => 'D3 Kebidanan',
            'slug' => 'd3-kebidanan',
            'description' => "Program Studi D3 Kebidanan STIKes Bogor Husada berkomitmen untuk melahirkan tenaga bidan vokasional yang kompeten. Fokus pendidikan kami adalah asuhan kebidanan pada kehamilan, persalinan, nifas, bayi baru lahir, balita, serta pelayanan keluarga berencana.\n\nMahasiswa dibekali keterampilan klinis yang mumpuni melalui praktikum di laboratorium berstandar dan praktik klinik kebidanan (PKD) secara langsung di lapangan (Rumah Sakit, Puskesmas, Klinik).",
            'visi' => 'Menjadi program studi D3 Kebidanan yang unggul dalam mencetak bidan profesional, beretika, dan tangguh dalam pelayanan kesehatan ibu dan anak.',
            'misi' => "1. Menyelenggarakan pendidikan kebidanan vokasi yang berkualitas.\n2. Mengembangkan penelitian terapan di bidang kebidanan.\n3. Melaksanakan pengabdian masyarakat untuk menurunkan angka kematian ibu dan bayi.",
            'akreditasi' => 'LAM-PTKes "BAIK"',
            'gelar' => 'A.Md.Keb',
            'lama_studi' => '3 Tahun (6 Semester)',
            'kaprodi_name' => 'Ketua Program Studi D3 Kebidanan',
            'kaprodi_photo' => null,
            'kaprodi_profile' => "Menjadi bidan bukan hanya sebuah profesi, melainkan sebuah pengabdian mulia. Di STIKes Bogor Husada, kami menempa para mahasiswi dengan nilai etika profesional, kedisiplinan, dan rasa kepedulian yang tinggi.\n\nKurikulum D3 Kebidanan dirancang agar para mahasiswa dapat mempraktekan langsung ilmu yang didapat dari dosen yang juga merupakan praktisi klinis andal. Kami bertujuan mengurangi angka kematian ibu dan anak dengan turut menyediakan tenaga kesehatan yang terampil di seluruh penjuru rumah sakit maupun praktik mandiri.",
            'peluang_kerja' => [
                ["title" => "Rumah Sakit & RSIA", "description" => "Sebagai bidan pelaksana dalam penanganan persalinan dan asuhan nifas."],
                ["title" => "Puskesmas & Desa", "description" => "Bidan Desa yang mengawal kesehatan keluarga di tingkat masyarakat."],
                ["title" => "Praktik Mandiri Bidan (PMB)", "description" => "Membuka pelayanan mandiri untuk konsultasi kehamilan, bersalin, dan KB."],
                ["title" => "Klinik Bersalin & Fasilitas Kesehatan", "description" => "Melayanani asuhan antenatal care dan edukasi kesehatan ibu reproduksi."]
            ],
            'image' => 'assets/img/hero-fallback.png',
            'link' => null,
            'is_active' => true,
        ]);

        // 2. S1 Farmasi
        ProgramStudi::create([
            'name' => 'S1 Farmasi',
            'slug' => 's1-farmasi',
            'description' => "Farmasi adalah program studi yang mempelajari tentang obat-obatan. Di sini kamu akan mempelajari untuk mengenali struktur kimia obat dan cara sintesisnya, kemudian mengelolanya menjadi obat yang berkhasiat. Tidak hanya meracik, kamu juga harus mengetahui bagaimana penggunaan obat secara aman.\n\nBidang farmasi tidak akan pernah ada matinya, sebab pola penyakit pun terus berkembang dan membutuhkan penanganan yang tepat.",
            'visi' => 'Menjadi penyelenggara Program Studi S1 Farmasi yang menghasilkan lulusan Sarjana Farmasi yang profesional, unggul di bidang pelayanan kefarmasian, berkarakter dan berwawasan global.',
            'misi' => "1. Menyelenggarakan pendidikan S1 Farmasi yang menghasilkan lulusan Sarjana Farmasi yang profesional, kompeten, berkarakter, berwawasan global, dan unggul di bidang kefarmasian.\n2. Menyelenggarakan penelitian di bidang kefarmasian serta meningkatkan produktivitas publikasi dan HAKI.\n3. Menyelenggarakan kegiatan pengabdian kepada masyarakat dengan mengaplikasikan ilmu kefarmasian dalam meningkatkan taraf kesehatan di masyarakat.\n4. Menyelenggarakan tata kelola program studi yang sehat dengan mengoptimalkan kerja sama dan pemanfaatan teknologi informasi yang tepat.",
            'akreditasi' => 'LAM-PTKes "BAIK"',
            'gelar' => 'S.Farm',
            'lama_studi' => '4 Tahun (8 Semester)',
            'kaprodi_name' => 'Ilham Maulana, M. Farm.',
            'kaprodi_photo' => null,
            'kaprodi_profile' => "Selamat datang di Program Studi S1 Farmasi STIKes Bogor Husada! Kami dengan bangga mengundang Anda untuk menjelajahi dunia farmasi yang penuh inovasi dan tantangan.\n\nProgram Studi S1 Farmasi kami berkomitmen untuk memberikan pendidikan berkualitas dalam berbagai aspek farmasi, termasuk farmasi klinis, farmasi industri, dan penelitian obat. Kami bertekad untuk melahirkan para profesional farmasi yang tidak hanya mahir dalam ilmu farmasi, tetapi juga memiliki kepekaan etika, kreativitas, dan semangat inovasi untuk menjawab tantangan farmasi masa depan.\n\nKami menekankan pentingnya pengembangan bakat, kerja tim, penerapan teknologi terkini dalam praktik farmasi, serta kontribusi pada kesehatan masyarakat secara luas.",
            'peluang_kerja' => [
                ["title" => "Rumah Sakit, Apotek, dan Klinik", "description" => "Pelayanan farmasi klinik, pengelolaan obat, pemberian informasi obat kepada pasien."],
                ["title" => "Perusahaan Farmasi", "description" => "Ilmuwan farmasi, peneliti, pengembangan, produksi, dan distribusi."],
                ["title" => "Produksi & Quality Control (QC)", "description" => "Pengawasan mutu bahan baku, proses produksi hingga produk standar."],
                ["title" => "Distribusi Produk Farmasi", "description" => "Pengelolaan logistik, penyimpanan, dan pengiriman produk farmasi aman."],
                ["title" => "Pegawai Negeri Sipil (PNS)", "description" => "Kemenkes, BPOM, Dinas Kesehatan. Pengaturan kebijakan dan pengawasan."],
                ["title" => "Kosmetik & Estetika Medis", "description" => "Formulator, konsultan kecantikan, atau staff klinik estetika."],
                ["title" => "Administrasi Pelayanan Obat", "description" => "Pengelolaan resep, obat, dan administrasi pasien rumah sakit."],
                ["title" => "Penelitian (R&D)", "description" => "Penemuan obat baru, formulasi, studi efikasi serta keamanan produk."]
            ],
            'image' => 'assets/img/hero-fallback.png',
            'link' => null,
            'is_active' => true,
        ]);

        // 3. S1 Gizi
        ProgramStudi::create([
            'name' => 'S1 Gizi',
            'slug' => 's1-gizi',
            'description' => "Program Studi S1 Gizi dirancang untuk menghasilkan lulusan yang memiliki pengetahuan mendalam tentang hubungan antara makanan, zat gizi, kesehatan, dan penyakit. Mahasiswa akan mempelajari ilmu gizi dasar, gizi klinik, gizi masyarakat, serta manajemen sistem penyelenggaraan makanan.\n\nSeiring dengan meningkatnya kesadaran masyarakat akan gaya hidup sehat, kebutuhan akan tenaga ahli gizi terus meningkat di berbagai sektor, baik klinis maupun non-klinis.",
            'visi' => 'Menjadi pusat pendidikan gizi yang unggul dalam menghasilkan Sarjana Gizi yang inovatif dan tanggap terhadap permasalahan gizi masyarakat.',
            'misi' => "1. Menyelenggarakan pendidikan gizi yang adaptif terhadap perkembangan ilmu pengetahuan dan teknologi.\n2. Melaksanakan penelitian di bidang gizi klinik dan masyarakat.\n3. Berperan aktif dalam program pemberdayaan masyarakat di bidang gizi dan kesehatan.",
            'akreditasi' => 'LAM-PTKes "BAIK"',
            'gelar' => 'S.Gz',
            'lama_studi' => '4 Tahun (8 Semester)',
            'kaprodi_name' => 'Ketua Program Studi S1 Gizi',
            'kaprodi_photo' => null,
            'kaprodi_profile' => "Selamat datang di Program Studi S1 Gizi STIKes Bogor Husada! Kami mendidik calon nutrisionis masa depan.\n\nKurikulum kami disusun khusus untuk memadukan ilmu medis dan ilmu terapan sehingga mahasiswa dapat memberikan konsultasi gizi secara akurat, merancang program diet klinis, maupun mengelola gizi pada tingkat populasi atau komunitas masyarakat.\n\nKami mengedepankan pendekatan interaktif, magang langsung di lapangan, serta riset inovatif agar mahasiswa kami selalu siap menjawab tantangan kesehatan modern.",
            'peluang_kerja' => [
                ["title" => "Rumah Sakit & Klinik Pribadi", "description" => "Dietisien klinik, menyusun menu sehat dan terapi nutrisi pasien."],
                ["title" => "Kementerian Kesehatan", "description" => "Konsultan gizi pemerintah yang memanage stunting dan nutrisi regional."],
                ["title" => "Industri Makanan & Minuman", "description" => "Ahli gizi di tim R&D untuk menjamin kualitas produk bernutrisi."],
                ["title" => "Pusat Kebugaran & Olahraga", "description" => "Sports Nutritionist yang membimbing pola makan atlet dan olahragawan."]
            ],
            'image' => 'assets/img/hero-fallback.png',
            'link' => null,
            'is_active' => true,
        ]);
    }
}
