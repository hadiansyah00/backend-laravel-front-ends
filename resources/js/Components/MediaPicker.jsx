import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function MediaPicker({ onSelect, trigger }) {
    const [isOpen, setIsOpen] = useState(false);
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState('');
    const fileInputRef = useRef(null);

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const res = await axios.get(route('admin.media.index'), {
                params: { search },
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
    }, [isOpen, search]);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            alert('Maksimal ukuran file 10MB');
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
            alert('Upload gagal');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleSelect = (item) => {
        onSelect(item.url);
        setIsOpen(false);
    };

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
                            <div className="flex gap-2 w-full sm:w-auto">
                                <input
                                    type="text"
                                    placeholder="Cari file..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg px-4 py-2 text-sm w-full sm:w-64 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*,application/pdf" />
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
                                                    <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                ) : (
                                                    <i className="fas fa-file-pdf text-4xl text-red-500 group-hover:scale-110 transition-transform"></i>
                                                )}
                                            </div>
                                            <div className="p-2 text-center">
                                                <p className="text-[11px] font-medium text-gray-700 dark:text-gray-300 truncate" title={item.name}>{item.name}</p>
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
