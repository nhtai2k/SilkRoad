using Common.Models;
using Common.ViewModels.LipstickViewModels;

namespace LipstickBusinessLogic.ILipstickHelpers
{
    public interface IPaymentHelper
    {
        public Task<Pagination<PaymentViewModel>> GetAllAsync(int paymentTypeId, int statusId, int pageIndex, int pageSize);
        public Task<PaymentViewModel?> GetByIdAsync(Guid id);
    }
}
