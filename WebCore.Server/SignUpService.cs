using BOM.BLL.Helpers;
using BOM.BLL.IHelpers;
using ChatBot;
using ChatBot.Helpers;
using ChatBot.IHelpers;
using ChatBot.IServices;
using ChatBot.Services;
using Lipstick.BLL.ILipstickClientHelpers;
using Lipstick.BLL.ILipstickHelpers;
using Lipstick.BLL.LipstickClientHelpers;
using Lipstick.BLL.LipstickHelpers;
using Stock.BLL.Helpers;
using Stock.BLL.IHelpers;
using Survey.BLL.Helpers;
using Survey.BLL.IHelpers;
using System.BLL.Helpers.FeatureHelpers;
using System.BLL.IHelpers.IFeatureHelper;
using System.Share.Custom.ApiKey;
using System.Share.Services.ActionLoggingServices;
using System.Share.Services.ConvertWordToPdfServices;
using System.Share.Services.EMailServices;
using System.Share.Services.FileStorageServices;
using System.Share.Services.JwtServices;
using System.Share.Services.QRCodeServices;

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
            services.AddScoped<Lipstick.DAL.IUnitOfWork, Lipstick.DAL.UnitOfWork>();
            //lipstick
            //services.AddTransient<IUnitHelper, UnitHelper>();
            services.AddTransient<Lipstick.BLL.ILipstickHelpers.ICategoryHelper, Lipstick.BLL.LipstickHelpers.CategoryHelper>();
            services.AddTransient<Lipstick.BLL.ILipstickHelpers.ISubCategoryHelper, Lipstick.BLL.LipstickHelpers.SubCategoryHelper>();
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
            services.AddScoped<BOM.DAL.IUnitOfWork, BOM.DAL.UnitOfWork>();
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
            services.AddScoped<Survey.DAL.IUnitOfWork, Survey.DAL.UnitOfWork>();
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
            services.AddScoped<PersonalFinance.DAL.IUnitOfWork, PersonalFinance.DAL.UnitOfWork>();
            services.AddScoped<PersonalFinance.BLL.IHelpers.ICategoryHelper, PersonalFinance.BLL.Helpers.CategoryHelper>();
            services.AddScoped<PersonalFinance.BLL.IHelpers.ISubCategoryHelper, PersonalFinance.BLL.Helpers.SubCategoryHelper>();
            services.AddScoped<PersonalFinance.BLL.IHelpers.IResourceHelper, PersonalFinance.BLL.Helpers.ResourceHelper>();
            services.AddScoped<PersonalFinance.BLL.IHelpers.IResourceReportHelper, PersonalFinance.BLL.Helpers.ResourceReportHelper>();
            services.AddScoped<PersonalFinance.BLL.IHelpers.IResourceTypeHelper, PersonalFinance.BLL.Helpers.ResourceTypeHelper>();
            services.AddScoped<PersonalFinance.BLL.IHelpers.IExpenseHelper, PersonalFinance.BLL.Helpers.ExpenseHelper>();
            services.AddScoped<PersonalFinance.BLL.IHelpers.IExpenseReportHelper, PersonalFinance.BLL.Helpers.ExpenseReportHelper>();
            services.AddScoped<PersonalFinance.BLL.IHelpers.IAssetReportHelper, PersonalFinance.BLL.Helpers.AssetReportHelper>();
            services.AddScoped<PersonalFinance.BLL.IHelpers.IAssetTypeHelper, PersonalFinance.BLL.Helpers.AssetTypeHelper>();
            services.AddScoped<PersonalFinance.BLL.IHelpers.IAssetHelper, PersonalFinance.BLL.Helpers.AssetHelper>();
            #endregion

            #region Stock
            services.AddScoped<Stock.DAL.IUnitOfWork, Stock.DAL.UnitOfWork>();
            //stock
            services.AddScoped<ICompanyHelper, CompanyHelper>();
            services.AddScoped<IStockPriceHelper, StockPriceHelper>();
            services.AddScoped<IIndustryHelper, IndustryHelper>();
            services.AddScoped<ITradeHistoryHelper, TradeHistoryHelper>();
            services.AddScoped<IHandbookHelper, HandbookHelper>();
            services.AddScoped<ICoveredWarrantHelper, CoveredWarrantHelper>();
            #endregion

            #region System Database
            services.AddScoped<System.DAL.IUnitOfWork, System.DAL.UnitOfWork>();
            //system
            services.AddScoped<System.BLL.IHelpers.ISystemHelpers.IUserHelper, System.BLL.Helpers.SystemHelpers.UserHelper>();
            services.AddScoped<System.BLL.IHelpers.ISystemHelpers.IModuleHelper, System.BLL.Helpers.SystemHelpers.ModuleHelper>();
            services.AddScoped<System.BLL.IHelpers.ISystemHelpers.IRoleHelper, System.BLL.Helpers.SystemHelpers.RoleHelper>();
            services.AddScoped<System.BLL.IHelpers.ISystemHelpers.IMyAccountHelper, System.BLL.Helpers.SystemHelpers.MyAccountHelper>();
            services.AddScoped<System.BLL.IHelpers.ISystemHelpers.IActionHelper, System.BLL.Helpers.SystemHelpers.ActionHelper>();
            services.AddScoped<System.BLL.IHelpers.ISystemHelpers.ISettingHelper, System.BLL.Helpers.SystemHelpers.SettingHelper>();
            #endregion

            #region Service
            //service
            services.AddScoped<IJwtService, JwtService>();
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
