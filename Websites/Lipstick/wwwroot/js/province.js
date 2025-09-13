"use strict"
//#region Handle selecting a province and district
const getProvincesUrl = "/MyAccount/GetProvinces";
let provinces = [];
let userProvinceId = $('#initialProvinceId').val();
let userDistrictId = $('#initialDistrictId').val();
let labelProvince = $('#labelProvince').text();
let labelDistrict = $('#labelDistrict').text();
//add choice to Disctrict
let districtIdChoices = new Choices('#DistrictId', {
    allowHTML: true,
    searchFields: ['label'],
    choices: [{ value: -1, label: labelDistrict, selected: true, disabled: true }],
    shouldSort: false
});;
function initProvinceAndDistrict() {
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
                        choices.push({ value: item.Id, label: item.Name, selected: item.Id == userProvinceId   ? true : false },)
                    });
                    //add choice to City
                    new Choices('#ProvinceId', {
                        allowHTML: true,
                        searchFields: ['label'],
                        choices,
                        shouldSort: false
                    });
                    if (userProvinceId != -1) {
                        updateDistrictIdChoices(userProvinceId  );
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
            choices.push({ value: item.Id, label: item.Name, selected: item.Id == userDistrictId   ? true : false },)
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

$(document).ready(() => {
    initProvinceAndDistrict();
});

//#endregion