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
    generateAQRCode = "/api/qrCode/generateAQRCode",
    generateListQRCode = "/api/qrCode/generateListQRCode",
    //#endregion

    //#region LipstickShop
    //Report
    getAllUrlReport = "/api/report/getAll",
    //Order
    getAllUrlOrder = "/api/order/getAll",
    getAllDeletedUrlOrder = "/api/order/getAllDeleted",
    getByIdUrlOrder = "/api/order/getById",
    createUrlOrder = "/api/order/create",
    updateUrlOrder = "/api/order/update",
    softDeleteUrlOrder = "/api/order/softDelete",
    restoreUrlOrder = "/api/order/restore",
    //Product
    getAllUrlProduct = "/api/product/getAll",
    getAllActiveUrlProduct = "/api/product/getAllActive",
    getByIdUrlProduct = "/api/product/getById",
    createUrlProduct = "/api/product/create",
    updateUrlProduct = "/api/product/update",
    softDeleteUrlProduct = "/api/product/softDelete",

    getBySearchTextUrlProduct = "/api/product/suggestProductBySearchText",
    //Blog
    getAllUrlBlog = "/api/blog/getAll",
    getAllActiveUrlBlog = "/api/blog/getAllActive",
    getAllDeletedUrlBlog = "/api/blog/getAllDeleted",
    getByIdUrlBlog = "/api/blog/getById",
    createUrlBlog = "/api/blog/create",
    updateUrlBlog = "/api/blog/update",
    restoreUrlBlog = "/api/blog/restore",
    softDeleteUrlBlog = "/api/blog/softDelete",
    //Brand
    getAllUrlBrand = "/api/brand/getAll",
    getByIdUrlBrand = "/api/brand/getById",
    getAllDeletedUrlBrand = "/api/brand/getAllDeleted",
    createUrlBrand = "/api/brand/create",
    updateUrlBrand = "/api/brand/update",
    getAllActiveUrlBrand = "/api/brand/getAllActive",
    restoreUrlBrand = "/api/brand/restore",
    softDeleteUrlBrand = "/api/brand/softDelete",
    deleteUrlBrand = "/api/brand/delete",
    //Category
    getAllUrlCategory = "/api/category/getAll",
    getAllActiveUrlCategory = "/api/category/getAllActive",
    getAllDeletedUrlCategory = "/api/category/getAllDeleted",
    getByIdUrlCategory = "/api/category/getById",
    createUrlCategory = "/api/category/create",
    updateUrlCategory = "/api/category/update",
    restoreUrlCategory = "/api/category/restore",
    softDeleteUrlCategory = "/api/category/softDelete",
    deleteUrlCategory = "/api/category/delete",
    //SubCategory
    getAllUrlSubCategory = "/api/subcategory/getAll",
    getAllDeletedUrlSubCategory = "/api/subcategory/getAllDeleted",
    getAllActiveUrlSubCategory = "/api/subcategory/getAllActive",
    getByIdUrlSubCategory = "/api/subcategory/getById",
    createUrlSubCategory = "/api/subcategory/create",
    updateUrlSubCategory = "/api/subcategory/update",
    softDeleteUrlSubCategory = "/api/subcategory/softDelete",
    deleteUrlSubCategory = "/api/subcategory/delete",
    restoreUrlSubCategory = "/api/subcategory/restore",
    getByCategoryIdUrlSubCategory = "/api/subcategory/getByCategoryId",
    //Color
    getAllUrlColor = "/api/color/getAll",
    getAllActiveUrlColor = "/api/color/getAllActive",
    getAllDeletedUrlColor = "/api/color/getAllDeleted",
    getByIdUrlColor = "/api/color/getById",
    createUrlColor = "/api/color/create",
    updateUrlColor = "/api/color/update",
    restoreUrlColor = "/api/color/restore",
    softDeleteUrlColor = "/api/color/softDelete",
    deleteUrlColor = "/api/color/delete",
    //Size
    getAllUrlSize = "/api/size/getAll",
    getAllActiveUrlSize = "/api/size/getAllActive",
    getAllDeletedUrlSize = "/api/size/getAllDeleted",
    getByIdUrlSize = "/api/size/getById",
    createUrlSize = "/api/size/create",
    updateUrlSize = "/api/size/update",
    restoreUrlSize = "/api/size/restore",
    softDeleteUrlSize = "/api/size/softDelete",
    deleteUrlSize = "/api/size/delete",
    //PageType
    getAllUrlPageType = "/api/pageType/getAll",
    getAllActiveUrlPageType = "/api/pageType/getAllActive",
    getAllDeletedUrlPageType = "/api/pageType/getAllDeleted",
    getByIdUrlPageType = "/api/pageType/getById",
    createUrlPageType = "/api/pageType/create",
    updateUrlPageType = "/api/pageType/update",
    softDeleteUrlPageType = "/api/pageType/softDelete",
    getEPageTypeUrlPageType = "/api/pageType/getEPageType",
    restoreUrlPageType = "/api/pageType/restore",
    deleteUrlPageType = "/api/pageType/delete",
    //PageContent
    getAllUrlPageContent = "/api/pageContent/getAll",
    getAllActiveUrlPageContent = "/api/pageContent/getAllActive",
    getAllDeletedUrlPageContent = "/api/pageContent/getAllDeleted",
    getByIdUrlPageContent = "/api/pageContent/getById",
    createUrlPageContent = "/api/pageContent/create",
    updateUrlPageContent = "/api/pageContent/update",
    softDeleteUrlPageContent = "/api/pageContent/softDelete",
    restoreUrlPageContent = "/api/pageContent/restore",
    deleteUrlPageContent = "/api/pageContent/delete",
    //PageIntroduction
    getAllUrlPageIntroduction = "/api/pageIntro/getAll",
    getAllDeletedUrlPageIntroduction = "/api/pageIntro/getAllDeleted",
    getAllActiveUrlPageIntroduction = "/api/pageIntro/getAllActive",
    getByIdUrlPageIntroduction = "/api/pageIntro/getById",
    createUrlPageIntroduction = "/api/pageIntro/create",
    updateUrlPageIntroduction = "/api/pageIntro/update",
    softDeleteUrlPageIntroduction = "/api/pageIntro/softDelete",
    restoreUrlPageIntroduction = "/api/pageIntro/restore",
    deleteUrlPageIntroduction = "/api/pageIntro/delete",
    //Topic
    getAllUrlTopic = "/api/topic/getAll",
    getAllActiveUrlTopic = "/api/topic/getAllActive",
    getAllDeletedUrlTopic = "/api/topic/getAllDeleted",
    getByIdUrlTopic = "/api/topic/getById",
    createUrlTopic = "/api/topic/create",
    updateUrlTopic = "/api/topic/update",
    softDeleteUrlTopic = "/api/topic/softDelete",
    deleteUrlTopic = "/api/topic/delete",
    restoreUrlTopic = "/api/topic/restore",
    //InforPage
    getAllPageTypeUrlInforPage = "/api/inforPage/getAllPageType",
    getAllUrlInforPage = "/api/inforPage/getAll",
    getAllDeletedUrlInforPage = "/api/inforPage/getAllDeleted",
    getAllActiveUrlInforPage = "/api/inforPage/getAllActive",
    getByIdUrlInforPage = "/api/inforPage/getById",
    createUrlInforPage = "/api/inforPage/create",
    updateUrlInforPage = "/api/inforPage/update",
    softDeleteUrlInforPage = "/api/inforPage/softDelete",
    getByPageTypeId = "/api/inforPage/getByPageTypeId",
    restoreUrlInforPage = "/api/inforPage/restore",

    //HomeBanner
    getAllUrlHomeBanner = "/api/HomeBanner/getAll",
    getAllActiveUrlHomeBanner = "/api/HomeBanner/getAllActive",
    getAllDeletedUrlHomeBanner = "/api/HomeBanner/getAllDeleted",
    getByIdUrlHomeBanner = "/api/HomeBanner/getById",
    createUrlHomeBanner = "/api/HomeBanner/create",
    updateUrlHomeBanner = "/api/HomeBanner/update",
    softDeleteUrlHomeBanner = "/api/HomeBanner/softDelete",
    getByBannerTypeId = "/api/HomeBanner/getByBannerTypeId",
    restoreUrlHomeBanner = "/api/HomeBanner/restore",
    deleteUrlHomeBanner = "/api/HomeBanner/delete",

    //Member
    getAllUrlMember = "/api/member/getAll",
    //Payment
    getAllUrlPayment = "/api/payment/getAll",
    getByIdUrlPayment = "/api/payment/getById",
    //#endregion



    //#region System

    //My Account
    changePasswordUrlMyAccount = "/api/MyAccount/changePassword",
    loginUrl = "/api/MyAccount/login",
    recoverPasswordUrl = "/api/MyAccount/recoverPassword",
    resetPasswordUrl = "/api/MyAccount/resetPassword",
    refreshTokenUrl = "/api/MyAccount/refreshToken",
    validateRefreshTokenUrl = "/api/MyAccount/validateRefreshToken",
    reNewToken = "/api/MyAccount/renewToken",
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
    getEActionUrlAction = "/api/action/getEAction",
    getByIdUrlAction = "/api/action/getById",
    createUrlAction = "/api/action/create",
    updateUrlAction = "/api/action/update",
    //Setting
    getAllUrlSetting = "/api/setting/getAll",
    getByKeyUrlSetting = "/api/setting/getByKey",
    updateUrlSetting = "/api/setting/update",
    //Action logging
    getAllUrlActionLogging = "/api/ActionLogging/getAll",
    getByIdUrlActionLogging = "/api/ActionLogging/getById",
    //#endregion

    //#region Survey
    //participant
    getAllUrlParticipant = "/api/participant/getAll",
    getEagerByIdUrlParticipant = "/api/participant/getEagerById",
    exportExcelUrlParticipant = "/api/participant/exportExcel",
    //questionGroupLibrary
    getAllUrlQuestionGroupLibrary = "/api/questionGroupLibrary/getAll",
    getAllActiveUrlQuestionGroupLibrary = "/api/questionGroupLibrary/getAllActive",
    getOptionListUrlQuestionGroupLibrary = "/api/questionGroupLibrary/getOptionList",
    getTreeOptionListUrlQuestionGroupLibrary = "/api/questionGroupLibrary/getTreeOptionList",
    getAllDeletedUrlQuestionGroupLibrary = "/api/questionGroupLibrary/getAllDeleted",
    getByIdUrlQuestionGroupLibrary = "/api/questionGroupLibrary/getById",
    createUrlQuestionGroupLibrary = "/api/questionGroupLibrary/create",
    updateUrlQuestionGroupLibrary = "/api/questionGroupLibrary/update",
    softDeleteUrlQuestionGroupLibrary = "/api/questionGroupLibrary/softDelete",
    restoreUrlQuestionGroupLibrary = "/api/questionGroupLibrary/restore",
    deleteUrlQuestionGroupLibrary = "/api/questionGroupLibrary/delete",
    //questionLibrary
    getAllUrlQuestionLibrary = "/api/questionLibrary/getAll",
    getAllDeletedUrlQuestionLibrary = "/api/questionLibrary/getAllDeleted",
    getEagerLoadingByIdUrlQuestionLibrary = "/api/questionLibrary/getEagerLoadingById",
    getByIdUrlQuestionLibrary = "/api/questionLibrary/getById",
    createUrlQuestionLibrary = "/api/questionLibrary/create",
    updateUrlQuestionLibrary = "/api/questionLibrary/update",
    softDeleteUrlQuestionLibrary = "/api/questionLibrary/softDelete",
    restoreUrlQuestionLibrary = "/api/questionLibrary/restore",
    deleteUrlQuestionLibrary = "/api/questionLibrary/delete",
    
    //questionType
    getAllUrlQuestionType = "/api/questionType/getAll",
    getOptionListUrlQuestionType = "/api/questionType/getOptionList",
    //surveyForm
    getAllUrlSurveyForm = "/api/surveyForm/getAll",
    getAllActiveUrlSurveyForm = "/api/surveyForm/getAllActive",
    getByIdUrlSurveyForm = "/api/surveyForm/getById",
    getEagerByIdUrlSurveyForm = "/api/surveyForm/getEagerById",
    getEagerUIByIdUrlSurveyForm = "/api/surveyForm/getEagerUIById",
    createUrlSurveyForm = "/api/surveyForm/create",
    updateUrlSurveyForm = "/api/surveyForm/update",
    softDeleteUrlSurveyForm = "/api/surveyForm/softDelete",
    //surveyReport

    //#endregion
}