using Common.ViewModels.LipstickClientViewModels;

namespace LipstickBusinessLogic.ILipstickClientHelpers
{
    public interface ICartClientHelper
    {
        Task<CartClientViewModel> GetCartAsync(string language, List<CartItemModel> items);
    }
}
