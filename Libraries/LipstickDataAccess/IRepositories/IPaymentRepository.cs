using LipstickDataAccess.DTOs;

namespace LipstickDataAccess.IRepositories
{
    public interface IPaymentRepository : IGenericRepository<PaymentDTO>
    {
        public Task<PaymentDTO?> GetByIdAsync(Guid id);
    }
}
