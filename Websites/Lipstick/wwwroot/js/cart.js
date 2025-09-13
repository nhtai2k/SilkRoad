"use strict"
const getToastUrl = "/Cart/ShowToastRemoveFromCartSuccess";
const getItemListUrl = "/Cart/GetItemList";
// Cart and product quantity logic
//#region Add Product To Cart
function addProductToCard(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = cart.find(item => item.productId === id);
    if (product) {
        product.quantity += 1;
    } else {
        product = {
            productId: id,
            quantity: 1
        }
        cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setNumberProductInCart();
}
function addToCart(id, url) {
    let parameters = {
        productId: id
    };
    $.ajax({
        type: 'GET',
        url,
        data: parameters,
        success: function (res) {
            if (res.ok) {
                addProductToCard(id);
                showToast(id, res.data);
            }
        }
    });
}
//#endregion

//#region Increase Quantity Of Product In Cart
function increaseQuantityOfProductInCart(id, price) {
    let quantityInput = document.getElementById("quantityInput_" + id);
    let priceText = document.getElementById("price_" + id);
    let totalPriceText = document.getElementById("cartTotalPrice");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = cart.find(item => item.productId === id);
    let newTotalprice = Number(totalPriceText.innerHTML.replaceAll(".", "")) + price;
    if (product) {
        product.quantity += 1;
    } else {
        product = {
            productId: id,
            quantity: 1
        }
        cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    quantityInput.value = product.quantity;
    priceText.innerHTML = numberWithCommas(product.quantity * price);
    totalPriceText.innerHTML = numberWithCommas(newTotalprice);
    setNumberProductInCart();
}
//#endregion

//#region Remove Product From Cart
function removeProductFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let productIndex = cart.findIndex(item => item.productId === id);
    if (productIndex > -1) {
        cart.splice(productIndex, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setNumberProductInCart();
}
function removeFromCart(id) {
    let parameters = {
        productId: id
    };
    $.ajax({
        type: 'GET',
        url: getToastUrl,
        data: parameters,
        success: function (res) {
            if (res.ok) {
                removeProductFromCart(id);
                showToast(id, res.data);
                getCart();
            }
        }
    });
}
//#endregion

//#region Reduce Quantity Of Product In Cart
function reduceQuantityOfProductInCart(id, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = cart.find(item => item.productId === id);
    let quantityInput = document.getElementById("quantityInput_" + id);
    let priceText = document.getElementById("price_" + id);
    let totalPriceText = document.getElementById("cartTotalPrice");
    let newTotalprice = Number(totalPriceText.innerHTML.replaceAll(".", "")) - price;
    if (product && product.quantity > 1) {
        product.quantity -= 1;
        quantityInput.value = product.quantity;
        priceText.innerHTML = numberWithCommas(product.quantity * price);
        localStorage.setItem("cart", JSON.stringify(cart));
        totalPriceText.innerHTML = numberWithCommas(newTotalprice);
        setNumberProductInCart();
    }
}
//#endregion

//#region cart
function setNumberProductInCart() {
    let numberProductText = document.getElementById("numberProductInCard");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    var numberOfProduct = 0;
    for (var i = 0; i < cart.length; i++) {
        numberOfProduct += cart[i].quantity;
    }
    numberProductText.innerHTML = numberOfProduct;
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function onchangeQuantity(id, price) {
    let quantityInput = document.getElementById("quantityInput_" + id);
    let priceText = document.getElementById("price_" + id);
    let totalPriceText = document.getElementById("cartTotalPrice");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = cart.find(item => item.productId === id);
    if (product) {
        let newTotalprice = Number(totalPriceText.innerHTML.replaceAll(".", "")) + (quantityInput.value - product.quantity)*price;
        product.quantity = Number(quantityInput.value);
        localStorage.setItem("cart", JSON.stringify(cart));
        //quantityInput.value = product.quantity;
        priceText.innerHTML = numberWithCommas(product.quantity * price);
        totalPriceText.innerHTML = numberWithCommas(newTotalprice);
        setNumberProductInCart();
    }
}
function handleEnterQuantityInput(e, id, price) {
    if (e.keyCode === 13) {
        e.preventDefault(); // Ensure it is only this code that runs
        onchangeQuantity(id, price)
    }
}
function getCart() {
    let items = JSON.parse(localStorage.getItem("cart")) || [];
    $.ajax({
        type: 'POST',
        url: getItemListUrl,
        data: JSON.stringify(items),
        contentType: 'application/json',
        dataType: 'json',
        success: function (res) {
            $('#cartContainer').html(res.data);         
        }
    });
}
function clearCart(res) {
    localStorage.removeItem("cart");
}
function buyNow(id, url) {
    console.log(id);
    console.log(url);
    window.location = url;
}
//#endregion

// Export all functions (ES6 style)
export {
    addToCart,
    increaseQuantityOfProductInCart,
    removeFromCart,
    reduceQuantityOfProductInCart,
    setNumberProductInCart,
    onchangeQuantity,
    handleEnterQuantityInput,
    getCart,
    clearCart,
    buyNow
};