using BOMBusinessLogic.BOMHelpers;
using BOMBusinessLogic.IBOMHelpers;
using BusinessLogic.Helpers.FeatureHelpers;
using BusinessLogic.Helpers.SystemHelpers;
using BusinessLogic.IHelpers.IFeatureHelper;
using BusinessLogic.IHelpers.ISystemHelpers;
using ChatBot;
using ChatBot.Helpers;
using ChatBot.IHelpers;
using ChatBot.IServices;
using ChatBot.Services;
using Common.Custom.ApiKey;
using Common.Services.ActionLoggingServices;
using Common.Services.ConvertWordToPdfServices;
using Common.Services.EMailServices;
using Common.Services.FileStorageServices;
using Common.Services.JwtServices;
using Common.Services.QRCodeServices;
using LipstickBusinessLogic.ILipstickClientHelpers;
using LipstickBusinessLogic.ILipstickHelpers;
using LipstickBusinessLogic.LipstickClientHelpers;
using LipstickBusinessLogic.LipstickHelpers;
using StockBusinessLogic.Helpers;
using StockBusinessLogic.IHelpers;
using SurveyBusinessLogic.Helpers;
using SurveyBusinessLogic.IHelpers;

namespace WebCore.Server
{
    public static class SignUpService
    {
        public static IServiceCollection SignUp(this IServiceCollection services)
        {
            #region Chatbot
            services.AddScoped<IBeeBotHelper, BeeBotHelper>();
            services.AddScoped<IPromptHelper, PromptHelper>();
            services.AddScoped<IChatGPTHelper, ChatGPTHelper>();
            services.AddScoped<IOllamaHelper, OllamaHelper>();
            services.AddScoped<IVoiceHelper, VoiceHelper>();
            services.AddScoped<IMessageHelper, MessageHelper>();
            services.AddScoped<IConversationHelper, ConversationHelper>();
            // database
            services.AddSingleton<ApplicationConnection>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddScoped<IConversationService, ConversationService>();
            services.AddScoped<IPromptService, PromptService>();
            #endregion

            #region Lipstick
            services.AddScoped<LipstickDataAccess.IUnitOfWork, LipstickDataAccess.UnitOfWork>();
            //lipstick
            //services.AddTransient<IUnitHelper, UnitHelper>();
            services.AddTransient<ICategoryHelper, CategoryHelper>();
            services.AddTransient<ISubCategoryHelper, SubCategoryHelper>();
            services.AddTransient<IBrandHelper, BrandHelper>();
            services.AddTransient<ITopicHelper, TopicHelper>();
            services.AddTransient<IBlogHelper, BlogHelper>();
            services.AddTransient<IProductHelper, ProductHelper>();
            services.AddTransient<IEmailHelper, EmailHelper>();
            services.AddTransient<IQRCodeHelper, QRCodeHelper>();
            services.AddTransient<IPageContentHelper, PageContentHelper>();
            services.AddTransient<IHomeBannerHelper, HomeBannerHelper>();
            services.AddTransient<IPageTypeHelper, PageTypeHelper>();
            services.AddTransient<ISizeHelper, SizeHelper>();
            services.AddTransient<IColorHelper, ColorHelper>();
            services.AddTransient<IMemberHelper, Memberhelper>();
            services.AddTransient<IPageIntroHelper, PageIntroHelper>();
            services.AddTransient<IOrderHelper, OrderHelper>();
            services.AddTransient<IPaymentHelper, PaymentHelper>();
            //lipstick client
            services.AddTransient<IInforPageClientHelper, InforPageClientHelper>();
            services.AddTransient<IBrandClientHelper, BrandClientHelper>();
            services.AddTransient<ICategoryClientHelper, CategoryClientHelper>();
            services.AddTransient<ITopicClientHelper, TopicClientHelper>();
            services.AddTransient<IBlogClientHelper, BlogClientHelper>();
            services.AddTransient<IHomeBannerClientHelper, HomeBannerClientHelper>();
            services.AddTransient<IProductClientHelper, ProductClientHelper>();
            services.AddTransient<ISearchClientHelper, SearchClientHelper>();
            services.AddTransient<IPageIntroClientHelper, PageIntroClientHelper>();
            services.AddTransient<IOrderClientHelper, OrderClientHelper>();
            services.AddTransient<ICartClientHelper, CartClientHelper>();
            services.AddTransient<IWebhookHelper, WebhookHelper>();
            //services.AddScoped<IOrderHelper>
            #endregion

            #region BOM Helpers
            services.AddScoped<BOMDataAccess.IUnitOfWork, BOMDataAccess.UnitOfWork>();
            //BOM
            services.AddScoped<IBOMConfigurationHelper, BOMConfigurationHelper>();
            //services.AddScoped<IEmployeeHelper, EmployeeHelper>();
            services.AddScoped<IKitchenHelper, KitchenHelper>();
            services.AddScoped<IBOMConfigurationHelper, BOMConfigurationHelper>();
            services.AddScoped<IBOMQueryHelper, BOMQueryHelper>();
            services.AddScoped<IBOMCommandHelper, BOMCommandHelper>();
            //services.AddScoped<IEmployeeHelper, EmployeeHelper>();
            services.AddScoped<IKitchenHelper, KitchenHelper>();
            //services.AddScoped<IMallHelper, MallHelper>();
            //services.AddScoped<ILocationHelper, LocationHelper>();
            //services.AddScoped<IAreaHelper, AreaHelper>();
            services.AddScoped<IMaterialGroupHelper, MaterialGroupHelper>();
            services.AddScoped<IMaterialHelper, MaterialHelper>();
            //services.AddScoped<IProcedureHelper, ProcedureHelper>();
            services.AddScoped<IPropertyHelper, PropertyHelper>();
            services.AddScoped<IPropertyTypeHelper, PropertyTypeHelper>();
            services.AddScoped<IRankHelper, RankHelper>();
            //services.AddScoped<IRentalHelper, RentalHelper>();
            services.AddScoped<IUnitHelper, UnitHelper>();
            services.AddScoped<IUnitGroupHelper, UnitGroupHelper>();
            services.AddScoped<IDishGroupHelper, DishGroupHelper>();
            services.AddScoped<IDishHelper, DishHelper>();
            services.AddScoped<IDepartmentHelper, DepartmentHelper>();
            services.AddScoped<IMaterialCategoryHelper, MaterialCategoryHelper>();
            services.AddScoped<IEnergyHelper, EnergyHelper>();
            //services.AddScoped<InitialDB>();
            #endregion

            #region Survey
            services.AddScoped<SurveyDataAccess.IUnitOfWork, SurveyDataAccess.UnitOfWork>();
            services.AddScoped<IParticipantHelper, ParticipantHelper>();
            services.AddScoped<IQuestionGroupLibraryHelper, QuestionGroupLibraryHelper>();
            services.AddScoped<IQuestionLibraryHelper, QuestionLibraryHelper>();
            services.AddScoped<IPredefinedAnswerLibraryHelper, PredefinedAnswerLibraryHelper>();
            services.AddScoped<ISurveyFormHelper, SurveyFormHelper>();
            services.AddScoped<ISurveyReportHelper, SurveyReportHelper>();
            services.AddScoped<IQuestionTypeHelper, QuestionTypeHelper>();
            services.AddScoped<IQuestionGroupHelper, QuestionGroupHelper>();
            services.AddScoped<IQuestionHelper, QuestionHelper>();
            services.AddScoped<IPredefinedAnswerHelper, PredefinedAnswerHelper>();
            services.AddScoped<IStoreHelper, StoreHelper>();
            services.AddScoped<IParticipantInfoConfigHelper, ParticipantInfoConfigHelper>();
            #endregion

            #region Personal Finance
            services.AddScoped<PersonalFinanceDataAccess.IUnitOfWork, PersonalFinanceDataAccess.UnitOfWork>();
            services.AddScoped<PersonalFinanceBusinessLogic.IHelpers.ICategoryHelper, PersonalFinanceBusinessLogic.Helpers.CategoryHelper>();
            services.AddScoped<PersonalFinanceBusinessLogic.IHelpers.ISubCategoryHelper, PersonalFinanceBusinessLogic.Helpers.SubCategoryHelper>();
            services.AddScoped<PersonalFinanceBusinessLogic.IHelpers.IResourceHelper, PersonalFinanceBusinessLogic.Helpers.ResourceHelper>();
            services.AddScoped<PersonalFinanceBusinessLogic.IHelpers.IResourceTypeHelper, PersonalFinanceBusinessLogic.Helpers.ResourceTypeHelper>();
            services.AddScoped<PersonalFinanceBusinessLogic.IHelpers.IExpenseHelper, PersonalFinanceBusinessLogic.Helpers.ExpenseHelper>();
            services.AddScoped<PersonalFinanceBusinessLogic.IHelpers.IReportHelper, PersonalFinanceBusinessLogic.Helpers.ReportHelper>();
            services.AddScoped<PersonalFinanceBusinessLogic.IHelpers.IAssetTypeHelper, PersonalFinanceBusinessLogic.Helpers.AssetTypeHelper>();
            services.AddScoped<PersonalFinanceBusinessLogic.IHelpers.IAssetHelper, PersonalFinanceBusinessLogic.Helpers.AssetHelper>();
            
            #endregion

            #region Stock
            services.AddScoped<StockDataAccess.IUnitOfWork, StockDataAccess.UnitOfWork>();
            //stock
            services.AddScoped<ICompanyHelper, CompanyHelper>();
            services.AddScoped<IStockPriceHelper, StockPriceHelper>();
            services.AddScoped<IIndustryHelper, IndustryHelper>();
            services.AddScoped<ITradeHistoryHelper, TradeHistoryHelper>();
            services.AddScoped<IHandbookHelper, HandbookHelper>();
            #endregion

            #region System Database
            services.AddScoped<DataAccess.IUnitOfWork, DataAccess.UnitOfWork>();
            //system
            services.AddScoped<IUserHelper, UserHelper>();
            services.AddScoped<IJwtService, JwtService>();
            services.AddScoped<IModuleHelper, ModuleHelper>();
            services.AddScoped<IRoleHelper, RoleHelper>();
            services.AddScoped<IMyAccountHelper, MyAccountHelper>();
            services.AddScoped<IActionHelper, ActionHelper>();
            //services.AddScoped<IRoleClaimGroupHelper, RoleClaimGroupHelper>();
            //services.AddScoped<IRoleClaimHelper, RoleClaimHelper>();
            services.AddScoped<ISettingHelper, SettingHelper>();
            #endregion

            #region Service
            //service
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<IQRCodeService, QRCodeService>();
            services.AddScoped<IFileStorageService, FileStorageService>();
            services.AddScoped<IConvertWordToPdfService, ConvertWordToPdfService>();
            services.AddScoped<IActionLoggingService, ActionLoggingService>();
            services.AddTransient<IApiKeyValidation, ApiKeyValidation>();
            services.AddScoped<ApiKeyAuthFilter>();
            services.AddAutoMapper(typeof(Program));
            #endregion
            return services;
        }
    }
}
