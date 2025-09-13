"use strict"
// Pagination logic
const maxVisiblePages = 5;
let allowLoadData = false;
let currentPage = 1;
export function createPagination(totalPages, pageIndex, callback, initial = false) {

    if (totalPages <= 1) {
        return;
    }
    if (pageIndex < 1 || pageIndex > totalPages) {
        console.error("Page index must be between 1 and total pages.");
        return;
    }

    if (currentPage === pageIndex && !initial) {
        console.log('Current page and page index are the same!');
        return; // Prevent reloading the same page
    } else {
        currentPage = pageIndex;
    }

    // Check if the pageIndex is valid
    if (typeof callback === "function" && allowLoadData) {
        callback(pageIndex);
    } else {
        allowLoadData = true;
    }

    const root = document.getElementById('paginationRoot');
    root.innerHTML = '';

    const pagination = document.createElement('li');
    pagination.className = `pagination justify-content-center`;

    const half = Math.floor(maxVisiblePages / 2);
    let start = 0;
    let end = 0;

    if (totalPages <= maxVisiblePages) {
        start = 2;
        end = totalPages - 1;
    } else {
        start = Math.max(2, currentPage - half);
        end = Math.min(totalPages - 1, currentPage + half);
        // Adjust window if near the start or end
        if (currentPage <= half + 1) {
            start = 2;
            end = maxVisiblePages;
        } else if (currentPage >= totalPages - half) {
            start = totalPages - maxVisiblePages + 1;
            end = totalPages - 1;
        }
    }

    // Previous
    const prevItem = document.createElement('li');
    prevItem.className = `page-item ${pageIndex === 1 ? 'disabled' : ''}`;
    prevItem.innerHTML = `<button class="page-link"><span class="ti-angle-double-left"></button>`;
    prevItem.onclick = () => {
        if (pageIndex > 1) {
            createPagination(totalPages, pageIndex - 1, callback);
        }
    };
    pagination.appendChild(prevItem);

    // Page 1 (always shown)
    const firstPage = document.createElement('li');
    firstPage.className = `page-item ${pageIndex === 1 ? 'active' : ''}`;
    firstPage.innerHTML = `<button class="page-link">1</button>`;
    firstPage.onclick = () => createPagination(totalPages, 1, callback);
    pagination.appendChild(firstPage);

    // Ellipsis before
    if (start > 2) {
        const dots = document.createElement('li');
        dots.className = 'page-item disabled';
        dots.innerHTML = `<span class="page-link">...</span>`;
        pagination.appendChild(dots);
    }

    // Middle page numbers
    for (let i = start; i <= end; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = `page-item ${i === pageIndex ? 'active' : ''}`;
        pageItem.innerHTML = `<button class="page-link">${i}</button>`;
        pageItem.onclick = () => createPagination(totalPages, i, callback);
        pagination.appendChild(pageItem);
    }

    // Ellipsis after
    if (end < totalPages - 1) {
        const dots = document.createElement('li');
        dots.className = 'page-item disabled';
        dots.innerHTML = `<span class="page-link">...</span>`;
        pagination.appendChild(dots);
    }

    // Last page (always shown if more than 1)
    if (totalPages > 1) {
        const lastPage = document.createElement('li');
        lastPage.className = `page-item ${pageIndex === totalPages ? 'active' : ''}`;
        lastPage.innerHTML = `<button class="page-link">${totalPages}</button>`;
        lastPage.onclick = () => createPagination(totalPages, totalPages, callback);
        pagination.appendChild(lastPage);
    }

    // Next
    const nextItem = document.createElement('li');
    nextItem.className = `page-item ${pageIndex === totalPages ? 'disabled' : ''}`;
    nextItem.innerHTML = `<button class="page-link"><span class="ti-angle-double-right"></button>`;
    nextItem.onclick = () => {
        if (pageIndex < totalPages) {
            createPagination(totalPages, pageIndex + 1, callback);
        }
    };
    pagination.appendChild(nextItem);
    root.appendChild(pagination);
}