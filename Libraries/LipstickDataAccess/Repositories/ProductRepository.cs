using Lipstick.DAL.DTOs;
using Lipstick.DAL.IRepositories;

namespace Lipstick.DAL.Repositories
{
    public class ProductRepository : GenericRepository<ProductDTO>, IProductRepository
    {
        public ProductRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}
