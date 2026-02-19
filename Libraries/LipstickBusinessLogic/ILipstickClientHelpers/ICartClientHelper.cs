using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick.BLL.ILipstickClientHelpers
{
    public interface ICartClientHelper
    {
        Task<CartClientViewModel> GetCartAsync(string language, List<CartItemModel> items);
    }
}
