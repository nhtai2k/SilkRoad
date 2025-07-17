export enum EUrl {
//#region StockMarket
//Company
getAllUrlCompany = "/api/company/getAll",
getAllActiveUrlCompany = "/api/company/getAllActive",
getAllSymbolsUrlCompany = "/api/company/getAllSymbols",
getAllDeletedUrlCompany = "/api/company/getAllDeleted",
getByIdUrlCompany = "/api/company/getById",
createUrlCompany = "/api/company/create",
updateUrlCompany = "/api/company/update",
softDeleteUrlCompany = "/api/company/softDelete",
restoreUrlCompany = "/api/company/restore",
deleteUrlCompany = "/api/company/delete",
//Industry
getAllUrlIndustry = "/api/industry/getAll",
getAllActiveUrlIndustry = "/api/industry/getAllActive",
getAllDeletedUrlIndustry = "/api/industry/getAllDeleted",
getByIdUrlIndustry = "/api/industry/getById",
createUrlIndustry = "/api/industry/create",
updateUrlIndustry = "/api/industry/update",
softDeleteUrlIndustry = "/api/industry/softDelete",
restoreUrlIndustry = "/api/industry/restore",
deleteUrlIndustry = "/api/industry/delete",


//stock-price
getAllUrlStockPrice = "/api/stockPrice/getAll",
getNewDataUrlStockPrice = "/api/stockPrice/getNewData",
//#endregion
    //#region Hubs
    //SignalR
    chatHubUrl = "/chat",
    //#endregion

    //#region Feature
    //QRCode
    generateAQRCode = "/api/qrCode/generateaCode",
    generateListQRCode = "/api/qrCode/generateListQRCode",
    //#endregion

    //#region LipstickShop
    //Report
    getAllUrlReport = "/api/report/getAll",
    //Order
    getAllUrlOrder = "/api/order/getAll",
    getByIdUrlOrder = "/api/order/getById",
    createUrlOrder = "/api/order/create",
    updateUrlOrder = "/api/order/update",
    //Product
    getAllUrlProduct = "/api/product/getAll",
    getByIdUrlProduct = "/api/product/getById",
    createUrlProduct = "/api/product/create",
    updateUrlProduct = "/api/product/update",
    softDeleteUrlProduct = "/api/product/softDelete",
    getBySearchTextUrlProduct = "/api/product/suggestProductBySearchText",
    //Blog
    getAllUrlBlog = "/api/blog/getAll",
    getAllActiveUrlBlog = "/api/blog/getAllActive",
    getByIdUrlBlog = "/api/blog/getById",
    createUrlBlog = "/api/blog/create",
    updateUrlBlog = "/api/blog/update",
    softDeleteUrlBlog = "/api/blog/softDelete",
    //Brand
    getAllUrlBrand = "/api/brand/getAll",
    getByIdUrlBrand = "/api/brand/getById",
    createUrlBrand = "/api/brand/create",
    updateUrlBrand = "/api/brand/update",
    getAllActiveUrlBrand = "/api/brand/getAllActive",
    softDeleteUrlBrand = "/api/brand/softDelete",
    //Category
    getAllUrlCategory = "/api/category/getAll",
    getAllActiveUrlCategory = "/api/category/getAllActive",
    getByIdUrlCategory = "/api/category/getById",
    createUrlCategory = "/api/category/create",
    updateUrlCategory = "/api/category/update",
    softDeleteUrlCategory = "/api/category/softDelete",
    //SubCategory
    getAllUrlSubCategory = "/api/subcategory/getAll",
    getAllActiveUrlSubCategory = "/api/subcategory/getAllActive",
    getByIdUrlSubCategory = "/api/subcategory/getById",
    createUrlSubCategory = "/api/subcategory/create",
    updateUrlSubCategory = "/api/subcategory/update",
    softDeleteUrlSubCategory = "/api/subcategory/softDelete",
    getByCategoryIdUrlSubCategory = "/api/subcategory/getByCategoryId",
    //Color
    getAllUrlColor = "/api/color/getAll",
    getAllActiveUrlColor = "/api/color/getAllActive",
    getByIdUrlColor = "/api/color/getById",
    createUrlColor = "/api/color/create",
    updateUrlColor = "/api/color/update",
    softDeleteUrlColor = "/api/color/softDelete",
    //Size
    getAllUrlSize = "/api/size/getAll",
    getAllActiveUrlSize = "/api/size/getAllActive",
    getByIdUrlSize = "/api/size/getById",
    createUrlSize = "/api/size/create",
    updateUrlSize = "/api/size/update",
    softDeleteUrlSize = "/api/size/softDelete",
    //PageType
    getAllUrlPageType = "/api/pagetype/getAll",
    getAllActiveUrlPageType = "/api/pagetype/getAllActive",
    getByIdUrlPageType = "/api/pagetype/getById",
    createUrlPageType = "/api/pagetype/create",
    updateUrlPageType = "/api/pagetype/update",
    softDeleteUrlPageType = "/api/pagetype/softDelete",
    getEPageTypeUrlPageType = "/api/pagetype/getepagetype",
    //PageContent
    getAllUrlPageContent = "/api/pagecontent/getAll",
    getAllActiveUrlPageContent = "/api/pagecontent/getAllActive",
    getByIdUrlPageContent = "/api/pagecontent/getById",
    createUrlPageContent = "/api/pagecontent/create",
    updateUrlPageContent = "/api/pagecontent/update",
    softDeleteUrlPageContent = "/api/pagecontent/softDelete",
    //PageIntroduction
    getAllUrlPageIntroduction = "/api/pageintro/getAll",
    getAllActiveUrlPageIntroduction = "/api/pageintro/getAllActive",
    getByIdUrlPageIntroduction = "/api/pageintro/getById",
    createUrlPageIntroduction = "/api/pageintro/create",
    updateUrlPageIntroduction = "/api/pageintro/update",
    softDeleteUrlPageIntroduction = "/api/pageintro/softDelete",
    //Topic
    getAllUrlTopic = "/api/topic/getAll",
    getAllActiveUrlTopic = "/api/topic/getAllActive",
    getByIdUrlTopic = "/api/topic/getById",
    createUrlTopic = "/api/topic/create",
    updateUrlTopic = "/api/topic/update",
    softDeleteUrlTopic = "/api/topic/softDelete",
    //InforPage
    getAllPageTypeUrlInforPage = "/api/inforpage/getAllpagetype",
    getAllUrlInforPage = "/api/inforpage/getAll",
    getAllActiveUrlInforPage = "/api/inforpage/getAllActive",
    getByIdUrlInforPage = "/api/inforpage/getById",
    createUrlInforPage = "/api/inforpage/create",
    updateUrlInforPage = "/api/inforpage/update",
    softDeleteUrlInforPage = "/api/inforpage/softDelete",
    getByPageTypeId = "/api/inforpage/getbypagetypeid",
    //HomeBanner
    getAllUrlHomeBanner = "/api/homebanner/getAll",
    getAllActiveUrlHomeBanner = "/api/homebanner/getAllActive",
    getByIdUrlHomeBanner = "/api/homebanner/getById",
    createUrlHomeBanner = "/api/homebanner/create",
    updateUrlHomeBanner = "/api/homebanner/update",
    softDeleteUrlHomeBanner = "/api/homebanner/softDelete",
    getByBannerTypeId = "/api/homebanner/getbybannertypeid",

    //Member
    getAllUrlMember = "/api/member/getAll",
    //Payment
    getAllUrlPayment = "/api/payment/getAll",
    getByIdUrlPayment = "/api/payment/getById",
    //#endregion



    //#region System

    //My Account
    changePasswordUrlMyAccount = "/api/myaccount/changepassword",
    loginUrl = "/api/myaccount/login",
    recoverPasswordUrl = "/api/myaccount/recoverpassword",
    resetPasswordUrl = "/api/myaccount/resetpassword",
    refreshTokenUrl = "/api/myaccount/refreshtoken",
    validateRefreshTokenUrl = "/api/myaccount/validaterefreshtoken",
    reNewToken = "/api/myaccount/renewtoken",
    //province
    getAllUrlProvince = "/api/province/getAll",
    //Account
    getAllUrlAccount = "/api/user/getAll",
    getByIdUrlAccount = "/api/user/getById/",
    createUrlAccount = "/api/user/create",
    updateUrlAccount = "/api/user/update",
    //Role
    getAllUrlRole = "/api/role/getAll",
    getAllActiveUrlRole = "/api/role/getAllActive",
    getByIdUrlRole = "/api/role/getById",
    createUrlRole = "/api/role/create",
    updateUrlRole = "/api/role/update",
    //Module
    getAllUrlModule = "/api/module/getAll",
    getByIdUrlModule = "/api/module/getById",
    createUrlModule = "/api/module/create",
    updateUrlModule = "/api/module/update",
    //Action
    getAllUrlAction = "/api/action/getAll",
    getAllActiveUrlAction = "/api/action/getAllActive",
    getEActionUrlAction = "/api/action/geteaction",
    getByIdUrlAction = "/api/action/getById",
    createUrlAction = "/api/action/create",
    updateUrlAction = "/api/action/update",
    //Setting
    getAllUrlSetting = "/api/setting/getAll",
    getByKeyUrlSetting = "/api/setting/getbykey",
    updateUrlSetting = "/api/setting/update",
    //Action logging
    getAllUrlActionLogging = "/api/actionlogging/getAll",
    getByIdUrlActionLogging = "/api/actionlogging/getById",
    //#endregion

    //#region Survey
    //participant
    getAllUrlParticipant = "/api/participant/getAll",
    getEagerByIdUrlParticipant = "/api/participant/geteagerbyid",
    exportExcelUrlParticipant = "/api/participant/exportexcel",
    //question
    getAllUrlQuestion = "/api/question/getAll",
    getAllByQuestiongroupIdUrlQuestion = "/api/question/getAllbyquestiongroupid",
    getByIdUrlQuestion = "/api/question/getById",
    createUrlQuestion = "/api/question/create",
    updateUrlQuestion = "/api/question/update",
    softDeleteUrlQuestion = "/api/question/softDelete",
    //questionGroup
    getAllUrlQuestionGroup = "/api/questiongroup/getAll",
    getAllActiveUrlQuestionGroup = "/api/questiongroup/getAllActive",
    getByIdUrlQuestionGroup = "/api/questiongroup/getById",
    getEagerByIdUrlQuestionGroup = "/api/questiongroup/geteagerbyid",
    getEagerAllElementsUrlQuestionGroup = "/api/questiongroup/geteagerallelements",
    createUrlQuestionGroup = "/api/questiongroup/create",
    updateUrlQuestionGroup = "/api/questiongroup/update",
    softDeleteUrlQuestionGroup = "/api/questiongroup/softDelete",
    //questionType
    getAllUrlQuestionType = "/api/questiontype/getAll",
    //surveyForm
    getAllUrlSurveyForm = "/api/surveyform/getAll",
    getAllActiveUrlSurveyForm = "/api/surveyform/getAllActive",
    getByIdUrlSurveyForm = "/api/surveyform/getById",
    getEagerByIdUrlSurveyForm = "/api/surveyform/geteagerbyid",
    getEagerUIByIdUrlSurveyForm = "/api/surveyform/geteageruibbyid",
    createUrlSurveyForm = "/api/surveyform/create",
    updateUrlSurveyForm = "/api/surveyform/update",
    softDeleteUrlSurveyForm = "/api/surveyform/softDelete",
    //surveyReport
    
    //#endregion
}