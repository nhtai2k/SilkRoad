using LipstickDataAccess.DTOs;
using LipstickDataAccess.IRepositories;

namespace LipstickDataAccess.Repositories
{
    public class OrderDetailRepository : GenericRepository<OrderDetailDTO>, IOrderDetailRepository
    {
        public OrderDetailRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
