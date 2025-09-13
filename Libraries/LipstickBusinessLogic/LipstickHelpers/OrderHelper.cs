using AutoMapper;
using Common;
using Common.Models;
using Common.ViewModels.LipstickViewModels;
using LipstickBusinessLogic.ILipstickHelpers;
using LipstickDataAccess;
using LipstickDataAccess.DTOs;
using Microsoft.EntityFrameworkCore;

namespace LipstickBusinessLogic.LipstickHelpers
{
    public class OrderHelper : IOrderHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public OrderHelper(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
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
        
        public async Task<bool> CreateAsync(OrderViewModel model)
        {
            OrderDTO order = _mapper.Map<OrderDTO>(model);
            order.Code = RenderOrder();
            order.OrderStatusId = (int)EOrderStatus.New;
            order.OrderDetails = [];
            model.OrderDetails.ForEach(item =>
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
            return true;
        }

        public async Task<Pagination<OrderViewModel>> GetAllAsync(int pageIndex, int pageSize, int statusId, string phoneNumber)
        {
            Pagination<OrderViewModel> model = new Pagination<OrderViewModel>();

            //Set default values if not provided
            if (pageSize > 0)
                model.PageSize = pageSize;
            
            // Start the query
            var query = _unitOfWork.OrderRepository.Query();

            // Apply dynamic filters
            if (!string.IsNullOrEmpty(phoneNumber))
                query = query.Where(s => s.PhoneNumber.Contains(phoneNumber));
            if (statusId != -1)
                query = query.Where(s => s.OrderStatusId == statusId);

            // Count total items
            model.TotalItems = await query.CountAsync();
            model.CurrentPage = pageIndex;

            //if total items is 0, return empty model
            if (model.TotalItems <= 0)
                return model;

            model.TotalPages = (int)Math.Ceiling(model.TotalItems / (double)model.PageSize);
            // Apply pagination
            var data = await query.Skip((pageIndex - 1) * model.PageSize)
                                  .Take(model.PageSize)
                                  .ToListAsync();
            // Map to view models
            model.Items = _mapper.Map<IEnumerable<OrderViewModel>>(data);

            return model;
        }

        public OrderViewModel? GetById(Guid Id)
        {
            var data = _unitOfWork.OrderRepository.GetEagerOrderHistoryByID(Id);
            return data == null ? null : _mapper.Map<OrderViewModel>(data);
        }

        public Task<Pagination<OrderViewModel>> GetByMemberIdAsync(int pageIndex, int pageSize, int memberId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateAsync(OrderViewModel model)
        {
            var data = _unitOfWork.OrderRepository.GetById(model.Id);
            if (data == null)
            {
                return false;
            }
            data.OrderStatusId = model.OrderStatusId;
            data.ShippingDate = model.ShippingDate;
            data.ReceiveDate = model.ReceiveDate;
            await _unitOfWork.SaveChangesAsync();
            return true;
        }
        
    }
}
