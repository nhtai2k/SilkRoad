//#region scroll
const clickToTopBtn = document.getElementById('clickToTop');

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.headerDesktop');

    if (window.scrollY > 0) {
        navbar.classList.add('fixed');
    } else {
        navbar.classList.remove('fixed');
    }

    if (window.scrollY > 300) {
        clickToTopBtn.classList.add('show');
    } else {
        clickToTopBtn.classList.remove('show');
    }
});

clickToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
//#endregion
//#region header mobile
const mobileNav = document.getElementById("mobileNav");
const toggleHeaderBtn = document.getElementById("toggleHeader");
const closeNavBtn = document.getElementById("closeNav");
const overlayBackground = document.getElementById('overlayBackground');
function closeNav() {
    mobileNav.classList.remove("navOpen");
    overlayBackground.style.display = 'none'
    document.body.style.overflow = 'auto';
}
toggleHeaderBtn.addEventListener('click', () => {
    document.body.style.overflow = 'hidden';
    mobileNav.classList.add("navOpen");
    overlayBackground.style.display = 'block';
});
closeNavBtn.addEventListener('click', () => {
    closeNav();
});
overlayBackground.addEventListener('click', () => {
    closeNav();
});
//#endregion