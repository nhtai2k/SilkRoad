using BOMDataAccess.DTOs;
using BOMDataAccess.IRepositories;

namespace BOMDataAccess.Repositories
{
    public class BOMPropertyLinkRepository : GenericRepository<BOMPropertyLinkDTO>, IBOMPropertyLinkRepository
    {
        public BOMPropertyLinkRepository(ApplicationContext context) : base(context) { }
    }
}
