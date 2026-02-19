using AutoMapper;
using Lipstick.BLL.ILipstickClientHelpers;
using Lipstick.DAL;
using System.Share;
using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick.BLL.LipstickClientHelpers
{
    public class InforPageClientHelper : IInforPageClientHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public InforPageClientHelper(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public InforPageClientViewModel? GetFirstDataByPageTypeId(int pageTypeId, string language)
        {
            InforPageClientViewModel data = new InforPageClientViewModel();
            var inforPage = _unitOfWork.PageContentRepository.GetFirstDataByPageTypeId(pageTypeId);
            if (inforPage == null)
            {
                return null;
            }
            data.Id = inforPage.Id;
            if (string.Equals(language, ELanguages.EN.ToString()))
            {
                data.Title = inforPage.TitleEN;
                data.Content = inforPage.ContentEN;
            }
            else
            {
                data.Title = inforPage.TitleVN;
                data.Content = inforPage.ContentVN;
            }


            return data;
        }
    }
}
