import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import HeroStaticSection from '@/Components/Sections/HeroStaticSection';
import { Link } from '@inertiajs/react';

export default function Alumni({ alumnis }) {
    const alumniList = alumnis || [];

    const getImageUrl = (imagePath) => {
        return imagePath ? `/storage/${imagePath.replace('storage/', '')}` : '/assets/img/dosen/default.png';
    };

    return (
        <MainLayout title="Ikatan Alumni | STIKes Bogor Husada">
            <HeroStaticSection data={{
                title: 'Ikatan Alumni',
                subtitle: 'Kisah sukses lulusan STIKes Bogor Husada di dunia kerja profesional bidang kesehatan.',
                bgImage: '/assets/img/hero-fallback.png'
            }} />

            <section className="py-16 bg-white dark:bg-gray-900 min-h-[50vh]">
                <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">

                    {/* Alumni Highlights */}
                    <div className="mb-16">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Profil Alumni Inspiratif</h2>
                            <p className="text-gray-600 dark:text-gray-400">Jejak langkah nyata dari mereka yang telah berkontribusi bagi kesehatan masyarakat Indonesia.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {alumniList.length > 0 ? alumniList.map(alumni => (
                                <div key={alumni.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group">
                                    <div className="p-8 text-center flex flex-col h-full relative">
                                        <i className="fas fa-quote-left text-4xl text-gray-200 dark:text-gray-700 absolute top-6 left-6 -z-0"></i>
                                        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-md mb-6 relative z-10 border-4 border-white dark:border-gray-800">
                                            <img src={getImageUrl(alumni.photo)} alt={alumni.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform" />
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10 font-medium">"{alumni.quote || 'Ilmu yang saya dapatkan di STIKes Bogor Husada sangat relevan dan aplikatif.'}"</p>
                                        <div className="mt-auto relative z-10">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{alumni.name}</h3>
                                            <p className="text-orange-600 dark:text-orange-400 text-sm font-semibold mt-1">{alumni.current_job || 'Alumni'}</p>
                                            <p className="text-gray-500 text-xs mt-2">{alumni.program_studi || 'STIKes Bogor Husada'} - Angkatan {alumni.graduation_year}</p>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full text-center py-12 text-gray-500">
                                    Mendata profil alumni...
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Registrasi Banner */}
                    <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-10 md:p-16 text-center shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Bergabung dengan Jaringan Alumni Kami</h2>
                            <p className="text-indigo-100 mb-8 text-lg">Perbarui data diri Anda secara berkala agar tidak tertinggal info lowongan eksklusif, agenda tracer study, dan temu alumni akbar.</p>
                            <button onClick={() => alert('Integrasi Tracer Study belum aktif.')} className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all text-lg flex items-center justify-center mx-auto gap-3">
                                <i className="fas fa-user-plus"></i> Form Pendaftaran Alumni
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </MainLayout>
    );
}
