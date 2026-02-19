using Lipstick.DAL.DTOs;
using Lipstick.DAL.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Lipstick.DAL.Repositories
{
    public class OrderRepository : GenericRepository<OrderDTO>, IOrderRepository
    {
        private readonly DbSet<OrderDTO> _orderHistory;
        public OrderRepository(ApplicationContext context) : base(context)
        {
            _orderHistory = context.Set<OrderDTO>();
        }

        public Task<OrderDTO?> GetByCodeAsync(string code)
        {
            return _orderHistory.FirstOrDefaultAsync(o => o.Code == code);
        }

        public bool IsOrderExistByCode(string code)
        {
            return _orderHistory.Any(o => o.Code == code);
        }

        public OrderDTO? GetEagerOrderHistoryByID(Guid Id)
        {
            var data = _orderHistory.Where(s => s.Id == Id).Include(s => s.OrderDetails).FirstOrDefault();
            return data;
        }
    }
}
