
  //#region StockMarket
  //Company
  export enum ECompanyStockMarketUrl{
  getAllUrl = "/api/company/getAll",
  getAllActiveUrl = "/api/company/getAllActive",
  getAllSymbolsUrl = "/api/company/getAllSymbols",
  getAllDeletedUrl = "/api/company/getAllDeleted",
  getByIdUrl = "/api/company/getById",
  createUrl = "/api/company/create",
  updateUrl = "/api/company/update",
  softDeleteUrl = "/api/company/softDelete",
  restoreUrl = "/api/company/restore",
  deleteUrl = "/api/company/delete",
  }
  //Industry
  export enum EIndustryStockMarketUrl{
  getAllUrl = "/api/industry/getAll",
  getAllActiveUrl = "/api/industry/getAllActive",
  getAllDeletedUrl = "/api/industry/getAllDeleted",
  getByIdUrl = "/api/industry/getById",
  createUrl = "/api/industry/create",
  updateUrl = "/api/industry/update",
  softDeleteUrl = "/api/industry/softDelete",
  restoreUrl = "/api/industry/restore",
  deleteUrl = "/api/industry/delete",
  }

  //stock-price
  export enum EStockPriceStockMarketUrl{
  getAllUrl = "/api/stockPrice/getAll",
  getNewDataUrl = "/api/stockPrice/getNewData",
  }
  //#endregion

  //#region PersonalFinance
  //Category
  export enum ECategoryPersonalFinanceUrl{
  getAllUrl = "/api/pf/category/getAll",
  getAllDeletedUrl = "/api/pf/category/getAllDeleted",
  getByIdUrl = "/api/pf/category/getById",
  createUrl = "/api/pf/category/create",
  updateUrl = "/api/pf/category/update",
  softDeleteUrl = "/api/pf/category/softDelete",
  restoreUrl = "/api/pf/category/restore",
  deleteUrl = "/api/pf/category/delete",
  }
  //SubCategory
  export enum ESubCategoryPersonalFinanceUrl{
  getAllUrl = "/api/pf/subCategory/getAll",
  getAllDeletedUrl = "/api/pf/subCategory/getAllDeleted",
  getByIdUrl = "/api/pf/subCategory/getById",
  createUrl = "/api/pf/subCategory/create",
  updateUrl = "/api/pf/subCategory/update",
  softDeleteUrl = "/api/pf/subCategory/softDelete",
  restoreUrl = "/api/pf/subCategory/restore",
  deleteUrl = "/api/pf/subCategory/delete",
  }
  //#endregion

  //#region Hubs
  //SignalR
  // chatHubUrl = "/chat",
  //#endregion

  //#region Feature
  //QRCode
  export enum EQRCodeFeatureUrl{
  generateAQRCodeUrl = "/api/qrCode/generateAQRCode",
  generateListQRCodeUrl = "/api/qrCode/generateListQRCode",
  getAllFontsUrl = "/api/qrCode/getAllFonts",
  }
  //Word to PDF
  export enum EConvertWordToPdfFeatureUrl{
  convertWordToPdfUrl = "/api/convertWordToPdf/convertFile",
  }
  //#endregion

  //#region LipstickShop
  //Report
  export enum EReportLipstickShopUrl{
  getAllUrl = "/api/report/getAll",
  }
  //Order
  export enum EOrderLipstickShopUrl{
  getAllUrl = "/api/order/getAll",
  getAllDeletedUrl = "/api/order/getAllDeleted",
  getByIdUrl = "/api/order/getById",
  createUrl = "/api/order/create",
  updateUrl = "/api/order/update",
  softDeleteUrl = "/api/order/softDelete",
  restoreUrl = "/api/order/restore",
  deleteUrl = "/api/order/delete",
  }
  //Product
  export enum EProductLipstickShopUrl{
  getAllUrl = "/api/product/getAll",
  getAllActiveUrl = "/api/product/getAllActive",
  getByIdUrl = "/api/product/getById",
  createUrl = "/api/product/create",
  updateUrl = "/api/product/update",
  softDeleteUrl = "/api/product/softDelete",
  getBySearchTextUrl = "/api/product/suggestProductBySearchText",
  restoreUrl = "/api/product/restore",
  deleteUrl = "/api/product/delete",
  }
  //Blog
  export enum EBlogLipstickShopUrl{
  getAllUrl = "/api/blog/getAll",
  getAllActiveUrl = "/api/blog/getAllActive",
  getAllDeletedUrl = "/api/blog/getAllDeleted",
  getByIdUrl = "/api/blog/getById",
  createUrl = "/api/blog/create",
  updateUrl = "/api/blog/update",
  restoreUrl = "/api/blog/restore",
  softDeleteUrl = "/api/blog/softDelete",
  }
  //Brand
  export enum EBrandLipstickShopUrl{
  getAllUrl = "/api/brand/getAll",
  getByIdUrl = "/api/brand/getById",
  getAllDeletedUrl = "/api/brand/getAllDeleted",
  createUrl = "/api/brand/create",
  updateUrl = "/api/brand/update",
  getAllActiveUrl = "/api/brand/getAllActive",
  restoreUrl = "/api/brand/restore",
  softDeleteUrl = "/api/brand/softDelete",
  deleteUrl = "/api/brand/delete",
  }
  //Category
  export enum ECategoryLipstickShopUrl{
  getAllUrl = "/api/category/getAll",
  getAllActiveUrl = "/api/category/getAllActive",
  getAllDeletedUrl = "/api/category/getAllDeleted",
  getByIdUrl = "/api/category/getById",
  createUrl = "/api/category/create",
  updateUrl = "/api/category/update",
  restoreUrl = "/api/category/restore",
  softDeleteUrl = "/api/category/softDelete",
  deleteUrl = "/api/category/delete",
  }
  //SubCategory
  export enum ESubCategoryLipstickShopUrl{
  getAllUrl = "/api/subcategory/getAll",
  getAllDeletedUrl = "/api/subcategory/getAllDeleted",
  getAllActiveUrl = "/api/subcategory/getAllActive",
  getByIdUrl = "/api/subcategory/getById",
  createUrl = "/api/subcategory/create",
  updateUrl = "/api/subcategory/update",
  softDeleteUrl = "/api/subcategory/softDelete",
  deleteUrl = "/api/subcategory/delete",
  restoreUrl = "/api/subcategory/restore",
  getByCategoryIdUrl = "/api/subcategory/getByCategoryId",
  }
  //Color
  export enum EColorLipstickShopUrl{
  getAllUrl = "/api/color/getAll",
  getAllActiveUrl = "/api/color/getAllActive",
  getAllDeletedUrl = "/api/color/getAllDeleted",
  getByIdUrl = "/api/color/getById",
  createUrl = "/api/color/create",
  updateUrl = "/api/color/update",
  restoreUrl = "/api/color/restore",
  softDeleteUrl = "/api/color/softDelete",
  deleteUrl = "/api/color/delete",
  }
  //Size
  export enum ESizeLipstickShopUrl{
  getAllUrl = "/api/size/getAll",
  getAllActiveUrl = "/api/size/getAllActive",
  getAllDeletedUrl = "/api/size/getAllDeleted",
  getByIdUrl = "/api/size/getById",
  createUrl = "/api/size/create",
  updateUrl = "/api/size/update",
  restoreUrl = "/api/size/restore",
  softDeleteUrl = "/api/size/softDelete",
  deleteUrl = "/api/size/delete",
  }
  //PageType
  export enum EPageTypeLipstickShopUrl{
  getAllUrl = "/api/pageType/getAll",
  getAllActiveUrl = "/api/pageType/getAllActive",
  getAllDeletedUrl = "/api/pageType/getAllDeleted",
  getByIdUrl = "/api/pageType/getById",
  createUrl = "/api/pageType/create",
  updateUrl = "/api/pageType/update",
  softDeleteUrl = "/api/pageType/softDelete",
  getEPageTypeUrl = "/api/pageType/getEPageType",
  restoreUrl = "/api/pageType/restore",
  deleteUrl = "/api/pageType/delete",
  }
  //PageContent
  export enum EPageContentLipstickShopUrl{
  getAllUrl = "/api/pageContent/getAll",
  getAllActiveUrl = "/api/pageContent/getAllActive",
  getAllDeletedUrl = "/api/pageContent/getAllDeleted",
  getByIdUrl = "/api/pageContent/getById",
  createUrl = "/api/pageContent/create",
  updateUrl = "/api/pageContent/update",
  softDeleteUrl = "/api/pageContent/softDelete",
  restoreUrl = "/api/pageContent/restore",
  deleteUrl = "/api/pageContent/delete",
  }
  //PageIntroduction
  export enum EPageIntroductionLipstickShopUrl{
  getAllUrl = "/api/pageIntro/getAll",
  getAllDeletedUrl = "/api/pageIntro/getAllDeleted",
  getAllActiveUrl = "/api/pageIntro/getAllActive",
  getByIdUrl = "/api/pageIntro/getById",
  createUrl = "/api/pageIntro/create",
  updateUrl = "/api/pageIntro/update",
  softDeleteUrl = "/api/pageIntro/softDelete",
  restoreUrl = "/api/pageIntro/restore",
  deleteUrl = "/api/pageIntro/delete",
  }
  //Topic
  export enum ETopicLipstickShopUrl{
  getAllUrl = "/api/topic/getAll",
  getAllActiveUrl = "/api/topic/getAllActive",
  getAllDeletedUrl = "/api/topic/getAllDeleted",
  getByIdUrl = "/api/topic/getById",
  createUrl = "/api/topic/create",
  updateUrl = "/api/topic/update",
  softDeleteUrl = "/api/topic/softDelete",
  deleteUrl = "/api/topic/delete",
  restoreUrl = "/api/topic/restore",
  }
  //InforPage
  export enum EInforPageLipstickShopUrl{
  getAllPageTypeUrl = "/api/inforPage/getAllPageType",
  getAllUrl = "/api/inforPage/getAll",
  getAllDeletedUrl = "/api/inforPage/getAllDeleted",
  getAllActiveUrl = "/api/inforPage/getAllActive",
  getByIdUrl = "/api/inforPage/getById",
  createUrl = "/api/inforPage/create",
  updateUrl = "/api/inforPage/update",
  softDeleteUrl = "/api/inforPage/softDelete",
  getByPageTypeId = "/api/inforPage/getByPageTypeId",
  restoreUrl = "/api/inforPage/restore",
  }
  //HomeBanner
  export enum EHomeBannerLipstickShopUrl{
  getAllUrl = "/api/HomeBanner/getAll",
  getAllActiveUrl = "/api/HomeBanner/getAllActive",
  getAllDeletedUrl = "/api/HomeBanner/getAllDeleted",
  getByIdUrl = "/api/HomeBanner/getById",
  createUrl = "/api/HomeBanner/create",
  updateUrl = "/api/HomeBanner/update",
  softDeleteUrl = "/api/HomeBanner/softDelete",
  getByBannerTypeIdUrl = "/api/HomeBanner/getByBannerTypeId",
  restoreUrl = "/api/HomeBanner/restore",
  deleteUrl = "/api/HomeBanner/delete",
  }
  //Member
  export enum EMemberLipstickShopUrl{
  getAllUrl = "/api/member/getAll",
  }
  //Payment
  export enum EPaymentLipstickShopUrl{
  getAllUrl = "/api/payment/getAll",
  getByIdUrl = "/api/payment/getById",
  }
  //#endregion

  //#region System

  //My Account
  export enum EAuthSystemUrl{
    loginUrl = "/api/auth/login",
    externalLoginUrl = "/api/auth/externalLogin",
    validateRefreshTokenUrl = "/api/auth/validateRefreshToken",
    refreshTokenUrl = "/api/auth/refreshToken",
    logoutUrl = "/api/auth/logout",
  }

  export enum EMyAccountSystemUrl{
  changePasswordUrl = "/api/MyAccount/changePassword",
  recoverPasswordUrl = "/api/MyAccount/recoverPassword",
  resetPasswordUrl = "/api/MyAccount/resetPassword",
  }
  //province
  export enum EProvinceSystemUrl{
  getAllUrl = "/api/province/getAll",
  }
  //Account
  export enum EAccountSystemUrl{
  getAllUrl = "/api/user/getAll",
  getByIdUrl = "/api/user/getById/",
  createUrl = "/api/user/create",
  updateUrl = "/api/user/update",
  deactivateUserUrl = "/api/user/deactivateUser/",
  activateUserUrl = "/api/user/activateUser/",
  }
  //Role
  export enum ERoleSystemUrl{
  getAllUrl = "/api/role/getAll",
  getOptionListUrl = "/api/role/getOptionList",
  getAllActiveUrl = "/api/role/getAllActive",
  getByIdUrl = "/api/role/getById",
  createUrl = "/api/role/create",
  updateUrl = "/api/role/update",
  }
  //Module
  export enum EModuleSystemUrl{
  getAllUrl = "/api/module/getAll",
  getByIdUrl = "/api/module/getById",
  createUrl = "/api/module/create",
  updateUrl = "/api/module/update",
  }
  //Action
  export enum EActionSystemUrl{
  getAllUrl = "/api/action/getAll",
  getAllActiveUrl = "/api/action/getAllActive",
  getEActionUrl = "/api/action/getEAction",
  getByIdUrl = "/api/action/getById",
  createUrl = "/api/action/create",
  updateUrl = "/api/action/update",
  }
  //Setting
  export enum ESettingSystemUrl{
  getAllUrl = "/api/setting/getAll",
  getByKeyUrl = "/api/setting/getByKey",
  updateUrl = "/api/setting/update",
  } 
  //Action logging
  export enum EActionLoggingSystemUrl{
  getAllUrl = "/api/ActionLogging/getAll",
  getByIdUrl = "/api/ActionLogging/getById",
  }
  //#endregion

  //#region Survey

  //participant
  export enum EParticipantSurveyUrl{
    getAllUrl = "/api/participant/getAll",
    getByIdUrl = "/api/participant/getById",
    exportExcelUrl = "/api/participant/exportExcel",
    initParticipantUrl = "/api/participant/initParticipant",
    addAnswersUrl = "/api/participant/addAnswers",
    filterUrl = "/api/participant/filter",
    rejectUrl = "/api/participant/reject",
    highlightUrl = "/api/participant/highlight",
    removeHighlightUrl = "/api/participant/removeHighlight",
}

  //questionGroupLibrary
  export enum EQuestionGroupLibrarySurveyUrl{
  getAllUrl = "/api/questionGroupLibrary/getAll",
  getAllActiveUrl = "/api/questionGroupLibrary/getAllActive",
  getOptionListUrl = "/api/questionGroupLibrary/getOptionList",
  getTreeOptionListUrl = "/api/questionGroupLibrary/getTreeOptionList",
  getAllDeletedUrl = "/api/questionGroupLibrary/getAllDeleted",
  getByIdUrl = "/api/questionGroupLibrary/getById",
  createUrl = "/api/questionGroupLibrary/create",
  updateUrl = "/api/questionGroupLibrary/update",
  softDeleteUrl = "/api/questionGroupLibrary/softDelete",
  restoreUrl = "/api/questionGroupLibrary/restore",
  deleteUrl = "/api/questionGroupLibrary/delete",
  }

  //questionLibrary
  export enum EQuestionLibrarySurveyUrl{
  getAllUrl = "/api/questionLibrary/getAll",
  filterUrl = "/api/questionLibrary/getByFilter",
  getAllDeletedUrl = "/api/questionLibrary/getAllDeleted",
  getEagerLoadingByIdUrl = "/api/questionLibrary/getEagerLoadingById",
  getByIdUrl = "/api/questionLibrary/getById",
  createUrl = "/api/questionLibrary/create",
  updateUrl = "/api/questionLibrary/update",
  softDeleteUrl = "/api/questionLibrary/softDelete",
  restoreUrl = "/api/questionLibrary/restore",
  deleteUrl = "/api/questionLibrary/delete",
  }

  //PredefinedAnswerLibrary
  export enum EPredefinedAnswerLibrarySurveyUrl{
  getByQuestionLibraryIdUrl = "/api/predefinedAnswerLibrary/getByQuestionLibraryId",
  getByIdUrl = "/api/predefinedAnswerLibrary/getById",
  createUrl = "/api/predefinedAnswerLibrary/create",
  updateUrl = "/api/predefinedAnswerLibrary/update",
  deleteUrl = "/api/predefinedAnswerLibrary/delete",
  }

  //questionType
  export enum EQuestionTypeSurveyUrl{
  getAllUrl = "/api/questionType/getAll",
  getOptionListUrl = "/api/questionType/getOptionList",
  }

  //store
  export enum EStoreSurveyUrl{
  getAllUrl = "/api/store/getAll",
  getOptionListUrl = "/api/store/getOptionList",
  getByIdUrl = "/api/store/getById",
  createUrl = "/api/store/create",
  updateUrl = "/api/store/update",
  softDeleteUrl = "/api/store/softDelete",
  restoreUrl = "/api/store/restore",
  deleteUrl = "/api/store/delete",
  getAllDeletedUrl = "/api/store/getAllDeleted",
  }
  //surveyForm
  export enum ESurveyFormSurveyUrl{
  getAllUrl = "/api/surveyForm/getAll",
  filterUrl = "/api/surveyForm/filter",
  getAllActiveUrl = "/api/surveyForm/getAllActive",
  getByIdUrl = "/api/surveyForm/getById",
  getEagerByIdUrl = "/api/surveyForm/getEagerById",
  getPublicFormByIdUrl = "/api/surveyForm/getPublicFormById",
  getReviewFormByIdUrl = "/api/surveyForm/getReviewFormById",
  // getEagerUIByIdUrl = "/api/surveyForm/getEagerUIById",
  createUrl = "/api/surveyForm/create",
  updateUrl = "/api/surveyForm/update",
  softDeleteUrl = "/api/surveyForm/softDelete",
  restoreUrl = "/api/surveyForm/restore",
  deleteUrl = "/api/surveyForm/delete",
  getAllDeletedUrl = "/api/surveyForm/getAllDeleted",
  publicUrl = "/api/surveyForm/public",
  unPublicUrl = "/api/surveyForm/unPublic",
  deactivateUrl = "/api/surveyForm/deactivate",
  activateUrl = "/api/surveyForm/activate",
  checkValidFormUrl = "/api/surveyForm/checkValidForm",
  }

  //QuestionGroup
  export enum EQuestionGroupSurveyUrl{
  getBySurveyFormIdUrl = "/api/questionGroup/getBySurveyFormId",
  getByIdUrl = "/api/questionGroup/getById",
  createUrl = "/api/questionGroup/create",
  updateUrl = "/api/questionGroup/update",
  deleteUrl = "/api/questionGroup/delete",
  }
  //Question
  export enum EQuestionSurveyUrl{
  getBySurveyFormIdUrl = "/api/question/getBySurveyFormId",
  getByQuestionGroupIdUrl = "/api/question/getByQuestionGroupId",
  getByIdUrl = "/api/question/getById",
  getEagerLoadingByIdUrl = "/api/question/getEagerLoadingById",
  createUrl = "/api/question/create",
  updateUrl = "/api/question/update",
  deleteUrl = "/api/question/delete",
  }

  //PredefinedAnswer
  export enum EPredefinedAnswerSurveyUrl{
  getByQuestionIdUrl = "/api/predefinedAnswer/getByQuestionId",
  getByIdUrl = "/api/predefinedAnswer/getById",
  createUrl = "/api/predefinedAnswer/create",
  updateUrl = "/api/predefinedAnswer/update",
  deleteUrl = "/api/predefinedAnswer/delete",
  }

  //participantInfoConfig
  export enum EParticipantInfoConfigSurveyUrl{
  getBySurveyFormIdUrl = "/api/participantInfoConfig/getBySurveyFormId",
  getByIdUrl = "/api/participantInfoConfig/getById",
  createUrl = "/api/participantInfoConfig/create",
  updateUrl = "/api/participantInfoConfig/update",
  deleteUrl = "/api/participantInfoConfig/delete",
  }

  //surveyReport
  export enum ESurveyReportSurveyUrl{
  getAllUrl = "/api/surveyReport/getAll",
  getByIdUrl = "/api/surveyReport/getById",
  getBySurveyFormIdUrl = "/api/surveyReport/getBySurveyFormId",
  generateReportUrl = "/api/surveyReport/generateReport",
  exportExcelUrl = "/api/surveyReport/exportExcel",
  exportPdfUrl = "/api/surveyReport/exportPdf",
  getStatisticsUrl = "/api/surveyReport/getStatistics",
  }

  //#endregion