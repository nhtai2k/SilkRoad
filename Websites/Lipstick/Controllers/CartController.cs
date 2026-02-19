using Lipstick._Convergence.Helpers;
using Lipstick._Convergence.Hubs;
using Lipstick._Convergence.Services;
using Lipstick.ViewModels;
using Member.BLL.IHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Localization;
using Newtonsoft.Json;
using System.Share;
using System.Share.Models;
using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick.Controllers
{
    public class CartController : Controller
    {
        #region contructor
        private readonly LayoutHelper _layoutHelper;
        private readonly ProductService _productService;
        private readonly CartHelper _cartHelper;
        private readonly CartService _cartService;
        private readonly IStringLocalizer<CartController> _localizer;
        private readonly OrderService _orderService;
        private readonly IMyAccountHelper _myAccountHelper;
        private readonly IHubContext<PaymentHub> _paymentHub;
        public CartController(
            LayoutHelper layoutHelper,
            IStringLocalizer<CartController> localizer,
            ProductService productService,
            CartHelper cartHelper,
            OrderService orderService,
            IMyAccountHelper myAccountHelper,
            IHubContext<PaymentHub> paymentHub,
            CartService cartService)
        {
            _layoutHelper = layoutHelper;
            _localizer = localizer;
            _productService = productService;
            _cartHelper = cartHelper;
            _cartService = cartService;
            _orderService = orderService;
            _myAccountHelper = myAccountHelper;
            _paymentHub = paymentHub;
        }
        #endregion
        #region Web UI
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.Cart);
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Order()
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.Order);
            return View();
        }

        #endregion
        #region Handle Ajax
        /// <summary>
        /// Show toast when user add a product in cart
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> ShowToastAddToCartSuccess(int productId)
        {
            string languageCode = Global.GetLanguageCode(Request);
            DataObjectResult result = new DataObjectResult();
            ToastItem toastItem = new ToastItem();
            var product = await _productService.GetById(languageCode, productId);
            if (product == null)
            {
                result.OK = false;
                result.Data = _localizer["ProductNotFound"];
                return Ok(result);
            }
            toastItem.Message = _localizer["AddedToCartSuccess"];
            toastItem.ProductName = product.Name;
            toastItem.ImageUrl = product.Avatar;
            toastItem.BackgroundStyle = EToastBackgroundColor.success.ToString();
            result.OK = true;
            result.Data = Global.RenderRazorViewToString(this, "PartialViews/_ToastPartialView", toastItem);
            return Ok(result);
        }
        /// <summary>
        /// Show toast when use remove a product in cart
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> ShowToastRemoveFromCartSuccess(int productId)
        {
            string languageCode = Global.GetLanguageCode(Request);
            DataObjectResult result = new DataObjectResult();
            ToastItem toastItem = new ToastItem();
            var product = await _productService.GetById(languageCode, productId);
            if (product == null)
            {
                result.OK = false;
                result.Data = _localizer["ProductNotFound"];
                return Ok(result);
            }
            toastItem.Message = _localizer["RemoveFromCartSuccess"];
            toastItem.ProductName = product.Name;
            toastItem.ImageUrl = product.Avatar;
            toastItem.BackgroundStyle = EToastBackgroundColor.warning.ToString();
            result.OK = true;
            result.Data = Global.RenderRazorViewToString(this, "PartialViews/_ToastPartialView", toastItem);
            return Ok(result);
        }
        /// <summary>
        /// Get item list from cart
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> GetItemList([FromBody] List<CartItemModel> items)
        {
            DataObjectResult result = new DataObjectResult();
            string languageCode = Global.GetLanguageCode(Request);
            if (items == null || items.Count == 0)
            {
                result.Data = Global.RenderRazorViewToString(this, "PartialViews/_CartItemsPartialView");
                return Ok(result);
            }
            var data = await _cartService.GetCartAsync(items, languageCode);
            result.OK = true;
            result.Data = Global.RenderRazorViewToString(this, "PartialViews/_CartItemsPartialView", data);
            return Ok(result);
        }

        /// <summary>
        /// Get order form partial view based on cart items
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> GetOrderForm([FromBody] List<CartItemModel> items)
        {
            DataObjectResult result = new DataObjectResult();
            OrderClientViewModel model = new OrderClientViewModel();
            string languageCode = Global.GetLanguageCode(Request);
            model.Cart = await _cartService.GetCartAsync(items, languageCode);
            //update order information by user, if user is logged in
            if (User != null)
            {
                string userId = User.Claims.FirstOrDefault()?.Value ?? "-1";
                var user = _myAccountHelper.GetUserById(int.Parse(userId));
                if (user != null)
                {
                    model.UserId = user.Id;
                    model.FullName = user.FullName;
                    model.Email = user.Email;
                    model.PhoneNumber = user.PhoneNumber;
                    model.DistrictId = user.DistrictId;
                    model.ProvinceId = user.ProvinceId;
                    model.ShippingAddress = user.Address;
                }
            }
            result.OK = true;
            result.Data = Global.RenderRazorViewToString(this, "PartialViews/_OrderFormPartialView", model);
            return Ok(result);
        }

        /// <summary>
        /// Order
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Order([FromForm] OrderClientViewModel model)
        {
            DataObjectResult result = new DataObjectResult();
            if (!ModelState.IsValid || model.Cart.TotalPrice <= 0 || model.Cart.TotalQuantity <= 0)
            {
                result.Data = Global.RenderRazorViewToString(this, "PartialViews/_OrderFormPartialView", model);
                return BadRequest(result);
            }
            //thuc hien luu don hang
            string? orderId = await _orderService.CreateAsync(model);
            if (!string.IsNullOrEmpty(orderId) && model.PaymentMethodId == (int)EPaymentTypes.CashOnDelivery)
            {
                result.OK = true;
                result.Data = JsonConvert.SerializeObject(new
                {
                    paymentMethod = "CashOnDelivery",
                    html = Global.RenderRazorViewToString(this, "PartialViews/_CongratulationPartialView")
                });
                return Ok(result);
            }
            else if (!string.IsNullOrEmpty(orderId) && model.PaymentMethodId == (int)EPaymentTypes.BankTransfer)
            {
                result.OK = true;
                result.Data = JsonConvert.SerializeObject(new
                {
                    paymentMethod = "BankTransfer",
                    orderCode = orderId,
                    html = Global.RenderRazorViewToString(this, "PartialViews/_CongratulationPartialView"),
                    content = "https://qr.sepay.vn/img?bank=TPBank&acc=0704469237&template=compact&amount=10000&des=" + orderId
                });
                return Ok(result);
            }
            return StatusCode(500);
        }

        [HttpPost]
        public IActionResult ReceivePaymentStatus([FromBody] string obj)
        {
            _paymentHub.Clients.All.SendAsync("ReceivePaymentStatus", obj);
            return Ok();
        }

        [HttpPost]
        public IActionResult WebhookEndPoint([FromBody] SepayModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            _orderService.NotifyPaymentStatus(model);
            return Ok();
        }
        #endregion
    }
}
