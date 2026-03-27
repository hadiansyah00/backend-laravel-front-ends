import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';

export default function StrukturOrganisasi() {
    const dummySectionsConfig = [
        {
            type: 'hero_static',
            content: {
                title: 'Struktur Organisasi',
                subtitle: 'Susunan kepengurusan dan pimpinan akademik STIKes Bogor Husada demi mewujudkan visi misi institusi yang profesional.',
                bgImage: '/assets/img/hero-fallback.png'
            }
        },
        {
            type: 'rich_text',
            content: {
                content: `
                    <div style="text-align: center;">
                        <img src="/assets/img/struktur/struktur-organisasi.png" alt="Bagan Struktur Organisasi STIKes Bogor Husada" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); display: inline-block;">
                    </div>
                `
            }
        },
        {
            type: 'feature',
            content: {
                title: 'Unsur Pimpinan Utama',
                features: [
                    {
                        title: "Ketua",
                        description: "Lussy Citra Resmi, M.Pd",
                        icon: "fas fa-user-tie"
                    },
                    {
                        title: "Wakil Ketua I",
                        description: "Bidang Akademik",
                        icon: "fas fa-chalkboard-teacher"
                    },
                    {
                        title: "Wakil Ketua II",
                        description: "Bidang Non-Akademik (Keuangan & SDM)",
                        icon: "fas fa-wallet"
                    },
                    {
                        title: "Wakil Ketua III",
                        description: "Kemahasiswaan & Kerjasama",
                        icon: "fas fa-users-cog"
                    }
                ]
            }
        }
    ];

    return (
        <MainLayout title="Struktur Organisasi | STIKes Bogor Husada">
            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}
