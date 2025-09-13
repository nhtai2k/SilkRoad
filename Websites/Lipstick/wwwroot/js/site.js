"use strict"
// Import all modules
import { setLanguageByCookie } from './cookie.js';
import { menuMobile, showMenuItemMobile } from './menuMobile.js';
import { searchBoxMobile, search, setupSearchInput } from './search.js';
import { createPagination } from './pagination.js';
import { showToast } from './toast.js';
import {addToCart, increaseQuantityOfProductInCart, removeFromCart, reduceQuantityOfProductInCart,
    setNumberProductInCart, onchangeQuantity, handleEnterQuantityInput, getCart, clearCart, buyNow } from './cart.js';
import { goTop, showPass, scrollFunction } from './goTop.js';
import { addFavoriteProduct } from './favoriteProduct.js';
import { showChatBox, setupChatInput } from './chatbot.js';
import { startConfetti } from './congratulation.js';

document.addEventListener("DOMContentLoaded", function () {
    setLanguageByCookie();
    setNumberProductInCart && setNumberProductInCart();
    setupChatInput && setupChatInput();
    setupSearchInput && setupSearchInput();
});
//prevent developer tools from opening
//document.addEventListener("contextmenu", function (e) {
//    e.preventDefault();
//});
//document.addEventListener("keydown", function (e) {
//    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
//    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) || (e.ctrlKey && e.key === "U")) {
//        e.preventDefault();
//    }
//});


// Attach functions to window for inline HTML usage
window.goTop = goTop;
window.showPass = showPass;
window.showChatBox = showChatBox;
window.addToCart = addToCart;
window.addFavoriteProduct = addFavoriteProduct;
window.menuMobile = menuMobile;
window.showMenuItemMobile = showMenuItemMobile;
window.searchBoxMobile = searchBoxMobile;
window.createPagination = createPagination;
window.showToast = showToast;
window.increaseQuantityOfProductInCart = increaseQuantityOfProductInCart;
window.removeFromCart = removeFromCart;
window.reduceQuantityOfProductInCart = reduceQuantityOfProductInCart;
window.setNumberProductInCart = setNumberProductInCart;
window.onchangeQuantity = onchangeQuantity;
window.handleEnterQuantityInput = handleEnterQuantityInput;
window.getCart = getCart;
window.clearCart = clearCart;
window.buyNow = buyNow;
window.search = search;
window.startConfetti = startConfetti;
// Example: Go to top button logic
let btnGoTop = document.getElementById("goTop");
window.onscroll = () => {
    if (btnGoTop) {
        scrollFunction(btnGoTop);
    }
};