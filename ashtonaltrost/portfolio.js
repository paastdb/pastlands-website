
const pages = document.querySelectorAll(".project-page");
const pageButtons = document.querySelectorAll("[data-target]");
const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");

let currentPage = 1;
const totalPages = pages.length;

function showPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    currentPage = pageNumber;

    pages.forEach((page) => {
        page.classList.toggle(
            "active",
            Number(page.dataset.page) === currentPage
        );
    });

    pageButtons.forEach((button) => {
        const isActive = Number(button.dataset.target) === currentPage;

        button.classList.toggle("active", isActive);

        if (isActive) {
            button.setAttribute("aria-current", "page");
        } else {
            button.removeAttribute("aria-current");
        }
    });

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

pageButtons.forEach((button) => {
    button.addEventListener("click", () => {
        showPage(Number(button.dataset.target));
    });
});

prevButton.addEventListener("click", () => {
    showPage(currentPage - 1);
});

nextButton.addEventListener("click", () => {
    showPage(currentPage + 1);
});

showPage(1);
