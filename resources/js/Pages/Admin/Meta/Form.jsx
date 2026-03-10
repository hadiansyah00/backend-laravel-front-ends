import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ model, meta, type }) {
    const { data, setData, post, processing, errors } = useForm({
        meta_description: meta?.meta_description || '',
        meta_keywords: meta?.meta_keywords || '',
        robots: meta?.robots || 'index, follow',
        canonical_url: meta?.canonical_url || '',
        og_title: meta?.og_title || '',
        og_description: meta?.og_description || '',
        og_url: meta?.og_url || '',
        og_type: meta?.og_type || 'website',
        og_site_name: meta?.og_site_name || 'STIKes Bogor Husada',
        twitter_card: meta?.twitter_card || 'summary_large_image',
        twitter_title: meta?.twitter_title || '',
        twitter_description: meta?.twitter_description || '',
        twitter_site: meta?.twitter_site || '@sbh',
        og_image: null,
        twitter_image: null,
        _method: 'PUT'
    });

    const [activeTab, setActiveTab] = useState('basic');

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.seo.update', { type, id: model.id }), {
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Pengaturan SEO - {model.title}</h2>}>
            <Head title={`SEO - ${model.title}`} />

            <div className="max-w-5xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Link href={route(`admin.${type}.index`)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    SEO Metadata
                                </h3>
                                <p className="text-sm text-gray-500 mt-0.5">Optimasi mesin pencari untuk: <span className="font-semibold">{model.title}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-800">
                        <nav className="flex -mb-px px-6">
                            <button
                                onClick={() => setActiveTab('basic')}
                                className={`whitespace-nowrap pb-4 px-4 pt-4 border-b-2 font-medium text-sm transition-colors ${activeTab === 'basic' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
                            >
                                <i className="fas fa-search mr-2"></i> Dasar (Google)
                            </button>
                            <button
                                onClick={() => setActiveTab('og')}
                                className={`whitespace-nowrap pb-4 px-4 pt-4 border-b-2 font-medium text-sm transition-colors ${activeTab === 'og' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
                            >
                                <i className="fab fa-facebook mr-2"></i> Open Graph (FB/WA)
                            </button>
                            <button
                                onClick={() => setActiveTab('twitter')}
                                className={`whitespace-nowrap pb-4 px-4 pt-4 border-b-2 font-medium text-sm transition-colors ${activeTab === 'twitter' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
                            >
                                <i className="fab fa-twitter mr-2"></i> Twitter Card
                            </button>
                        </nav>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        {activeTab === 'basic' && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Description <span className="text-gray-400 font-normal">(Rekomendasi: 150-160 karakter)</span></label>
                                    <textarea
                                        rows={3}
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.meta_description}
                                        onChange={e => setData('meta_description', e.target.value)}
                                        placeholder="Ringkasan singkat tentang halaman ini yang akan muncul di Google..."
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Keywords <span className="text-gray-400 font-normal">(Pisahkan dengan koma)</span></label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.meta_keywords}
                                        onChange={e => setData('meta_keywords', e.target.value)}
                                        placeholder="stikes, bogor husada, kesehatan..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Canonical URL</label>
                                    <input
                                        type="url"
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.canonical_url}
                                        onChange={e => setData('canonical_url', e.target.value)}
                                        placeholder="https://sbh.ac.id/halaman-ini"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Robots</label>
                                    <select
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.robots}
                                        onChange={e => setData('robots', e.target.value)}
                                    >
                                        <option value="index, follow">Index, Follow (Rekomendasi Default)</option>
                                        <option value="noindex, follow">No Index, Follow</option>
                                        <option value="index, nofollow">Index, No Follow</option>
                                        <option value="noindex, nofollow">No Index, No Follow</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {activeTab === 'og' && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OG Title</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.og_title}
                                        onChange={e => setData('og_title', e.target.value)}
                                        placeholder={`Default: ${model.title}`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OG Description</label>
                                    <textarea
                                        rows={2}
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.og_description}
                                        onChange={e => setData('og_description', e.target.value)}
                                        placeholder="Deskripsi yang tampil saat di-share ke sosmed..."
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OG Type</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={data.og_type}
                                            onChange={e => setData('og_type', e.target.value)}
                                            placeholder="website / article"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OG Site Name</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={data.og_site_name}
                                            onChange={e => setData('og_site_name', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OG Image</label>
                                    {meta?.og_image && (
                                        <div className="mb-3">
                                            <img src={`/storage/${meta.og_image}`} alt="OG" className="w-48 h-auto rounded-lg shadow-sm border border-gray-200" />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/40 dark:file:text-indigo-400"
                                        onChange={e => setData('og_image', e.target.files[0])}
                                    />
                                    {errors.og_image && <p className="mt-1 text-sm text-red-600">{errors.og_image}</p>}
                                </div>
                            </div>
                        )}

                        {activeTab === 'twitter' && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Twitter Card Type</label>
                                    <select
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.twitter_card}
                                        onChange={e => setData('twitter_card', e.target.value)}
                                    >
                                        <option value="summary_large_image">Summary Large Image</option>
                                        <option value="summary">Summary</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Twitter Title</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.twitter_title}
                                        onChange={e => setData('twitter_title', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Twitter Description</label>
                                    <textarea
                                        rows={2}
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.twitter_description}
                                        onChange={e => setData('twitter_description', e.target.value)}
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Twitter Image</label>
                                    {meta?.twitter_image && (
                                        <div className="mb-3">
                                            <img src={`/storage/${meta.twitter_image}`} alt="Twitter" className="w-48 h-auto rounded-lg shadow-sm border border-gray-200" />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/40 dark:file:text-indigo-400"
                                        onChange={e => setData('twitter_image', e.target.files[0])}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
                            <Link href={route(`admin.${type}.index`)} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
                            >
                                {processing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>}
                                Simpan SEO
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.3s ease-in-out; }
            `}</style>
        </AuthenticatedLayout>
    );
}
