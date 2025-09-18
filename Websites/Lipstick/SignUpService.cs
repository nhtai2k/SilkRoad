using Common.Services.SMSServices;
using Lipstick._Convergence.Helpers;
using Lipstick._Convergence.Services;
using MemberBusinessLogic.Helpers;
using MemberBusinessLogic.IHelpers;
using MemberDataAccess;

namespace Lipstick
{
    public static class SignUpService
    {
        public static IServiceCollection SignUp(this IServiceCollection services)
        {
            #region membership
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IRegisterHelper, RegisterHelper>();
            services.AddScoped<ILoginHelper, LoginHelper>();
            services.AddScoped<IFavoriteHelper, FavoriteHelper>();
            services.AddScoped<IGenderHelper, GenderHelper>();
            services.AddScoped<IMyAccountHelper, MyAccountHelper>();
            #endregion

            #region service api
            services.AddScoped<InformationPageService>();
            services.AddScoped<BrandService>();
            services.AddScoped<CategoryService>();
            services.AddScoped<BlogService>();
            services.AddScoped<TopicService>();
            services.AddScoped<BannerService>();
            services.AddScoped<ProductService>();
            //services.AddScoped<SurveyFormService>();
            //services.AddScoped<ParticipantService>();
            services.AddScoped<SearchService>();
            services.AddScoped<PageIntroService>();
            services.AddScoped<OrderService>();
            services.AddScoped<CartService>();
            #endregion

            //helper
            services.AddSingleton<WebContentHelper>();
            services.AddScoped<LayoutHelper>();
            services.AddScoped<HomePageHelper>();
            services.AddScoped<CartHelper>();
            services.AddScoped<ProvinceHelper>();
            services.AddTransient<ISMSService, SMSService>();

            return services;
        }
    }
}
