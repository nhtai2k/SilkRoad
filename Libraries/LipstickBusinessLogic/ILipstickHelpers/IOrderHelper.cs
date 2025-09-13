using Common.Models;
using Common.ViewModels.LipstickViewModels;

namespace LipstickBusinessLogic.ILipstickHelpers
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
