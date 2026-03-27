import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import DynamicSectionsRenderer from '@/Components/Sections/DynamicSectionsRenderer';

export default function SambutanKetua() {
    const dummySectionsConfig = [
        {
            type: 'hero_static',
            content: {
                title: 'Sambutan Ketua SBH',
                subtitle: 'Pesan selamat datang dan komitmen persembahan kami dari Ketua STIKes Bogor Husada.',
                bgImage: '/assets/img/hero-fallback.png'
            }
        },
        {
            type: 'content_with_image',
            content: {
                title: 'Bridging Technology for Humanity',
                image: '/assets/img/profil/ketua-sbh.jpg',
                align: 'left', // image right, text left
                imageAspectRatio: 'aspect-[890/2560]', // Exact resolution aspect ratio
                imagePosition: 'object-top', // Default focus to the top/face if any rounding occurs
                content: `
                    <p class="mb-4">Selamat datang di Website Sekolah Tinggi Ilmu Kesehatan (STIKes) Bogor Husada, saya dengan senang hati memperkenalkan kampus kami kepada Anda. Melalui website ini, kami bertujuan untuk memberikan informasi yang komprehensif mengenai aktivitas pengajaran, penelitian, pengabdian kepada masyarakat, inovasi, fasilitas kampus, dan kehidupan di lingkungan kampus kami.</p>

                    <p class="mb-4">STIKes Bogor Husada terletak di Bogor, sebuah kota yang nyaman dan kondusif untuk belajar di wilayah Jawa Barat. Kami adalah salah satu perguruan tinggi swasta yang berfokus pada pengembangan ilmu pengetahuan di bidang kesehatan, dengan tiga program studi utama, yaitu D3 Kebidanan, S1 Farmasi, dan S1 Gizi. Kami sangat bangga karena seluruh program studi kami telah mendapatkan akreditasi "Baik Sekali" dari Lembaga Akreditasi Mandiri Perguruan Tinggi Kesehatan (LAM-PTKes) Indonesia.</p>

                    <p class="mb-4">STIKes Bogor Husada didirikan pada tahun 2007 dan sebelumnya dikenal sebagai Akademi Kebidanan Bogor Husada. Sejak kolaborasi dengan RS Azra pada tahun 2009, kami telah mengalami perubahan menjadi STIKes Bogor Husada, memperluas cakupan dan kapasitas kami dalam memberikan pendidikan kesehatan yang berkualitas dan berorientasi pada praktik.</p>

                    <p class="mb-4">Komitmen kami adalah untuk menjadi lembaga pendidikan yang inovatif, dapat dipercaya, berorientasi pada kerja tim, dan profesional. Kami berupaya untuk menghasilkan lulusan yang tidak hanya memiliki kompetensi tinggi dalam bidang kesehatan, tetapi juga mampu menciptakan inovasi yang bermanfaat bagi masyarakat dan memberikan kontribusi positif dalam peningkatan kesejahteraan masyarakat secara nasional.</p>

                    <p class="mb-6">Slogan kami, <strong>"STIKes Bogor Husada: Bridging Technology for Humanity"</strong>, mencerminkan visi kami dalam menerapkan teknologi untuk meningkatkan kesehatan dan kesejahteraan manusia. Kami berkomitmen untuk terus berusaha menjadi lembaga yang unggul dalam pengembangan ilmu pengetahuan berbasis teknologi informasi di bidang kesehatan, serta menerapkan pengetahuan ini untuk kebaikan masyarakat.</p>

                    <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <p class="text-xl font-bold text-gray-900 dark:text-white mb-1">Lussy Citra Resmi M.Pd</p>
                        <p class="text-orange-600 font-semibold text-sm uppercase tracking-wide">Ketua STIKes Bogor Husada</p>
                    </div>
                `
            }
        }
    ];

    return (
        <MainLayout title="Sambutan Ketua | STIKes Bogor Husada">
            <DynamicSectionsRenderer sections={dummySectionsConfig} />
        </MainLayout>
    );
}
