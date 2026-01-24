using Lipstick.BLL.ILipstickClientHelpers;
using Lipstick.DAL;
using Lipstick.DAL.DTOs;
using System.Share;
using System.Share.Models;
using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick.BLL.LipstickClientHelpers
{
    public class OrderClientHelper : IOrderClientHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ServerAppConfig _appConfig;
        public OrderClientHelper(IUnitOfWork unitOfWork, ServerAppConfig appConfig)
        {
            _unitOfWork = unitOfWork;
            _appConfig = appConfig;
        }

        private string RenderOrder()
        {
            int lengthCode = 5;
            string code = Global.GenerateRandomString(lengthCode, (int)EQRCodeTypes.CharacterAndNumber);

            bool checkCode = _unitOfWork.OrderRepository.IsOrderExistByCode(code);
            while (checkCode)
            {
                lengthCode++;
                code = Global.GenerateRandomString(lengthCode, (int)EQRCodeTypes.CharacterAndNumber);
                checkCode = _unitOfWork.OrderRepository.IsOrderExistByCode(code);
            }
            return code;
        }

        /// <summary>
        /// Create a new order based on the provided model.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<string?> CreateAsync(OrderClientViewModel model)
        {
            // Validate the model
            if (model == null || model.Cart == null || model.Cart.CartItems == null)
                return null; // Invalid order model or empty cart
            string code = RenderOrder();
            //Map some properties from OrderClientViewModel to OrderDTO
            OrderDTO order = new OrderDTO()
            {
                UserId = model.UserId,
                PaymentMethodId = model.PaymentMethodId,
                FullName = model.FullName,
                PhoneNumber = model.PhoneNumber,
                Email = model.Email,
                ShippingAddress = model.ShippingAddress,
                ProvinceId = model.ProvinceId,
                DistrictId = model.DistrictId,
                OrderStatusId = (int)EOrderStatus.New,
                PaymentStatusId = (int)EPaymentStatus.Pending,
                Note = model.Note,
                Code = code,
                CreatedBy = "Client Web"
            };

            //Add items from Cart to OrderDetails
            //And Update the Amount of Order
            model.Cart.CartItems.ForEach(item =>
            {
                var product = _unitOfWork.ProductRepository.GetById(item.ProductId);
                if (product != null)
                {
                    order.OrderDetails.Add(new OrderDetailDTO
                    {
                        ProductId = product.Id,
                        NameEN = product.NameEN,
                        NameVN = product.NameVN,
                        Avatar = product.Avatar,
                        Quantity = item.Quantity,
                        Price = product.Price,
                        SaleOff = product.SaleOff,
                        DiscountPercent = product.DiscountPercent,
                        SalePrice = product.SalePrice
                    });
                    // Update the total amount of the order
                    order.Amount += item.Quantity * (product.SaleOff ? (product.SalePrice ?? 0) : product.Price);
                    order.TotalQuantity += item.Quantity;
                }
            });

            await _unitOfWork.OrderRepository.CreateAsync(order);
            await _unitOfWork.SaveChangesAsync();
            return code;
        }

        public OrderClientViewModel? GetEagerOrderById(int id, string language)
        {
            //var data = _unitOfWork.OrderHistoryRepository.GetEagerOrderHistoryByID(id);
            //if (data == null)
            //    return null;
            //OrderClientViewModel orderHistoryViewModel = new OrderClientViewModel
            //{
            //    Id = data.Id,
            //    FullName = data.FullName,
            //    PhoneNumber = data.PhoneNumber,
            //    Email = data.Email,
            //    ShippingAddress = data.ShippingAddress,
            //    ProvinceId = data.ProvinceId,
            //    DistrictId = data.DistrictId,
            //    PaymentMethodId = data.PaymentMethodId,
            //    OrderDate = data.OrderDate,
            //    ReceiveDate = data.ReceiveDate,
            //    ShippingDate = data.ShippingDate,
            //    StatusId = data.StatusId,
            //    Total = data.Total,
            //    OrderHistoryItems = data.OrderHistoryItems.Select(s => new OrderHistoryItemClientViewModel
            //    {
            //        Id = s.Id,
            //        ProductId = s.ProductId,
            //        Price = s.Price,
            //        Quantity = s.Quantity
            //    }).ToList()
            //};
            //// Map OrderHistoryItems to ProductName and ProductImage
            //foreach (var item in orderHistoryViewModel.OrderHistoryItems)
            //{
            //    var product = _unitOfWork.ProductRepository.GetById(item.ProductId);
            //    if (product != null)
            //    {
            //        item.ProductName = language == ELanguages.VN.ToString() ? product.NameVN : product.NameEN;
            //        item.ProductImage = string.Concat(_appConfig.ServerUrl, product.Avatar).Replace(@"\", @"/");
            //    }
            //}

            //return orderHistoryViewModel;
            throw new NotImplementedException("GetEagerOrderHistoryClientById method is not implemented yet.");
        }

        //public async Task<List<OrderHistoryItemClientViewModel>> GetListOrderItemsAsync(string language, List<CartItemModel> items)
        //{
        //    List<OrderHistoryItemClientViewModel> listOrderItems = new List<OrderHistoryItemClientViewModel>();
        //    foreach (var item in items)
        //    {
        //        var product = await _unitOfWork.ProductRepository.GetByIdAsync(item.ProductId);
        //        if (product != null)
        //        {
        //            listOrderItems.Add(new OrderHistoryItemClientViewModel
        //            {
        //                ProductId = product.Id,
        //                ProductName = language == ELanguages.VN.ToString() ? product.NameVN : product.NameEN,
        //                Price = product.Price,
        //                Quantity = item.Quantity,
        //                ProductImage = string.Concat(_appConfig.ServerUrl, product.Avatar).Replace(@"\", @"/")
        //            });
        //        }
        //    }
        //    return listOrderItems;
        //}

        public async Task<Pagination<OrderClientViewModel>> GetAllByPhoneNumber(int pageIndex, int pageSize, string phoneNumber)
        {
            //Pagination<OrderClientViewModel> model = new Pagination<OrderClientViewModel>();
            //if (pageSize > 0)
            //    model.PageSize = pageSize;
            //// Start the query
            //var query = _unitOfWork.OrderHistoryRepository.Query();

            //// Apply dynamic filters
            //if (!string.IsNullOrEmpty(phoneNumber))
            //    query = query.Where(s => s.PhoneNumber.Contains(phoneNumber));

            //// Count total items
            //model.TotalItems = await query.CountAsync();
            //model.CurrentPage = pageIndex;
            //model.TotalPages = (int)Math.Ceiling(model.TotalItems / (double)model.PageSize);
            //// Apply pagination
            //var data = await query.Skip((pageIndex - 1) * model.PageSize)
            //                      .Take(model.PageSize)
            //                      .ToListAsync();
            //// Map to view models
            //model.Items = data.Select(x => new OrderClientViewModel
            //{
            //    Id = x.Id,
            //    FullName = x.FullName,
            //    PhoneNumber = x.PhoneNumber,
            //    Email = x.Email,
            //    ShippingAddress = x.ShippingAddress,
            //    ProvinceId = x.ProvinceId,
            //    DistrictId = x.DistrictId,
            //    PaymentMethodId = x.PaymentMethodId,
            //    OrderDate = x.OrderDate,
            //    ReceiveDate = x.ReceiveDate,
            //    ShippingDate = x.ShippingDate,
            //    StatusId = x.StatusId,
            //    Total = x.Total
            //});

            //return model;
            throw new NotImplementedException("GetUserOrderHistoryByPhoneNumber method is not implemented yet.");
        }

        public async Task<Pagination<OrderClientViewModel>> GetAllByUserId(int pageIndex, int pageSize, int userId)
        {
            //Pagination<OrderClientViewModel> model = new Pagination<OrderClientViewModel>();
            //if (pageSize > 0)
            //    model.PageSize = pageSize;
            //// Start the query
            //var query = _unitOfWork.OrderHistoryRepository.Query(s => s.MemberId == userId);

            //// Count total items
            //model.TotalItems = await query.CountAsync();
            //model.CurrentPage = pageIndex;
            //model.TotalPages = (int)Math.Ceiling(model.TotalItems / (double)model.PageSize);
            //// Apply pagination
            //var data = await query.Skip((pageIndex - 1) * model.PageSize)
            //                      .Take(model.PageSize)
            //                      .ToListAsync();
            //// Map to view models
            //model.Items = data.Select(x => new OrderClientViewModel
            //{
            //    Id = x.Id,
            //    FullName = x.FullName,
            //    PhoneNumber = x.PhoneNumber,
            //    Email = x.Email,
            //    ShippingAddress = x.ShippingAddress,
            //    ProvinceId = x.ProvinceId,
            //    DistrictId = x.DistrictId,
            //    PaymentMethodId = x.PaymentMethodId,
            //    OrderDate = x.OrderDate,
            //    ReceiveDate = x.ReceiveDate,
            //    ShippingDate = x.ShippingDate,
            //    StatusId = x.StatusId,
            //    Total = x.Total
            //});

            //return model;
            throw new NotImplementedException("GetUserOrderHistoryByUserId method is not implemented yet.");
        }

        public async Task<bool> UpdateReceiveDateAsync(int id)
        {
            var data = _unitOfWork.OrderRepository.GetById(id);
            if (data == null)
            {
                return false;
            }
            //if (data.StatusId != (int)EOrderStatus.Shipping)
            //{
            //    return false;
            //}
            data.ReceiveDate = DateTime.Now;
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateStatusAsync(int id, int statusId)
        {
            var data = _unitOfWork.OrderRepository.GetById(id);
            if (data == null)
            {
                return false;
            }
            data.OrderStatusId = statusId;
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

    }
}
