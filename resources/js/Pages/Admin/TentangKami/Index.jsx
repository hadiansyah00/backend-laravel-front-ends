import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import MediaPicker from '@/Components/MediaPicker';

export default function Index({ data, types }) {
    // Determine initial tab (first key in types object)
    const typeKeys = Object.keys(types);
    const [activeTab, setActiveTab] = useState(typeKeys[0]);

    // Format existing data for the current tab
    const getInitialData = (type) => {
        const item = data[type] || {};
        let parsedContent = item.content || '';
        let visi = '';
        let misi = '';
        let profilData = {
            subtitle: '',
            tentang_title: 'Tentang Kami',
            tentang_content: '',
            tentang_image: '',
            features_title: 'Mengapa STIKes Bogor Husada?',
            features: [
                { title: '', description: '', icon: 'fas fa-check' },
                { title: '', description: '', icon: 'fas fa-check' },
                { title: '', description: '', icon: 'fas fa-check' },
                { title: '', description: '', icon: 'fas fa-check' }
            ]
        };
        let sambutanData = {
            subtitle: 'Pesan selamat datang dan komitmen persembahan kami dari Ketua STIKes Bogor Husada.',
            content_title: 'Bridging Technology for Humanity',
            image_align: 'left',
            content_image: '',
            content: ''
        };
        let sejarahData = {
            subtitle: 'Jejak langkah perjuangan kami membangun pendidikan kesehatan selama lebih dari satu dekade.',
            content: '',
            timeline_title: 'Roadmap STIKes Bogor Husada',
            timeline_icon: 'fas fa-route',
            timeline_items: [
                { year: '', title: '', description: '' }
            ]
        };
        let strukturData = {
            subtitle: 'Susunan kepengurusan dan pimpinan akademik STIKes Bogor Husada.',
            content: '',
            features_title: 'Unsur Pimpinan Utama',
            features: [
                { title: '', description: '', icon: 'fas fa-user-tie' },
                { title: '', description: '', icon: 'fas fa-chalkboard-teacher' },
                { title: '', description: '', icon: 'fas fa-wallet' },
                { title: '', description: '', icon: 'fas fa-users-cog' }
            ]
        };

        if (type === 'visi_misi' && item.content) {
            try {
                const parsed = JSON.parse(item.content);
                visi = parsed.visi || '';
                misi = parsed.misi || '';
            } catch (e) {
                // not json
            }
        } else if (type === 'profil' && item.content) {
            try {
                const parsed = JSON.parse(item.content);
                if (parsed.tentang_title) profilData = { ...profilData, ...parsed };
                if (!profilData.features) profilData.features = [];
                while (profilData.features.length < 4) {
                    profilData.features.push({ title: '', description: '', icon: 'fas fa-check' });
                }
            } catch (e) {
                profilData.tentang_content = item.content;
            }
        } else if (type === 'sambutan' && item.content) {
            try {
                const parsed = JSON.parse(item.content);
                if (parsed.content_title) sambutanData = { ...sambutanData, ...parsed };
            } catch (e) {
                sambutanData.content = item.content;
            }
        } else if (type === 'sejarah' && item.content) {
            try {
                const parsed = JSON.parse(item.content);
                if (parsed.timeline) {
                    sejarahData.subtitle = parsed.subtitle || sejarahData.subtitle;
                    sejarahData.content = parsed.content || '';
                    sejarahData.timeline_title = parsed.timeline.title || sejarahData.timeline_title;
                    sejarahData.timeline_icon = parsed.timeline.icon || sejarahData.timeline_icon;
                    sejarahData.timeline_items = parsed.timeline.items || [{ year: '', title: '', description: '' }];
                } else if (parsed.content) {
                    // Fallback maybe old format
                    sejarahData.content = parsed.content;
                } else {
                     sejarahData = { ...sejarahData, ...parsed };
                }
            } catch (e) {
                sejarahData.content = item.content;
            }
        } else if (type === 'struktur' && item.content) {
            try {
                const parsed = JSON.parse(item.content);
                if (parsed.features) {
                    strukturData = { ...strukturData, ...parsed };
                } else {
                    strukturData.content = item.content;
                }
            } catch (e) {
                strukturData.content = item.content;
            }
        }

        return {
            type: type,
            title: item.title || '',
            content: typeof parsedContent === 'string' ? parsedContent : '',
            visi: visi,
            misi: misi,
            profilData: profilData,
            sambutanData: sambutanData,
            sejarahData: sejarahData,
            strukturData: strukturData,
            image: item.image || '',
            is_active: item.is_active ?? true,
        };
    };

    const { data: formData, setData, post, processing, errors, recentlySuccessful } = useForm(getInitialData(activeTab));
    const [previewImage, setPreviewImage] = useState(getInitialData(activeTab).image);

    // Handle Tab Switch
    const handleTabChange = (type) => {
        setActiveTab(type);
        const newData = getInitialData(type);
        setData(newData);
        setPreviewImage(newData.image);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file); // Ideally, we'd upload this first or handle multipart form. For simplicity, if your image upload isn't setup for this specific controller yet, better to just use a text input for image URL from media library or implement standard file upload logic here in the backend. 
            // In typical cases, we should use the MediaLibrary or specific upload route. 
            // Let's assume we allow string URL or rely on media library for now, simplifying the form.
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let payload = { ...formData };
        if (payload.type === 'visi_misi') {
            payload.content = JSON.stringify({ visi: payload.visi, misi: payload.misi });
        } else if (payload.type === 'profil') {
            payload.content = JSON.stringify(payload.profilData);
        } else if (payload.type === 'sambutan') {
            payload.content = JSON.stringify(payload.sambutanData);
        } else if (payload.type === 'sejarah') {
            payload.content = JSON.stringify({
                subtitle: payload.sejarahData.subtitle,
                content: payload.sejarahData.content,
                timeline: {
                    title: payload.sejarahData.timeline_title,
                    icon: payload.sejarahData.timeline_icon,
                    items: payload.sejarahData.timeline_items.filter(i => i.title || i.year) // filter empty
                }
            });
        } else if (payload.type === 'struktur') {
            payload.content = JSON.stringify({
                subtitle: payload.strukturData.subtitle,
                content: payload.strukturData.content,
                features_title: payload.strukturData.features_title,
                features: payload.strukturData.features.filter(f => f.title)
            });
        }

        post(route('admin.tentang-kami.store'), {
            data: payload,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Berhasil menyimpan data ' + types[activeTab]);
            },
            onError: () => {
                toast.error('Gagal menyimpan data.');
            }
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manajemen Tentang Kami</h2>}>
            <Head title="Tentang Kami" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-900 overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800">
                    
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="flex overflow-x-auto p-4" aria-label="Tabs">
                            {typeKeys.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => handleTabChange(type)}
                                    className={`whitespace-nowrap py-3 px-5 mr-2 rounded-xl text-sm font-medium transition-colors ${
                                        activeTab === type
                                            ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-bold'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    {types[type]}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Form Section */}
                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
                            
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pengaturan {types[activeTab]}</h3>
                                    <p className="text-sm text-gray-500 mt-1">Ubah konten khusus untuk bagian ini.</p>
                                </div>
                                <div className="flex items-center">
                                    <label className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">Status Publikasi</label>
                                    <select
                                        className="rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={formData.is_active ? '1' : '0'}
                                        onChange={e => setData('is_active', e.target.value === '1')}
                                    >
                                        <option value="1">Aktif</option>
                                        <option value="0">Nonaktif</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul / Headline <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.title ? 'border-red-500' : ''}`}
                                    value={formData.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder={`Cth: ${types[activeTab]}`}
                                    required
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                            </div>

                            {/* Conditional Rendering based on Tab Type */}
                            {activeTab === 'visi_misi' ? (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Visi</label>
                                        <textarea
                                            rows={4}
                                            className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                            value={formData.visi}
                                            onChange={e => setData('visi', e.target.value)}
                                            placeholder="Tuliskan Visi institusi"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Misi</label>
                                        <textarea
                                            rows={6}
                                            className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                            value={formData.misi}
                                            onChange={e => setData('misi', e.target.value)}
                                            placeholder="Tuliskan Misi institusi"
                                        />
                                    </div>
                                </div>
                            ) : activeTab === 'profil' ? (
                                <div className="space-y-8">
                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Setting Header (Hero)</h4>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subtitle Banner</label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-xl"
                                                value={formData.profilData.subtitle}
                                                onChange={e => setData('profilData', { ...formData.profilData, subtitle: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Section: Tentang Kami</h4>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Section</label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-xl"
                                                value={formData.profilData.tentang_title}
                                                onChange={e => setData('profilData', { ...formData.profilData, tentang_title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teks Deskripsi</label>
                                            <textarea
                                                rows={5}
                                                className="w-full text-sm border-gray-300 rounded-xl"
                                                value={formData.profilData.tentang_content}
                                                onChange={e => setData('profilData', { ...formData.profilData, tentang_content: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL Cover / Gambar Samping</label>
                                            <div className="flex gap-4 items-center mb-4">
                                                {formData.profilData.tentang_image ? (
                                                    <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm shrink-0">
                                                        <img src={formData.profilData.tentang_image.startsWith('http') || formData.profilData.tentang_image.startsWith('/') ? formData.profilData.tentang_image : `/storage/${formData.profilData.tentang_image}`} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.src='https://via.placeholder.com/150?text=Error'; }} />
                                                    </div>
                                                ) : (
                                                    <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center shrink-0 bg-gray-50 dark:bg-gray-800 text-gray-400">
                                                        <i className="fas fa-image text-xl mb-1"></i>
                                                        <span className="text-[10px]">No Image</span>
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        className="w-full text-sm border-gray-300 rounded-xl mb-2 bg-gray-50 focus:ring-0 cursor-not-allowed"
                                                        placeholder="Pilih dari media library..."
                                                        value={formData.profilData.tentang_image}
                                                        readOnly
                                                    />
                                                    <div className="flex gap-2">
                                                        <MediaPicker 
                                                            onSelect={(url) => {
                                                                // Store the URL directly as returned by MediaPicker
                                                                setData('profilData', { ...formData.profilData, tentang_image: url });
                                                            }}
                                                            trigger={
                                                                <button type="button" className="px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition flex items-center gap-2">
                                                                    <i className="fas fa-folder-open"></i> Buka Media Library
                                                                </button>
                                                            }
                                                        />
                                                        {formData.profilData.tentang_image && (
                                                            <button 
                                                                type="button" 
                                                                onClick={() => setData('profilData', { ...formData.profilData, tentang_image: '' })}
                                                                className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm transition"
                                                                title="Hapus Gambar"
                                                            >
                                                                <i className="fas fa-times"></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Section: Keunggulan / Fitur</h4>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Keunggulan</label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-xl mb-4"
                                                value={formData.profilData.features_title}
                                                onChange={e => setData('profilData', { ...formData.profilData, features_title: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            {formData.profilData.features.map((feature, idx) => (
                                                <div key={idx} className="flex gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 rounded-xl">
                                                    <div className="flex-1 space-y-3">
                                                        <input
                                                            type="text"
                                                            placeholder={`Judul Fitur ${idx+1}`}
                                                            className="w-full text-sm border-gray-300 rounded-lg"
                                                            value={feature.title}
                                                            onChange={e => {
                                                                const newFeatures = [...formData.profilData.features];
                                                                newFeatures[idx].title = e.target.value;
                                                                setData('profilData', { ...formData.profilData, features: newFeatures });
                                                            }}
                                                        />
                                                        <textarea
                                                            rows={2}
                                                            placeholder="Deskripsi singkat"
                                                            className="w-full text-sm border-gray-300 rounded-lg text-gray-600"
                                                            value={feature.description}
                                                            onChange={e => {
                                                                const newFeatures = [...formData.profilData.features];
                                                                newFeatures[idx].description = e.target.value;
                                                                setData('profilData', { ...formData.profilData, features: newFeatures });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="w-16">
                                                        <input
                                                            type="text"
                                                            title="FontAwesome Icon (e.g. fas fa-check)"
                                                            placeholder="fa-icon"
                                                            className="w-full text-xs box-border border-gray-300 rounded-lg text-center p-1"
                                                            value={feature.icon}
                                                            onChange={e => {
                                                                const newFeatures = [...formData.profilData.features];
                                                                newFeatures[idx].icon = e.target.value;
                                                                setData('profilData', { ...formData.profilData, features: newFeatures });
                                                            }}
                                                        />
                                                        <div className="mt-2 text-center text-sm bg-gray-100 rounded flex items-center justify-center p-2 text-indigo-600 h-10 w-full">
                                                            <i className={feature.icon}></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : activeTab === 'sambutan' ? (
                                <div className="space-y-8">
                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Setting Header (Hero)</h4>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subtitle Banner</label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-xl"
                                                value={formData.sambutanData.subtitle}
                                                onChange={e => setData('sambutanData', { ...formData.sambutanData, subtitle: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Konten Sambutan</h4>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Konten</label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-xl"
                                                value={formData.sambutanData.content_title}
                                                onChange={e => setData('sambutanData', { ...formData.sambutanData, content_title: e.target.value })}
                                                placeholder="Contoh: Bridging Technology for Humanity"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teks Sambutan (Mendukung HTML)</label>
                                            <textarea
                                                rows={15}
                                                className="w-full text-sm border-gray-300 rounded-xl font-mono text-gray-800"
                                                value={formData.sambutanData.content}
                                                onChange={e => setData('sambutanData', { ...formData.sambutanData, content: e.target.value })}
                                                placeholder="<p>Isi sambutan...</p>"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Gunakan tag HTML dasar seperti &lt;p&gt;, &lt;strong&gt;, dll jika diperlukan.</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Posisi Gambar (Alignment)</label>
                                            <select
                                                className="w-full text-sm border-gray-300 rounded-xl"
                                                value={formData.sambutanData.image_align}
                                                onChange={e => setData('sambutanData', { ...formData.sambutanData, image_align: e.target.value })}
                                            >
                                                <option value="left">Kiri (Gambar di Kiri, Teks di Kanan)</option>
                                                <option value="right">Kanan (Teks di Kiri, Gambar di Kanan)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Foto Sambutan (Opsional)</label>
                                            <div className="flex gap-4 items-center mb-4">
                                                {formData.sambutanData.content_image ? (
                                                    <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm shrink-0">
                                                        <img src={formData.sambutanData.content_image.startsWith('http') || formData.sambutanData.content_image.startsWith('/') ? formData.sambutanData.content_image : `/storage/${formData.sambutanData.content_image}`} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.src='https://via.placeholder.com/150?text=Error'; }} />
                                                    </div>
                                                ) : (
                                                    <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center shrink-0 bg-gray-50 dark:bg-gray-800 text-gray-400">
                                                        <i className="fas fa-image text-xl mb-1"></i>
                                                        <span className="text-[10px]">No Image</span>
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        className="w-full text-sm border-gray-300 rounded-xl mb-2 bg-gray-50 focus:ring-0 cursor-not-allowed"
                                                        placeholder="Pilih dari media library..."
                                                        value={formData.sambutanData.content_image}
                                                        readOnly
                                                    />
                                                    <div className="flex gap-2">
                                                        <MediaPicker 
                                                            onSelect={(url) => {
                                                                setData('sambutanData', { ...formData.sambutanData, content_image: url });
                                                            }}
                                                            trigger={
                                                                <button type="button" className="px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition flex items-center gap-2">
                                                                    <i className="fas fa-folder-open"></i> Buka Media Library
                                                                </button>
                                                            }
                                                        />
                                                        {formData.sambutanData.content_image && (
                                                            <button 
                                                                type="button" 
                                                                onClick={() => setData('sambutanData', { ...formData.sambutanData, content_image: '' })}
                                                                className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm transition"
                                                                title="Hapus Gambar"
                                                            >
                                                                <i className="fas fa-times"></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : activeTab === 'sejarah' ? (
                                <div className="space-y-8">
                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Setting Header (Hero)</h4>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subtitle Banner</label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-xl"
                                                value={formData.sejarahData.subtitle}
                                                onChange={e => setData('sejarahData', { ...formData.sejarahData, subtitle: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Pengantar Sejarah Utama</h4>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teks Sejarah Singkat (Mendukung HTML)</label>
                                            <textarea
                                                rows={8}
                                                className="w-full text-sm border-gray-300 rounded-xl font-mono text-gray-800"
                                                value={formData.sejarahData.content}
                                                onChange={e => setData('sejarahData', { ...formData.sejarahData, content: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-gray-900 dark:text-white">Roadmap / Timeline</h4>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const items = [...formData.sejarahData.timeline_items, { year: '', title: '', description: '' }];
                                                    setData('sejarahData', { ...formData.sejarahData, timeline_items: items });
                                                }}
                                                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg"
                                            >
                                                <i className="fas fa-plus"></i> Tambah Item
                                            </button>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Timeline</label>
                                                <input
                                                    type="text"
                                                    className="w-full text-sm border-gray-300 rounded-xl"
                                                    value={formData.sejarahData.timeline_title}
                                                    onChange={e => setData('sejarahData', { ...formData.sejarahData, timeline_title: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ikon Judul (FontAwesome)</label>
                                                <input
                                                    type="text"
                                                    className="w-full text-sm border-gray-300 rounded-xl"
                                                    value={formData.sejarahData.timeline_icon}
                                                    onChange={e => setData('sejarahData', { ...formData.sejarahData, timeline_icon: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4 mt-6">
                                            {formData.sejarahData.timeline_items.map((item, index) => (
                                                <div key={index} className="flex gap-4 items-start p-4 bg-white rounded-xl border border-gray-100 shadow-sm relative">
                                                    <div className="absolute top-4 right-4 text-xs font-bold text-gray-300">#{index + 1}</div>
                                                    <div className="w-24 shrink-0">
                                                        <label className="block text-xs font-medium text-gray-500 mb-1">Tahun</label>
                                                        <input
                                                            type="text"
                                                            className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                            placeholder="20xx"
                                                            value={item.year}
                                                            onChange={e => {
                                                                const items = [...formData.sejarahData.timeline_items];
                                                                items[index].year = e.target.value;
                                                                setData('sejarahData', { ...formData.sejarahData, timeline_items: items });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-1 space-y-3">
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 mb-1">Judul Event / Pencapaian</label>
                                                            <input
                                                                type="text"
                                                                className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                value={item.title}
                                                                onChange={e => {
                                                                    const items = [...formData.sejarahData.timeline_items];
                                                                    items[index].title = e.target.value;
                                                                    setData('sejarahData', { ...formData.sejarahData, timeline_items: items });
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 mb-1">Deskripsi Tambahan</label>
                                                            <textarea
                                                                rows={2}
                                                                className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                value={item.description}
                                                                onChange={e => {
                                                                    const items = [...formData.sejarahData.timeline_items];
                                                                    items[index].description = e.target.value;
                                                                    setData('sejarahData', { ...formData.sejarahData, timeline_items: items });
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const items = formData.sejarahData.timeline_items.filter((_, i) => i !== index);
                                                            setData('sejarahData', { ...formData.sejarahData, timeline_items: items });
                                                        }}
                                                        className="mt-6 p-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
                                                        title="Hapus Event Ini"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : activeTab === 'struktur' ? (
                                <div className="space-y-8">
                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Setting Header (Hero)</h4>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subtitle Banner</label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-xl"
                                                value={formData.strukturData.subtitle}
                                                onChange={e => setData('strukturData', { ...formData.strukturData, subtitle: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Grafik / Konten</h4>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bagan Struktur (HTML / Image Tags)</label>
                                            <textarea
                                                rows={5}
                                                className="w-full text-sm border-gray-300 rounded-xl font-mono text-gray-800"
                                                value={formData.strukturData.content}
                                                onChange={e => setData('strukturData', { ...formData.strukturData, content: e.target.value })}
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Gunakan tag img seperti: `&lt;img src="url_gambar" /&gt;`.</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="font-bold text-gray-900 dark:text-white">Unsur Pimpinan Utama</h4>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newFeatures = [...formData.strukturData.features, { title: '', description: '', icon: 'fas fa-user' }];
                                                    setData('strukturData', { ...formData.strukturData, features: newFeatures });
                                                }}
                                                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg"
                                            >
                                                <i className="fas fa-plus"></i> Tambah Pimpinan
                                            </button>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Section Pimpinan</label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-xl mb-4"
                                                value={formData.strukturData.features_title}
                                                onChange={e => setData('strukturData', { ...formData.strukturData, features_title: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {formData.strukturData.features.map((feature, idx) => (
                                                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 relative">
                                                    <div className="absolute top-2 right-2 text-xs font-bold text-gray-300">Pimpinan {idx + 1}</div>
                                                    <div className="space-y-3 mt-2">
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 mb-1">Jabatan</label>
                                                            <input
                                                                type="text"
                                                                className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                placeholder="cth: Ketua"
                                                                value={feature.title}
                                                                onChange={e => {
                                                                    const features = [...formData.strukturData.features];
                                                                    features[idx].title = e.target.value;
                                                                    setData('strukturData', { ...formData.strukturData, features });
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 mb-1">Nama / Deskripsi</label>
                                                            <textarea
                                                                className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                rows="2"
                                                                placeholder="cth: Nama Ketua"
                                                                value={feature.description}
                                                                onChange={e => {
                                                                    const features = [...formData.strukturData.features];
                                                                    features[idx].description = e.target.value;
                                                                    setData('strukturData', { ...formData.strukturData, features });
                                                                }}
                                                            ></textarea>
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 mb-1">Icon (FontAwesome)</label>
                                                            <input
                                                                type="text"
                                                                className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                placeholder="fas fa-user-tie"
                                                                value={feature.icon}
                                                                onChange={e => {
                                                                    const features = [...formData.strukturData.features];
                                                                    features[idx].icon = e.target.value;
                                                                    setData('strukturData', { ...formData.strukturData, features });
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="text-right">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const features = formData.strukturData.features.filter((_, i) => i !== idx);
                                                                    setData('strukturData', { ...formData.strukturData, features });
                                                                }}
                                                                className="text-xs text-red-500 hover:text-red-700"
                                                            >
                                                                Hapus Pimpinan Ini
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Konten Utama</label>
                                    <textarea
                                        rows={8}
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.content ? 'border-red-500' : ''}`}
                                        value={formData.content}
                                        onChange={e => setData('content', e.target.value)}
                                        placeholder="Tuliskan konten disini. Mendukung HTML dasar jika diperlukan."
                                    />
                                    {errors.content && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.content}</p>}
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gambar Header / Utama</label>
                                <div className="flex gap-4 items-center mb-4">
                                    {formData.image ? (
                                        <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm shrink-0">
                                            <img src={formData.image.startsWith('http') || formData.image.startsWith('/') ? formData.image : `/storage/${formData.image}`} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.src='https://via.placeholder.com/150?text=Error'; }} />
                                        </div>
                                    ) : (
                                        <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center shrink-0 bg-gray-50 dark:bg-gray-800 text-gray-400">
                                            <i className="fas fa-image text-xl mb-1"></i>
                                            <span className="text-[10px]">No Image</span>
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            className={`w-full text-sm border-gray-300 rounded-xl mb-2 bg-gray-50 focus:ring-0 cursor-not-allowed ${errors.image ? 'border-red-500' : ''}`}
                                            placeholder="Pilih dari media library..."
                                            value={formData.image}
                                            readOnly
                                        />
                                        <div className="flex gap-2">
                                            <MediaPicker 
                                                onSelect={(url) => {
                                                    setData('image', url);
                                                }}
                                                trigger={
                                                    <button type="button" className="px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition flex items-center gap-2">
                                                        <i className="fas fa-folder-open"></i> Buka Media Library
                                                    </button>
                                                }
                                            />
                                            {formData.image && (
                                                <button 
                                                    type="button" 
                                                    onClick={() => setData('image', '')}
                                                    className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm transition"
                                                    title="Hapus Gambar"
                                                >
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {errors.image && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.image}</p>}
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                                {recentlySuccessful && (
                                    <span className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center gap-1 transition-opacity">
                                        <i className="fas fa-check-circle"></i> Tersimpan
                                    </span>
                                )}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
                                >
                                    {processing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>}
                                    Simpan {types[activeTab]}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
