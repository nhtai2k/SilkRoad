using Survey.DAL.DTOs;
using Survey.DAL.IRepositories;

namespace Survey.DAL.Repositories
{
    public class StoreRepository : GenericRepository<StoreDTO>, IStoreRepository
    {
        public StoreRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
