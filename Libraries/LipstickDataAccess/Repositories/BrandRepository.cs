using Lipstick.DAL.DTOs;
using Lipstick.DAL.IRepositories;

namespace Lipstick.DAL.Repositories
{
    public class BrandRepository : GenericRepository<BrandDTO>, IBrandRepository
    {
        public BrandRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}
