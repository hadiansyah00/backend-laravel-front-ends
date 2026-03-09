import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';

export default function Perpustakaan() {
    const dummySectionsConfig = [
        {
            type: 'hero_static',
            content: {
                title: 'Perpustakaan Riset Medis Digital',
                subtitle: 'Jantung literatur sivitas akademika dengan koleksi jurnal, modul, dan buku kesehatan internasional yang relevan.',
                bgImage: '/assets/img/hero-fallback.png'
            }
        },
        {
            type: 'content_with_image',
            content: {
                title: 'Mengenal Perpustakaan SBH',
                image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=2070', // Library aisle
                align: 'right', // alternate layout
                imageAspectRatio: 'aspect-[4/3]',
                content: `
                    <p class="mb-4"><strong>Perpustakaan STIKes Bogor Husada</strong> hadir tidak sekadar sebagai ruang baca klasik, tetapi telah bertransformasi menjadi *Co-Learning Space* dan Pusat Koleksi Riset Medis *Hybrid*.</p>
                    <p class="mb-4">Kami menyediakan akses luas terhadap literatur cetak, mulai dari Farmakope, buku Anatomi Fisiologi otentik, hingga ensiklopedia Gizi terkini. Di samping itu, koleksi digital repositori kami terhubung langsung dengan penyedia jurnal nasional terakreditasi dan jurnal internasional (seperti ProQuest, ScienceDirect, PubMed).</p>
                    <p class="mb-4">Dibekali dengan fasilitas ruang diskusi kedap suara, Wi-Fi berkecepatan tinggi, dan *Digital Library Booth*, mahasiswa dapat menuntaskan tugas akhir (KTI/Skripsi) dengan referensi paling solid dan valid.</p>
                `
            }
        },
        {
            type: 'feature',
            content: {
                title: 'Layanan Ekosistem Perpustakaan',
                features: [
                    {
                        title: "Koleksi Cetak Kesehatan",
                        icon: "fas fa-book",
                        description: "Ribuan judul eksemplar buku diktat utama yang selalu diperbarui, ensiklopedia khusus obat, dan rujukan prosedur kebidanan."
                    },
                    {
                        title: "E-Library Akses Global",
                        icon: "fas fa-globe",
                        description: "Akses login institusional ke pangkalan data jurnal internasional untuk menambang jurnal kesehatan paling aktual selama 24 jam."
                    },
                    {
                        title: "Repositori Skripsi Mahasiswa",
                        icon: "fas fa-archive",
                        description: "Pusat arsip dan indeks Karya Tulis Ilmiah (KTI) serta skripsi lokal alumni secara digital untuk penelusuran referensi riset baru."
                    },
                    {
                        title: "Cek Plagiasi Berlisensi (Turnitin)",
                        icon: "fas fa-search",
                        description: "Layanan peninjauan naskah riset mahasiswa/dosen sebelum sidang menggunakan mesin deteksi tingkat kesamaan secara teliti (Similarity Check)."
                    }
                ]
            }
        }
    ];

    return (
        <MainLayout title="Perpustakaan | STIKes Bogor Husada">
            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}
