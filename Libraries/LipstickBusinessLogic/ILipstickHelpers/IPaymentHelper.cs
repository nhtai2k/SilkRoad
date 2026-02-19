using System.Share.Models;
using System.Share.ViewModels.LipstickViewModels;

namespace Lipstick.BLL.ILipstickHelpers
{
    public interface IPaymentHelper
    {
        public Task<Pagination<PaymentViewModel>> GetAllAsync(int paymentTypeId, int statusId, int pageIndex, int pageSize);
        public Task<PaymentViewModel?> GetByIdAsync(Guid id);
    }
}
