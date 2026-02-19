using AutoMapper;
using Lipstick.BLL.ILipstickClientHelpers;
using Lipstick.DAL;
using System.Share;
using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick.BLL.LipstickClientHelpers
{
    public class BrandClientHelper : IBrandClientHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ServerAppConfig _appConfig;
        public BrandClientHelper(IMapper mapper, IUnitOfWork unitOfWork, ServerAppConfig appConfig)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _appConfig = appConfig;
        }
        public IEnumerable<BrandClientViewModel> GetAllActive(string language)
        {
            List<BrandClientViewModel> result = new List<BrandClientViewModel>();
            var data = _unitOfWork.BrandRepository.GetAll(s => !s.IsDeleted && s.IsActive);
            foreach (var item in data)
            {
                BrandClientViewModel brand = new BrandClientViewModel();
                brand.Id = item.Id;
                brand.Name = item.Name;
                brand.AvatarUrl = _appConfig.ServerUrl + item.Avatar;
                result.Add(brand);
            }
            return result;
        }
    }
}
