using Common;
using Common.ViewModels.LipstickClientViewModels;
using Lipstick._Convergence.Services;

namespace Lipstick._Convergence.Helpers
{
    public sealed class LayoutHelper
    {
        private readonly CategoryService _navigationBarService;
        private readonly WebContentHelper _webContentHelper;
        private readonly PageIntroService _pageIntroService;
        public LayoutHelper(CategoryService navigationBarService, WebContentHelper webContentHelper, PageIntroService pageIntroService)
        {
            _navigationBarService = navigationBarService;
            _webContentHelper = webContentHelper;
            _pageIntroService = pageIntroService;
        }
        public  async Task<LayoutViewModel> GetLayoutAsync(string language, int pageTypeId = (int)EPageTypes.Default)
        {
            LayoutViewModel model = new LayoutViewModel();
            model.HostName = _webContentHelper.GetWebContentValueByKey(EWebContentKey.HostName, language);
            model.FacebookLink = _webContentHelper.GetWebContentValueByKey(EWebContentKey.FacebookLink, language);
            model.InstagramLink = _webContentHelper.GetWebContentValueByKey(EWebContentKey.InstagramLink, language);
            model.GithubLink = _webContentHelper.GetWebContentValueByKey(EWebContentKey.GithubLink, language);
            model.YoutubeLink = _webContentHelper.GetWebContentValueByKey(EWebContentKey.YoutubeLink, language);
            model.PhoneNumber = _webContentHelper.GetWebContentValueByKey(EWebContentKey.PhoneNumber, language);
            model.Email = _webContentHelper.GetWebContentValueByKey(EWebContentKey.Email, language);
            model.Address = _webContentHelper.GetWebContentValueByKey(EWebContentKey.Address, language);
            model.CompanyName = _webContentHelper.GetWebContentValueByKey(EWebContentKey.CompanyName, language);
            model.Categories = await _navigationBarService.GetNavigationBar(language);
            model.PageIntro = await _pageIntroService.GetPageIntroByPageTypeId(language, pageTypeId);
            return model;
        }
    }
}
