using Lipstick.DAL.DTOs;
using Lipstick.DAL.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Lipstick.DAL.Repositories
{
    public class PaymentRepository : GenericRepository<PaymentDTO>, IPaymentRepository
    {
        private readonly DbSet<PaymentDTO> _payment;
        public PaymentRepository(ApplicationContext dbContext) : base(dbContext)
        {
            _payment = dbContext.Set<PaymentDTO>();
        }

        public async Task<PaymentDTO?> GetByIdAsync(Guid id)
        {
            var payment = await _payment.FindAsync(id);
            if (payment == null)
            {
                return null;
            }
            return payment;
        }
    }
}
