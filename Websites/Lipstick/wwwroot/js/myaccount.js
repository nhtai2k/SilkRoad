"use strict"
////#region Handle selecting a province and district
//let provinces = [];
//let userProvinceId = -1;
//let userDistrictId = -1;
////add choice to Disctrict
//let districtIdChoices = new Choices('#DistrictId', {
//    allowHTML: true,
//    searchFields: ['label'],
//    choices: [{ value: -1, label: 'Select District', selected: true, disabled: true }],
//    shouldSort: false
//});;

////document ready
//function initProvinceAndDistrict() {    
//    $.ajax({
//        type: 'get',
//        url: '/myaccount/getInformationToInitSelect',
//        success: function (res) {
//            // if result is ok
//            if (res.ok) {
//                let data = JSON.parse(res.data);
//                userProvinceId = data.ProvinceId;
//                userDistrictId = data.DistrictId;
//                userGenderId = data.GenderId;
//                if (data.Provinces != null) {
//                    provinces = data.Provinces;
//                    let choices = [{ value: -1, label: 'Select Province', selected: true, disabled: true }];
//                    provinces.forEach(item => {
//                        choices.push({ value: item.Id, label: item.Name, selected: item.Id == userProvinceId ? true : false },)
//                    });
//                    //add choice to City
//                    new Choices('#ProvinceId', {
//                        allowHTML: true,
//                        searchFields: ['label'],
//                        choices,
//                        shouldSort: false
//                    });
//                    if (userProvinceId != -1) {
//                        updateDistrictIdChoices(userProvinceId);
//                    }
//                }
//            }
//            //$.ajax({
//            //    type: 'GET',
//            //    url: '/MyAccount/GetProvinces',
//            //    success: function (res) {
//            //        // if result is ok
//            //        if (res.ok) {
//            //            provinces = JSON.parse(res.data);
//            //            let choices = [{ value: -1, label: 'Select Province', selected: true, disabled: true }];
//            //            provinces.forEach(item => {
//            //                choices.push({ value: item.Id, label: item.Name, selected: item.Id == userProvinceId ? true : false },)
//            //            });
//            //            //add choice to City
//            //            new Choices('#ProvinceId', {
//            //                allowHTML: true,
//            //                searchFields: ['label'],
//            //                choices,
//            //                shouldSort: false
//            //            });
//            //            if (userProvinceId != -1) {
//            //                updateDistrictIdChoices(userProvinceId);
//            //            }
//            //        }
//            //    }
//            //});
//        }
//    });
//}
//$(document).ready(() => {
//    initProvinceAndDistrict();     // init new province and district select
//});
//function updateDistrictIdChoices(provinceId) {
//    if (districtIdChoices == null) {
//        districtIdChoices = new Choices('#DistrictId', {
//            allowHTML: true,
//            searchFields: ['label'],
//            choices: [{ value: -1, label: 'Select District', selected: true, disabled: true }],
//            shouldSort: false
//        });
//    }
//    districtIdChoices.disable();
//    if (provinceId != -1) {
//        districtIdChoices.clearStore();
//        districtIdChoices.enable();
//        let province = provinces.find(p => p.Id == provinceId);
//        let choices = [{ value: -1, label: 'Select District', selected: true, disabled: true }];
//        province.Districts.forEach(item => {
//            choices.push({ value: item.Id, label: item.Name, selected: item.Id == userDistrictId ? true : false },)
//        });
//        districtIdChoices.setChoices(choices);
//    } else {
//        districtIdChoices.clearStore();
//        districtIdChoices.setChoices([{ value: -1, label: 'Select District', selected: true, disabled: true }]);
//    }
//}
////$('#ProvinceId').change((event) => {
////    let provinceId = event.target.value;
////    console.log(provinceId)
////    updateDistrictIdChoices(provinceId);
////});
//function onChangeProvinceId(event) {
//    let provinceId = event.target.value;
//    updateDistrictIdChoices(provinceId);
//}
////#endregion

//#region Handle submitting a user information form and a change password form
function SubmitForm(form, callback) {
    try {
        let formData = new FormData(form);
        $.ajax({
            type: 'POST',
            url: form.action,
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                callback(res);
            },
            error: function (err) {
                console.log(err);
            }
        });
        return false; // Prevent default form submission
    } catch (err) {
        console.log(err);
        return false;
    }
}

const updateAccount = (res) => {
    let data = JSON.parse(res.data);
    if (!res.ok) {
        $('#updateAccountContainer').html(data.UpdateComponent);
        districtIdChoices = null; // set null to init new district choices
        initProvinceAndDistrict(); // init new province and district select
    }
    showToast(1, data.ToastComponent);
};

const changePassword = (res) => {
    let toastId = `changePasswordSatus${Math.floor(Math.random() * 100)}`;
    let data = JSON.parse(res.data);
    showToast(Math.floor(Math.random() * 100), data.ToastPartialView);
    $('#changePasswordContainer').html(data.ChangePasswordPartialView);
}

//#endregion
