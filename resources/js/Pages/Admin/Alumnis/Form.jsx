import React, { useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import MediaPicker from "@/Components/MediaPicker";

export default function Form({ alumni, programStudis }) {
    const isEdit = !!alumni;
    const photoInputRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        name: alumni?.name || '',
        nim: alumni?.nim || '',
        program_studi_id: alumni?.program_studi_id || '',
        tahun_lulus: alumni?.tahun_lulus || '',
        tempat_kerja: alumni?.tempat_kerja || '',
        jabatan: alumni?.jabatan || '',
        testimonial: alumni?.testimonial || '',
        photo: null,
        is_featured: alumni?.is_featured ?? false,
        is_active: alumni?.is_active ?? true,
        _method: isEdit ? 'PUT' : 'POST'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            post(route('admin.alumnis.update', alumni.id), { preserveScroll: true });
        } else {
            post(route('admin.alumnis.store'), { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {isEdit ? 'Edit Data Alumni' : 'Tambah Alumni Baru'}
                </h2>
            }
        >
            <Head title={isEdit ? 'Edit Alumni' : 'Tambah Alumni'} />

            <div className="max-w-5xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">

                    {/* Header */}
                    <div className="p-6 border-b flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href={route('admin.alumnis.index')} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                                ←
                            </Link>
                            <h3 className="text-lg font-bold">
                                {isEdit ? 'Update Alumni' : 'Tambah Alumni'}
                            </h3>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">

                        {/* IDENTITAS */}
                        <div className="space-y-6">
                            <h4 className="font-bold text-indigo-600">Identitas</h4>

                            <input
                                type="text"
                                placeholder="Nama Alumni"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full rounded-xl"
                            />
                            {errors.name && <p className="text-red-500">{errors.name}</p>}

                            <input
                                type="text"
                                placeholder="NIM"
                                value={data.nim}
                                onChange={e => setData('nim', e.target.value)}
                                className="w-full rounded-xl"
                            />

                            <input
                                type="number"
                                placeholder="Tahun Lulus"
                                value={data.tahun_lulus}
                                onChange={e => setData('tahun_lulus', e.target.value)}
                                className="w-full rounded-xl"
                            />

                            {/* PROGRAM STUDI */}
                            <select
                                value={data.program_studi_id}
                                onChange={e => setData('program_studi_id', e.target.value)}
                                className="w-full rounded-xl"
                            >
                                <option value="">Pilih Program Studi</option>
                                {programStudis.map(p => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                            {errors.program_studi_id && <p className="text-red-500">{errors.program_studi_id}</p>}
                        </div>

                        {/* KARIR */}
                        <div className="space-y-6">
                            <h4 className="font-bold text-indigo-600">Karir</h4>

                            <input
                                type="text"
                                placeholder="Tempat Kerja"
                                value={data.tempat_kerja}
                                onChange={e => setData('tempat_kerja', e.target.value)}
                                className="w-full rounded-xl"
                            />

                            <input
                                type="text"
                                placeholder="Jabatan"
                                value={data.jabatan}
                                onChange={e => setData('jabatan', e.target.value)}
                                className="w-full rounded-xl"
                            />

                            <textarea
                                placeholder="Testimoni"
                                value={data.testimonial}
                                onChange={e => setData('testimonial', e.target.value)}
                                className="w-full rounded-xl"
                            />
                        </div>

                        {/* FOTO */}
                        <div className="p-5 border border-gray-100 bg-gray-50 dark:bg-gray-800/50 rounded-2xl dark:border-gray-800">
    
    <h4 className="flex items-center gap-2 mb-4 font-bold text-gray-900 dark:text-white">
        <i className="text-indigo-500 fas fa-image"></i> Foto Alumni
    </h4>

    {/* PREVIEW */}
    {data.photo && (
        <div className="relative mb-4 overflow-hidden border border-gray-200 w-24 h-24 rounded-full dark:border-gray-700">
            <img
                src={
                    data.photo.startsWith("http") ||
                    data.photo.startsWith("/storage")
                        ? data.photo
                        : `/storage/${data.photo}`
                }
                alt="Photo"
                className="object-cover w-full h-full"
            />
        </div>
    )}

    {/* INPUT */}
    <div className="flex items-center gap-3">
        <input
            type="text"
            className="w-full text-sm border-gray-300 cursor-not-allowed rounded-xl bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            placeholder="Pilih dari media library..."
            value={data.photo || ""}
            readOnly
        />

        <MediaPicker
            onSelect={(url) => setData("photo", url)}
            acceptType="image"
            trigger={
                <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-lg bg-indigo-50 hover:bg-indigo-100"
                >
                    <i className="fas fa-folder-open"></i> Media
                </button>
            }
        />
    </div>

    {errors.photo && (
        <p className="mt-1 text-xs text-red-600">
            {errors.photo}
        </p>
    )}
</div>

                        {/* STATUS */}
                        <div className="space-y-4">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                />
                                Aktif
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={e => setData('is_featured', e.target.checked)}
                                />
                                Featured (Tampil di Beranda)
                            </label>
                        </div>

                        {/* ACTION */}
                        <div className="flex justify-end gap-3">
                            <Link href={route('admin.alumnis.index')}>
                                Batal
                            </Link>

                            <button disabled={processing} className="bg-indigo-600 text-white px-4 py-2 rounded-xl">
                                Simpan
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}