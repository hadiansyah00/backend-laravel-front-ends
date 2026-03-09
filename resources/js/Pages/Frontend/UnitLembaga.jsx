import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';

export default function UnitLembaga() {
    const dummySectionsConfig = [
        {
            type: 'hero_static',
            content: {
                title: 'Unit & Lembaga',
                subtitle: 'Pusat penggerak tata kelola, penjaminan mutu, serta penelitian dan pengabdian demi mewujudkan cita-cita tridharma perguruan tinggi di STIKes Bogor Husada.',
                bgImage: '/assets/img/hero-fallback.png'
            }
        },
        {
            type: 'content_with_image',
            content: {
                title: 'Lembaga Penjaminan Mutu Internal (LPMI)',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop', // Placeholder office meeting
                align: 'left',
                imageAspectRatio: 'aspect-[4/3]',
                content: `
                    <p class="mb-4"><strong>LPMI STIKes Bogor Husada</strong> adalah jantung dari standar kualitas akademik kampus. Kami bertugas untuk tak henti-hentinya merumuskan, melaksanakan, dan mengevaluasi siklus Penjaminan Mutu Internal (SPMI) guna memastikan seluruh penyelenggaraan pendidikan kesehatan berjalan di atas rel kepatuhan regulasi Kementerian Pendidikan dan Kebudayaan serta standar LAM-PTKes.</p>
                    <p class="mb-4">Audit mutu akademik berkala yang kami inisiasi adalah wujud komitmen STIKes Bogor Husada dalam memelihara akuntabilitas publik. Kami memastikan bahwa janji visi kampus untuk mencetak lulusan tenaga kesehatan unggul bukan sekadar retorika, melainkan realitas yang dapat dibuktikan secara terukur dari generasi ke generasi.</p>
                    <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                        <li>Sertifikasi dan akreditasi prodi berstandar nasional.</li>
                        <li>Evaluasi kepuasan mahasiswa (EDOM) dan Tracer Study.</li>
                        <li>Pengukuran Indikator Kinerja Utama (IKU) civitas akademika.</li>
                    </ul>
                `
            }
        },
        {
            type: 'content_with_image',
            content: {
                title: 'Lembaga Penelitian dan Pengabdian kepada Masyarakat (LPPM)',
                image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070', // Placeholder medical research
                align: 'right', // Alternate layout
                imageAspectRatio: 'aspect-[4/3]',
                content: `
                    <p class="mb-4"><strong>LPPM STIKes Bogor Husada</strong> diinisiasi sebagai wadah dinamis bagi para dosen dan mahasiswa untuk melahirkan sumbangsih nyata dalam panggung pengembangan Ilmu Pengetahuan dan Teknologi (IPTEK) di ranah klinis maupun kesehatan komunitas.</p>
                    <p class="mb-4">Dengan menyelaraskan Rencana Induk Penelitian (RIP) dengan problematika malnutrisi, tingginya angka kematian ibu (AKI/AKB), hingga eksplorasi obat-obatan komplementer tropis, LPPM terus mendorong hilirisasi riset agar manfaatnya dapat langsung diserap oleh masyarakat luas melalui program-program pengabdian progresif (PKM).</p>
                    <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                        <li>Pendanaan hibah riset eksternal (Kemendikbud Ristek) dan internal.</li>
                        <li>Fasilitasi publikasi jurnal ilmiah terakreditasi SINTA & Scopus.</li>
                        <li>Pendaftaran Hak Kekayaan Intelektual (HAKI) / Paten karya kampus.</li>
                        <li>Desa Binaan Kolaboratif tematik (Stunting & Kesehatan Ibu).</li>
                    </ul>
                `
            }
        },
        {
            type: 'content_with_image',
            content: {
                title: 'Biro Administrasi Akademik & Kemahasiswaan (BAAK)',
                image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2070', // Placeholder admin desk
                align: 'left',
                imageAspectRatio: 'aspect-[4/3]',
                content: `
                    <p class="mb-4"><strong>BAAK</strong> (Biro Administrasi Akademik dan Kemahasiswaan) bertindak sebagai garda terdepan layanan prima kelengkapan studi mahasiswa STIKes Bogor Husada. BAAK mengorkestrasi rona kehidupan kampus mulai dari fase penerimaan mahasiswa baru, hiruk-pikuk pengisian Kartu Rencana Studi (KRS), hingga titik puncak perayaan kelulusan (Wisuda).</p>
                    <p class="mb-4">Di ranah kemahasiswaan, unit ini menyokong nyala api minat dan bakat mahasiswa melalui pendampingan Badan Eksekutif Mahasiswa (BEM) dan beragam Unit Kegiatan Mahasiswa (UKM) baik di bidang kesenian, kerohanian, maupun relawan medis (KSR).</p>
                    <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                        <li>Penerbitan KHS, Transkrip Nilai, dan Ijazah cetak/digital.</li>
                        <li>Pendataan PDDikti mutakhir dan administrasi cuti akademik.</li>
                        <li>Pengelolaan ragam beasiswa bidikmisi (KIP-K) & swasta.</li>
                        <li>Sponsorship dan perizinan kompetisi mahasiswa skala nasional.</li>
                    </ul>
                `
            }
        },
        {
            type: 'feature',
            content: {
                title: 'Laboratorium & Fasilitas Terpadu',
                features: [
                    {
                        title: "Lab. OSCE & Skill Lab Terpadu",
                        icon: "fas fa-stethoscope",
                        description: "Arena simulasi pertolongan persalinan lengkap dengan phantom manekin modern (maternal & neonatal) standar ujian praktik komprehensif kebidanan tingkat akhir."
                    },
                    {
                        title: "Laboratorium Farmakognosi & Sintesis",
                        icon: "fas fa-flask",
                        description: "Pusat ekstrasi dan racikan sediaan obat komplementer farmasi bersenjatakan mikroskop binokuler terkini, alat partisi, dan rotary evaporator presisi."
                    },
                    {
                        title: "Laboratorium Pangan & Dietetika",
                        icon: "fas fa-apple-alt",
                        description: "Dapur klinis sarat instrumen mutakhir untuk praktik penyusunan menu dietisien klinis berbasis evidence-based penanggulangan penyakit tidak menular (PTM)."
                    },
                    {
                        title: "Perpustakaan Riset Medis Digital",
                        icon: "fas fa-book-medical",
                        description: "Pusat literatur terintegrasi dengan akses proxy ke jurnal jurnal kesehatan raksasa (ScienceDirect, ProQuest) serta ratusan e-book medis edisi terbaru."
                    }
                ]
            }
        }
    ];

    return (
        <MainLayout title="Unit, Lembaga & Fasilitas | STIKes Bogor Husada">
            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}
