"use strict"
// Go to top and show password logic
export function goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
export function showPass(id, icon) {
    var input = document.getElementById(id);
    var iconElement = document.getElementById(icon);
    if (input.type === "password") {
        input.type = "text";
        iconElement.classList.remove("ti-eye");
        iconElement.classList.add("ti-eye-close");
    } else {
        input.type = "password";
        iconElement.classList.remove("ti-eye-close");
        iconElement.classList.add("ti-eye");
    }
}
export function scrollFunction(btnGoTop) {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > (window.innerHeight)) {
        btnGoTop.style.display = "flex";
    } else {
        btnGoTop.style.display = "none";
    }
}
