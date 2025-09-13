"use strict"
// Toast notification logic
export function showToast(id, content) {
    const toastId = `toast-${Date.now()}-${id}`;
    const newToast = content.replace("#toastTemplateId#", toastId);
    $('#toastContainer').append(newToast);
    const toastElement = document.getElementById(toastId);
    const toastInstance = new bootstrap.Toast(toastElement);
    toastInstance.show();
}
