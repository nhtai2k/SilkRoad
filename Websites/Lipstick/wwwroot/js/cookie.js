"use strict"
// Cookie and language functions
function getValueCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

function setValueCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function setLanguageByCookie() {
    let cookeiValue = getValueCookie('.AspNetCore.Culture');
    let element = document.getElementById('setLanguageByCookei');
    if (cookeiValue && cookeiValue.includes('vi-VN')) {
        element.innerText = 'ENG';
    }
    else if (cookeiValue && cookeiValue.includes('en-US')) {
        element.innerText = 'VN';
    }
    else {
        element.innerText = 'ENG';
    }
}
