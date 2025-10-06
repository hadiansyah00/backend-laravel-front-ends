document.addEventListener("DOMContentLoaded", () => {
    const articlesContainer = document.getElementById("articlesContainer");
    const paginationLinks = document.getElementById("paginationLinks");
    const filterCategory = document.getElementById("filter-category"); // <select>
    const categoryList = document.getElementById("category-list"); // <ul> kategori
    const filterYear = document.getElementById("filter-year");
    const searchForm = document.getElementById("search-form");

    let activeCategory = ""; // simpan kategori aktif

    async function fetchArticles(page = 1) {
        const year = filterYear?.value || "";
        const search =
            searchForm?.querySelector("input[name='search']")?.value || "";
        const category = activeCategory || filterCategory?.value || "";

        let url = `/api/articles?page=${page}`;
        if (category) url += `&category=${category}`;
        if (year) url += `&year=${year}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;

        try {
            const response = await fetch(url, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            });
            const res = await response.json();

            // Ambil data & pagination dengan fallback agar tidak undefined
            const articles = res.data ?? [];
            const pagination = res.pagination ?? {
                current_page: res.current_page ?? 1,
                last_page: res.last_page ?? 1,
                per_page: res.per_page ?? 6,
                total: res.total ?? 0,
            };

            // Kosongkan container artikel
            articlesContainer.innerHTML = "";

            if (!articles.length) {
                articlesContainer.innerHTML = `
                    <p class="col-span-3 text-center text-gray-500">Tidak ada artikel ditemukan.</p>
                `;
                paginationLinks.innerHTML = "";
                return;
            }

            // Render artikel
            articles.forEach((article) => {
                const card = `
                <a href="/artikel/${article.slug}" class="block group">
                    <div class="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1">
                        <div class="overflow-hidden">
                            <img src="/storage/${article.thumbnail}" alt="${
                    article.title
                }"
                                class="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105">
                        </div>
                        <div class="flex flex-col flex-grow p-4">
                            <span class="inline-block px-2 py-1 mb-3 text-xs font-semibold tracking-wide text-orange-800 uppercase bg-orange-100 rounded-full w-fit">
                                ${article.category?.name ?? "Uncategorized"}
                            </span>
                            <h2 class="text-lg font-bold text-gray-800 group-hover:text-orange-600">
                                ${article.title}
                            </h2>
                            <p class="mt-2 text-sm text-gray-600 line-clamp-3">
                                ${article.excerpt}
                            </p>
                            <div class="pt-4 mt-auto text-xs text-gray-500">
                                <span>Diterbitkan pada ${new Date(
                                    article.published_at
                                ).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}</span>
                            </div>
                        </div>
                    </div>
                </a>`;
                articlesContainer.insertAdjacentHTML("beforeend", card);
            });

            // Render pagination
            paginationLinks.innerHTML = "";
            for (let pageNum = 1; pageNum <= pagination.last_page; pageNum++) {
                const btn = document.createElement("button");
                btn.innerText = pageNum;
                btn.className = `px-3 py-1 rounded ${
                    pageNum === pagination.current_page
                        ? "bg-orange-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                }`;
                btn.addEventListener("click", () => fetchArticles(pageNum));
                paginationLinks.appendChild(btn);
            }
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    }

    // 🔹 Dropdown kategori (select)
    if (filterCategory) {
        filterCategory.addEventListener("change", (e) => {
            activeCategory = e.target.value;
            fetchArticles();
        });
    }

    // 🔹 List kategori (ul)
    if (categoryList) {
        categoryList.querySelectorAll(".category-link").forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                activeCategory = link.dataset.id || "";
                fetchArticles();
            });
        });
    }

    // 🔹 Filter tahun
    if (filterYear)
        filterYear.addEventListener("change", () => fetchArticles());

    // 🔹 Pencarian
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            fetchArticles();
        });
    }

    // 🔹 Load awal
    fetchArticles();
});
