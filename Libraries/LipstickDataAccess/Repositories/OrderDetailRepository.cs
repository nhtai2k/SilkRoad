using Lipstick.DAL.DTOs;
using Lipstick.DAL.IRepositories;

namespace Lipstick.DAL.Repositories
{
    public class OrderDetailRepository : GenericRepository<OrderDetailDTO>, IOrderDetailRepository
    {
        public OrderDetailRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
