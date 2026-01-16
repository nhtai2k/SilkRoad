using PersonalFinanceDataAccess.DTOs;
using PersonalFinanceDataAccess.IRepositories;

namespace PersonalFinanceDataAccess.Repositories
{
    public class ResourceRepository : GenericRepository<ResourceDTO>, IResourceRepository
    {
        public ResourceRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
