import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const DOC_ICONS = {
    'application/pdf': { icon: 'fas fa-file-pdf', color: 'text-red-500' },
    'application/msword': { icon: 'fas fa-file-word', color: 'text-blue-500' },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { icon: 'fas fa-file-word', color: 'text-blue-500' },
    'application/vnd.ms-excel': { icon: 'fas fa-file-excel', color: 'text-green-500' },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { icon: 'fas fa-file-excel', color: 'text-green-500' },
    'application/vnd.ms-powerpoint': { icon: 'fas fa-file-powerpoint', color: 'text-orange-500' },
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': { icon: 'fas fa-file-powerpoint', color: 'text-orange-500' },
};

const getDocIcon = (mimeType) => {
    return DOC_ICONS[mimeType] || { icon: 'fas fa-file-alt', color: 'text-gray-500' };
};

const ACCEPT_MAP = {
    image: 'image/*',
    document: 'application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation',
    all: 'image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation',
};

export default function MediaPicker({ onSelect, trigger, acceptType = 'all' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState(acceptType === 'all' ? '' : acceptType);
    const fileInputRef = useRef(null);

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const params = { search };
            if (activeFilter) params.type = activeFilter;
            
            const res = await axios.get(route('admin.media.index'), {
                params,
                headers: { 'Accept': 'application/json' }
            });
            setMedia(res.data.data);
        } catch (error) {
            console.error('Error fetching media:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchMedia();
        }
    }, [isOpen, search, activeFilter]);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert('Gagal upload: Maksimal ukuran file adalah 5MB');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('collection_name', 'default');

        setUploading(true);
        try {
            await axios.post(route('admin.media.store'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            });
            fetchMedia();
        } catch (error) {
            console.error('Error uploading:', error);
            const errorMsg = error.response?.data?.errors?.file?.[0] || 'Upload gagal. Pastikan format file didukung dan ukuran tidak melebihi 5MB.';
            alert(errorMsg);
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleSelect = (item) => {
        onSelect(item.path);
        setIsOpen(false);
    };

    const filterTabs = acceptType === 'all' ? [
        { key: '', label: 'Semua' },
        { key: 'image', label: 'Gambar' },
        { key: 'document', label: 'Dokumen' },
    ] : [];

    return (
        <>
            <div onClick={() => setIsOpen(true)}>
                {trigger}
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">

                        {/* Header */}
                        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <i className="fas fa-photo-video text-indigo-500"></i> Pilih dari Media Library
                            </h3>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-2xl transition">
                                &times;
                            </button>
                        </div>

                        {/* Toolbar */}
                        <div className="p-4 flex flex-col sm:flex-row justify-between gap-4 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex gap-2 w-full sm:w-auto items-center flex-wrap">
                                <input
                                    type="text"
                                    placeholder="Cari file..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg px-4 py-2 text-sm w-full sm:w-64 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {filterTabs.length > 0 && (
                                    <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                        {filterTabs.map(tab => (
                                            <button
                                                key={tab.key}
                                                type="button"
                                                onClick={() => setActiveFilter(tab.key)}
                                                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                                                    activeFilter === tab.key
                                                        ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                                                }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept={ACCEPT_MAP[acceptType] || ACCEPT_MAP.all} />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 transition"
                                >
                                    {uploading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-upload"></i>}
                                    Upload Baru
                                </button>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-gray-50 dark:bg-gray-900/50">
                            {loading ? (
                                <div className="flex justify-center items-center h-full">
                                    <i className="fas fa-spinner fa-spin text-4xl text-indigo-500"></i>
                                </div>
                            ) : media.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                                    {media.map(item => (
                                        <div
                                            key={item.id}
                                            onClick={() => handleSelect(item)}
                                            className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:ring-2 hover:ring-indigo-500 transition-all shadow-sm"
                                        >
                                            <div className="aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                                                {item.mime_type?.startsWith('image/') ? (
                                                    <img src={`/storage/${item.path}`} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                ) : (
                                                    <i className={`${getDocIcon(item.mime_type).icon} text-4xl ${getDocIcon(item.mime_type).color} group-hover:scale-110 transition-transform`}></i>
                                                )}
                                            </div>
                                            <div className="p-2 text-center">
                                                <p className="text-[11px] font-medium text-gray-700 dark:text-gray-300 truncate" title={item.name}>{item.name}</p>
                                                {item.type === 'document' && (
                                                    <span className="text-[9px] px-1.5 py-0.5 bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded-full font-semibold uppercase mt-1 inline-block">
                                                        {item.mime_type?.split('/').pop()?.split('.').pop() || 'doc'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <i className="fas fa-images text-5xl mb-3 opacity-20"></i>
                                    <p>Tidak ada media ditemukan.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
