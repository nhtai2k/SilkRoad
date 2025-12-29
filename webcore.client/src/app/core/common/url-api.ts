
//#region StockMarket
//Company
export enum ECompanyStockMarketUrl {
  getAllUrl = "/api/company/getAll",
  getAllActiveUrl = "/api/company/getAllActive",
  getAllSymbolsUrl = "/api/company/getAllSymbols",
  getOptionListUrl = "/api/company/getOptionList",
  getAllDeletedUrl = "/api/company/getAllDeleted",
  getByIdUrl = "/api/company/getById",
  createUrl = "/api/company/create",
  updateUrl = "/api/company/update",
  softDeleteUrl = "/api/company/softDelete",
  restoreUrl = "/api/company/restore",
  deleteUrl = "/api/company/delete",
}
//TradeHistory
export enum ETradeHistoryStockMarketUrl {
  getAllUrl = "/api/tradeHistory/getAll",
  getByIdUrl = "/api/tradeHistory/getById",
  createUrl = "/api/tradeHistory/create",
  updateUrl = "/api/tradeHistory/update",
  deleteUrl = "/api/tradeHistory/delete",
}

//Industry
export enum EIndustryStockMarketUrl {
  getAllUrl = "/api/industry/getAll",
  getAllActiveUrl = "/api/industry/getAllActive",
  getOptionListUrl = "/api/industry/getOptionList",
  getAllDeletedUrl = "/api/industry/getAllDeleted",
  getByIdUrl = "/api/industry/getById",
  createUrl = "/api/industry/create",
  updateUrl = "/api/industry/update",
  softDeleteUrl = "/api/industry/softDelete",
  restoreUrl = "/api/industry/restore",
  deleteUrl = "/api/industry/delete",
}

//stock-price
export enum EChartStockMarketUrl {
  getAllUrl = "/api/chart/getAll",
  getNewDataUrl = "/api/chart/getNewData",
}
//#endregion

//#region PersonalFinance
//Category
export enum ECategoryPersonalFinanceUrl {
  getAllUrl = "/api/pf/category/getAll",
  getOptionListUrl = "/api/pf/category/getOptionList",
  getTreeOptionListUrl = "/api/pf/category/getTreeOptionList",
  getAllDeletedUrl = "/api/pf/category/getAllDeleted",
  getByIdUrl = "/api/pf/category/getById",
  createUrl = "/api/pf/category/create",
  updateUrl = "/api/pf/category/update",
  softDeleteUrl = "/api/pf/category/softDelete",
  restoreUrl = "/api/pf/category/restore",
  deleteUrl = "/api/pf/category/delete",
}
//SubCategory
export enum ESubCategoryPersonalFinanceUrl {
  getAllUrl = "/api/pf/subCategory/getAll",
  getAllDeletedUrl = "/api/pf/subCategory/getAllDeleted",
  getByIdUrl = "/api/pf/subCategory/getById",
  createUrl = "/api/pf/subCategory/create",
  updateUrl = "/api/pf/subCategory/update",
  softDeleteUrl = "/api/pf/subCategory/softDelete",
  restoreUrl = "/api/pf/subCategory/restore",
  deleteUrl = "/api/pf/subCategory/delete",
}
//Expense
export enum EExpensePersonalFinanceUrl {
  getByFilterUrl = "/api/pf/expense/getByFilter",
  getByIdUrl = "/api/pf/expense/getById",
  createUrl = "/api/pf/expense/create",
  updateUrl = "/api/pf/expense/update",
  deleteUrl = "/api/pf/expense/delete",
}
//Income
export enum EIncomePersonalFinanceUrl {
  getAllUrl = "/api/pf/income/getAll",
  getByIdUrl = "/api/pf/income/getById",
  createUrl = "/api/pf/income/create",
  updateUrl = "/api/pf/income/update",
  deleteUrl = "/api/pf/income/delete",
}
//Report
export enum EReportPersonalFinanceUrl {
  getColoumnChartByMonthUrl = "/api/pf/report/GetColoumnChartByMonth",
}

//#endregion

//#region Hubs
//SignalR
// chatHubUrl = "/chat",
//#endregion

//#region Feature
//QRCode
export enum EQRCodeFeatureUrl {
  generateAQRCodeUrl = "/api/qrCode/generateAQRCode",
  generateListQRCodeUrl = "/api/qrCode/generateListQRCode",
  getAllFontsUrl = "/api/qrCode/getAllFonts",
}
//Word to PDF
export enum EConvertWordToPdfFeatureUrl {
  convertWordToPdfUrl = "/api/convertWordToPdf/convertFile",
}
//#endregion

//#region LipstickShop
//Report
export enum EReportLipstickShopUrl {
  getAllUrl = "/api/report/getAll",
}
//Order
export enum EOrderLipstickShopUrl {
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
export enum EProductLipstickShopUrl {
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
export enum EBlogLipstickShopUrl {
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
export enum EBrandLipstickShopUrl {
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
export enum ECategoryLipstickShopUrl {
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
export enum ESubCategoryLipstickShopUrl {
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
export enum EColorLipstickShopUrl {
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
export enum ESizeLipstickShopUrl {
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
export enum EPageTypeLipstickShopUrl {
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
export enum EPageContentLipstickShopUrl {
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
export enum EPageIntroductionLipstickShopUrl {
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
export enum ETopicLipstickShopUrl {
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
export enum EInforPageLipstickShopUrl {
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
export enum EHomeBannerLipstickShopUrl {
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
export enum EMemberLipstickShopUrl {
  getAllUrl = "/api/member/getAll",
}
//Payment
export enum EPaymentLipstickShopUrl {
  getAllUrl = "/api/payment/getAll",
  getByIdUrl = "/api/payment/getById",
}
//#endregion

//#region BOMs
// BOM
export const enum EBOMUrl {
  getAllUrl = "/api/bom/bomQuery/getall",
  getAllByFilterUrl = "/api/bom/bomQuery/getByFilter",
  getAllDeletedUrl = "/api/bom/bomQuery/getAllDeleted",
  getByIdUrl = "/api/bom/bomQuery/getById",
  createUrl = "/api/bom/bomCommand/create",
  updateUrl = "/api/bom/bomCommand/update",
  softDeleteUrl = "/api/bom/bomCommand/softDelete",
  restoreUrl = "/api/bom/bomCommand/restore",
  deleteUrl = "/api/bom/bomCommand/delete",
}


// BOMConfiguration
export const enum EBOMConfigurationBOMUrl {
  getAllUrl = "/api/bom/bomConfiguration/getAll",
  getOptionListUrl = "/api/bom/bomConfiguration/getOptionList",
  getAllDeletedUrl = "/api/bom/bomConfiguration/getAllDeleted",
  getByIdUrl = "/api/bom/bomConfiguration/getById",
  createUrl = "/api/bom/bomConfiguration/create",
  updateUrl = "/api/bom/bomConfiguration/update",
  softDeleteUrl = "/api/bom/bomConfiguration/softDelete",
  restoreUrl = "/api/bom/bomConfiguration/restore",
  deleteUrl = "/api/bom/bomConfiguration/delete",
}
// Employee
export const enum EEmployeeBOMUrl {
  getAllUrl = "/api/bom/employee/getAll",
  getByFilterUrl = "/api/bom/employee/getByFilter",
  getByDepartmentIdNRankIdUrl = "/api/bom/employee/getByDepartmentIdNRankId",
  getAllDeletedUrl = "/api/bom/employee/getAllDeleted",
  getByIdUrl = "/api/bom/employee/getById",
  createUrl = "/api/bom/employee/create",
  updateUrl = "/api/bom/employee/update",
  softDeleteUrl = "/api/bom/employee/softDelete",
  restoreUrl = "/api/bom/employee/restore",
  deleteUrl = "/api/bom/employee/delete",
}
// Kitchen
export const enum EKitchenBOMUrl {
  getAllUrl = "/api/bom/kitchen/getAll",
  getOptionListUrl = "/api/bom/kitchen/getOptionList",
  getAllDeletedUrl = "/api/bom/kitchen/getAllDeleted",
  getByIdUrl = "/api/bom/kitchen/getById",
  createUrl = "/api/bom/kitchen/create",
  updateUrl = "/api/bom/kitchen/update",
  softDeleteUrl = "/api/bom/kitchen/softDelete",
  restoreUrl = "/api/bom/kitchen/restore",
  deleteUrl = "/api/bom/kitchen/delete",
}
// Mall
export const enum EMallBOMUrl {
  getAllUrl = "/api/bom/mall/getAll",
  getAllDeletedUrl = "/api/bom/mall/getAllDeleted",
  getByIdUrl = "/api/bom/mall/getById",
  createUrl = "/api/bom/mall/create",
  updateUrl = "/api/bom/mall/update",
  softDeleteUrl = "/api/bom/mall/softDelete",
  restoreUrl = "/api/bom/mall/restore",
  deleteUrl = "/api/bom/mall/delete",
}
//Location
export enum ELocationBOMUrl {
  getAllUrl = "/api/bom/location/getAll",
  getAllDeletedUrl = "/api/bom/location/getAllDeleted",
  getByIdUrl = "/api/bom/location/getById",
  createUrl = "/api/bom/location/create",
  updateUrl = "/api/bom/location/update",
  softDeleteUrl = "/api/bom/location/softDelete",
  restoreUrl = "/api/bom/location/restore",
  deleteUrl = "/api/bom/location/delete",
}

//Area
export enum EAreaBOMUrl {
  getAllUrl = "/api/bom/area/getAll",
  getAllDeletedUrl = "/api/bom/area/getAllDeleted",
  getByIdUrl = "/api/bom/area/getById",
  createUrl = "/api/bom/area/create",
  updateUrl = "/api/bom/area/update",
  softDeleteUrl = "/api/bom/area/softDelete",
  restoreUrl = "/api/bom/area/restore",
  deleteUrl = "/api/bom/area/delete",
}
// Material
export enum EMaterialBOMUrl {
  getAllUrl = "/api/bom/material/getAll",
  getAllByFilterUrl = "/api/bom/material/getByFilter",
  getOptionListUrl = "/api/bom/material/getOptionList",
  getAllDeletedUrl = "/api/bom/material/getAllDeleted",
  getAllByMaterialGroupIdUrl = "/api/bom/material/getByMaterialGroupId",
  getByIdUrl = "/api/bom/material/getById",
  createUrl = "/api/bom/material/create",
  updateUrl = "/api/bom/material/update",
  softDeleteUrl = "/api/bom/material/softDelete",
  restoreUrl = "/api/bom/material/restore",
  deleteUrl = "/api/bom/material/delete",
}
// Rental
export enum ERentalBOMUrl {
  getAllUrl = "/api/bom/rental/GetAll",
  getAllDeletedUrl = "/api/bom/rental/getAllDeleted",
  getByIdUrl = "/api/bom/rental/getById",
  createUrl = "/api/bom/rental/Create",
  updateUrl = "/api/bom/rental/Update",
  softDeleteUrl = "/api/bom/rental/SoftDelete",
  restoreUrl = "/api/bom/rental/Restore",
  deleteUrl = "/api/bom/rental/Delete",
}

// Unit
export enum EUnitBOMUrl {
  getAllUrl = "/api/bom/unit/GetAll",
  getOptionListUrl = "/api/bom/unit/getOptionList",
  getTreeOptionListUrl = "/api/bom/unit/getTreeOptionList",
  getAllDeletedUrl = "/api/bom/unit/GetAllDeleted",
  getByIdUrl = "/api/bom/unit/getById",
  createUrl = "/api/bom/unit/Create",
  updateUrl = "/api/bom/unit/Update",
  softDeleteUrl = "/api/bom/unit/SoftDelete",
  restoreUrl = "/api/bom/unit/Restore",
  deleteUrl = "/api/bom/unit/Delete",
}
// UnitGroup
export enum EUnitGroupBOMUrl {
  getAllUrl = "/api/bom/unitGroup/getAll",
  getOptionListUrl = "/api/bom/unitGroup/getOptionList",
  //getTreeOptionListUrl = "/api/bom/unitGroup/getTreeOptionList",
  getAllDeletedUrl = "/api/bom/unitGroup/getAllDeleted",
  getByIdUrl = "/api/bom/unitGroup/getById",
  createUrl = "/api/bom/unitGroup/create",
  updateUrl = "/api/bom/unitGroup/update",
  softDeleteUrl = "/api/bom/unitGroup/softDelete",
  restoreUrl = "/api/bom/unitGroup/restore",
  deleteUrl = "/api/bom/unitGroup/delete",
}
// Energy
export enum EEnergyBOMUrl {
  getAllUrl = "/api/bom/energy/getAll",
  getOptionListUrl = "/api/bom/energy/getOptionList",
  getAllDeletedUrl = "/api/bom/energy/getAllDeleted",
  getByIdUrl = "/api/bom/energy/getById",
  createUrl = "/api/bom/energy/create",
  updateUrl = "/api/bom/energy/update",
  softDeleteUrl = "/api/bom/energy/softDelete",
  restoreUrl = "/api/bom/energy/restore",
  deleteUrl = "/api/bom/energy/delete",
  exportExcelUrl = "/api/bom/energy/exportExcel",
}
// Rank
export enum ERankBOMUrl {
  getAllUrl = "/api/bom/rank/GetAll",
  getOptionListUrl = "/api/bom/rank/getOptionList",
  getAllDeletedUrl = "/api/bom/rank/GetAllDeleted",
  getByIdUrl = "/api/bom/rank/getById",
  createUrl = "/api/bom/rank/Create",
  updateUrl = "/api/bom/rank/Update",
  softDeleteUrl = "/api/bom/rank/SoftDelete",
  restoreUrl = "/api/bom/rank/Restore",
  deleteUrl = "/api/bom/rank/Delete",
}
// PropertyType
export enum EPropertyTypeBOMUrl {
  getAllUrl = "/api/bom/propertyType/getAll",
  getOptionListUrl = "/api/bom/propertyType/getOptionList",
  getAllDeletedUrl = "/api/bom/propertyType/getAllDeleted",
  getByIdUrl = "/api/bom/propertyType/getById",
  createUrl = "/api/bom/propertyType/create",
  updateUrl = "/api/bom/propertyType/update",
  softDeleteUrl = "/api/bom/propertyType/softDelete",
  restoreUrl = "/api/bom/propertyType/restore",
  deleteUrl = "/api/bom/propertyType/delete",
}
// Property
export enum EPropertyBOMUrl {
  getAllUrl = "/api/bom/property/getAll",
  getAllByFilterUrl = "/api/bom/property/getByFilter",
  getAllDeletedUrl = "/api/bom/property/getAllDeleted",
  getByPropertyTypeIdUrl = "/api/bom/property/getByPropertyTypeId",
  getByIdUrl = "/api/bom/property/getById",
  createUrl = "/api/bom/property/create",
  updateUrl = "/api/bom/property/update",
  softDeleteUrl = "/api/bom/property/softDelete",
  restoreUrl = "/api/bom/property/restore",
  deleteUrl = "/api/bom/property/delete",
}
// Procedure
export enum EProcedureBOMUrl {
  getAllUrl = "/api/bom/procedure/getAll",
  getOptionListUrl = "/api/bom/procedure/getOptionList",
  getAllDeletedUrl = "/api/bom/procedure/getAllDeleted",
  getByIdUrl = "/api/bom/procedure/getById",
  createUrl = "/api/bom/procedure/create",
  updateUrl = "/api/bom/procedure/update",
  softDeleteUrl = "/api/bom/procedure/softDelete",
  restoreUrl = "/api/bom/procedure/restore",
  deleteUrl = "/api/bom/procedure/delete",
}
// MaterialGroup
export enum EMaterialGroupBOMUrl {
  getAllUrl = "/api/bom/materialGroup/getAll",
  getOptionListUrl = "/api/bom/materialGroup/getOptionList",
  getAllDeletedUrl = "/api/bom/materialGroup/getAllDeleted",
  getByIdUrl = "/api/bom/materialGroup/getById",
  createUrl = "/api/bom/materialGroup/create",
  updateUrl = "/api/bom/materialGroup/update",
  softDeleteUrl = "/api/bom/materialGroup/softDelete",
  restoreUrl = "/api/bom/materialGroup/restore",
  deleteUrl = "/api/bom/materialGroup/delete",
}
//MaterialCategory
export enum EMaterialCategoryBOMUrl {
  getAllUrl = "/api/bom/materialCategory/getAll",
  getOptionListUrl = "/api/bom/materialCategory/getOptionList",
  getAllDeletedUrl = "/api/bom/materialCategory/getAllDeleted",
  getByIdUrl = "/api/bom/materialCategory/getById",
  createUrl = "/api/bom/materialCategory/create",
  updateUrl = "/api/bom/materialCategory/update",
  softDeleteUrl = "/api/bom/materialCategory/softDelete",
  restoreUrl = "/api/bom/materialCategory/restore",
  deleteUrl = "/api/bom/materialCategory/delete",
}
//DishGroup
export enum EDishGroupBOMUrl {
  getAllUrl = "/api/bom/dishGroup/getAll",
  getOptionListUrl = "/api/bom/dishGroup/getOptionList",
  getAllDeletedUrl = "/api/bom/dishGroup/getAllDeleted",
  getByIdUrl = "/api/bom/dishGroup/getById",
  createUrl = "/api/bom/dishGroup/create",
  updateUrl = "/api/bom/dishGroup/update",
  softDeleteUrl = "/api/bom/dishGroup/softDelete",
  restoreUrl = "/api/bom/dishGroup/restore",
  deleteUrl = "/api/bom/dishGroup/delete",
}

//Dish
export enum EDishBOMUrl {
  getAllUrl = "/api/bom/dish/getAll",
  getByFilterUrl = "/api/bom/dish/getByFilter",
  getOptionListUrl = "/api/bom/dish/getOptionList",
  getAllDeletedUrl = "/api/bom/dish/getAllDeleted",
  getByIdUrl = "/api/bom/dish/getById",
  createUrl = "/api/bom/dish/create",
  updateUrl = "/api/bom/dish/update",
  softDeleteUrl = "/api/bom/dish/softDelete",
  restoreUrl = "/api/bom/dish/restore",
  deleteUrl = "/api/bom/dish/delete",
  exportExcelUrl = "/api/bom/dish/exportExcel",
}
//Department
export enum EDepartmentBOMUrl {
  getAllUrl = "/api/bom/department/getAll",
  getOptionListUrl = "/api/bom/department/getOptionList",
  getAllDeletedUrl = "/api/bom/department/getAllDeleted",
  getByIdUrl = "/api/bom/department/getById",
  createUrl = "/api/bom/department/create",
  updateUrl = "/api/bom/department/update",
  softDeleteUrl = "/api/bom/department/softDelete",
  restoreUrl = "/api/bom/department/restore",
  deleteUrl = "/api/bom/department/delete",
}

//#endregion

//#region System

//My Account
export enum EAuthSystemUrl {
  loginUrl = "/api/auth/login",
  externalLoginUrl = "/api/auth/externalLogin",
  validateRefreshTokenUrl = "/api/auth/validateRefreshToken",
  refreshTokenUrl = "/api/auth/refreshToken",
  getCurrentUserUrl = "/api/auth/getCurrentUser",
  logoutUrl = "/api/auth/logout",
}

export enum EMyAccountSystemUrl {
  changePasswordUrl = "/api/MyAccount/changePassword",
  recoverPasswordUrl = "/api/MyAccount/recoverPassword",
  resetPasswordUrl = "/api/MyAccount/resetPassword",
}
//province
export enum EProvinceSystemUrl {
  getAllUrl = "/api/province/getAll",
}
//Account
export enum EAccountSystemUrl {
  getAllUrl = "/api/user/getAll",
  getByIdUrl = "/api/user/getById/",
  createUrl = "/api/user/create",
  updateUrl = "/api/user/update",
  deactivateUserUrl = "/api/user/deactivateUser/",
  activateUserUrl = "/api/user/activateUser/",
}
//Role
export enum ERoleSystemUrl {
  getAllUrl = "/api/role/getAll",
  getOptionListUrl = "/api/role/getOptionList",
  getAllActiveUrl = "/api/role/getAllActive",
  getByIdUrl = "/api/role/getById",
  createUrl = "/api/role/create",
  updateUrl = "/api/role/update",
}
//Module
export enum EModuleSystemUrl {
  getAllUrl = "/api/module/getAll",
  getByIdUrl = "/api/module/getById",
  createUrl = "/api/module/create",
  updateUrl = "/api/module/update",
}
//Action
export enum EActionSystemUrl {
  getAllUrl = "/api/action/getAll",
  getAllActiveUrl = "/api/action/getAllActive",
  getEActionUrl = "/api/action/getEAction",
  getByIdUrl = "/api/action/getById",
  createUrl = "/api/action/create",
  updateUrl = "/api/action/update",
}
//Setting
export enum ESettingSystemUrl {
  getAllUrl = "/api/setting/getAll",
  getByKeyUrl = "/api/setting/getByKey",
  updateUrl = "/api/setting/update",
}
//Action logging
export enum EActionLoggingSystemUrl {
  getAllUrl = "/api/ActionLogging/getAll",
  getByIdUrl = "/api/ActionLogging/getById",
}
//#endregion

//#region Survey

//participant
export enum EParticipantSurveyUrl {
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
export enum EQuestionGroupLibrarySurveyUrl {
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
export enum EQuestionLibrarySurveyUrl {
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
export enum EPredefinedAnswerLibrarySurveyUrl {
  getByQuestionLibraryIdUrl = "/api/predefinedAnswerLibrary/getByQuestionLibraryId",
  getByIdUrl = "/api/predefinedAnswerLibrary/getById",
  createUrl = "/api/predefinedAnswerLibrary/create",
  updateUrl = "/api/predefinedAnswerLibrary/update",
  deleteUrl = "/api/predefinedAnswerLibrary/delete",
}

//questionType
export enum EQuestionTypeSurveyUrl {
  getAllUrl = "/api/questionType/getAll",
  getOptionListUrl = "/api/questionType/getOptionList",
}

//store
export enum EStoreSurveyUrl {
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
export enum ESurveyFormSurveyUrl {
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
export enum EQuestionGroupSurveyUrl {
  getBySurveyFormIdUrl = "/api/questionGroup/getBySurveyFormId",
  getByIdUrl = "/api/questionGroup/getById",
  createUrl = "/api/questionGroup/create",
  updateUrl = "/api/questionGroup/update",
  deleteUrl = "/api/questionGroup/delete",
}
//Question
export enum EQuestionSurveyUrl {
  getBySurveyFormIdUrl = "/api/question/getBySurveyFormId",
  getByQuestionGroupIdUrl = "/api/question/getByQuestionGroupId",
  getByIdUrl = "/api/question/getById",
  getEagerLoadingByIdUrl = "/api/question/getEagerLoadingById",
  createUrl = "/api/question/create",
  updateUrl = "/api/question/update",
  deleteUrl = "/api/question/delete",
}

//PredefinedAnswer
export enum EPredefinedAnswerSurveyUrl {
  getByQuestionIdUrl = "/api/predefinedAnswer/getByQuestionId",
  getByIdUrl = "/api/predefinedAnswer/getById",
  createUrl = "/api/predefinedAnswer/create",
  updateUrl = "/api/predefinedAnswer/update",
  deleteUrl = "/api/predefinedAnswer/delete",
}

//participantInfoConfig
export enum EParticipantInfoConfigSurveyUrl {
  getBySurveyFormIdUrl = "/api/participantInfoConfig/getBySurveyFormId",
  getByIdUrl = "/api/participantInfoConfig/getById",
  createUrl = "/api/participantInfoConfig/create",
  updateUrl = "/api/participantInfoConfig/update",
  deleteUrl = "/api/participantInfoConfig/delete",
}

//surveyReport
export enum ESurveyReportSurveyUrl {
  getAllUrl = "/api/surveyReport/getAll",
  getByIdUrl = "/api/surveyReport/getById",
  getBySurveyFormIdUrl = "/api/surveyReport/getBySurveyFormId",
  generateReportUrl = "/api/surveyReport/generateReport",
  exportExcelUrl = "/api/surveyReport/exportExcel",
  exportPdfUrl = "/api/surveyReport/exportPdf",
  getStatisticsUrl = "/api/surveyReport/getStatistics",
}

//#endregion