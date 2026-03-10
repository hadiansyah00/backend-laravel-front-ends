import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import MediaPicker from '@/Components/MediaPicker';

export default function Index({ data, types }) {
    const typeKeys = Object.keys(types);
    const [activeTab, setActiveTab] = useState(typeKeys[0]);

    const getInitialData = (type) => {
        const item = data[type] || {};
        let parsedContent = item.content || '';
        
        let heroData = {
            sliders: [
                { image: '', subtitle: '', title: '', description: '', link: '', link_text: '' }
            ]
        };
        let quickActionData = {
            subtitle: '', button_text: '', button_link: '', info_title: '', info_subtitle: '', info_link_text: '', info_link: ''
        };
        let programStudiData = {
            badge: 'Akademik', description: ''
        };
        let videoProfilData = {
            badge: 'Company Profile', description: '', video_url: ''
        };
        let testimoniData = {
            badge: 'Suara Alumni', description: '', items: [
                { name: '', role: '', photo: '', message: '' }
            ]
        };

        if (item.content) {
            try {
                const parsed = JSON.parse(item.content);
                if (type === 'hero' && parsed.sliders) {
                    heroData = { ...heroData, ...parsed };
                    if (!heroData.sliders.length) heroData.sliders.push({ image: '', subtitle: '', title: '', description: '', link: '', link_text: '' });
                } else if (type === 'quick_action') {
                    quickActionData = { ...quickActionData, ...parsed };
                } else if (type === 'program_studi') {
                    programStudiData = { ...programStudiData, ...parsed };
                } else if (type === 'video_profil') {
                    videoProfilData = { ...videoProfilData, ...parsed };
                } else if (type === 'testimoni') {
                    testimoniData = { ...testimoniData, ...parsed };
                    if (!testimoniData.items) testimoniData.items = [];
                }
            } catch (e) {
                // not JSON
            }
        }

        return {
            type: type,
            title: item.title || '',
            content: typeof parsedContent === 'string' ? parsedContent : '',
            heroData: heroData,
            quickActionData: quickActionData,
            programStudiData: programStudiData,
            videoProfilData: videoProfilData,
            testimoniData: testimoniData,
            image: item.image || '',
            is_active: item.is_active ?? true,
        };
    };

    const { data: formData, setData, post, processing, errors } = useForm(getInitialData(activeTab));

    const handleTabChange = (type) => {
        setActiveTab(type);
        const newData = getInitialData(type);
        setData(newData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let payload = { ...formData };
        if (payload.type === 'hero') {
            payload.content = JSON.stringify({
                sliders: payload.heroData.sliders.filter(s => s.title)
            });
        } else if (payload.type === 'quick_action') {
            payload.content = JSON.stringify(payload.quickActionData);
        } else if (payload.type === 'program_studi') {
            payload.content = JSON.stringify(payload.programStudiData);
        } else if (payload.type === 'video_profil') {
            payload.content = JSON.stringify(payload.videoProfilData);
        } else if (payload.type === 'testimoni') {
            payload.content = JSON.stringify({
                badge: payload.testimoniData.badge,
                description: payload.testimoniData.description,
                items: payload.testimoniData.items.filter(i => i.name)
            });
        }

        post(route('admin.beranda.store'), {
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
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manajemen Beranda</h2>}>
            <Head title="Beranda" />

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
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Section Internal <span className="text-red-500">*</span></label>
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
                            {activeTab === 'hero' ? (
                                <div className="space-y-8">
                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-gray-900 dark:text-white">Daftar Slider</h4>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const sliders = [...formData.heroData.sliders, { image: '', subtitle: '', title: '', description: '', link: '', link_text: '' }];
                                                    setData('heroData', { ...formData.heroData, sliders });
                                                }}
                                                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg"
                                            >
                                                <i className="fas fa-plus"></i> Tambah Slider
                                            </button>
                                        </div>

                                        <div className="space-y-6 mt-4">
                                            {formData.heroData.sliders.map((slider, index) => (
                                                <div key={index} className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 rounded-xl relative">
                                                    <div className="absolute top-4 right-4 text-xs font-bold text-gray-300">#{index + 1}</div>
                                                    
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 mb-1">Gambar Slider</label>
                                                        <div className="flex gap-4 items-center mb-2">
                                                            {slider.image ? (
                                                                <div className="w-16 h-12 rounded overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm shrink-0">
                                                                    <img src={slider.image.startsWith('http') || slider.image.startsWith('/') ? slider.image : `/storage/${slider.image}`} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.src='https://via.placeholder.com/150?text=Error'; }} />
                                                                </div>
                                                            ) : (
                                                                <div className="w-16 h-12 rounded border-2 border-dashed border-gray-300 flex items-center justify-center shrink-0 bg-gray-50 text-gray-400 text-[10px]">
                                                                    No Image
                                                                </div>
                                                            )}
                                                            <div className="flex-1 flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full text-sm border-gray-300 rounded-lg py-1.5 bg-gray-50"
                                                                    value={slider.image}
                                                                    readOnly
                                                                />
                                                                <MediaPicker 
                                                                    onSelect={(url) => {
                                                                        const sliders = [...formData.heroData.sliders];
                                                                        sliders[index].image = url;
                                                                        setData('heroData', { ...formData.heroData, sliders });
                                                                    }}
                                                                    trigger={
                                                                        <button type="button" className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold">
                                                                            Pilih Media
                                                                        </button>
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 mb-1">Subtitle (Badge)</label>
                                                            <input
                                                                type="text"
                                                                className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                value={slider.subtitle}
                                                                onChange={e => {
                                                                    const sliders = [...formData.heroData.sliders];
                                                                    sliders[index].subtitle = e.target.value;
                                                                    setData('heroData', { ...formData.heroData, sliders });
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 mb-1">Judul Utama</label>
                                                            <input
                                                                type="text"
                                                                className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                value={slider.title}
                                                                onChange={e => {
                                                                    const sliders = [...formData.heroData.sliders];
                                                                    sliders[index].title = e.target.value;
                                                                    setData('heroData', { ...formData.heroData, sliders });
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 mb-1">Deskripsi Singkat</label>
                                                        <textarea
                                                            rows={2}
                                                            className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                            value={slider.description}
                                                            onChange={e => {
                                                                const sliders = [...formData.heroData.sliders];
                                                                sliders[index].description = e.target.value;
                                                                setData('heroData', { ...formData.heroData, sliders });
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 mb-1">Label Tombol Link</label>
                                                            <input
                                                                type="text"
                                                                className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                value={slider.link_text}
                                                                onChange={e => {
                                                                    const sliders = [...formData.heroData.sliders];
                                                                    sliders[index].link_text = e.target.value;
                                                                    setData('heroData', { ...formData.heroData, sliders });
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 mb-1">URL Link</label>
                                                            <input
                                                                type="text"
                                                                className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                value={slider.link}
                                                                onChange={e => {
                                                                    const sliders = [...formData.heroData.sliders];
                                                                    sliders[index].link = e.target.value;
                                                                    setData('heroData', { ...formData.heroData, sliders });
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="text-right mt-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const sliders = formData.heroData.sliders.filter((_, i) => i !== index);
                                                                setData('heroData', { ...formData.heroData, sliders });
                                                            }}
                                                            className="text-xs text-red-500 hover:text-red-700 font-medium"
                                                        >
                                                            <i className="fas fa-trash mr-1"></i> Hapus Slider
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : activeTab === 'quick_action' ? (
                                <div className="space-y-6">
                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Seksi Kiri (Pendaftaran)</h4>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi Pendaftaran</label>
                                            <textarea
                                                rows={3}
                                                className="w-full text-sm border-gray-300 rounded-xl py-2"
                                                value={formData.quickActionData.subtitle}
                                                onChange={e => setData('quickActionData', { ...formData.quickActionData, subtitle: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Label Tombol</label>
                                                <input
                                                    type="text"
                                                    className="w-full text-sm border-gray-300 rounded-xl"
                                                    value={formData.quickActionData.button_text}
                                                    onChange={e => setData('quickActionData', { ...formData.quickActionData, button_text: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Link Tombol (URL)</label>
                                                <input
                                                    type="text"
                                                    className="w-full text-sm border-gray-300 rounded-xl"
                                                    value={formData.quickActionData.button_link}
                                                    onChange={e => setData('quickActionData', { ...formData.quickActionData, button_link: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Seksi Kanan (Informasi)</h4>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Informasi</label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-xl"
                                                value={formData.quickActionData.info_title}
                                                onChange={e => setData('quickActionData', { ...formData.quickActionData, info_title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi Informasi</label>
                                            <textarea
                                                rows={3}
                                                className="w-full text-sm border-gray-300 rounded-xl py-2"
                                                value={formData.quickActionData.info_subtitle}
                                                onChange={e => setData('quickActionData', { ...formData.quickActionData, info_subtitle: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Label Tombol Informasi</label>
                                                <input
                                                    type="text"
                                                    className="w-full text-sm border-gray-300 rounded-xl"
                                                    value={formData.quickActionData.info_link_text}
                                                    onChange={e => setData('quickActionData', { ...formData.quickActionData, info_link_text: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Link Tombol Informasi</label>
                                                <input
                                                    type="text"
                                                    className="w-full text-sm border-gray-300 rounded-xl"
                                                    value={formData.quickActionData.info_link}
                                                    onChange={e => setData('quickActionData', { ...formData.quickActionData, info_link: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : activeTab === 'program_studi' ? (
                                <div className="space-y-6">
                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Badge Title</label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-xl"
                                                value={formData.programStudiData.badge}
                                                onChange={e => setData('programStudiData', { ...formData.programStudiData, badge: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi Pengantar</label>
                                            <textarea
                                                rows={4}
                                                className="w-full text-sm border-gray-300 rounded-xl py-2"
                                                value={formData.programStudiData.description}
                                                onChange={e => setData('programStudiData', { ...formData.programStudiData, description: e.target.value })}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            *Data daftar program studi tetap diambil dari modul Program Studi secara otomatis.
                                        </p>
                                    </div>
                                </div>
                            ) : activeTab === 'video_profil' ? (
                                <div className="space-y-6">
                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Badge Title</label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-xl"
                                                value={formData.videoProfilData.badge}
                                                onChange={e => setData('videoProfilData', { ...formData.videoProfilData, badge: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi Profil</label>
                                            <textarea
                                                rows={4}
                                                className="w-full text-sm border-gray-300 rounded-xl py-2"
                                                value={formData.videoProfilData.description}
                                                onChange={e => setData('videoProfilData', { ...formData.videoProfilData, description: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL Video YouTube</label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-xl"
                                                value={formData.videoProfilData.video_url}
                                                onChange={e => setData('videoProfilData', { ...formData.videoProfilData, video_url: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : activeTab === 'testimoni' ? (
                                <div className="space-y-6">
                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Badge Title</label>
                                                <input
                                                    type="text"
                                                    className="w-full text-sm border-gray-300 rounded-xl"
                                                    value={formData.testimoniData.badge}
                                                    onChange={e => setData('testimoniData', { ...formData.testimoniData, badge: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi</label>
                                                <textarea
                                                    rows={2}
                                                    className="w-full text-sm border-gray-300 rounded-xl"
                                                    value={formData.testimoniData.description}
                                                    onChange={e => setData('testimoniData', { ...formData.testimoniData, description: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="font-bold text-gray-900 dark:text-white">Daftar Testimoni</h4>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const items = [...formData.testimoniData.items, { name: '', role: '', photo: '', message: '' }];
                                                    setData('testimoniData', { ...formData.testimoniData, items });
                                                }}
                                                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg"
                                            >
                                                <i className="fas fa-plus"></i> Tambah Testimoni
                                            </button>
                                        </div>

                                        <div className="space-y-6">
                                            {formData.testimoniData.items.map((item, index) => (
                                                <div key={index} className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 rounded-xl relative">
                                                    <div className="absolute top-4 right-4 text-xs font-bold text-gray-300">#{index + 1}</div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 mb-1">Nama Alumni</label>
                                                            <input
                                                                type="text"
                                                                className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                value={item.name}
                                                                onChange={e => {
                                                                    const items = [...formData.testimoniData.items];
                                                                    items[index].name = e.target.value;
                                                                    setData('testimoniData', { ...formData.testimoniData, items });
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 mb-1">Profesi / Instansi</label>
                                                            <input
                                                                type="text"
                                                                className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                value={item.role}
                                                                onChange={e => {
                                                                    const items = [...formData.testimoniData.items];
                                                                    items[index].role = e.target.value;
                                                                    setData('testimoniData', { ...formData.testimoniData, items });
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 mb-1">Pesan Testimoni</label>
                                                        <textarea
                                                            rows={3}
                                                            className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                            value={item.message}
                                                            onChange={e => {
                                                                const items = [...formData.testimoniData.items];
                                                                items[index].message = e.target.value;
                                                                setData('testimoniData', { ...formData.testimoniData, items });
                                                            }}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 mb-1">Foto Alumni</label>
                                                        <div className="flex gap-4 items-center mb-2">
                                                            {item.photo ? (
                                                                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm shrink-0">
                                                                    <img src={item.photo.startsWith('http') || item.photo.startsWith('/') ? item.photo : `/storage/${item.photo}`} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.src='https://via.placeholder.com/150?text=Error'; }} />
                                                                </div>
                                                            ) : (
                                                                <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center shrink-0 bg-gray-50 text-gray-400 text-xs">
                                                                    <i className="fas fa-user"></i>
                                                                </div>
                                                            )}
                                                            <div className="flex-1 flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full text-sm border-gray-300 rounded-lg py-1.5 bg-gray-50"
                                                                    value={item.photo}
                                                                    readOnly
                                                                />
                                                                <MediaPicker 
                                                                    onSelect={(url) => {
                                                                        const items = [...formData.testimoniData.items];
                                                                        items[index].photo = url;
                                                                        setData('testimoniData', { ...formData.testimoniData, items });
                                                                    }}
                                                                    trigger={
                                                                        <button type="button" className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold">
                                                                            Pilih Media
                                                                        </button>
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="text-right mt-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const items = formData.testimoniData.items.filter((_, i) => i !== index);
                                                                setData('testimoniData', { ...formData.testimoniData, items });
                                                            }}
                                                            className="text-xs text-red-500 hover:text-red-700 font-medium"
                                                        >
                                                            <i className="fas fa-trash mr-1"></i> Hapus Testimoni
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 rounded-b-2xl bg-gray-50/50 dark:bg-gray-800/30 px-6 py-4 -mx-6 -mb-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
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
