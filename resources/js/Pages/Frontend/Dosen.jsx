import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';

export default function Dosen({ groupedDosen }) {
    // Convert backend grouped data to the format expected by DynamicSectionsRenderer / DosenListSection
    const formattedDosen = Object.keys(groupedDosen || {}).map(prodiName => {
        const prodiGroup = groupedDosen[prodiName];

        // Group by status (Tetap / Tidak Tetap)
        const tetap = prodiGroup.filter(d => d.status === 'Tetap' || d.status === 'Dosen Tetap').map(d => ({
            id: d.id,
            name: d.name,
            photo: d.photo ? `/storage/${d.photo.replace('storage/', '')}` : "/assets/img/dosen/default.png",
            position: d.status || 'Dosen Tetap',
            expertise: d.expertise ? d.expertise.split(',').map(e => e.trim()) : []
        }));

        const tidak_tetap = prodiGroup.filter(d => d.status === 'Tidak Tetap' || d.status === 'Dosen Tidak Tetap' || d.status === 'LB' || d.status === 'Dosen LB').map(d => ({
            id: d.id,
            name: d.name,
            photo: d.photo ? `/storage/${d.photo.replace('storage/', '')}` : "/assets/img/dosen/default.png",
            position: d.status || 'Dosen Tidak Tetap',
            expertise: d.expertise ? d.expertise.split(',').map(e => e.trim()) : []
        }));

        return {
            prodi: prodiName,
            tetap,
            tidak_tetap
        };
    });

    const sectionsConfig = [
        {
            type: 'hero_static',
            content: {
                title: 'Daftar Dosen Pengajar',
                subtitle: 'Tenaga pendidik profesional yang mendukung kegiatan akademik di STIKes Bogor Husada.',
                bgImage: '/assets/img/hero-fallback.png'
            }
        },
        {
            type: 'dosen_list',
            content: {
                title: "Dosen STIKes Bogor Husada",
                subtitle: "Tenaga pendidik profesional yang mendukung kegiatan akademik di STIKes Bogor Husada.",
                dosen: formattedDosen
            }
        }
    ];

    return (
        <MainLayout title="Direktori Dosen | STIKes Bogor Husada">
            <DynamicSectionsRenderer sections={sectionsConfig} />
        </MainLayout>
    );
}
