using BOM.DAL.DTOs;
using BOM.DAL.IRepositories;

namespace BOM.DAL.Repositories
{
    public class BOMPropertyLinkRepository : GenericRepository<BOMPropertyLinkDTO>, IBOMPropertyLinkRepository
    {
        public BOMPropertyLinkRepository(ApplicationContext context) : base(context) { }
    }
}
