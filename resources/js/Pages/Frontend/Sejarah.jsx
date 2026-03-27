import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';

export default function Sejarah() {
    // ⬇️ DUMMY JSON CONFIGURATION for "Sejarah" ⬇️
    const dummySectionsConfig = [
        {
            type: 'hero_static',
            content: {
                title: 'Sejarah Institusi',
                subtitle: 'Jejak langkah perjuangan kami membangun pendidikan kesehatan selama lebih dari satu dekade.',
                bgImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
            }
        },
        {
            type: 'rich_text',
            content: {
                content: `
                    <h2>Menjadi institusi pendidikan kesehatan unggulan di Bogor dan sekitarnya</h2>
                    <p>STIKes Bogor Husada didirikan sebagai wujud komitmen dalam meningkatkan kualitas pendidikan di bidang kesehatan di Indonesia, khususnya di wilayah Bogor dan sekitarnya. Sejak awal berdirinya, institusi ini telah berfokus pada pengembangan sumber daya manusia yang profesional, beretika, dan berdaya saing tinggi di bidang kesehatan.</p>
                    
                    <p>Dengan dukungan tenaga pengajar yang kompeten dan fasilitas yang memadai, STIKes Bogor Husada terus berinovasi dalam memberikan pendidikan terbaik bagi mahasiswa. Seiring perjalanan waktu, institusi ini telah melahirkan lulusan-lulusan yang berkontribusi nyata dalam dunia kesehatan, baik di tingkat lokal maupun nasional.</p>
                    
                    <p>Hingga saat ini, STIKes Bogor Husada tetap berkomitmen untuk menjadi institusi pendidikan kesehatan unggulan yang mampu menjawab tantangan zaman dan kebutuhan masyarakat.</p>
                `
            }
        },
        {
            type: 'timeline',
            content: {
                title: 'Roadmap STIKes Bogor Husada',
                icon: 'fa-route', // Setting a suitable icon for Roadmap
                items: [
                    {
                        year: '2007',
                        title: 'Pendirian Akademi Kebidanan Bogor Husada',
                        description: 'Akademi Kebidanan Bogor Husada berdiri di Kota Bogor dengan satu program studi yaitu D3 Kebidanan.'
                    },
                    {
                        year: '2019',
                        title: 'Perubahan Bentuk Menjadi STIKes Bogor Husada',
                        description: 'Akademi Kebidanan Bogor Husada resmi berubah menjadi STIKes Bogor Husada berdasarkan SK Kemenristek Dikti Nomor B/2201/A41/HK.01.01/2019.'
                    },
                    {
                        year: '2019',
                        title: 'Kerja Sama dan Penambahan Program Studi',
                        description: 'STIKes Bogor Husada menjalin kerja sama dengan RS Azra Kota Bogor serta menambah program studi S1 Farmasi.'
                    },
                    {
                        year: '2020',
                        title: 'Penambahan Program Studi S1 Gizi',
                        description: 'STIKes Bogor Husada menambah program studi ketiga yaitu S1 Gizi.'
                    },
                    {
                        year: '2021',
                        title: 'Akreditasi D3 Kebidanan',
                        description: 'Program studi D3 Kebidanan memperoleh akreditasi LAM-PTKes dengan peringkat "Baik Sekali" (No. 0142/LAM-PTKes/Akr/Dip/IV/2021).'
                    },
                    {
                        year: '2022',
                        title: 'Akreditasi S1 Farmasi',
                        description: 'Program studi S1 Farmasi memperoleh akreditasi LAM-PTKes dengan peringkat "Baik" (No. 0844/LAM-PTKes/Akr/Sar/IX/2022).'
                    },
                    {
                        year: '2023',
                        title: 'Akreditasi S1 Gizi dan Penambahan Kampus 2',
                        description: 'Program studi S1 Gizi memperoleh akreditasi LAM-PTKes "Baik" (No. 0247/LAM-PTKes/Akr/Sar/III/2023) serta penambahan Gedung Kampus 2 di Jl. Sholeh Iskandar, Kota Bogor untuk meningkatkan kualitas ruang belajar.'
                    },
                    {
                        year: '2024',
                        title: 'Penambahan Laboratorium Farmakologi',
                        description: 'Penambahan fasilitas Laboratorium Farmakologi di Kampus 1 STIKes Bogor Husada pada Maret 2024 untuk mendukung pembelajaran farmakokinetik dan farmakodinamik.'
                    }
                ]
            }
        }
    ];

    return (
        <MainLayout title="Sejarah | STIKes Bogor Husada">
            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}
