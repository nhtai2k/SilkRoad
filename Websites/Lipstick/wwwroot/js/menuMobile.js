"use strict"
// Mobile menu logic
let showMenuMobile = false;
export function menuMobile() {
    showMenuMobile = !showMenuMobile;
    if (showMenuMobile) {
        $("#menuMobile").removeClass("hideMenuMobile");
        $("#menuMobile").addClass("showMenuMobile");
        $("#body").addClass("overflow-hidden");
    } else {
        $("#menuMobile").addClass("hideMenuMobile");
        $("#menuMobile").removeClass("showMenuMobile");
        $("#body").removeClass("overflow-hidden");
    }
}
export function showMenuItemMobile(id) {
    let element = $(`#${id}`);
    if (element.hasClass('menuGroupActive')) {
        element.removeClass('menuGroupActive');
    } else {
        element.addClass('menuGroupActive');
    }
}
