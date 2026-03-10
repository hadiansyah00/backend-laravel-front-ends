import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import HeroStaticSection from '@/Components/Sections/HeroStaticSection';
import { Link } from '@inertiajs/react';

export default function Lowongan({ lowongans }) {
    const jobList = lowongans || [];

    const getImageUrl = (imagePath, fallbackName) => {
        if (imagePath) return `/storage/${imagePath.replace('storage/', '')}`;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=0D8ABC&color=fff`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <MainLayout title="Bursa Lowongan Kerja | STIKes Bogor Husada">
            <HeroStaticSection data={{
                title: 'Bursa Lowongan Kerja',
                subtitle: 'Peluang karir dari berbagai instansi kesehatan mitra khusus untuk alumni dan mahasiswa tingkat akhir.',
                bgImage: '/assets/img/hero-fallback.png'
            }} />

            <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-[50vh]">
                <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Sidebar Filters */}
                        <div className="w-full lg:w-1/4">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">Filter Pekerjaan</h3>

                                <div className="space-y-4 mb-6">
                                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">Tipe Kontrak</h4>
                                    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                                        <input type="checkbox" className="rounded text-orange-600 focus:ring-orange-500" /> Full-Time
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                                        <input type="checkbox" className="rounded text-orange-600 focus:ring-orange-500" /> Part-Time
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                                        <input type="checkbox" className="rounded text-orange-600 focus:ring-orange-500" /> Contract
                                    </label>
                                </div>

                                <button onClick={() => alert('Filter pekerjaan belum berfungsi saat ini.')} className="w-full bg-orange-100 hover:bg-orange-200 text-orange-700 font-semibold py-2.5 rounded-lg transition-colors text-sm">
                                    Terapkan Filter
                                </button>
                            </div>
                        </div>

                        {/* Job Lists */}
                        <div className="w-full lg:w-3/4 space-y-6">
                            {jobList.length > 0 ? jobList.map(job => (
                                <div key={job.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-16 h-16 rounded-xl flex-shrink-0 bg-gray-50 flex items-center justify-center p-2 border border-gray-100 dark:border-gray-700">
                                        <img src={getImageUrl(job.thumbnail, job.company)} alt={job.company} className="rounded-lg w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-orange-600 cursor-pointer transition-colors">{job.title}</h3>
                                            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">{job.type || 'Pekerjaan'}</span>
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3 flex flex-wrap items-center gap-4">
                                            <span className="flex items-center gap-1.5"><i className="far fa-building"></i> {job.company}</span>
                                            <span className="flex items-center gap-1.5"><i className="fas fa-map-marker-alt"></i> {job.location}</span>
                                        </div>
                                        {job.description && (
                                            <div
                                                className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 prose prose-sm dark:prose-invert max-w-none"
                                                dangerouslySetInnerHTML={{ __html: job.description }}
                                            />
                                        )}
                                    </div>
                                    <div className="flex flex-col items-center md:items-end flex-shrink-0 w-full md:w-auto h-full justify-between gap-4 border-t md:border-t-0 border-gray-100 dark:border-gray-700 pt-4 md:pt-0">
                                        <span className="text-xs font-semibold px-3 py-1 bg-red-50 text-red-600 rounded-md whitespace-nowrap"><i className="far fa-clock mr-1"></i> Tutup: {formatDate(job.deadline)}</span>
                                        {job.link ? (
                                            <a href={job.link} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto px-6 py-2.5 bg-gray-900 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors text-sm text-center">
                                                Lihat Detail / Lamar
                                            </a>
                                        ) : (
                                            <button onClick={() => alert('Link pendaftaran belum tersedia.')} className="w-full md:w-auto px-6 py-2.5 bg-gray-200 text-gray-500 font-semibold rounded-lg cursor-not-allowed transition-colors text-sm">
                                                Instansi Internal
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-20 text-gray-500 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                                    <i className="fas fa-briefcase text-4xl mb-4 text-gray-300 dark:text-gray-600"></i>
                                    <p>Saat ini belum ada lowongan pekerjaan yang tersedia.</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
