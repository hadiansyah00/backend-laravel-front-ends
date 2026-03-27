import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';

export default function Laboratorium() {
    const dummySectionsConfig = [
        {
            type: 'hero_static',
            content: {
                title: 'Fasilitas Laboratorium Medis',
                subtitle: 'Pusat simulasi klinis dan praktikum dengan standar industri kesehatan modern untuk mencetak lulusan yang cekatan.',
                bgImage: '/assets/img/hero-fallback.png'
            }
        },
        {
            type: 'content_with_image',
            content: {
                title: 'Pengantar Laboratorium Terpadu',
                image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=2070', // Lab equipment
                align: 'left',
                imageAspectRatio: 'aspect-[4/3]',
                content: `
                    <p class="mb-4"><strong>Laboratorium Dasar dan Terpadu STIKes Bogor Husada</strong> dirancang secara spesifik untuk menjembatani kesenjangan antara teori di kelas dan realitas klinis di rumah sakit.</p>
                    <p class="mb-4">Bagi kami, laboratorium bukan sekadar tempat penyimpanan alat, melainkan arena "trial and error" akademis di mana calon bidan, farmasis, dan gizi dapat mengasah insting diagnosis, motorik, dan pengambilan keputusan medis dalam kondisi tersimulasi aman sebelum berhadapan langsung dengan pasien sungguhan.</p>
                    <p class="mb-4">Dilengkapi perlengkapan terkini mulai dari Phantom Ibu Hamil Komprehensif (OSCE), Instrumen Farmakognosi, Rotavapor, hingga <i>Dietetic Kitchen</i> berskala RSUD kelas A.</p>
                `
            }
        },
        {
            type: 'feature',
            content: {
                title: 'Daftar Laboratorium Unggulan',
                features: [
                    {
                        title: "Lab Praktik Kebidanan OSCE",
                        icon: "fas fa-baby",
                        description: "Arena simulasi persalinan normal dan patologis dengan manekin interaktif yang dapat merespon tindakan kebidanan/Nifas."
                    },
                    {
                        title: "Laboratorium Farmasetika Dasar",
                        icon: "fas fa-mortar-pestle",
                        description: "Fasilitas peracikan sediaan obat padat (tablet), cair (sirup), hingga salep secara aseptis sesuai Farmakope Indonesia."
                    },
                    {
                        title: "Laboratorium Mikrobiologi Medik",
                        icon: "fas fa-microscope",
                        description: "Pusat inokulasi, identifikasi bakteri, hingga uji sensitivitas antibiotik dengan inkubator standar dan mikroskop optik tajam."
                    },
                    {
                        title: "Dapur Dietetika Klinis Gizi",
                        icon: "fas fa-utensils",
                        description: "Dapur simulasi persiapan formula enteral, MPASI, serta hidangan terapeutik rendah garam/glukosa khusus untuk intervensi diet pasien."
                    }
                ]
            }
        }
    ];

    return (
        <MainLayout title="Laboratorium | STIKes Bogor Husada">
            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}
