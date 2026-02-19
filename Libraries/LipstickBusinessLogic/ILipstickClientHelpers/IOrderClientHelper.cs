using System.Share.Models;
using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick.BLL.ILipstickClientHelpers
{
    public interface IOrderClientHelper
    {
        Task<Pagination<OrderClientViewModel>> GetAllByUserId(int pageIndex, int pageSize, int userId);
        Task<Pagination<OrderClientViewModel>> GetAllByPhoneNumber(int pageIndex, int pageSize, string phoneNumber);
        OrderClientViewModel? GetEagerOrderById(int id, string language);
        Task<bool> UpdateStatusAsync(int id, int statusId);
        Task<bool> UpdateReceiveDateAsync(int id);
        Task<string?> CreateAsync(OrderClientViewModel model);
        //Task<List<OrderClientViewModel>> GetItemListAsync(string language, List<CartItemModel> items);
    }
}
