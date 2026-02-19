using BOM.DAL.DTOs;
using BOM.DAL.IRepositories;

namespace BOM.DAL.Repositories
{
    public class BOMMaterialLinkRepository : GenericRepository<BOMMaterialLinkDTO>, IBOMMaterialLinkRepository
    {
        public BOMMaterialLinkRepository(ApplicationContext context) : base(context) { }
    }
}
