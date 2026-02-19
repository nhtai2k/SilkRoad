using Lipstick.DAL.DTOs;

namespace Lipstick.DAL.IRepositories
{
    public interface IOrderRepository : IGenericRepository<OrderDTO>
    {
        public OrderDTO? GetEagerOrderHistoryByID(Guid Id);
        public bool IsOrderExistByCode(string code);
        public Task<OrderDTO?> GetByCodeAsync(string code);
    }
}
