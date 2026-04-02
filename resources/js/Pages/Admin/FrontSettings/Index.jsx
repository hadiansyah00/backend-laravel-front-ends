import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function Index({ settings }) {
    // Helper to get setting value safely
    const getSetting = (key, defaultVal = '') => {
        return settings[key]?.value || defaultVal;
    };

    // Parse JSON settings safely
    const parseJsonSetting = (key, defaultVal = []) => {
        try {
            const val = settings[key]?.value;
            if (!val) return defaultVal;
            return typeof val === 'string' ? JSON.parse(val) : val;
        } catch {
            return defaultVal;
        }
    };

    // Initialize footer links from DB
    const [footerLinks, setFooterLinks] = useState(() => {
        const parsed = parseJsonSetting('footer_links', []);
        if (parsed.length === 0) {
            return [{ title: 'Menu', links: [{ text: '', url: '' }] }];
        }
        return parsed;
    });

    // Initialize social links from DB
    const [socialLinks, setSocialLinks] = useState(() => {
        const parsed = parseJsonSetting('social_links', []);
        if (parsed.length === 0) {
            return [{ name: '', url: '', icon: 'fab fa-facebook' }];
        }
        return parsed;
    });

    const { data, setData, post, processing } = useForm({
        // ======== Branding ========
        site_name: getSetting('site_name', 'STIKes Bogor Husada'),
        // File inputs
        logo_main: null,
        logo_sticky: null,
        site_logo: null,
        site_favicon: null,

        // ======== Contact ========
        contact_email: getSetting('contact_email', ''),
        contact_email_link: getSetting('contact_email_link', ''),
        contact_phone: getSetting('contact_phone', ''),
        contact_phone_link: getSetting('contact_phone_link', ''),
        contact_address: getSetting('contact_address', ''),
        copyright_text: getSetting('copyright_text', `© ${new Date().getFullYear()} STIKes Bogor Husada. All rights reserved.`),

        // ======== SEO Global ========
        meta_title: getSetting('meta_title', 'STIKes Bogor Husada'),
        meta_description: getSetting('meta_description', ''),
        meta_keywords: getSetting('meta_keywords', ''),
        og_title: getSetting('og_title', ''),
        og_description: getSetting('og_description', ''),
        og_default_image: null, // file upload → stored as og_image
        twitter_card: getSetting('twitter_card', 'summary_large_image'),
        google_analytics: getSetting('google_analytics', ''),
        google_analytics_id: getSetting('google_analytics_id', ''),

        // ======== Social Media (individual) ========
        social_facebook: getSetting('social_facebook', ''),
        social_instagram: getSetting('social_instagram', ''),
        social_youtube: getSetting('social_youtube', ''),
        social_twitter: getSetting('social_twitter', ''),
        social_tiktok: getSetting('social_tiktok', ''),

        // ======== JSON fields (stringified on submit) ========
        footer_links: '',
        social_links: '',
    });

    const [activeTab, setActiveTab] = useState('branding');

    // =================== Footer Links Handlers ===================
    const addFooterGroup = () => {
        setFooterLinks([...footerLinks, { title: '', links: [{ text: '', url: '' }] }]);
    };
    const removeFooterGroup = (groupIdx) => {
        setFooterLinks(footerLinks.filter((_, i) => i !== groupIdx));
    };
    const updateFooterGroupTitle = (groupIdx, title) => {
        const updated = [...footerLinks];
        updated[groupIdx].title = title;
        setFooterLinks(updated);
    };
    const addFooterLink = (groupIdx) => {
        const updated = [...footerLinks];
        updated[groupIdx].links.push({ text: '', url: '' });
        setFooterLinks(updated);
    };
    const removeFooterLink = (groupIdx, linkIdx) => {
        const updated = [...footerLinks];
        updated[groupIdx].links = updated[groupIdx].links.filter((_, i) => i !== linkIdx);
        setFooterLinks(updated);
    };
    const updateFooterLink = (groupIdx, linkIdx, field, value) => {
        const updated = [...footerLinks];
        updated[groupIdx].links[linkIdx][field] = value;
        setFooterLinks(updated);
    };

    // =================== Social Links Handlers ===================
    const socialIconOptions = [
        { value: 'fab fa-facebook', label: 'Facebook', color: 'text-blue-600' },
        { value: 'fab fa-facebook-f', label: 'Facebook (alt)', color: 'text-blue-600' },
        { value: 'fab fa-instagram', label: 'Instagram', color: 'text-pink-500' },
        { value: 'fab fa-youtube', label: 'YouTube', color: 'text-red-500' },
        { value: 'fab fa-twitter', label: 'Twitter / X', color: 'text-sky-500' },
        { value: 'fab fa-tiktok', label: 'TikTok', color: 'text-gray-900 dark:text-white' },
        { value: 'fab fa-linkedin', label: 'LinkedIn', color: 'text-blue-700' },
        { value: 'fab fa-whatsapp', label: 'WhatsApp', color: 'text-green-500' },
        { value: 'fab fa-telegram', label: 'Telegram', color: 'text-sky-400' },
    ];
    const addSocialLink = () => {
        setSocialLinks([...socialLinks, { name: '', url: '', icon: 'fab fa-facebook' }]);
    };
    const removeSocialLink = (idx) => {
        setSocialLinks(socialLinks.filter((_, i) => i !== idx));
    };
    const updateSocialLink = (idx, field, value) => {
        const updated = [...socialLinks];
        updated[idx][field] = value;
        if (field === 'icon') {
            const found = socialIconOptions.find(o => o.value === value);
            if (found) updated[idx].name = found.label;
        }
        setSocialLinks(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Stringify JSON fields before sending
        data.footer_links = JSON.stringify(footerLinks);
        data.social_links = JSON.stringify(socialLinks);

        post(route('admin.settings.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Pengaturan berhasil disimpan!');
            },
            onError: () => {
                toast.error('Gagal menyimpan. Silakan periksa form.');
            }
        });
    };

    // Common input class
    const inputClass = "w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors";

    // Image preview helper
    const ImagePreview = ({ settingKey, label, height = 'h-16', width = 'w-32' }) => {
        const val = getSetting(settingKey);
        if (!val) return null;
        return (
            <div className={`${width} ${height} bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center p-2`}>
                <img src={`/storage/${val}`} alt={label} className="max-h-full max-w-full object-contain" />
            </div>
        );
    };

    const tabs = [
        { id: 'branding', label: 'Branding & Logo', icon: 'fas fa-paint-brush' },
        { id: 'contact', label: 'Info Kontak', icon: 'fas fa-address-book' },
        { id: 'footer', label: 'Footer Links', icon: 'fas fa-link' },
        { id: 'social', label: 'Media Sosial', icon: 'fab fa-instagram' },
        { id: 'seo', label: 'SEO & Meta Tags', icon: 'fas fa-search' },
        { id: 'analytics', label: 'Analytics & Script', icon: 'fas fa-chart-line' },
    ];

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Pengaturan Front & SEO Global</h2>}>
            <Head title="Pengaturan Global" />

            <div className="max-w-7xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Konfigurasi Website Utama
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Atur identitas, kontak, navigasi footer, metadata SEO, Open Graph, dan social media links untuk seluruh halaman.</p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 dark:border-gray-800 flex overflow-x-auto hide-scrollbar">
                        <nav className="flex -mb-px px-6 min-w-max">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`whitespace-nowrap pb-4 px-4 pt-4 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
                                >
                                    <i className={`${tab.icon} mr-2`}></i> {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">

                        {/* =================== Tab 1: Branding =================== */}
                        {activeTab === 'branding' && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Situs / Institusi</label>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        value={data.site_name}
                                        onChange={e => setData('site_name', e.target.value)}
                                        placeholder="STIKes Bogor Husada"
                                    />
                                </div>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                {/* Logo Main */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        <i className="fas fa-image text-indigo-500 mr-1.5"></i>Logo Utama (Navbar saat di atas)
                                    </label>
                                    <div className="flex items-center gap-6">
                                        <ImagePreview settingKey="logo_main" label="Logo Main" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/40 dark:file:text-indigo-400"
                                            onChange={e => setData('logo_main', e.target.files[0])}
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">Logo yang muncul di Navbar saat halaman masih di paling atas (belum scroll). Rekomendasi PNG transparan.</p>
                                </div>

                                {/* Logo Sticky */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        <i className="fas fa-thumbtack text-orange-500 mr-1.5"></i>Logo Sticky (Navbar saat scroll)
                                    </label>
                                    <div className="flex items-center gap-6">
                                        <ImagePreview settingKey="logo_sticky" label="Logo Sticky" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 dark:file:bg-orange-900/40 dark:file:text-orange-400"
                                            onChange={e => setData('logo_sticky', e.target.files[0])}
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">Logo yang muncul setelah user scroll ke bawah (biasanya lebih kecil/compact).</p>
                                </div>

                                {/* site_logo (general logo) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        <i className="fas fa-building text-green-500 mr-1.5"></i>Logo Umum (Footer & Lainnya)
                                    </label>
                                    <div className="flex items-center gap-6">
                                        <ImagePreview settingKey="site_logo" label="Logo Site" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-green-900/40 dark:file:text-green-400"
                                            onChange={e => setData('site_logo', e.target.files[0])}
                                        />
                                    </div>
                                </div>

                                {/* Favicon */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        <i className="fas fa-globe text-blue-500 mr-1.5"></i>Favicon (Ikon Tab Browser)
                                    </label>
                                    <div className="flex items-center gap-6">
                                        <ImagePreview settingKey="site_favicon" label="Favicon" width="w-12" height="h-12" />
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

                        {/* =================== Tab 2: Contact Info =================== */}
                        {activeTab === 'contact' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            <i className="fas fa-envelope text-indigo-500 mr-1.5"></i>Email Resmi (Tampil)
                                        </label>
                                        <input
                                            type="email"
                                            className={inputClass}
                                            value={data.contact_email}
                                            onChange={e => setData('contact_email', e.target.value)}
                                            placeholder="info@sbh.ac.id"
                                        />
                                        <p className="mt-1 text-xs text-gray-400">Teks email yang ditampilkan di footer & kontak.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            <i className="fas fa-at text-indigo-500 mr-1.5"></i>Email Link (href mailto:)
                                        </label>
                                        <input
                                            type="text"
                                            className={inputClass}
                                            value={data.contact_email_link}
                                            onChange={e => setData('contact_email_link', e.target.value)}
                                            placeholder="mailto:info@sbh.ac.id"
                                        />
                                        <p className="mt-1 text-xs text-gray-400">Format: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">mailto:email@domain.com</code></p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            <i className="fas fa-phone text-green-500 mr-1.5"></i>Nomor Telepon (Tampil)
                                        </label>
                                        <input
                                            type="text"
                                            className={inputClass}
                                            value={data.contact_phone}
                                            onChange={e => setData('contact_phone', e.target.value)}
                                            placeholder="+62 251 8312xxx"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            <i className="fas fa-phone-alt text-green-500 mr-1.5"></i>Nomor Telepon Link (href tel:)
                                        </label>
                                        <input
                                            type="text"
                                            className={inputClass}
                                            value={data.contact_phone_link}
                                            onChange={e => setData('contact_phone_link', e.target.value)}
                                            placeholder="+622518312xxx"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        <i className="fas fa-map-marker-alt text-red-500 mr-1.5"></i>Alamat Lengkap
                                    </label>
                                    <textarea
                                        rows={3}
                                        className={inputClass}
                                        value={data.contact_address}
                                        onChange={e => setData('contact_address', e.target.value)}
                                        placeholder="Jl. Indragiri No. 4, Babakan, Bogor Tim., Kota Bogor, Jawa Barat 16128"
                                    ></textarea>
                                </div>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        <i className="far fa-copyright text-gray-500 mr-1.5"></i>Teks Copyright Footer
                                    </label>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        value={data.copyright_text}
                                        onChange={e => setData('copyright_text', e.target.value)}
                                        placeholder={`© ${new Date().getFullYear()} STIKes Bogor Husada. All rights reserved.`}
                                    />
                                </div>
                            </div>
                        )}

                        {/* =================== Tab 3: Footer Links =================== */}
                        {activeTab === 'footer' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">Navigasi Footer</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">Kelola grup link yang akan ditampilkan di footer website.</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addFooterGroup}
                                        className="px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors flex items-center gap-1.5"
                                    >
                                        <i className="fas fa-plus"></i> Tambah Grup
                                    </button>
                                </div>

                                {footerLinks.map((group, groupIdx) => (
                                    <div key={groupIdx} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-5 space-y-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Judul Grup #{groupIdx + 1}</label>
                                                <input
                                                    type="text"
                                                    className={inputClass}
                                                    value={group.title}
                                                    onChange={e => updateFooterGroupTitle(groupIdx, e.target.value)}
                                                    placeholder="Contoh: Tentang Kami"
                                                />
                                            </div>
                                            {footerLinks.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeFooterGroup(groupIdx)}
                                                    className="mt-5 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    title="Hapus grup ini"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            )}
                                        </div>

                                        <div className="space-y-2 pl-4 border-l-2 border-indigo-200 dark:border-indigo-800">
                                            {group.links?.map((link, linkIdx) => (
                                                <div key={linkIdx} className="flex items-center gap-3">
                                                    <input
                                                        type="text"
                                                        className={`${inputClass} flex-1`}
                                                        value={link.text}
                                                        onChange={e => updateFooterLink(groupIdx, linkIdx, 'text', e.target.value)}
                                                        placeholder="Teks link (misal: Visi & Misi)"
                                                    />
                                                    <input
                                                        type="text"
                                                        className={`${inputClass} flex-1 font-mono text-xs`}
                                                        value={link.url}
                                                        onChange={e => updateFooterLink(groupIdx, linkIdx, 'url', e.target.value)}
                                                        placeholder="/tentang/visi-misi"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFooterLink(groupIdx, linkIdx)}
                                                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                                        title="Hapus link"
                                                    >
                                                        <i className="fas fa-times"></i>
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => addFooterLink(groupIdx)}
                                                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 transition-colors flex items-center gap-1 mt-2"
                                            >
                                                <i className="fas fa-plus text-[10px]"></i> Tambah Link
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Preview */}
                                <div className="bg-gray-900 text-white rounded-xl p-6">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4"><i className="fas fa-eye mr-1.5"></i>Preview Footer Links</p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        {footerLinks.map((group, idx) => (
                                            <div key={idx}>
                                                <h5 className="font-semibold uppercase text-sm text-white">{group.title || 'Judul Grup'}</h5>
                                                <ul className="mt-2 space-y-1 text-xs text-gray-400">
                                                    {group.links?.map((link, i) => (
                                                        <li key={i}>{link.text || 'Link tanpa teks'}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* =================== Tab 4: Social Media =================== */}
                        {activeTab === 'social' && (
                            <div className="space-y-8 animate-fade-in">
                                {/* Individual Social Links for SEO (meta tags) */}
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Link Media Sosial (SEO Meta)</h4>
                                    <p className="text-xs text-gray-500 mb-4">Link ini digunakan sebagai referensi di meta tag & structured data untuk SEO.</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><i className="fab fa-instagram text-pink-500 mr-2"></i>Instagram</label>
                                            <input type="url" className={inputClass} value={data.social_instagram} onChange={e => setData('social_instagram', e.target.value)} placeholder="https://instagram.com/stikesbogorhusada" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><i className="fab fa-youtube text-red-500 mr-2"></i>YouTube</label>
                                            <input type="url" className={inputClass} value={data.social_youtube} onChange={e => setData('social_youtube', e.target.value)} placeholder="https://youtube.com/@stikesbogorhusada" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><i className="fab fa-facebook text-blue-600 mr-2"></i>Facebook</label>
                                            <input type="url" className={inputClass} value={data.social_facebook} onChange={e => setData('social_facebook', e.target.value)} placeholder="https://facebook.com/..." />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><i className="fab fa-tiktok text-gray-900 dark:text-white mr-2"></i>TikTok</label>
                                            <input type="url" className={inputClass} value={data.social_tiktok} onChange={e => setData('social_tiktok', e.target.value)} placeholder="https://tiktok.com/@..." />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><i className="fab fa-twitter text-sky-500 mr-2"></i>Twitter / X</label>
                                            <input type="url" className={inputClass} value={data.social_twitter} onChange={e => setData('social_twitter', e.target.value)} placeholder="https://twitter.com/..." />
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                {/* Dynamic Social Links for Footer Display */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Ikon Sosial Media (Footer)</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">Kelola ikon sosial media yang tampil di baris bawah footer.</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={addSocialLink}
                                            className="px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors flex items-center gap-1.5"
                                        >
                                            <i className="fas fa-plus"></i> Tambah
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {socialLinks.map((social, idx) => (
                                            <div key={idx} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3">
                                                <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center flex-shrink-0">
                                                    <i className={`${social.icon} text-lg ${socialIconOptions.find(o => o.value === social.icon)?.color || 'text-gray-400'}`}></i>
                                                </div>
                                                <select
                                                    className="rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white text-sm py-2 w-40 flex-shrink-0"
                                                    value={social.icon}
                                                    onChange={e => updateSocialLink(idx, 'icon', e.target.value)}
                                                >
                                                    {socialIconOptions.map(opt => (
                                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="url"
                                                    className={`${inputClass} flex-1`}
                                                    value={social.url}
                                                    onChange={e => updateSocialLink(idx, 'url', e.target.value)}
                                                    placeholder="https://..."
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeSocialLink(idx)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                    title="Hapus"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* =================== Tab 5: SEO & Meta Tags =================== */}
                        {activeTab === 'seo' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-300">
                                    <i className="fas fa-info-circle mr-2"></i>
                                    Pengaturan ini menjadi <strong>fallback default</strong> untuk semua halaman. Halaman yang memiliki meta spesifik di controller (artikel, event, dll.) akan menggunakan data spesifik halaman tersebut.
                                </div>

                                {/* Meta Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        <i className="fas fa-heading text-indigo-500 mr-1.5"></i>Meta Title (Judul Tab & Google)
                                    </label>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        value={data.meta_title}
                                        onChange={e => setData('meta_title', e.target.value)}
                                        placeholder="STIKes Bogor Husada - Kampus Kesehatan Terbaik di Bogor"
                                    />
                                    <p className="mt-1 text-xs text-gray-400">Judul utama yang ditampilkan di tab browser dan hasil pencarian Google. Ideal: 50-60 karakter. Saat ini: <span className="font-mono font-bold">{data.meta_title.length}</span></p>
                                </div>

                                {/* Meta Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        <i className="fas fa-align-left text-green-500 mr-1.5"></i>Meta Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        className={inputClass}
                                        value={data.meta_description}
                                        onChange={e => setData('meta_description', e.target.value)}
                                        placeholder="Deskripsi global yang akan digunakan jika halaman tidak memiliki meta deskripsi spesifik."
                                    ></textarea>
                                    <p className="mt-1 text-xs text-gray-400">Deskripsi yang muncul di bawah judul pada hasil pencarian Google. Ideal: 150-160 karakter. Saat ini: <span className="font-mono font-bold">{data.meta_description.length}</span></p>
                                </div>

                                {/* Meta Keywords */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        <i className="fas fa-tags text-orange-500 mr-1.5"></i>Meta Keywords
                                    </label>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        value={data.meta_keywords}
                                        onChange={e => setData('meta_keywords', e.target.value)}
                                        placeholder="STIKes Bogor Husada, kampus kesehatan, PMB, pendaftaran mahasiswa baru"
                                    />
                                    <p className="mt-1 text-xs text-gray-400">Pisahkan kata kunci dengan koma. Ini menjadi fallback jika halaman tidak memiliki keywords sendiri.</p>
                                </div>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <i className="fab fa-facebook-square text-blue-600"></i> Open Graph (Facebook / WhatsApp / Telegram)
                                </h4>

                                {/* OG Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OG Title</label>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        value={data.og_title}
                                        onChange={e => setData('og_title', e.target.value)}
                                        placeholder="STIKes Bogor Husada - Kampus Kesehatan Unggul"
                                    />
                                    <p className="mt-1 text-xs text-gray-400">Judul yang muncul saat link website di-share. Kosongkan untuk menggunakan Meta Title sebagai fallback.</p>
                                </div>

                                {/* OG Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OG Description</label>
                                    <textarea
                                        rows={2}
                                        className={inputClass}
                                        value={data.og_description}
                                        onChange={e => setData('og_description', e.target.value)}
                                        placeholder="Tempat belajar dan berkembang di bidang kesehatan bersama STIKes Bogor Husada."
                                    ></textarea>
                                    <p className="mt-1 text-xs text-gray-400">Deskripsi yang tampil di WhatsApp/Facebook saat link di-share. Kosongkan untuk menggunakan Meta Description.</p>
                                </div>

                                {/* OG Image */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OG Image (Gambar Share Default)</label>
                                    <div className="flex items-center gap-6">
                                        <ImagePreview settingKey="og_image" label="OG Image" width="w-48" height="h-auto" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/40 dark:file:text-indigo-400"
                                            onChange={e => setData('og_default_image', e.target.files[0])}
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">Gambar yang tampil saat link website di-share di sosial media. Resolusi ideal: <strong>1200×630px</strong>.</p>
                                </div>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <i className="fab fa-twitter text-sky-500"></i> Twitter Card
                                </h4>

                                {/* Twitter Card Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipe Twitter Card</label>
                                    <select
                                        className={`${inputClass} md:w-1/2`}
                                        value={data.twitter_card}
                                        onChange={e => setData('twitter_card', e.target.value)}
                                    >
                                        <option value="summary_large_image">Summary Large Image (Rekomendasi)</option>
                                        <option value="summary">Summary (Kecil)</option>
                                    </select>
                                    <p className="mt-1 text-xs text-gray-400">Tipe preview yang muncul saat link di-share ke Twitter/X.</p>
                                </div>
                            </div>
                        )}

                        {/* =================== Tab 6: Analytics & Script =================== */}
                        {activeTab === 'analytics' && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        <i className="fab fa-google text-red-500 mr-1.5"></i>Google Analytics Measurement ID
                                    </label>
                                    <input
                                        type="text"
                                        className={`${inputClass} md:w-1/2 font-mono`}
                                        value={data.google_analytics_id}
                                        onChange={e => setData('google_analytics_id', e.target.value)}
                                        placeholder="G-XXXXXXXXXX"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Masukkan Measurement ID Google Analytics 4 Anda (format: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">G-XXXXXXX</code>).</p>
                                </div>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        <i className="fas fa-code text-purple-500 mr-1.5"></i>Google Analytics / Custom Script (Raw HTML)
                                    </label>
                                    <textarea
                                        rows={8}
                                        className={`${inputClass} font-mono text-xs`}
                                        value={data.google_analytics}
                                        onChange={e => setData('google_analytics', e.target.value)}
                                        placeholder={'<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag(\'js\', new Date());\n  gtag(\'config\', \'G-XXXXXXXXXX\');\n</script>'}
                                    ></textarea>
                                    <p className="mt-1 text-xs text-gray-500">Tempel kode JS/HTML mentah di sini (termasuk tag <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">&lt;script&gt;</code>). Script ini akan di-inject ke bagian <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">&lt;head&gt;</code> di semua halaman.</p>
                                </div>

                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 text-sm text-yellow-800 dark:text-yellow-300">
                                    <i className="fas fa-exclamation-triangle mr-2"></i>
                                    <strong>Perhatian:</strong> Pastikan kode yang Anda tempel adalah kode resmi dari Google Analytics, Meta Pixel, atau penyedia analytics terpercaya lainnya. Kode berbahaya di sini bisa mempengaruhi seluruh website.
                                </div>
                            </div>
                        )}

                        {/* Submit Bar */}
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
                @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.3s ease-out; }
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </AuthenticatedLayout>
    );
}
