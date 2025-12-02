using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess.Repositories
{
    public class StoreRepository : GenericRepository<StoreDTO>, IStoreRepository
    {
        public StoreRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
