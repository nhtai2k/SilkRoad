using System.Share.Models;
using System.Share.ViewModels.LipstickViewModels;

namespace Lipstick.BLL.ILipstickHelpers
{
    public interface IOrderHelper
    {
        Task<Pagination<OrderViewModel>> GetAllAsync(int pageIndex, int pageSize, int statusId, string phoneNumber);
        Task<Pagination<OrderViewModel>> GetByMemberIdAsync(int pageIndex, int pageSize, int memberId);
        OrderViewModel? GetById(Guid Id);
        Task<bool> CreateAsync(OrderViewModel model);
        Task<bool> UpdateAsync(OrderViewModel model);
    }
}
