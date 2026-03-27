import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';
// Note: We might want a dedicated Footer component later, but currently it's in a Blade layout or not yet converted.
// Assuming we'll wrap it in a frontend Layout later, for now we compose manually.

export default function ProfilStikes() {
    // ⬇️ DUMMY JSON CONFIGURATION for "Profil STIKes" ⬇️
    const dummySectionsConfig = [
        {
            type: 'hero_static',
            content: {
                title: 'Profil STIKes Bogor Husada',
                subtitle: 'Mengenal lebih dekat institusi pencetak tenaga medis unggul dan profesional.',
                bgImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
            }
        },
        {
            type: 'content_with_image',
            content: {
                title: 'Tentang Kami',
                content: 'STIKES Bogor Husada merupakan institusi pendidikan tinggi kesehatan yang berdedikasi untuk mencetak tenaga kesehatan profesional, berkarakter, dan siap bersaing di tingkat nasional maupun global. Dengan lingkungan kampus yang kondusif, fasilitas modern, serta dukungan tenaga pengajar berpengalaman, kami berkomitmen memberikan pendidikan terbaik untuk menghasilkan lulusan yang unggul, inovatif, dan berintegritas tinggi.',
                image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                align: 'left'
            }
        },
        {
            type: 'visi_misi',
            content: {
                visi: 'Menjadi Penyelenggara Pendidikan Tinggi Kesehatan yang Menghasilkan Lulusan Tenaga Kesehatan yang Profesional, Berkarakter dan Berwawasan Global tahun 2040',
                misi: [
                    'Menyelenggarakan pendidikan tinggi kesehatan untuk menghasilkan lulusan tenaga kesehatan yang kompeten, profesional, berkarakter dan berwawasan global.',
                    'Menyelenggarakan penelitian di bidang kesehatan serta meningkatkan produktivitas publikasi dan HAKI.',
                    'Menyelenggarakan pengabdian kepada masyarakat di bidang kesehatan yang dapat meningkatkan taraf kesehatan di masyarakat.',
                    'Menyelenggarakan tatakelola lembaga yang sehat dengan mengoptimalkan kerjasama dan pemanfaatan teknologi yang tepat.'
                ],
                tujuan: [] // Intentionally left empty if not provided, or will use fallback/hide in component
            }
        },
        {
            type: 'feature',
            content: {
                title: 'Mengapa STIKes Bogor Husada?',
                features: [
                    { title: 'Kurikulum Terstandar', description: 'Kurikulum selalu diperbaharui mengikuti standar Kemenkes RI dan Asosiasi Profesi terkait.', icon: 'fas fa-book-medical' },
                    { title: 'Fasilitas Lab Lengkap', description: 'Laboratorium modern yang dirancang menyerupai simulasi rumah sakit sesungguhnya.', icon: 'fas fa-microscope' },
                    { title: 'Dosen Berpengalaman', description: 'Tenaga pengajar terdiri dari akademisi dan praktisi kesehatan berpengalaman (Perawat, Apoteker, Bidan).', icon: 'fas fa-user-md' },
                    { title: 'Kemitraan Luas', description: 'Bekerjasama dengan RSUD dan RS Swasta terkemuka di Jabodetabek untuk praktek magang.', icon: 'fas fa-handshake' }
                ]
            }
        }
    ];

    return (
        <MainLayout title="Profil STIKes">
            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}
