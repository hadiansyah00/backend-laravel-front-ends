import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';

export default function PengumumanDetail({ pengumuman, recentPengumumans }) {
    // Formatting Helper
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const fileUrl = pengumuman?.attachment ? `/${pengumuman.attachment}` : null;
    const fileName = pengumuman?.attachment ? pengumuman.attachment.split('/').pop() : '';

    return (
        <MainLayout title={pengumuman ? `${pengumuman.title} | STIKes Bogor Husada` : 'Pengumuman Tidak Ditemukan'}>
            {pengumuman ? (
                <>
                    <section className="pt-32 pb-16 bg-blue-50 dark:bg-gray-900 border-b border-blue-100 dark:border-gray-800">
                        <div className="container px-4 mx-auto max-w-4xl text-center">
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-bold shadow-sm">
                                <i className="fas fa-bullhorn relative -top-0.5"></i> Pengumuman
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-950 dark:text-white leading-snug mb-6">
                                {pengumuman.title}
                            </h1>
                            <div className="flex justify-center flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                                <span><i className="far fa-calendar-alt text-blue-600 mr-2"></i> Dipublikasikan: {formatDate(pengumuman.created_at)}</span>
                                <span><i className="far fa-building text-blue-600 mr-2"></i> Oleh: Admin Kampus</span>
                            </div>
                        </div>
                    </section>

                    <section className="py-16 bg-white dark:bg-gray-950 min-h-[50vh]">
                        <div className="container px-4 mx-auto max-w-4xl">
                            <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 -mt-10 relative z-10">

                                {/* Teks Konten */}
                                {pengumuman.content && (
                                    <div
                                        className="prose prose-lg dark:prose-invert prose-blue max-w-none text-gray-700 dark:text-gray-300 font-medium leading-relaxed mb-10"
                                        dangerouslySetInnerHTML={{ __html: pengumuman.content }}
                                    />
                                )}

                                {/* Lampiran */}
                                {fileUrl && (
                                    <div className="mt-10 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4 truncate">
                                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                                                <i className="fas fa-file-download"></i>
                                            </div>
                                            <div className="truncate">
                                                <h4 className="font-bold text-gray-900 dark:text-white truncate" title={fileName}>{fileName}</h4>
                                                <p className="text-sm text-gray-500">Dokumen Lampiran</p>
                                            </div>
                                        </div>
                                        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors whitespace-nowrap shadow-md flex items-center justify-center">
                                            <i className="fas fa-download mr-2"></i> Unduh Lampiran
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 text-center flex justify-between items-center bg-gray-50 border border-gray-100 rounded-2xl p-6 dark:bg-gray-900 dark:border-gray-800">
                                <Link href="/pengumuman" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold transition-colors">
                                    <i className="fas fa-arrow-left"></i> Kembali
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Recent Pengumumans */}
                    {recentPengumumans && recentPengumumans.length > 0 && (
                        <section className="py-12 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                            <div className="container px-4 mx-auto max-w-4xl">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pengumuman Lainnya</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {recentPengumumans.map((post) => (
                                        <Link href={`/pengumuman/${post.slug}`} key={post.id} className="group bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                <i className="fas fa-bullhorn relative -top-0.5"></i>
                                            </div>
                                            <div>
                                                <p className="text-xs text-blue-600 font-semibold mb-1">{formatDate(post.created_at)}</p>
                                                <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 line-clamp-2 transition-colors">{post.title}</h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </>
            ) : (
                <section className="py-32 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Pengumuman tidak ditemukan</h2>
                    <Link href="/pengumuman" className="mt-4 inline-block text-blue-600 hover:underline">Kembali ke Papan Pengumuman</Link>
                </section>
            )}
        </MainLayout>
    );
}
