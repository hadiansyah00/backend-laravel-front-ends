import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import MediaPicker from "@/Components/MediaPicker";

export default function Index({ data, types }) {
    const typeKeys = Object.keys(types);
    const [activeTab, setActiveTab] = useState(typeKeys[0]);

    // --- INISIALISASI DATA ---
    const getInitialData = (type) => {
        const item = data[type] || {};
        let parsedContent = item.content || "";

        let heroData = {
            sliders: [
                {
                    image: "",
                    subtitle: "",
                    title: "",
                    description: "",
                    link: "",
                    link_text: "",
                },
            ],
        };

        let quickActionData = {
            subtitle: "",
            button_text: "",
            button_link: "",
            info_title: "",
            info_subtitle: "",
            info_link_text: "",
            info_link: "",
        };

        let programStudiData = {
            badge: "Akademik",
            description: "",
        };

        let videoProfilData = {
            badge: "Company Profile",
            description: "",
            video_url: "",
        };

        if (item.content) {
            try {
                const parsed = JSON.parse(item.content);
                if (type === "hero" && parsed.sliders) {
                    heroData = { ...heroData, ...parsed };
                    if (!heroData.sliders.length) {
                        heroData.sliders.push({
                            image: "",
                            subtitle: "",
                            title: "",
                            description: "",
                            link: "",
                            link_text: "",
                        });
                    }
                } else if (type === "quick_action") {
                    quickActionData = { ...quickActionData, ...parsed };
                } else if (type === "program_studi") {
                    programStudiData = { ...programStudiData, ...parsed };
                } else if (type === "video_profil") {
                    videoProfilData = { ...videoProfilData, ...parsed };
                }
            } catch (e) {
                // Abaikan jika bukan JSON
            }
        }

        return {
            type: type,
            title: item.title || "",
            content: typeof parsedContent === "string" ? parsedContent : "",
            heroData: heroData,
            quickActionData: quickActionData,
            programStudiData: programStudiData,
            videoProfilData: videoProfilData,
            image: item.image || "",
            is_active: item.is_active ?? true,
        };
    };

    const {
        data: formData,
        setData,
        post,
        processing,
        errors,
        transform,
    } = useForm(getInitialData(activeTab));

    // --- TAB HANDLER ---
    const handleTabChange = (type) => {
        setActiveTab(type);
        setData(getInitialData(type));
    };

    // --- HELPER: SLIDER ---
    const updateSlider = (index, field, value) => {
        setData((prevData) => {
            const newSliders = [...prevData.heroData.sliders];
            newSliders[index] = { ...newSliders[index], [field]: value };
            return {
                ...prevData,
                heroData: { ...prevData.heroData, sliders: newSliders },
            };
        });
    };

    const addSlider = () => {
        setData((prevData) => ({
            ...prevData,
            heroData: {
                ...prevData.heroData,
                sliders: [
                    ...prevData.heroData.sliders,
                    {
                        image: "",
                        subtitle: "",
                        title: "",
                        description: "",
                        link: "",
                        link_text: "",
                    },
                ],
            },
        }));
    };

    const removeSlider = (index) => {
        setData((prevData) => ({
            ...prevData,
            heroData: {
                ...prevData.heroData,
                sliders: prevData.heroData.sliders.filter(
                    (_, i) => i !== index,
                ),
            },
        }));
    };

    // --- HELPER: TESTIMONI ---
    const updateTestimoni = (index, field, value) => {
        setData((prevData) => {
            const newItems = [...prevData.testimoniData.items];
            newItems[index] = { ...newItems[index], [field]: value };
            return {
                ...prevData,
                testimoniData: { ...prevData.testimoniData, items: newItems },
            };
        });
    };

    const addTestimoni = () => {
        setData((prevData) => ({
            ...prevData,
            testimoniData: {
                ...prevData.testimoniData,
                items: [
                    ...prevData.testimoniData.items,
                    { name: "", role: "", photo: "", message: "" },
                ],
            },
        }));
    };

    const removeTestimoni = (index) => {
        setData((prevData) => ({
            ...prevData,
            testimoniData: {
                ...prevData.testimoniData,
                items: prevData.testimoniData.items.filter(
                    (_, i) => i !== index,
                ),
            },
        }));
    };

    // --- SUBMIT HANDLER ---
    const handleSubmit = (e) => {
        e.preventDefault();

        // Memformat data payload sebelum dikirim menggunakan transform Inertia
        transform((currentData) => {
            let payload = { ...currentData };

            if (payload.type === "hero") {
                payload.content = JSON.stringify({
                    sliders: payload.heroData.sliders.filter((s) => s.title),
                });
            } else if (payload.type === "quick_action") {
                payload.content = JSON.stringify(payload.quickActionData);
            } else if (payload.type === "program_studi") {
                payload.content = JSON.stringify(payload.programStudiData);
            } else if (payload.type === "video_profil") {
                payload.content = JSON.stringify(payload.videoProfilData);
            } else if (payload.type === "testimoni") {
                payload.content = JSON.stringify({
                    badge: payload.testimoniData.badge,
                    description: payload.testimoniData.description,
                    items: payload.testimoniData.items,
                });
            }

            return payload;
        });

        // Eksekusi request post
        post(route("admin.beranda.store"), {
            preserveScroll: true,
            onError: (err) => {
                toast.error("Gagal menyimpan data. Cek kembali form Anda.");
                console.error("Error validasi:", err);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Manajemen Beranda
                </h2>
            }
        >
            <Head title="Beranda" />

            <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white border border-gray-100 shadow-sm dark:bg-gray-900 sm:rounded-2xl dark:border-gray-800">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav
                            className="flex p-4 overflow-x-auto"
                            aria-label="Tabs"
                        >
                            {typeKeys.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => handleTabChange(type)}
                                    type="button"
                                    className={`whitespace-nowrap py-3 px-5 mr-2 rounded-xl text-sm font-medium transition-colors ${
                                        activeTab === type
                                            ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-bold"
                                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
                                    }`}
                                >
                                    {types[type]}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Form Section */}
                    <div className="p-6 sm:p-8">
                        <form
                            onSubmit={handleSubmit}
                            className="max-w-4xl space-y-6"
                        >
                            {/* Header Form */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        Pengaturan {types[activeTab]}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Ubah konten khusus untuk bagian ini.
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <label className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Status Publikasi
                                    </label>
                                    <select
                                        className="border-gray-300 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={formData.is_active ? "1" : "0"}
                                        onChange={(e) =>
                                            setData(
                                                "is_active",
                                                e.target.value === "1",
                                            )
                                        }
                                    >
                                        <option value="1">Aktif</option>
                                        <option value="0">Nonaktif</option>
                                    </select>
                                </div>
                            </div>

                            {/* Input: Judul Internal */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Judul Section Internal{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.title ? "border-red-500" : ""}`}
                                    value={formData.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    placeholder={`Cth: ${types[activeTab]}`}
                                    required
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* TAB: HERO */}
                            {activeTab === "hero" && (
                                <div className="space-y-8">
                                    <div className="p-6 space-y-4 border border-gray-200 bg-gray-50 dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-gray-900 dark:text-white">
                                                Daftar Slider
                                            </h4>
                                            <button
                                                type="button"
                                                onClick={addSlider}
                                                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg"
                                            >
                                                <i className="fas fa-plus"></i>{" "}
                                                Tambah Slider
                                            </button>
                                        </div>

                                        <div className="mt-4 space-y-6">
                                            {formData.heroData.sliders.map(
                                                (slider, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative flex flex-col gap-4 p-4 bg-white border border-gray-200 dark:bg-gray-900 rounded-xl"
                                                    >
                                                        <div className="absolute text-xs font-bold text-gray-300 top-4 right-4">
                                                            #{index + 1}
                                                        </div>

                                                        <div>
                                                            <label className="block mb-1 text-xs font-medium text-gray-500">
                                                                Gambar Slider
                                                            </label>
                                                            <div className="flex items-center gap-4 mb-2">
                                                                {slider.image ? (
                                                                    <div className="w-16 h-12 overflow-hidden border border-gray-200 rounded shadow-sm dark:border-gray-700 shrink-0">
                                                                        <img
                                                                            src={
                                                                                slider.image.startsWith(
                                                                                    "http",
                                                                                ) ||
                                                                                slider.image.startsWith(
                                                                                    "/",
                                                                                )
                                                                                    ? slider.image
                                                                                    : `/storage/${slider.image}`
                                                                            }
                                                                            alt="Preview"
                                                                            className="object-cover w-full h-full"
                                                                            onError={(
                                                                                e,
                                                                            ) => {
                                                                                e.target.src =
                                                                                    "https://via.placeholder.com/150?text=Error";
                                                                            }}
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <div className="w-16 h-12 rounded border-2 border-dashed border-gray-300 flex items-center justify-center shrink-0 bg-gray-50 text-gray-400 text-[10px]">
                                                                        No Image
                                                                    </div>
                                                                )}
                                                                <div className="flex flex-1 gap-2">
                                                                    <input
                                                                        type="text"
                                                                        className="w-full text-sm border-gray-300 rounded-lg py-1.5 bg-gray-50"
                                                                        value={
                                                                            slider.image
                                                                        }
                                                                        readOnly
                                                                    />
                                                                    <MediaPicker
                                                                        onSelect={(
                                                                            url,
                                                                        ) =>
                                                                            updateSlider(
                                                                                index,
                                                                                "image",
                                                                                url,
                                                                            )
                                                                        }
                                                                        trigger={
                                                                            <button
                                                                                type="button"
                                                                                className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold"
                                                                            >
                                                                                Pilih
                                                                                Media
                                                                            </button>
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                            <div>
                                                                <label className="block mb-1 text-xs font-medium text-gray-500">
                                                                    Subtitle
                                                                    (Badge)
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                    value={
                                                                        slider.subtitle
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updateSlider(
                                                                            index,
                                                                            "subtitle",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block mb-1 text-xs font-medium text-gray-500">
                                                                    Judul Utama
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                    value={
                                                                        slider.title
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updateSlider(
                                                                            index,
                                                                            "title",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block mb-1 text-xs font-medium text-gray-500">
                                                                Deskripsi
                                                                Singkat
                                                            </label>
                                                            <textarea
                                                                rows={2}
                                                                className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                value={
                                                                    slider.description
                                                                }
                                                                onChange={(e) =>
                                                                    updateSlider(
                                                                        index,
                                                                        "description",
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                            <div>
                                                                <label className="block mb-1 text-xs font-medium text-gray-500">
                                                                    Label Tombol
                                                                    Link
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                    value={
                                                                        slider.link_text
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updateSlider(
                                                                            index,
                                                                            "link_text",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block mb-1 text-xs font-medium text-gray-500">
                                                                    URL Link
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                    value={
                                                                        slider.link
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updateSlider(
                                                                            index,
                                                                            "link",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="mt-2 text-right">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeSlider(
                                                                        index,
                                                                    )
                                                                }
                                                                className="text-xs font-medium text-red-500 hover:text-red-700"
                                                            >
                                                                <i className="mr-1 fas fa-trash"></i>{" "}
                                                                Hapus Slider
                                                            </button>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB: QUICK ACTION */}
                            {activeTab === "quick_action" && (
                                <div className="space-y-6">
                                    <div className="p-6 space-y-4 border border-gray-200 bg-gray-50 dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                                        <h4 className="mb-2 font-bold text-gray-900 dark:text-white">
                                            Seksi Kiri (Pendaftaran)
                                        </h4>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Deskripsi Pendaftaran
                                            </label>
                                            <textarea
                                                rows={3}
                                                className="w-full py-2 text-sm border-gray-300 rounded-xl"
                                                value={
                                                    formData.quickActionData
                                                        .subtitle
                                                }
                                                onChange={(e) =>
                                                    setData("quickActionData", {
                                                        ...formData.quickActionData,
                                                        subtitle:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Label Tombol
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full text-sm border-gray-300 rounded-xl"
                                                    value={
                                                        formData.quickActionData
                                                            .button_text
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "quickActionData",
                                                            {
                                                                ...formData.quickActionData,
                                                                button_text:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Link Tombol (URL)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full text-sm border-gray-300 rounded-xl"
                                                    value={
                                                        formData.quickActionData
                                                            .button_link
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "quickActionData",
                                                            {
                                                                ...formData.quickActionData,
                                                                button_link:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-4 border border-gray-200 bg-gray-50 dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                                        <h4 className="mb-2 font-bold text-gray-900 dark:text-white">
                                            Seksi Kanan (Informasi)
                                        </h4>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Judul Informasi
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-xl"
                                                value={
                                                    formData.quickActionData
                                                        .info_title
                                                }
                                                onChange={(e) =>
                                                    setData("quickActionData", {
                                                        ...formData.quickActionData,
                                                        info_title:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Deskripsi Informasi
                                            </label>
                                            <textarea
                                                rows={3}
                                                className="w-full py-2 text-sm border-gray-300 rounded-xl"
                                                value={
                                                    formData.quickActionData
                                                        .info_subtitle
                                                }
                                                onChange={(e) =>
                                                    setData("quickActionData", {
                                                        ...formData.quickActionData,
                                                        info_subtitle:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Label Tombol Informasi
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full text-sm border-gray-300 rounded-xl"
                                                    value={
                                                        formData.quickActionData
                                                            .info_link_text
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "quickActionData",
                                                            {
                                                                ...formData.quickActionData,
                                                                info_link_text:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Link Tombol Informasi
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full text-sm border-gray-300 rounded-xl"
                                                    value={
                                                        formData.quickActionData
                                                            .info_link
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "quickActionData",
                                                            {
                                                                ...formData.quickActionData,
                                                                info_link:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB: PROGRAM STUDI */}
                            {activeTab === "program_studi" && (
                                <div className="space-y-6">
                                    <div className="p-6 space-y-4 border border-gray-200 bg-gray-50 dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Badge Title
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-xl"
                                                value={
                                                    formData.programStudiData
                                                        .badge
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "programStudiData",
                                                        {
                                                            ...formData.programStudiData,
                                                            badge: e.target
                                                                .value,
                                                        },
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Deskripsi Pengantar
                                            </label>
                                            <textarea
                                                rows={4}
                                                className="w-full py-2 text-sm border-gray-300 rounded-xl"
                                                value={
                                                    formData.programStudiData
                                                        .description
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "programStudiData",
                                                        {
                                                            ...formData.programStudiData,
                                                            description:
                                                                e.target.value,
                                                        },
                                                    )
                                                }
                                            />
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500">
                                            *Data daftar program studi tetap
                                            diambil dari modul Program Studi
                                            secara otomatis.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* TAB: VIDEO PROFIL */}
                            {activeTab === "video_profil" && (
                                <div className="space-y-6">
                                    <div className="p-6 space-y-4 border border-gray-200 bg-gray-50 dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Badge Title
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-xl"
                                                value={
                                                    formData.videoProfilData
                                                        .badge
                                                }
                                                onChange={(e) =>
                                                    setData("videoProfilData", {
                                                        ...formData.videoProfilData,
                                                        badge: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Deskripsi Profil
                                            </label>
                                            <textarea
                                                rows={4}
                                                className="w-full py-2 text-sm border-gray-300 rounded-xl"
                                                value={
                                                    formData.videoProfilData
                                                        .description
                                                }
                                                onChange={(e) =>
                                                    setData("videoProfilData", {
                                                        ...formData.videoProfilData,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                URL Video YouTube
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-xl"
                                                value={
                                                    formData.videoProfilData
                                                        .video_url
                                                }
                                                onChange={(e) =>
                                                    setData("videoProfilData", {
                                                        ...formData.videoProfilData,
                                                        video_url:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB: TESTIMONI */}
                            {/* {activeTab === "testimoni" && (
                                <div className="space-y-6">
                                    <div className="p-6 space-y-4 border border-gray-200 bg-gray-50 dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Badge Title
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full text-sm border-gray-300 rounded-xl"
                                                    value={
                                                        formData.testimoniData
                                                            .badge
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "testimoniData",
                                                            {
                                                                ...formData.testimoniData,
                                                                badge: e.target
                                                                    .value,
                                                            },
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Deskripsi
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    className="w-full text-sm border-gray-300 rounded-xl"
                                                    value={
                                                        formData.testimoniData
                                                            .description
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "testimoniData",
                                                            {
                                                                ...formData.testimoniData,
                                                                description:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-4 border border-gray-200 bg-gray-50 dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="font-bold text-gray-900 dark:text-white">
                                                Daftar Testimoni
                                            </h4>
                                            <button
                                                type="button"
                                                onClick={addTestimoni}
                                                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg"
                                            >
                                                <i className="fas fa-plus"></i>{" "}
                                                Tambah Testimoni
                                            </button>
                                        </div>

                                        <div className="space-y-6">
                                            {formData.testimoniData.items.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative flex flex-col gap-4 p-4 bg-white border border-gray-200 dark:bg-gray-900 rounded-xl"
                                                    >
                                                        <div className="absolute text-xs font-bold text-gray-300 top-4 right-4">
                                                            #{index + 1}
                                                        </div>

                                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                            <div>
                                                                <label className="block mb-1 text-xs font-medium text-gray-500">
                                                                    Nama Alumni
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                    value={
                                                                        item.name
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updateTestimoni(
                                                                            index,
                                                                            "name",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block mb-1 text-xs font-medium text-gray-500">
                                                                    Profesi /
                                                                    Instansi
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                    value={
                                                                        item.role
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updateTestimoni(
                                                                            index,
                                                                            "role",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block mb-1 text-xs font-medium text-gray-500">
                                                                Pesan Testimoni
                                                            </label>
                                                            <textarea
                                                                rows={3}
                                                                className="w-full text-sm border-gray-300 rounded-lg py-1.5"
                                                                value={
                                                                    item.message
                                                                }
                                                                onChange={(e) =>
                                                                    updateTestimoni(
                                                                        index,
                                                                        "message",
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block mb-1 text-xs font-medium text-gray-500">
                                                                Foto Alumni
                                                            </label>
                                                            <div className="flex items-center gap-4 mb-2">
                                                                {item.photo ? (
                                                                    <div className="w-12 h-12 overflow-hidden border border-gray-200 rounded-full shadow-sm dark:border-gray-700 shrink-0">
                                                                        <img
                                                                            src={
                                                                                item.photo.startsWith(
                                                                                    "http",
                                                                                ) ||
                                                                                item.photo.startsWith(
                                                                                    "/",
                                                                                )
                                                                                    ? item.photo
                                                                                    : `/storage/${item.photo}`
                                                                            }
                                                                            alt="Preview"
                                                                            className="object-cover w-full h-full"
                                                                            onError={(
                                                                                e,
                                                                            ) => {
                                                                                e.target.src =
                                                                                    "https://via.placeholder.com/150?text=Error";
                                                                            }}
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center justify-center w-12 h-12 text-xs text-gray-400 border-2 border-gray-300 border-dashed rounded-full shrink-0 bg-gray-50">
                                                                        <i className="fas fa-user"></i>
                                                                    </div>
                                                                )}
                                                                <div className="flex flex-1 gap-2">
                                                                    <input
                                                                        type="text"
                                                                        className="w-full text-sm border-gray-300 rounded-lg py-1.5 bg-gray-50"
                                                                        value={
                                                                            item.photo
                                                                        }
                                                                        readOnly
                                                                    />
                                                                    <MediaPicker
                                                                        onSelect={(
                                                                            url,
                                                                        ) =>
                                                                            updateTestimoni(
                                                                                index,
                                                                                "photo",
                                                                                url,
                                                                            )
                                                                        }
                                                                        trigger={
                                                                            <button
                                                                                type="button"
                                                                                className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold"
                                                                            >
                                                                                Pilih
                                                                                Media
                                                                            </button>
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-2 text-right">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeTestimoni(
                                                                        index,
                                                                    )
                                                                }
                                                                className="text-xs font-medium text-red-500 hover:text-red-700"
                                                            >
                                                                <i className="mr-1 fas fa-trash"></i>{" "}
                                                                Hapus Testimoni
                                                            </button>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )} */}

                            {/* FOOTER FORM (TOMBOL SIMPAN) */}
                            <div className="flex justify-end gap-3 px-6 py-4 pt-6 -mx-6 -mb-6 border-t border-gray-100 dark:border-gray-800 rounded-b-2xl bg-gray-50/50 dark:bg-gray-800/30">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
                                >
                                    {processing ? (
                                        <i className="fas fa-spinner fa-spin"></i>
                                    ) : (
                                        <i className="fas fa-save"></i>
                                    )}
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
