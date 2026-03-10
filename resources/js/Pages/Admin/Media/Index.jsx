import React, { useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ media, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.media.index'), { search: searchQuery }, { preserveState: true, preserveScroll: true });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleUpload(e.target.files[0]);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleUpload(e.dataTransfer.files[0]);
        }
    };

    const handleUpload = (file) => {
        if (file.size > 10 * 1024 * 1024) {
            alert("Ukuran file maksimal 10MB");
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('collection_name', 'default');

        router.post(route('admin.media.store'), formData, {
            preserveScroll: true,
            onProgress: (progress) => {
                setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
            },
            onSuccess: () => {
                setUploading(false);
                setUploadProgress(0);
            },
            onError: () => {
                setUploading(false);
                setUploadProgress(0);
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Hapus media ini secara permanen?')) {
            router.delete(route('admin.media.destroy', id), { preserveScroll: true });
        }
    };

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url);
        alert('URL berhasil disalin!');
    };

    // Format bytes
    const formatBytes = (bytes, decimals = 2) => {
        if (!+bytes) return '0 Bytes'
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    };

    const mediaList = media?.data || [];

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Media Library</h2>}>
            <Head title="Media Library" />

            <div className="max-w-7xl mx-auto py-6">

                {/* Uploader Box */}
                <div
                    className={`mb-6 border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900'}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,application/pdf"
                    />

                    {!uploading ? (
                        <div>
                            <div className="w-16 h-16 mx-auto bg-indigo-50 dark:bg-indigo-900/40 text-indigo-500 rounded-full flex items-center justify-center mb-4">
                                <i className="fas fa-cloud-upload-alt text-2xl"></i>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upload Media Baru</h3>
                            <p className="mt-2 text-sm text-gray-500">Drag and drop file di sini, atau <button type="button" onClick={() => fileInputRef.current?.click()} className="text-indigo-600 font-semibold hover:underline">Pilih File</button></p>
                            <p className="text-xs text-gray-400 mt-2">Maksimal 10MB. Format: JPG, PNG, GIF, PDF.</p>
                        </div>
                    ) : (
                        <div className="py-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Mengunggah... {uploadProgress}%</h3>
                            <div className="w-full max-w-md mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Toolbar */}
                <div className="bg-white dark:bg-gray-900 shadow-sm rounded-2xl border border-gray-100 dark:border-gray-800 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <i className="fas fa-photo-video text-gray-400 text-xl"></i>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">File Tersimpan ({media?.total || 0})</span>
                    </div>

                    <form onSubmit={handleSearch} className="flex relative w-full sm:w-auto">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama file..."
                            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </form>
                </div>

                {/* Grid */}
                {mediaList.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {mediaList.map(item => (
                            <div key={item.id} className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">

                                {/* Thumbnail */}
                                <div className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative overflow-hidden">
                                    {item.mime_type?.startsWith('image/') ? (
                                        <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <i className="fas fa-file-pdf text-4xl text-red-400"></i>
                                    )}

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                                        <button onClick={() => window.open(item.url, '_blank')} className="w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white hover:text-gray-900 flex items-center justify-center transition" title="Lihat">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button onClick={() => copyToClipboard(item.url)} className="w-10 h-10 rounded-full bg-indigo-500/80 text-white hover:bg-indigo-600 flex items-center justify-center transition" title="Salin URL">
                                            <i className="fas fa-copy"></i>
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="w-10 h-10 rounded-full bg-red-500/80 text-white hover:bg-red-600 flex items-center justify-center transition" title="Hapus">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-3">
                                    <p className="text-xs font-semibold text-gray-900 dark:text-white truncate" title={item.name}>{item.name}</p>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-[10px] text-gray-500 uppercase">{item.mime_type?.split('/')[1] || 'FILE'}</p>
                                        <p className="text-[10px] text-gray-500">{formatBytes(item.size)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-800">
                        <i className="fas fa-folder-open text-5xl text-gray-300 dark:text-gray-700 mb-4"></i>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">Belum Ada Media</h4>
                        <p className="text-sm text-gray-500 mt-1">Gunakan form upload di atas untuk menambahkan file gambar atau dokumen.</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
