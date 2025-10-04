document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("filter-category");
    const yearSelect = document.getElementById("filter-year");
    const searchInput = document.getElementById("filter-search");
    const articleList = document.getElementById("article-list");
    const paginationLinks = document.getElementById("pagination-links");

    function fetchArticles(url = null) {
        let params = new URLSearchParams({
            category: categorySelect.value,
            year: yearSelect.value,
            search: searchInput.value,
        });

        fetch(url || `/berita-dan-artikel/filter?${params.toString()}`, {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                articleList.innerHTML = data.html;
                paginationLinks.innerHTML = data.pagination;

                // rebind pagination
                document
                    .querySelectorAll("#pagination-links a")
                    .forEach((link) => {
                        link.addEventListener("click", (e) => {
                            e.preventDefault();
                            fetchArticles(link.href);
                        });
                    });
            })
            .catch((err) => console.error(err));
    }

    // trigger filter
    categorySelect.addEventListener("change", () => fetchArticles());
    yearSelect.addEventListener("change", () => fetchArticles());
    searchInput.addEventListener(
        "keyup",
        _.debounce(() => fetchArticles(), 500)
    );

    // bind pagination awal
    document.querySelectorAll("#pagination-links a").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            fetchArticles(link.href);
        });
    });
});
