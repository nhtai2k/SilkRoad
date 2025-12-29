using BOMDataAccess.DTOs;
using BOMDataAccess.IRepositories;

namespace BOMDataAccess.Repositories
{
    public class BOMMaterialLinkRepository : GenericRepository<BOMMaterialLinkDTO>, IBOMMaterialLinkRepository
    {
        public BOMMaterialLinkRepository(ApplicationContext context) : base(context) { }
    }
}
