using AutoMapper;
using Lipstick.BLL.ILipstickHelpers;
using Lipstick.DAL;
using Newtonsoft.Json;
using System.Share.Models;
using System.Share.ViewModels.LipstickViewModels;

namespace Lipstick.BLL.LipstickHelpers
{
    public class PaymentHelper : IPaymentHelper
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public PaymentHelper(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<Pagination<PaymentViewModel>> GetAllAsync(int paymentTypeId, int statusId, int pageIndex, int pageSize)
        {
            var model = new Pagination<PaymentViewModel>();
            if (pageSize <= 0)
                pageSize = model.PageSize;
            var data = await _unitOfWork.PaymentRepository.GetAllAsync();
            model.TotalItems = data.Count();
            model.CurrentPage = pageIndex;
            model.TotalPages = (int)Math.Ceiling(model.TotalItems / (double)pageSize);

            data = data.Skip((pageIndex - 1) * pageSize).Take(pageSize);

            IEnumerable<PaymentViewModel> viewModels = _mapper.Map<IEnumerable<PaymentViewModel>>(data);
            model.Items = viewModels;
            return model;
        }
        public async Task<PaymentViewModel?> GetByIdAsync(Guid id)
        {
            var data = await _unitOfWork.PaymentRepository.GetByIdAsync(id);
            if (data == null)
            {
                return null;
            }
            var result = _mapper.Map<PaymentViewModel>(data);
            result.SepayModel = JsonConvert.DeserializeObject<SepayModel>(data.SepayObject ?? string.Empty);
            return result;
        }
    }
}
