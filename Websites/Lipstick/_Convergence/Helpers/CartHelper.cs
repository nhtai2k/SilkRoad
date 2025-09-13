using Common.ViewModels.LipstickClientViewModels;
using Lipstick._Convergence.Services;

namespace Lipstick._Convergence.Helpers
{
    public class CartHelper
    {
        private readonly ProductService _productService;
        public CartHelper(ProductService productService)
        {
            _productService = productService;
        }
        //public async Task<CartViewModel> GetCartAsync(GetCartRequestViewModel request, string language)
        //{
        //    CartViewModel cart = new CartViewModel();
        //    foreach (var item in request.CartItems)
        //    {
        //        var product = await _productService.GetById(language, item.ProductId);
        //        if (product != null)
        //        {
        //            cart.CartItems.Add(new CartItemViewModel(product.Id, product.Name, product.Price, item.Quantity, product.Avatar));
        //            cart.TotalPrice += product.Price * item.Quantity;
        //            cart.TotalQuantity += item.Quantity;
        //        }
        //    }
        //    return cart;
        //}
    }
}
