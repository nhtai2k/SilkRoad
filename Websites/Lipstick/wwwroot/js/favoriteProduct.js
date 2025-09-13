"use strict"
// Favorite product logic
export function addFavoriteProduct(productId) {
    $.ajax({
        type: 'POST',
        url: '/MyAccount/HandleFavoriteProduct',
        headers: { productId },
        contentType: false,
        processData: false,
        success: function (result) {
            if (result.ok) {
                $(`.productId${productId}`).addClass('love');
            }
            else {
                $(`.productId${productId}`).removeClass('love');
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}
