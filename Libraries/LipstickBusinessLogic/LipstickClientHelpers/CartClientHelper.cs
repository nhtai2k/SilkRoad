using Lipstick.BLL.ILipstickClientHelpers;
using Lipstick.DAL;
using System.Share;
using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick.BLL.LipstickClientHelpers
{
    public class CartClientHelper : ICartClientHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ServerAppConfig _appConfig;
        public CartClientHelper(IUnitOfWork unitOfWork, ServerAppConfig appConfig)
        {
            _unitOfWork = unitOfWork;
            _appConfig = appConfig;
        }
        public async Task<CartClientViewModel> GetCartAsync(string language, List<CartItemModel> items)
        {
            CartClientViewModel cart = new CartClientViewModel();
            foreach (var item in items)
            {
                var product = await _unitOfWork.ProductRepository.GetByIdAsync(item.ProductId);
                if (product != null)
                {
                    cart.CartItems.Add(new CartItemClientViewModel()
                    {
                        ProductId = product.Id,
                        ProductName = language == ELanguages.VN.ToString() ? product.NameVN : product.NameEN,
                        Price = product.Price,
                        SalePrice = product.SalePrice,
                        Quantity = item.Quantity,
                        SaleOff = product.SaleOff,
                        TotalPrice = product.SaleOff
                            ? ((product.SalePrice ?? 0) * item.Quantity)
                            : (product.Price * item.Quantity),
                        ImageUrl = string.Concat(_appConfig.ServerUrl, product.Avatar).Replace(@"\", @"/")

                    });
                    cart.TotalPrice = product.SaleOff
                        ? (cart.TotalPrice + ((product.SalePrice ?? 0) * item.Quantity))
                        : (cart.TotalPrice + (product.Price * item.Quantity));
                    cart.TotalQuantity += item.Quantity;
                }
            }
            return cart;
        }
    }
}
