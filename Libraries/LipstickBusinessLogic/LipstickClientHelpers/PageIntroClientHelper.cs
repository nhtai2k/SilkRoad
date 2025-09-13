using Common;
using Common.ViewModels.LipstickClientViewModels;
using Common.ViewModels.LipstickViewModels;
using LipstickBusinessLogic.ILipstickClientHelpers;
using LipstickDataAccess;
using Microsoft.Identity.Client;

namespace LipstickBusinessLogic.LipstickClientHelpers
{
    public class PageIntroClientHelper : IPageIntroClientHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ServerAppConfig _appConfig;
        public PageIntroClientHelper(IUnitOfWork unitOfWork, ServerAppConfig appConfig)
        {
            _unitOfWork = unitOfWork;
            _appConfig = appConfig;
        }

        public PageIntroClientViewModel? GetPageIntroClientByPageTypeId(string langage, int pageTypeId)
        {
            var data = _unitOfWork.PageIntroRepository.GetFirstDataByPageTypeId(pageTypeId);
            if (data == null)
            {
                return null;
            }
            return new PageIntroClientViewModel
            {
                Title = langage == ELanguages.VN.ToString() ? data.TitleVN : data.TitleEN,
                Content = langage == ELanguages.VN.ToString() ? data.ContentVN : data.ContentEN,
                ImageUrl = data.ImageUrl != null ? string.Concat(_appConfig.ServerUrl, data.ImageUrl).Replace(@"\", @"/") : null
            };
        }
    }
}
