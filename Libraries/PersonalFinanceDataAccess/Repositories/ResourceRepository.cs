using PersonalFinance.DAL.DTOs;
using PersonalFinance.DAL.IRepositories;

namespace PersonalFinance.DAL.Repositories
{
    public class ResourceRepository : GenericRepository<ResourceDTO>, IResourceRepository
    {
        public ResourceRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
