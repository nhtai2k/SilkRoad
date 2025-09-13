"use strict"
//#region Handle selecting a province and district
const getProvincesUrl = "/MyAccount/GetProvinces";
let provinces = [];
let userProvinceId;
let userDistrictId;
let labelProvince;
let labelDistrict;
//add choice to Disctrict
let districtIdChoices;
function initProvinceAndDistrict() {
    userProvinceId = $('#initialProvinceId').val();
    userDistrictId = $('#initialDistrictId').val();
    labelProvince = $('#labelProvince').text();
    labelDistrict = $('#labelDistrict').text();
    districtIdChoices = new Choices('#DistrictId', {
        allowHTML: true,
        searchFields: ['label'],
        choices: [{ value: -1, label: labelDistrict, selected: true, disabled: true }],
        shouldSort: false
    });
    $.ajax({
        type: 'get',
        url: getProvincesUrl,
        success: function (res) {
            // if result is ok
            if (res.ok) {
                if (res.data != null) {
                    provinces = JSON.parse(res.data);
                    let choices = [{ value: -1, label: labelProvince, selected: true, disabled: true }];
                    provinces.forEach(item => {
                        choices.push({ value: item.Id, label: item.Name, selected: item.Id == userProvinceId ? true : false },)
                    });
                    //add choice to City
                    new Choices('#ProvinceId', {
                        allowHTML: true,
                        searchFields: ['label'],
                        choices,
                        shouldSort: false
                    });
                    if (userProvinceId != -1) {
                        updateDistrictIdChoices(userProvinceId);
                    }
                }
            }
        }
    });
}
function updateDistrictIdChoices(provinceId) {
    if (districtIdChoices == null) {
        districtIdChoices = new Choices('#DistrictId', {
            allowHTML: true,
            searchFields: ['label'],
            choices: [{ value: -1, label: labelDistrict, selected: true, disabled: true }],
            shouldSort: false
        });
    }
    districtIdChoices.disable();
    if (provinceId != -1) {
        districtIdChoices.clearStore();
        districtIdChoices.enable();
        let province = provinces.find(p => p.Id == provinceId);
        let choices = [{ value: -1, label: labelDistrict, selected: true, disabled: true }];
        province.Districts.forEach(item => {
            choices.push({ value: item.Id, label: item.Name, selected: item.Id == userDistrictId ? true : false },)
        });
        districtIdChoices.setChoices(choices);
    } else {
        districtIdChoices.clearStore();
        districtIdChoices.setChoices([{ value: -1, label: labelDistrict, selected: true, disabled: true }]);
    }
}
function onChangeProvinceId(event) {
    let provinceId = event.target.value;
    updateDistrictIdChoices(provinceId);
}
//#endregion
//#region SignalR await for order update
const signalRUrl = "/payment";
let connection;
function startSignalRConnection() {
    connection = new signalR.HubConnectionBuilder().withUrl(signalRUrl).build();
    connection.start().then(function () {
        console.log("SignalR connection established.");
    }).catch(function (err) {
        return console.error(err.toString());
    });
    connection.on("ReceivePaymentStatus", function (obj) {
        let data = JSON.parse(obj);
        console.log("ReceivePaymentStatus: ", data);
        if (data.Content.trim() == orderCode) {
            $('#orderContainer').html(congratulationHtmlPage);
            $('#paymentModel').modal('hide');
            //scroll to ordercontainer element
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#body").offset().top
            }, 0);
            startConfetti();
            localStorage.removeItem("cart");
            setNumberProductInCart();
        }
    });
}
function stopSignalRConnection() {
    if (connection) {
        connection.stop().then(function () {
            console.log("SignalR connection stopped.");
        }).catch(function (err) {
            return console.error(err.toString());
        });
    }
}
//#endregion
//#region Handle order form submission
let orderItemList = [];
let orderCode;
let congratulationHtmlPage;
const getOrderFromUrl = "/Cart/GetOrderForm";
//get order form
function getOrderForm() {
    let items = JSON.parse(localStorage.getItem("cart")) || [];
    $.ajax({
        type: 'POST',
        url: getOrderFromUrl,
        data: JSON.stringify(items),
        contentType: 'application/json',
        dataType: 'json',
        success: function (res) {
            if (res.ok) {
                $('#orderContainer').html(res.data);
                initProvinceAndDistrict();
            }
        }
    });
}

//Submit order form
function submitOrderForm(form) {
    let formData = new FormData(form);
    $.ajax({
        type: 'POST',
        url: form.action,
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            if (res.ok) {
                let obj = JSON.parse(res.data);
                console.log(obj);
                if (obj.paymentMethod == "BankTransfer") {
                    startSignalRConnection();
                    orderCode = obj.orderCode;
                    congratulationHtmlPage = obj.html;
                    $("#paymentQRCode").attr("src", obj.content);
                    $('#paymentModel').modal('show');
                } else if (obj.paymentMethod == "CashOnDelivery") {
                    localStorage.removeItem("cart");
                    setNumberProductInCart();
                    $('#orderContainer').html(obj.html);
                    //scroll to ordercontainer element
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $("#body").offset().top
                    }, 0);
                    startConfetti();
                }
            }
        },
        error: function (err) {
            if (err.status == 400) {
                $('#orderContainer').html(err.responseJSON.data);
                initProvinceAndDistrict();
            } else if (err.status == 500) {
                alert("Có lỗi xảy ra, vui lòng thử lại sau!");
            } 
        }
    });
    return false;
}

//modal close i will stop signalR connection
$('#paymentModel').on('hidden.bs.modal', function () {
    stopSignalRConnection();
});

//function handleClickOrder(e, form, callback, bankTransferId) {
//    let paymentMethodId = document.getElementById("PaymentMethodId").value;
//    if (paymentMethodId == bankTransferId) {
//        document.getElementById("openPaymentModal").click();
//        e.preventDefault();
//        return;
//    } else {
//        SubmitOrderForm(form, callback)
//    }
//}
//function SubmitOrderForm(form, callback) {
//    try {
//        let formData = new FormData(form);
//        var i = 0;
//        orderItemList.forEach(s => {
//            formData.append(`OrderHistoryItems[${i}].ProductId`, s.ProductId);
//            formData.append(`OrderHistoryItems[${i}].Quantity`, s.Quantity);
//            formData.append(`OrderHistoryItems[${i}].Price`, s.Price);
//            formData.append(`OrderHistoryItems[${i}].OrderId`, s.OrderId);
//            i++;
//        });
//        $.ajax({
//            type: 'POST',
//            url: form.action,
//            data: formData,
//            processData: false,
//            contentType: false,
//            success: function (res) {
//                callback(res);
//            },
//            error: function (err) {
//                console.log(err);
//            }
//        });
//        return false; // Prevent default form submission
//    } catch (err) {
//        console.log(err);
//        return false;
//    }
//}

//function getPaymentQRCode(url) {
//    let totalPriceText = document.getElementById("orderTotalPrice");
//    let totalprice = Number(totalPriceText.innerHTML.replaceAll(".", ""));
//    $.ajax({
//        type: 'GET',
//        url,
//        data: {
//            amount: totalprice,
//            mess: "HSFGTY"
//        },
//        xhrFields: {
//            responseType: 'blob'
//        },
//        cache: false,
//        success: function (response) {
//            const imageUrl = URL.createObjectURL(response);
//            document.getElementById("paymentQRCode").src = imageUrl;
//        },
//        error: function (xhr) {

//        }
//    });
//}

//const modalElement = document.getElementById('paymentModel');

//modalElement.addEventListener('shown.bs.modal', function () {
//    let countdown = 60;
//    const timerElement = document.getElementById('countdownTimer');
//    const buttonsElement = document.getElementById('finalButtons');

//    // Reset trước mỗi lần mở modal
//    timerElement.textContent = countdown;
//    buttonsElement.style.display = 'none';

//    // Bắt đầu đếm ngược
//    const interval = setInterval(() => {
//        countdown--;
//        timerElement.textContent = countdown;

//        if (countdown <= 0) {
//            clearInterval(interval);
//            timerElement.style.display = 'none'; // Ẩn số đếm nếu muốn
//            buttonsElement.style.display = 'block'; // Hiện nút A & B
//        }
//    }, 1000);
//});

getOrderForm();
//#endregion
