using Lipstick.DAL.DTOs;

namespace Lipstick.DAL.IRepositories
{
    public interface IPaymentRepository : IGenericRepository<PaymentDTO>
    {
        public Task<PaymentDTO?> GetByIdAsync(Guid id);
    }
}
