using PersonalFinance.DAL.DTOs;
using PersonalFinance.DAL.IRepositories;

namespace PersonalFinance.DAL.Repositories
{
    public class ResourceTypeRepository : GenericRepository<ResourceTypeDTO>, IResourceTypeRepository
    {
        public ResourceTypeRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
