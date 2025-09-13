"use strict"
const searchAutoCompleteUrl = '/search/autocomplete';
const searchUrl = '/search/index?search=';
//check CSSKeywordValue enter call search method
export function setupSearchInput() {
    document.getElementById('searchInput').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') { // Check if the Enter key was pressed
            search(); // Call the search method
        }
    });
       
    document.getElementById('searchInput').addEventListener('input', function (event) {
        const query = event.target.value;
        let parameters = {
            search: query
        };
        if (query.length > 2) { // Start searching after 3 characters
            $.ajax({
                type: 'GET',
                url: searchAutoCompleteUrl,
                data: parameters,
                success: function (res) {
                    if (res.ok) {
                        $('#searchResult').html(res.data);
                    }
                }
            });
            $('#searchResult').removeClass("d-none");
        } else {
            $('#searchResult').addClass("d-none");
        }
    });
}
export function search() {
    var searchValue = document.getElementById("searchInput").value;
    if (searchValue != "" && searchValue.length > 2) {
        window.location.href = searchUrl + searchValue;
    }
}

// Mobile search box logic
let showSearchBoxMobile = false;
export function searchBoxMobile() {
    showSearchBoxMobile = !showSearchBoxMobile;
    if (showSearchBoxMobile) {
        $('#iconSearchMobile').addClass("ti-close");
        $('#iconSearchMobile').removeClass("ti-search");
        $("#searchBoxMobile").removeClass("hideSearchBoxMobile");
        $("#searchBoxMobile").addClass("showSearchBoxMobile");
        $("#body").addClass("overflow-hidden");
    } else {
        $('#iconSearchMobile').removeClass("ti-close");
        $('#iconSearchMobile').addClass("ti-search");
        $("#searchBoxMobile").addClass("hideSearchBoxMobile");
        $("#searchBoxMobile").removeClass("showSearchBoxMobile");
        $("#body").removeClass("overflow-hidden");
    }
}
