//#region BeeBot
//BeeBot
export const enum EBeeBotChatbotUrl {
  sendMessageUrl = "/api/chatbot/beeBot/sendMessage",
  getVoidUrl = "/api/chatbot/beeBot/getVoid",
  getMusicUrl = "/api/chatbot/beeBot/getMusic",
}

//Ollama
export const enum EOllamaChatbotUrl {
  completeChatUrl = "/api/chatbot/ollama/completeChat",
  completeChatStreamingUrl = "/api/chatbot/ollama/completeChatStreaming",
  getModelsUrl = "/api/chatbot/ollama/getModels",
}
//ChatGPT
export const enum EChatGPTChatbotUrl {
  completeChatUrl = "/api/chatbot/chatgpt/completeChat",
  getModelsUrl = "/api/chatbot/chatgpt/getModels",
}
//Prompt
export const enum EPromptChatbotUrl {
  getAllUrl = "/api/chatbot/prompt/getall",
  getOptionListUrl = "/api/chatbot/prompt/getOptionList",
  getByIdUrl = "/api/chatbot/prompt/getById",
  createUrl = "/api/chatbot/prompt/create",
  updateUrl = "/api/chatbot/prompt/update",
  softDeleteUrl = "/api/chatbot/prompt/softDelete",
  getAllActiveUrl = "/api/chatbot/prompt/getAllActive",
  getAllDeletedUrl = "/api/chatbot/prompt/getAllDeleted",
  restoreUrl = "/api/chatbot/prompt/restore",
  deleteUrl = "/api/chatbot/prompt/delete",
}
//Conversation
export const enum EConversationChatbotUrl {
  getByFilterUrl = "/api/chatbot/conversation/getByFilter",
}
//Voice
export const enum EVoiceChatbotUrl {
  getVoiceFromChatGPTUrl = "/api/chatbot/voice/getVoiceFromChatGPT",
  getVoiceFromElevenlabsUrl = "/api/chatbot/voice/getVoiceFromElevenlabs",
}
//#endregion

//#region StockMarket
//Handbook
export enum EHandbookStockMarketUrl {
  getAllUrl = "/api/stock/handbook/getAll",
  getByIdUrl = "/api/stock/handbook/getById",
  createUrl = "/api/stock/handbook/create",
  updateUrl = "/api/stock/handbook/update",
  softDeleteUrl = "/api/stock/handbook/softDelete",
  restoreUrl = "/api/stock/handbook/restore",
  deleteUrl = "/api/stock/handbook/delete",
}
//Company
export enum ECompanyStockMarketUrl {
  getAllUrl = "/api/stock/company/getAll",
  getAllActiveUrl = "/api/stock/company/getAllActive",
  getAllSymbolsUrl = "/api/stock/company/getAllSymbols",
  getOptionListUrl = "/api/stock/company/getOptionList",
  getAllDeletedUrl = "/api/stock/company/getAllDeleted",
  getByIdUrl = "/api/stock/company/getById",
  createUrl = "/api/stock/company/create",
  updateUrl = "/api/stock/company/update",
  softDeleteUrl = "/api/stock/company/softDelete",
  restoreUrl = "/api/stock/company/restore",
  deleteUrl = "/api/stock/company/delete",
}
//TradeHistory
export enum ETradeHistoryStockMarketUrl {
  getAllUrl = "/api/stock/tradeHistory/getAll",
  getByIdUrl = "/api/stock/tradeHistory/getById",
  createUrl = "/api/stock/tradeHistory/create",
  updateUrl = "/api/stock/tradeHistory/update",
  deleteUrl = "/api/stock/tradeHistory/delete",
}

//Industry
export enum EIndustryStockMarketUrl {
  getAllUrl = "/api/stock/industry/getAll",
  getAllActiveUrl = "/api/stock/industry/getAllActive",
  getOptionListUrl = "/api/stock/industry/getOptionList",
  getAllDeletedUrl = "/api/stock/industry/getAllDeleted",
  getByIdUrl = "/api/stock/industry/getById",
  createUrl = "/api/stock/industry/create",
  updateUrl = "/api/stock/industry/update",
  softDeleteUrl = "/api/stock/industry/softDelete",
  restoreUrl = "/api/stock/industry/restore",
  deleteUrl = "/api/stock/industry/delete",
}

//stock-price
export enum EChartStockMarketUrl {
  getAllUrl = "/api/stock/chart/getAll",
  getNewDataUrl = "/api/stock/chart/getNewData",
}
//#endregion

//#region PersonalFinance
//Category
export enum ECategoryPersonalFinanceUrl {
  getAllUrl = "/api/personalFinance/category/getAll",
  getOptionListUrl = "/api/personalFinance/category/getOptionList",
  getTreeOptionListUrl = "/api/personalFinance/category/getTreeOptionList",
  getAllDeletedUrl = "/api/personalFinance/category/getAllDeleted",
  getByIdUrl = "/api/personalFinance/category/getById",
  createUrl = "/api/personalFinance/category/create",
  updateUrl = "/api/personalFinance/category/update",
  softDeleteUrl = "/api/personalFinance/category/softDelete",
  restoreUrl = "/api/personalFinance/category/restore",
  deleteUrl = "/api/personalFinance/category/delete",
}
//SubCategory
export enum ESubCategoryPersonalFinanceUrl {
  getAllUrl = "/api/personalFinance/subCategory/getAll",
  getAllDeletedUrl = "/api/personalFinance/subCategory/getAllDeleted",
  getByIdUrl = "/api/personalFinance/subCategory/getById",
  createUrl = "/api/personalFinance/subCategory/create",
  updateUrl = "/api/personalFinance/subCategory/update",
  softDeleteUrl = "/api/personalFinance/subCategory/softDelete",
  restoreUrl = "/api/personalFinance/subCategory/restore",
  deleteUrl = "/api/personalFinance/subCategory/delete",
}
//Expense
export enum EExpensePersonalFinanceUrl {
  getByFilterUrl = "/api/personalFinance/expense/getByFilter",
  getByIdUrl = "/api/personalFinance/expense/getById",
  createUrl = "/api/personalFinance/expense/create",
  updateUrl = "/api/personalFinance/expense/update",
  deleteUrl = "/api/personalFinance/expense/delete",
}
//Resource
export enum EResourcePersonalFinanceUrl {
  getAllUrl = "/api/personalFinance/resource/getAll",
  getByIdUrl = "/api/personalFinance/resource/getById",
  createUrl = "/api/personalFinance/resource/create",
  updateUrl = "/api/personalFinance/resource/update",
  deleteUrl = "/api/personalFinance/resource/delete",
}
//Asset
export enum EAssetPersonalFinanceUrl {
  getAllUrl = "/api/personalFinance/asset/getAll",
  getByIdUrl = "/api/personalFinance/asset/getById",
  createUrl = "/api/personalFinance/asset/create",
  updateUrl = "/api/personalFinance/asset/update",
  deleteUrl = "/api/personalFinance/asset/delete",
}

//ResourceType
export enum EResourceTypePersonalFinanceUrl {
  getAllUrl = "/api/personalFinance/resourceType/getAll",
  getAllDeletedUrl = "/api/personalFinance/resourceType/getAllDeleted",
  getOptionListUrl = "/api/personalFinance/resourceType/getOptionList",
  getByIdUrl = "/api/personalFinance/resourceType/getById",
  createUrl = "/api/personalFinance/resourceType/create",
  updateUrl = "/api/personalFinance/resourceType/update",
  softDeleteUrl = "/api/personalFinance/resourceType/softDelete",
  restoreUrl = "/api/personalFinance/resourceType/restore",
  deleteUrl = "/api/personalFinance/resourceType/delete",
}
//AssetType
export enum EAssetTypePersonalFinanceUrl {
  getAllUrl = "/api/personalFinance/assetType/getAll",
  getAllDeletedUrl = "/api/personalFinance/assetType/getAllDeleted",
  getOptionListUrl = "/api/personalFinance/assetType/getOptionList",
  getByIdUrl = "/api/personalFinance/assetType/getById",
  createUrl = "/api/personalFinance/assetType/create",
  updateUrl = "/api/personalFinance/assetType/update",
  softDeleteUrl = "/api/personalFinance/assetType/softDelete",
  restoreUrl = "/api/personalFinance/assetType/restore",
  deleteUrl = "/api/personalFinance/assetType/delete",
}


//Expense Report
export enum EExpenseReportPersonalFinanceUrl {
  getColoumnChartByMonthUrl = "/api/personalFinance/expenseReport/GetColoumnChartByMonth",
  getColoumnChartByYearUrl = "/api/personalFinance/expenseReport/GetColoumnChartByYear",
}
//Asset Report
export enum EAssetReportPersonalFinanceUrl {
  getColoumnChartUrl = "/api/personalFinance/assetReport/GetColoumnChart",
  getPieChartUrl = "/api/personalFinance/assetReport/GetPieChart",
}
//Resource Report
export enum EResourceReportPersonalFinanceUrl {
  GetClusteredColumnChartUrl = "/api/personalFinance/resourceReport/GetClusteredColumnChart",
}

//#endregion

//#region Hubs
//SignalR
// chatHubUrl = "/chat",
//#endregion

//#region Feature
//QRCode
export enum EQRCodeFeatureUrl {
  generateAQRCodeUrl = "/api/feature/qrCode/generateAQRCode",
  generateListQRCodeUrl = "/api/feature/qrCode/generateListQRCode",
  getAllFontsUrl = "/api/feature/qrCode/getAllFonts",
}
//Word to PDF
export enum EConvertWordToPdfFeatureUrl {
  convertWordToPdfUrl = "/api/feature/convertWordToPdf/convertFile",
}
//#endregion

//#region LipstickShop
//Report
export enum EReportLipstickShopUrl {
  getAllUrl = "/api/lipstick/report/getAll",
}
//Order
export enum EOrderLipstickShopUrl {
  getAllUrl = "/api/lipstick/order/getAll",
  getAllDeletedUrl = "/api/lipstick/order/getAllDeleted",
  getByIdUrl = "/api/lipstick/order/getById",
  createUrl = "/api/lipstick/order/create",
  updateUrl = "/api/lipstick/order/update",
  softDeleteUrl = "/api/lipstick/order/softDelete",
  restoreUrl = "/api/lipstick/order/restore",
  deleteUrl = "/api/lipstick/order/delete",
}
//Product
export enum EProductLipstickShopUrl {
  getByFilterUrl = "/api/lipstick/product/getByFilter",
  getAllActiveUrl = "/api/lipstick/product/getAllActive",
  getByIdUrl = "/api/lipstick/product/getById",
  createUrl = "/api/lipstick/product/create",
  updateUrl = "/api/lipstick/product/update",
  softDeleteUrl = "/api/lipstick/product/softDelete",
  getBySearchTextUrl = "/api/lipstick/product/suggestProductBySearchText",
  restoreUrl = "/api/lipstick/product/restore",
  deleteUrl = "/api/lipstick/product/delete",
}
//Blog
export enum EBlogLipstickShopUrl {
  getAllUrl = "/api/lipstick/blog/getAll",
  getAllActiveUrl = "/api/lipstick/blog/getAllActive",
  getAllDeletedUrl = "/api/lipstick/blog/getAllDeleted",
  getByIdUrl = "/api/lipstick/blog/getById",
  createUrl = "/api/lipstick/blog/create",
  updateUrl = "/api/lipstick/blog/update",
  restoreUrl = "/api/lipstick/blog/restore",
  softDeleteUrl = "/api/lipstick/blog/softDelete",
}
//Brand
export enum EBrandLipstickShopUrl {
  getAllUrl = "/api/lipstick/brand/getAll",
  getByIdUrl = "/api/lipstick/brand/getById",
  getAllDeletedUrl = "/api/lipstick/brand/getAllDeleted",
  createUrl = "/api/lipstick/brand/create",
  updateUrl = "/api/lipstick/brand/update",
  getAllActiveUrl = "/api/lipstick/brand/getAllActive",
  restoreUrl = "/api/lipstick/brand/restore",
  softDeleteUrl = "/api/lipstick/brand/softDelete",
  deleteUrl = "/api/lipstick/brand/delete",
}
//Category
export enum ECategoryLipstickShopUrl {
  getAllUrl = "/api/lipstick/category/getAll",
  getAllActiveUrl = "/api/lipstick/category/getAllActive",
  getAllDeletedUrl = "/api/lipstick/category/getAllDeleted",
  getByIdUrl = "/api/lipstick/category/getById",
  createUrl = "/api/lipstick/category/create",
  updateUrl = "/api/lipstick/category/update",
  restoreUrl = "/api/lipstick/category/restore",
  softDeleteUrl = "/api/lipstick/category/softDelete",
  deleteUrl = "/api/lipstick/category/delete",
}
//SubCategory
export enum ESubCategoryLipstickShopUrl {
  getAllUrl = "/api/lipstick/subcategory/getAll",
  getAllDeletedUrl = "/api/lipstick/subcategory/getAllDeleted",
  getAllActiveUrl = "/api/lipstick/subcategory/getAllActive",
  getByIdUrl = "/api/lipstick/subcategory/getById",
  createUrl = "/api/lipstick/subcategory/create",
  updateUrl = "/api/lipstick/subcategory/update",
  softDeleteUrl = "/api/lipstick/subcategory/softDelete",
  deleteUrl = "/api/lipstick/subcategory/delete",
  restoreUrl = "/api/lipstick/subcategory/restore",
  getByCategoryIdUrl = "/api/lipstick/subcategory/getByCategoryId",
}
//Color
export enum EColorLipstickShopUrl {
  getAllUrl = "/api/lipstick/color/getAll",
  getAllActiveUrl = "/api/lipstick/color/getAllActive",
  getAllDeletedUrl = "/api/lipstick/color/getAllDeleted",
  getByIdUrl = "/api/lipstick/color/getById",
  createUrl = "/api/lipstick/color/create",
  updateUrl = "/api/lipstick/color/update",
  restoreUrl = "/api/lipstick/color/restore",
  softDeleteUrl = "/api/lipstick/color/softDelete",
  deleteUrl = "/api/lipstick/color/delete",
}
//Size
export enum ESizeLipstickShopUrl {
  getAllUrl = "/api/lipstick/size/getAll",
  getAllActiveUrl = "/api/lipstick/size/getAllActive",
  getAllDeletedUrl = "/api/lipstick/size/getAllDeleted",
  getByIdUrl = "/api/lipstick/size/getById",
  createUrl = "/api/lipstick/size/create",
  updateUrl = "/api/lipstick/size/update",
  restoreUrl = "/api/lipstick/size/restore",
  softDeleteUrl = "/api/lipstick/size/softDelete",
  deleteUrl = "/api/lipstick/size/delete",
}
//PageType
export enum EPageTypeLipstickShopUrl {
  getAllUrl = "/api/lipstick/pageType/getAll",
  getAllActiveUrl = "/api/lipstick/pageType/getAllActive",
  getAllDeletedUrl = "/api/lipstick/pageType/getAllDeleted",
  getByIdUrl = "/api/lipstick/pageType/getById",
  createUrl = "/api/lipstick/pageType/create",
  updateUrl = "/api/lipstick/pageType/update",
  softDeleteUrl = "/api/lipstick/pageType/softDelete",
  getEPageTypeUrl = "/api/lipstick/pageType/getEPageType",
  restoreUrl = "/api/lipstick/pageType/restore",
  deleteUrl = "/api/lipstick/pageType/delete",
}
//PageContent
export enum EPageContentLipstickShopUrl {
  getAllUrl = "/api/lipstick/pageContent/getAll",
  getAllActiveUrl = "/api/lipstick/pageContent/getAllActive",
  getAllDeletedUrl = "/api/lipstick/pageContent/getAllDeleted",
  getByIdUrl = "/api/lipstick/pageContent/getById",
  createUrl = "/api/lipstick/pageContent/create",
  updateUrl = "/api/lipstick/pageContent/update",
  softDeleteUrl = "/api/lipstick/pageContent/softDelete",
  restoreUrl = "/api/lipstick/pageContent/restore",
  deleteUrl = "/api/lipstick/pageContent/delete",
}
//PageIntroduction
export enum EPageIntroductionLipstickShopUrl {
  getAllUrl = "/api/lipstick/pageIntro/getAll",
  getAllDeletedUrl = "/api/lipstick/pageIntro/getAllDeleted",
  getAllActiveUrl = "/api/lipstick/pageIntro/getAllActive",
  getByIdUrl = "/api/lipstick/pageIntro/getById",
  createUrl = "/api/lipstick/pageIntro/create",
  updateUrl = "/api/lipstick/pageIntro/update",
  softDeleteUrl = "/api/lipstick/pageIntro/softDelete",
  restoreUrl = "/api/lipstick/pageIntro/restore",
  deleteUrl = "/api/lipstick/pageIntro/delete",
}
//Topic
export enum ETopicLipstickShopUrl {
  getAllUrl = "/api/lipstick/topic/getAll",
  getAllActiveUrl = "/api/lipstick/topic/getAllActive",
  getAllDeletedUrl = "/api/lipstick/topic/getAllDeleted",
  getByIdUrl = "/api/lipstick/topic/getById",
  createUrl = "/api/lipstick/topic/create",
  updateUrl = "/api/lipstick/topic/update",
  softDeleteUrl = "/api/lipstick/topic/softDelete",
  deleteUrl = "/api/lipstick/topic/delete",
  restoreUrl = "/api/lipstick/topic/restore",
}
//InforPage
export enum EInforPageLipstickShopUrl {
  getAllPageTypeUrl = "/api/lipstick/inforPage/getAllPageType",
  getAllUrl = "/api/lipstick/inforPage/getAll",
  getAllDeletedUrl = "/api/lipstick/inforPage/getAllDeleted",
  getAllActiveUrl = "/api/lipstick/inforPage/getAllActive",
  getByIdUrl = "/api/lipstick/inforPage/getById",
  createUrl = "/api/lipstick/inforPage/create",
  updateUrl = "/api/lipstick/inforPage/update",
  softDeleteUrl = "/api/lipstick/inforPage/softDelete",
  getByPageTypeId = "/api/lipstick/inforPage/getByPageTypeId",
  restoreUrl = "/api/lipstick/inforPage/restore",
}
//HomeBanner
export enum EHomeBannerLipstickShopUrl {
  getAllUrl = "/api/lipstick/HomeBanner/getAll",
  getAllActiveUrl = "/api/lipstick/HomeBanner/getAllActive",
  getAllDeletedUrl = "/api/lipstick/HomeBanner/getAllDeleted",
  getByIdUrl = "/api/lipstick/HomeBanner/getById",
  createUrl = "/api/lipstick/HomeBanner/create",
  updateUrl = "/api/lipstick/HomeBanner/update",
  softDeleteUrl = "/api/lipstick/HomeBanner/softDelete",
  getByBannerTypeIdUrl = "/api/lipstick/HomeBanner/getByBannerTypeId",
  restoreUrl = "/api/lipstick/HomeBanner/restore",
  deleteUrl = "/api/lipstick/HomeBanner/delete",
}
//Member
export enum EMemberLipstickShopUrl {
  getAllUrl = "/api/lipstick/member/getAll",
}
//Payment
export enum EPaymentLipstickShopUrl {
  getAllUrl = "/api/lipstick/payment/getAll",
  getByIdUrl = "/api/lipstick/payment/getById",
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
  loginUrl = "/api/system/auth/login",
  externalLoginUrl = "/api/system/auth/externalLogin",
  validateRefreshTokenUrl = "/api/system/auth/validateRefreshToken",
  refreshTokenUrl = "/api/system/auth/refreshToken",
  getCurrentUserUrl = "/api/system/auth/getCurrentUser",
  logoutUrl = "/api/system/auth/logout",
}

export enum EMyAccountSystemUrl {
  changePasswordUrl = "/api/system/MyAccount/changePassword",
  recoverPasswordUrl = "/api/system/MyAccount/recoverPassword",
  resetPasswordUrl = "/api/system/MyAccount/resetPassword",
}
//province
export enum EProvinceSystemUrl {
  getAllUrl = "/api/system/province/getAll",
}
//Account
export enum EAccountSystemUrl {
  getAllUrl = "/api/system/user/getAll",
  getByIdUrl = "/api/system/user/getById/",
  createUrl = "/api/system/user/create",
  updateUrl = "/api/system/user/update",
  deactivateUserUrl = "/api/system/user/deactivateUser/",
  activateUserUrl = "/api/system/user/activateUser/",
}
//Role
export enum ERoleSystemUrl {
  getAllUrl = "/api/system/role/getAll",
  getOptionListUrl = "/api/system/role/getOptionList",
  getAllActiveUrl = "/api/system/role/getAllActive",
  getByIdUrl = "/api/system/role/getById",
  createUrl = "/api/system/role/create",
  updateUrl = "/api/system/role/update",
}
//Module
export enum EModuleSystemUrl {
  getAllUrl = "/api/system/module/getAll",
  getByIdUrl = "/api/system/module/getById",
  createUrl = "/api/system/module/create",
  updateUrl = "/api/system/module/update",
}
//Action
export enum EActionSystemUrl {
  getAllUrl = "/api/system/action/getAll",
  getAllActiveUrl = "/api/system/action/getAllActive",
  getEActionUrl = "/api/system/action/getEAction",
  getByIdUrl = "/api/system/action/getById",
  createUrl = "/api/system/action/create",
  updateUrl = "/api/system/action/update",
}
//Setting
export enum ESettingSystemUrl {
  getAllUrl = "/api/system/setting/getAll",
  getByKeyUrl = "/api/system/setting/getByKey",
  updateUrl = "/api/system/setting/update",
}
//Action logging
export enum EActionLoggingSystemUrl {
  getAllUrl = "/api/system/ActionLogging/getAll",
  getByIdUrl = "/api/system/ActionLogging/getById",
}
//#endregion

//#region Survey

//participant
export enum EParticipantSurveyUrl {
  getAllUrl = "/api/survey/participant/getAll",
  getByIdUrl = "/api/survey/participant/getById",
  exportExcelUrl = "/api/survey/participant/exportExcel",
  initParticipantUrl = "/api/survey/participant/initParticipant",
  addAnswersUrl = "/api/survey/participant/addAnswers",
  filterUrl = "/api/survey/participant/filter",
  rejectUrl = "/api/survey/participant/reject",
  highlightUrl = "/api/survey/participant/highlight",
  removeHighlightUrl = "/api/survey/participant/removeHighlight",
}

//questionGroupLibrary
export enum EQuestionGroupLibrarySurveyUrl {
  getAllUrl = "/api/survey/questionGroupLibrary/getAll",
  getAllActiveUrl = "/api/survey/questionGroupLibrary/getAllActive",
  getOptionListUrl = "/api/survey/questionGroupLibrary/getOptionList",
  getTreeOptionListUrl = "/api/survey/questionGroupLibrary/getTreeOptionList",
  getAllDeletedUrl = "/api/survey/questionGroupLibrary/getAllDeleted",
  getByIdUrl = "/api/survey/questionGroupLibrary/getById",
  createUrl = "/api/survey/questionGroupLibrary/create",
  updateUrl = "/api/survey/questionGroupLibrary/update",
  softDeleteUrl = "/api/survey/questionGroupLibrary/softDelete",
  restoreUrl = "/api/survey/questionGroupLibrary/restore",
  deleteUrl = "/api/survey/questionGroupLibrary/delete",
}

//questionLibrary
export enum EQuestionLibrarySurveyUrl {
  getAllUrl = "/api/survey/questionLibrary/getAll",
  filterUrl = "/api/survey/questionLibrary/getByFilter",
  getAllDeletedUrl = "/api/survey/questionLibrary/getAllDeleted",
  getEagerLoadingByIdUrl = "/api/survey/questionLibrary/getEagerLoadingById",
  getByIdUrl = "/api/survey/questionLibrary/getById",
  createUrl = "/api/survey/questionLibrary/create",
  updateUrl = "/api/survey/questionLibrary/update",
  softDeleteUrl = "/api/survey/questionLibrary/softDelete",
  restoreUrl = "/api/survey/questionLibrary/restore",
  deleteUrl = "/api/survey/questionLibrary/delete",
}

//PredefinedAnswerLibrary
export enum EPredefinedAnswerLibrarySurveyUrl {
  getByQuestionLibraryIdUrl = "/api/survey/predefinedAnswerLibrary/getByQuestionLibraryId",
  getByIdUrl = "/api/survey/predefinedAnswerLibrary/getById",
  createUrl = "/api/survey/predefinedAnswerLibrary/create",
  updateUrl = "/api/survey/predefinedAnswerLibrary/update",
  deleteUrl = "/api/survey/predefinedAnswerLibrary/delete",
}

//questionType
export enum EQuestionTypeSurveyUrl {
  getAllUrl = "/api/survey/questionType/getAll",
  getOptionListUrl = "/api/survey/questionType/getOptionList",
}

//store
export enum EStoreSurveyUrl {
  getAllUrl = "/api/survey/store/getAll",
  getOptionListUrl = "/api/survey/store/getOptionList",
  getByIdUrl = "/api/survey/store/getById",
  createUrl = "/api/survey/store/create",
  updateUrl = "/api/survey/store/update",
  softDeleteUrl = "/api/survey/store/softDelete",
  restoreUrl = "/api/survey/store/restore",
  deleteUrl = "/api/survey/store/delete",
  getAllDeletedUrl = "/api/survey/store/getAllDeleted",
}
//surveyForm
export enum ESurveyFormSurveyUrl {
  getAllUrl = "/api/survey/surveyForm/getAll",
  filterUrl = "/api/survey/surveyForm/filter",
  getAllActiveUrl = "/api/survey/surveyForm/getAllActive",
  getByIdUrl = "/api/survey/surveyForm/getById",
  getEagerByIdUrl = "/api/survey/surveyForm/getEagerById",
  getPublicFormByIdUrl = "/api/survey/surveyForm/getPublicFormById",
  getReviewFormByIdUrl = "/api/survey/surveyForm/getReviewFormById",
  // getEagerUIByIdUrl = "/api/survey/surveyForm/getEagerUIById",
  createUrl = "/api/survey/surveyForm/create",
  updateUrl = "/api/survey/surveyForm/update",
  softDeleteUrl = "/api/survey/surveyForm/softDelete",
  restoreUrl = "/api/survey/surveyForm/restore",
  deleteUrl = "/api/survey/surveyForm/delete",
  getAllDeletedUrl = "/api/survey/surveyForm/getAllDeleted",
  publicUrl = "/api/survey/surveyForm/public",
  unPublicUrl = "/api/survey/surveyForm/unPublic",
  deactivateUrl = "/api/survey/surveyForm/deactivate",
  activateUrl = "/api/survey/surveyForm/activate",
  checkValidFormUrl = "/api/survey/surveyForm/checkValidForm",
}

//QuestionGroup
export enum EQuestionGroupSurveyUrl {
  getBySurveyFormIdUrl = "/api/survey/questionGroup/getBySurveyFormId",
  getByIdUrl = "/api/survey/questionGroup/getById",
  createUrl = "/api/survey/questionGroup/create",
  updateUrl = "/api/survey/questionGroup/update",
  deleteUrl = "/api/survey/questionGroup/delete",
}
//Question
export enum EQuestionSurveyUrl {
  getBySurveyFormIdUrl = "/api/survey/question/getBySurveyFormId",
  getByQuestionGroupIdUrl = "/api/survey/question/getByQuestionGroupId",
  getByIdUrl = "/api/survey/question/getById",
  getEagerLoadingByIdUrl = "/api/survey/question/getEagerLoadingById",
  createUrl = "/api/survey/question/create",
  updateUrl = "/api/survey/question/update",
  deleteUrl = "/api/survey/question/delete",
}

//PredefinedAnswer
export enum EPredefinedAnswerSurveyUrl {
  getByQuestionIdUrl = "/api/survey/predefinedAnswer/getByQuestionId",
  getByIdUrl = "/api/survey/predefinedAnswer/getById",
  createUrl = "/api/survey/predefinedAnswer/create",
  updateUrl = "/api/survey/predefinedAnswer/update",
  deleteUrl = "/api/survey/predefinedAnswer/delete",
}

//participantInfoConfig
export enum EParticipantInfoConfigSurveyUrl {
  getBySurveyFormIdUrl = "/api/survey/participantInfoConfig/getBySurveyFormId",
  getByIdUrl = "/api/survey/participantInfoConfig/getById",
  createUrl = "/api/survey/participantInfoConfig/create",
  updateUrl = "/api/survey/participantInfoConfig/update",
  deleteUrl = "/api/survey/participantInfoConfig/delete",
}

//surveyReport
export enum ESurveyReportSurveyUrl {
  getAllUrl = "/api/survey/surveyReport/getAll",
  getByIdUrl = "/api/survey/surveyReport/getById",
  getBySurveyFormIdUrl = "/api/survey/surveyReport/getBySurveyFormId",
  generateReportUrl = "/api/survey/surveyReport/generateReport",
  exportExcelUrl = "/api/survey/surveyReport/exportExcel",
  exportPdfUrl = "/api/survey/surveyReport/exportPdf",
  getStatisticsUrl = "/api/survey/surveyReport/getStatistics",
}

//#endregion
