using Lipstick.DAL.DTOs;
using Lipstick.DAL.IRepositories;

namespace Lipstick.DAL.Repositories
{
    public class SizeRepository : GenericRepository<SizeDTO>, ISizeRepository
    {
        public SizeRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}
