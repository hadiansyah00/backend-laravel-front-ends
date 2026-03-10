import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function Index({ settings }) {
    // Helper to get setting value safely
    const getSetting = (key, defaultVal = '') => {
        return settings[key]?.value || defaultVal;
    };

    const { data, setData, post, processing, errors } = useForm({
        site_name: getSetting('site_name', 'STIKes Bogor Husada'),
        site_description: getSetting('site_description', ''),
        contact_email: getSetting('contact_email', ''),
        contact_phone: getSetting('contact_phone', ''),
        contact_address: getSetting('contact_address', ''),
        social_facebook: getSetting('social_facebook', ''),
        social_instagram: getSetting('social_instagram', ''),
        social_youtube: getSetting('social_youtube', ''),
        social_twitter: getSetting('social_twitter', ''),
        social_tiktok: getSetting('social_tiktok', ''),
        google_analytics_id: getSetting('google_analytics_id', ''),

        // File inputs mapped to null initially (only sent if changed)
        site_logo: null,
        site_favicon: null,
        og_default_image: null,
    });

    const [activeTab, setActiveTab] = useState('branding');

    const handleSubmit = (e) => {
        e.preventDefault();

        // FrontSettingController@update expects a POST with file uploads (so we use POST intentionally)
        post(route('admin.settings.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Pengaturan Global berhasil disimpan!');
            },
            onError: () => {
                toast.error('Gagal menyimpan pengaturan. Silakan periksa form.');
            }
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Pengaturan Front & SEO Global</h2>}>
            <Head title="Pengaturan Global" />

            <div className="max-w-7xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Konfigurasi Website Utama
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Atur identitas utama, kontak footer, dan metadata SEO dasar untuk seluruh halaman.</p>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-800 flex overflow-x-auto hide-scrollbar">
                        <nav className="flex -mb-px px-6 min-w-max">
                            <button
                                onClick={() => setActiveTab('branding')}
                                className={`whitespace-nowrap pb-4 px-4 pt-4 border-b-2 font-medium text-sm transition-colors ${activeTab === 'branding' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
                            >
                                <i className="fas fa-paint-brush mr-2"></i> Branding & Logo
                            </button>
                            <button
                                onClick={() => setActiveTab('contact')}
                                className={`whitespace-nowrap pb-4 px-4 pt-4 border-b-2 font-medium text-sm transition-colors ${activeTab === 'contact' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
                            >
                                <i className="fas fa-address-book mr-2"></i> Info Kontak & Footer
                            </button>
                            <button
                                onClick={() => setActiveTab('social')}
                                className={`whitespace-nowrap pb-4 px-4 pt-4 border-b-2 font-medium text-sm transition-colors ${activeTab === 'social' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
                            >
                                <i className="fab fa-instagram mr-2"></i> Media Sosial
                            </button>
                            <button
                                onClick={() => setActiveTab('seo')}
                                className={`whitespace-nowrap pb-4 px-4 pt-4 border-b-2 font-medium text-sm transition-colors ${activeTab === 'seo' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
                            >
                                <i className="fas fa-search mr-2"></i> Global SEO & Analytics
                            </button>
                        </nav>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">

                        {/* Tab 1: Branding */}
                        {activeTab === 'branding' && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Situs / Institusi</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.site_name}
                                        onChange={e => setData('site_name', e.target.value)}
                                        placeholder="STIKes Bogor Husada"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Logo Utama</label>
                                    <div className="flex items-center gap-6">
                                        {getSetting('site_logo') && (
                                            <div className="w-32 h-16 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center p-2">
                                                <img src={`/storage/${getSetting('site_logo')}`} alt="Logo" className="max-h-full max-w-full object-contain" />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/40 dark:file:text-indigo-400"
                                            onChange={e => setData('site_logo', e.target.files[0])}
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">Gunakan format PNG transparan untuk hasil terbaik (resolusi rekomendasi: minimal 300x100px).</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Favicon (Ikon Tab)</label>
                                    <div className="flex items-center gap-6">
                                        {getSetting('site_favicon') && (
                                            <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center p-2">
                                                <img src={`/storage/${getSetting('site_favicon')}`} alt="Favicon" className="max-h-full max-w-full object-contain" />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/png, image/x-icon"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/40 dark:file:text-indigo-400"
                                            onChange={e => setData('site_favicon', e.target.files[0])}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 2: Contact Info */}
                        {activeTab === 'contact' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Resmi</label>
                                        <input
                                            type="email"
                                            className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={data.contact_email}
                                            onChange={e => setData('contact_email', e.target.value)}
                                            placeholder="info@sbh.ac.id"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor Telepon / WhatsApp</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={data.contact_phone}
                                            onChange={e => setData('contact_phone', e.target.value)}
                                            placeholder="+62 811 2233 4455"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat Lengkap (Tampil di Footer & Kontak)</label>
                                    <textarea
                                        rows={3}
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.contact_address}
                                        onChange={e => setData('contact_address', e.target.value)}
                                        placeholder="Jl. Sholeh Iskandar No.4, Kedungbadak..."
                                    ></textarea>
                                </div>
                            </div>
                        )}

                        {/* Tab 3: Social Media */}
                        {activeTab === 'social' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><i className="fab fa-instagram text-pink-500 mr-2"></i>Link Instagram</label>
                                        <input
                                            type="url"
                                            className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={data.social_instagram}
                                            onChange={e => setData('social_instagram', e.target.value)}
                                            placeholder="https://instagram.com/stikesbogorhusada"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><i className="fab fa-youtube text-red-500 mr-2"></i>Link YouTube</label>
                                        <input
                                            type="url"
                                            className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={data.social_youtube}
                                            onChange={e => setData('social_youtube', e.target.value)}
                                            placeholder="https://youtube.com/@stikesbogorhusada"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><i className="fab fa-facebook text-blue-600 mr-2"></i>Link Facebook</label>
                                        <input
                                            type="url"
                                            className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={data.social_facebook}
                                            onChange={e => setData('social_facebook', e.target.value)}
                                            placeholder="https://facebook.com/..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><i className="fab fa-tiktok text-gray-900 dark:text-white mr-2"></i>Link TikTok</label>
                                        <input
                                            type="url"
                                            className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={data.social_tiktok}
                                            onChange={e => setData('social_tiktok', e.target.value)}
                                            placeholder="https://tiktok.com/@..."
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 4: Global SEO & Analytics */}
                        {activeTab === 'seo' && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Global Meta Description (Fallback)</label>
                                    <textarea
                                        rows={3}
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.site_description}
                                        onChange={e => setData('site_description', e.target.value)}
                                        placeholder="Deskripsi global yang akan digunakan jika halaman tidak memiliki meta deskripsi spesifik."
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default Open Graph Image (FB/WA/Twitter)</label>
                                    <div className="flex items-center gap-6">
                                        {getSetting('og_default_image') && (
                                            <div className="w-48 h-auto bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center p-2">
                                                <img src={`/storage/${getSetting('og_default_image')}`} alt="OG Default" className="max-h-full max-w-full rounded" />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/40 dark:file:text-indigo-400"
                                            onChange={e => setData('og_default_image', e.target.files[0])}
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">Gambar yang akan ditampilkan saat link website di-share di sosial media jika halaman tersebut tidak mempunyai thumbnail khusus.</p>
                                </div>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Google Analytics ID (Opsional)</label>
                                    <input
                                        type="text"
                                        className="w-full md:w-1/2 rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono"
                                        value={data.google_analytics_id}
                                        onChange={e => setData('google_analytics_id', e.target.value)}
                                        placeholder="G-XXXXXXXXXX"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Masukkan Measurement ID Google Analytics 4 Anda untuk melacak pengunjung.</p>
                                </div>
                            </div>
                        )}

                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 rounded-b-2xl bg-gray-50/50 dark:bg-gray-800/30 -mx-6 -mb-6 px-6 py-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-8 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
                            >
                                {processing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>}
                                Simpan Pengaturan
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.3s ease-in-out; }
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </AuthenticatedLayout>
    );
}
