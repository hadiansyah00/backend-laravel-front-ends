import React, { useState, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import MediaPicker from "@/Components/MediaPicker";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Form({
    article,
    categories,
    tags: availableTagsList,
    selectedTags: initialSelectedTags,
}) {
    const isEdit = !!article;

    const [activeTab, setActiveTab] = useState("content"); // 'content' or 'seo'

    const { data, setData, post, processing, errors } = useForm({
        // Article Base
        category_id: article?.category_id || "",
        title: article?.title || "",
        slug: article?.slug || "",
        excerpt: article?.excerpt || "",
        content: article?.content || "",
        thumbnail: null,
        status: article?.status || "draft",
        published_at: article?.published_at
            ? new Date(article.published_at).toISOString().slice(0, 16)
            : "",
        tags: initialSelectedTags ? initialSelectedTags.join(", ") : "",

        // SEO Meta
        meta_description: article?.meta?.meta_description || "",
        // meta_keywords telah dihapus dari state initialization
        robots: article?.meta?.robots || "index, follow",
        canonical_url: article?.meta?.canonical_url || "",
        og_title: article?.meta?.og_title || "",
        og_description: article?.meta?.og_description || "",
        og_url: article?.meta?.og_url || "",
        og_type: article?.meta?.og_type || "article",
        og_site_name: article?.meta?.og_site_name || "",
        twitter_card: article?.meta?.twitter_card || "summary_large_image",
        twitter_title: article?.meta?.twitter_title || "",
        twitter_description: article?.meta?.twitter_description || "",
        twitter_site: article?.meta?.twitter_site || "",
        og_image: null,
        twitter_image: null,

        _method: isEdit ? "PUT" : "POST",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            post(route("admin.articles.update", article.id), {
                preserveScroll: true,
            });
        } else {
            post(route("admin.articles.store"), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {isEdit ? "Edit Artikel" : "Tulis Artikel Baru"}
                </h2>
            }
        >
            <Head title={isEdit ? "Edit Berita" : "Tulis Berita"} />

            <div className="max-w-6xl py-6 mx-auto">
                <div className="overflow-hidden bg-white border border-gray-100 shadow-sm dark:bg-gray-900 sm:rounded-2xl dark:border-gray-800">
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <Link
                                href={route("admin.articles.index")}
                                className="flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-gray-100 rounded-full dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {isEdit
                                    ? "Update Konten & SEO"
                                    : "Publikasi Artikel & Berita"}
                            </h3>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setActiveTab("content")}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${activeTab === "content" ? "bg-indigo-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"}`}
                            >
                                <i className="fas fa-edit mr-1.5"></i> Konten
                                Utama
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("seo")}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${activeTab === "seo" ? "bg-indigo-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"}`}
                            >
                                <i className="fas fa-search-dollar mr-1.5"></i>{" "}
                                Optimasi SEO
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">
                        {/* TAB: CONTENT */}
                        <div
                            className={
                                activeTab === "content"
                                    ? "block space-y-6"
                                    : "hidden"
                            }
                        >
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                <div className="space-y-6 lg:col-span-2">
                                    {/* Title */}
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Judul Artikel{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg font-medium ${errors.title ? "border-red-500" : ""}`}
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                            placeholder="Tuliskan judul artikel yang menarik..."
                                        />
                                        {errors.title && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>

                                    {/* Slug */}
                                    <div>
                                        <label className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                                            Slug URL (Kosongi untuk generate
                                            otomatis dari judul)
                                        </label>
                                        <div className="flex items-center overflow-hidden border border-gray-300 rounded-xl dark:border-gray-700 focus-within:border-indigo-500">
                                            <span className="px-3 py-2 text-sm text-gray-500 border-r border-gray-300 bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
                                                /berita/
                                            </span>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 text-sm bg-transparent border-0 focus:ring-0 dark:text-white"
                                                value={data.slug}
                                                onChange={(e) =>
                                                    setData(
                                                        "slug",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="contoh-judul-artikel-otomatis"
                                            />
                                        </div>
                                        {errors.slug && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.slug}
                                            </p>
                                        )}
                                    </div>

                                    {/* Content Area */}
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Isi Artikel{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div
                                            className={`prose max-w-none dark:prose-invert rounded-xl overflow-hidden [&>.ck-editor>.ck-editor__main>.ck-content]:min-h-[300px] [&>.ck-editor>.ck-editor__main>.ck-content]:bg-white dark:[&>.ck-editor>.ck-editor__main>.ck-content]:bg-gray-900 border ${errors.content ? "border-red-500" : "border-gray-300 dark:border-gray-700"}`}
                                        >
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={data.content || ""}
                                                onChange={(event, editor) => {
                                                    const data =
                                                        editor.getData();
                                                    setData("content", data);
                                                }}
                                                config={{
                                                    toolbar: [
                                                        "heading",
                                                        "|",
                                                        "bold",
                                                        "italic",
                                                        "link",
                                                        "blockQuote",
                                                        "bulletedList",
                                                        "numberedList",
                                                        "|",
                                                        "insertTable",
                                                        "undo",
                                                        "redo",
                                                    ],
                                                }}
                                            />
                                        </div>
                                        {errors.content && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.content}
                                            </p>
                                        )}
                                    </div>

                                    {/* Excerpt */}
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Kutipan Singkat (Excerpt)
                                        </label>
                                        <textarea
                                            rows={3}
                                            className="w-full text-sm border-gray-300 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.excerpt}
                                            onChange={(e) =>
                                                setData(
                                                    "excerpt",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Ringkasan singkat untuk ditampilkan di daftar artikel..."
                                        ></textarea>
                                        <p className="mt-1 text-xs text-gray-500">
                                            Jika kosong, sistem akan mengambil
                                            sebagian karakter pertama dari isi.
                                        </p>
                                    </div>
                                </div>

                                {/* Sidebar Config */}
                                <div className="space-y-6">
                                    <div className="p-5 space-y-5 border border-gray-100 bg-gray-50 dark:bg-gray-800/50 rounded-2xl dark:border-gray-800">
                                        <h4 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                                            <i className="text-indigo-500 fas fa-cog"></i>{" "}
                                            Publikasi
                                        </h4>

                                        <div>
                                            <label className="block mb-1 text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
                                                Status{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                className="w-full border-gray-300 rounded-xl shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                value={data.status}
                                                onChange={(e) =>
                                                    setData(
                                                        "status",
                                                        e.target.value,
                                                    )
                                                }
                                            >
                                                <option value="draft">
                                                    Draft (Utak-Atik)
                                                </option>
                                                <option value="published">
                                                    Published (Live)
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block mb-1 text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
                                                Tgl Publikasi
                                            </label>
                                            <input
                                                type="datetime-local"
                                                className="w-full border-gray-300 rounded-xl shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                value={data.published_at}
                                                onChange={(e) =>
                                                    setData(
                                                        "published_at",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-1 text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
                                                Kategori Utama{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                className={`w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.category_id ? "border-red-500" : ""}`}
                                                value={data.category_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "category_id",
                                                        e.target.value,
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    -- Pilih Kategori --
                                                </option>
                                                {categories.map((cat) => (
                                                    <option
                                                        key={cat.id}
                                                        value={cat.id}
                                                    >
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.category_id && (
                                                <p className="mt-1 text-xs text-red-600">
                                                    {errors.category_id}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block mb-1 text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
                                                Tags (Pisahkan dgn Koma)
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full border-gray-300 rounded-xl shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                value={data.tags}
                                                onChange={(e) =>
                                                    setData(
                                                        "tags",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Kesehatan, Medis, Kampus..."
                                            />
                                            <p className="mt-1 text-[10px] text-gray-500">
                                                Cth: Kampus, Pendidikan, Gizi
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-5 border border-gray-100 bg-gray-50 dark:bg-gray-800/50 rounded-2xl dark:border-gray-800">
                                        <h4 className="flex items-center gap-2 mb-4 font-bold text-gray-900 dark:text-white">
                                            <i className="text-indigo-500 fas fa-image"></i>{" "}
                                            Gambar Utama
                                        </h4>
                                        {data.thumbnail && (
                                            <div className="relative mb-4 overflow-hidden border border-gray-200 aspect-video rounded-xl dark:border-gray-700">
                                                <img
                                                    src={
                                                        data.thumbnail.startsWith(
                                                            "http",
                                                        ) ||
                                                        data.thumbnail.startsWith(
                                                            "/storage",
                                                        )
                                                            ? data.thumbnail
                                                            : `/storage/${data.thumbnail}`
                                                    }
                                                    alt="Thumbnail"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 cursor-not-allowed rounded-xl bg-gray-50 focus:ring-0 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                                placeholder="Pilih dari media library..."
                                                value={data.thumbnail || ""}
                                                readOnly
                                            />
                                            <MediaPicker
                                                onSelect={(url) =>
                                                    setData("thumbnail", url)
                                                }
                                                acceptType="image"
                                                trigger={
                                                    <button
                                                        type="button"
                                                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 transition border border-indigo-200 rounded-lg shrink-0 bg-indigo-50 hover:bg-indigo-100"
                                                    >
                                                        <i className="fas fa-folder-open"></i>{" "}
                                                        Media Library
                                                    </button>
                                                }
                                            />
                                        </div>
                                        {errors.thumbnail && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.thumbnail}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TAB: SEO METADATA */}
                        <div
                            className={
                                activeTab === "seo"
                                    ? "block space-y-6"
                                    : "hidden"
                            }
                        >
                            <div className="flex items-start gap-3 p-4 mb-6 border border-blue-100 bg-blue-50 dark:bg-blue-900/20 rounded-xl dark:border-blue-800/50">
                                <i className="fas fa-info-circle text-blue-600 dark:text-blue-400 mt-0.5"></i>
                                <div className="text-sm text-blue-800 dark:text-blue-300">
                                    <p className="font-semibold">
                                        Optimasi Mesin Pencari (SEO) & Open
                                        Graph (Media Sosial)
                                    </p>
                                    <p className="mt-1 leading-relaxed text-blue-700/80 dark:text-blue-200/70">
                                        Bagian ini opsional tetapi sangat
                                        disarankan untuk diisi. Algoritma
                                        pencarian Google dan Social Media
                                        Sharing (WA, IG, FB) sangat bergantung
                                        pada data ini agar preview link tampil
                                        sempurna.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                {/* Base Meta */}
                                <div className="space-y-5">
                                    <h4 className="pb-2 font-bold text-gray-900 border-b border-gray-100 dark:text-white dark:border-gray-800">
                                        Meta Tags (HTML)
                                    </h4>

                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Meta Description (Max 160 Karakter)
                                        </label>
                                        <textarea
                                            rows={2}
                                            className="w-full text-sm border-gray-300 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.meta_description}
                                            onChange={(e) =>
                                                setData(
                                                    "meta_description",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Deskripsi singkat untuk snippet Google..."
                                            maxLength="160"
                                        ></textarea>
                                        <div className="flex items-center justify-between mt-1">
                                            {errors.meta_description && (
                                                <p className="text-xs text-red-600">
                                                    {errors.meta_description}
                                                </p>
                                            )}
                                            <p className="text-[10px] text-gray-500 ml-auto">
                                                {data.meta_description.length}
                                                /160
                                            </p>
                                        </div>
                                    </div>

                                    {/* INPUT META KEYWORDS DIHAPUS DARI SINI */}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Robots
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                                                value={data.robots}
                                                onChange={(e) =>
                                                    setData(
                                                        "robots",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="index, follow"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Canonical URL
                                            </label>
                                            <input
                                                type="url"
                                                className="w-full text-sm border-gray-300 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                                                value={data.canonical_url}
                                                onChange={(e) =>
                                                    setData(
                                                        "canonical_url",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Open Graph WhatsApp/FB */}
                                <div className="space-y-5">
                                    <h4 className="pb-2 font-bold text-gray-900 border-b border-gray-100 dark:text-white dark:border-gray-800">
                                        Open Graph (WA, Facebook, IG)
                                    </h4>

                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                            OG Title
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full text-sm border-gray-300 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.og_title}
                                            onChange={(e) =>
                                                setData(
                                                    "og_title",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Otomatis gunakan Judul Artikel jika kosong"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                            OG Description
                                        </label>
                                        <textarea
                                            rows={2}
                                            className="w-full text-sm border-gray-300 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.og_description}
                                            onChange={(e) =>
                                                setData(
                                                    "og_description",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Otomatis gunakan Excerpt jika kosong"
                                        ></textarea>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                OG Type
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                                value={data.og_type}
                                                onChange={(e) =>
                                                    setData(
                                                        "og_type",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                OG Site Name
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                                value={data.og_site_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "og_site_name",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                OG Image (Preview Link WA/FB)
                                            </label>
                                            {data.og_image && (
                                                <div className="relative w-full h-32 mb-3 overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700">
                                                    <img
                                                        src={
                                                            data.og_image.startsWith(
                                                                "http",
                                                            ) ||
                                                            data.og_image.startsWith(
                                                                "/storage",
                                                            )
                                                                ? data.og_image
                                                                : `/storage/${data.og_image}`
                                                        }
                                                        alt="OG Cover"
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    className="w-full text-xs border-gray-300 rounded-xl cursor-not-allowed bg-gray-50 focus:ring-0 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                                    placeholder="Pilih dari media..."
                                                    value={data.og_image || ""}
                                                    readOnly
                                                />
                                                <MediaPicker
                                                    onSelect={(url) =>
                                                        setData("og_image", url)
                                                    }
                                                    acceptType="image"
                                                    trigger={
                                                        <button
                                                            type="button"
                                                            className="shrink-0 px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-gray-300 dark:border-gray-600"
                                                        >
                                                            <i className="fas fa-image"></i>{" "}
                                                            Pilih Foto
                                                        </button>
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Twitter Image
                                            </label>
                                            {data.twitter_image && (
                                                <div className="relative w-full h-32 mb-3 overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700">
                                                    <img
                                                        src={
                                                            data.twitter_image.startsWith(
                                                                "http",
                                                            ) ||
                                                            data.twitter_image.startsWith(
                                                                "/storage",
                                                            )
                                                                ? data.twitter_image
                                                                : `/storage/${data.twitter_image}`
                                                        }
                                                        alt="Twitter Cover"
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    className="w-full text-xs border-gray-300 rounded-xl cursor-not-allowed bg-gray-50 focus:ring-0 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                                    placeholder="Pilih dari media..."
                                                    value={
                                                        data.twitter_image || ""
                                                    }
                                                    readOnly
                                                />
                                                <MediaPicker
                                                    onSelect={(url) =>
                                                        setData(
                                                            "twitter_image",
                                                            url,
                                                        )
                                                    }
                                                    acceptType="image"
                                                    trigger={
                                                        <button
                                                            type="button"
                                                            className="shrink-0 px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-gray-300 dark:border-gray-600"
                                                        >
                                                            <i className="fas fa-image"></i>{" "}
                                                            Pilih Foto
                                                        </button>
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="sticky z-10 flex items-center justify-end w-full max-w-4xl gap-3 p-4 pt-6 mx-auto mt-8 border border-t border-gray-100 border-gray-200 shadow-lg dark:border-gray-800 bottom-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl dark:border-gray-700">
                            <span className="text-xs text-gray-500 mr-auto flex items-center gap-1.5 hidden sm:flex">
                                <i className="fas fa-save"></i> Pastikan semua
                                field wajib (*) telah disi.
                            </span>
                            <Link
                                href={route("admin.articles.index")}
                                className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md shadow-indigo-500/20"
                            >
                                {processing ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>{" "}
                                        Menyimpan Data...
                                    </>
                                ) : (
                                    <>
                                        <i className="mr-1 text-indigo-300 fas fa-paper-plane"></i>{" "}
                                        Simpan Artikel & Meta
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
