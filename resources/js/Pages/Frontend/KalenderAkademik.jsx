import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';

export default function KalenderAkademik() {
    const dummySectionsConfig = [
        {
            type: 'hero_static',
            content: {
                title: 'Kalender Akademik',
                subtitle: 'Jadwal kegiatan akademik tahun pembelajaran 2025 - 2026 STIKes Bogor Husada.',
                bgImage: '/assets/img/hero-fallback.png'
            }
        },
        {
            type: 'table',
            content: {
                title: 'Semester Ganjil',
                subtitle: 'Tahun Akademik 2025 - 2026',
                headers: ['Kegiatan', 'Mulai', 'Selesai', 'Keterangan'],
                rows: [
                    ['PPSM dan LDKM Mahasiswa Baru Angkatan 2025', '8 September 2025', '16 September 2025', '7 Hari'],
                    ['Perwalian', '8 September 2025', '19 September 2025', '10 Hari'],
                    ['Perkuliahan', '22 September 2025', '7 November 2025', '7 Minggu'],
                    ['Perkuliahan Pengganti', '10 November 2025', '14 November 2025', '5 Hari'],
                    ['Hari Tenang*', '17 November 2025', '18 November 2025', '2 Hari'],
                    ['Ujian Tengah Semester (UTS)', '19 November 2025', '25 November 2025', '5 Hari'],
                    ['Remedial UTS', '26 November 2025', '2 Desember 2025', '5 Hari'],
                    ['Perkuliahan', '26 November 2025', '24 Desember 2025', '5 Minggu'],
                    ['Libur Natal 2025 dan Tahun Baru 2026', '25 Desember 2025', '1 Januari 2026', '5 Hari'],
                    ['Perkuliahan', '2 Januari 2026', '16 Januari 2026', '2 Minggu'],
                    ['Perkuliahan Pengganti', '19 Januari 2026', '23 Januari 2026', '5 Hari'],
                    ['Hari Tenang*', '26 Januari 2026', '27 Januari 2026', '2 Hari'],
                    ['Ujian Akhir Semester (UAS) Tulis dan Praktek', '28 Januari 2026', '10 Februari 2026', '10 Hari'],
                    ['Remedial UAS Tulis dan Praktek**', '4 Februari 2026', '17 Februari 2026', '10 Hari'],
                    ['Pengolahan Nilai Akhir Semester Ganjil', '4 Februari 2026', '20 Februari 2026', '13 Hari'],
                    ['Semester Genap 25 - 26', '2 Maret 2026', '2 Maret 2026', '-']
                ],
                notes: [
                    'Yudisium I T.A 2024 - 2025 : <b>18 September 2025</b>',
                    'Yudisium II T.A 2024 - 2025 : <b>10 Oktober 2025</b>',
                    'Wisuda T.A 2024 - 2025 : <b>10/11 November 2025</b>',
                    'PKMD DIII Kebidanan : <b>Januari/Februari 2026</b>'
                ]
            }
        },
        {
            type: 'table',
            content: {
                title: 'Semester Genap',
                subtitle: 'Tahun Akademik 2025 - 2026',
                headers: ['Kegiatan', 'Mulai', 'Selesai', 'Keterangan'],
                rows: [
                    ['Perkuliahan', '2 Maret 2026', '13 Maret 2026', '2 Minggu'],
                    ['Libur Lebaran 1447 H', '16 Maret 2026', '27 Maret 2026', '10 Hari'],
                    ['Perkuliahan', '30 Maret 2026', '1 Mei 2026', '5 Minggu'],
                    ['Perkuliahan Pengganti', '4 Mei 2026', '8 Mei 2026', '5 Hari'],
                    ['Hari Tenang*', '11 Mei 2026', '12 Mei 2026', '2 Hari'],
                    ['Ujian Tengah Semester (UTS)', '13 Mei 2026', '20 Mei 2026', '5 Hari'],
                    ['Kunjungan Industri', '21 Mei 2026', '22 Mei 2026', '2 Hari'],
                    ['Remedial UTS', '21 Mei 2026', '27 Mei 2026', '5 Hari'],
                    ['Perkuliahan', '21 Mei 2026', '3 Juli 2026', '7 Minggu'],
                    ['Perkuliahan Pengganti', '6 Juli 2026', '10 Juli 2026', '5 Hari'],
                    ['Hari Tenang*', '13 Juli 2026', '14 Juli 2026', '2 Hari'],
                    ['Ujian Akhir Semester (UAS) Tulis dan Praktek', '15 Juli 2026', '28 Juli 2026', '10 Hari'],
                    ['Remedial UAS Tulis dan Praktek**', '22 Juli 2026', '4 Agustus 2026', '10 Hari'],
                    ['Pengolahan Nilai Akhir Semester Genap', '22 Juli 2026', '7 Agustus 2026', '13 Hari'],
                    ['Dies Natalis Ke 7 SBH', '29 Juli 2026', '30 Juli 2026', '2 Hari'],
                    ['Semester Pendek', '3 Agustus 2026', '18 September 2026', '7 Minggu'],
                    ['Semester Ganjil 26 - 27', '21 September 2026', '21 September 2026', '-']
                ]
            }
        }
    ];

    return (
        <MainLayout title="Kalender Akademik | STIKes Bogor Husada">
            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}
