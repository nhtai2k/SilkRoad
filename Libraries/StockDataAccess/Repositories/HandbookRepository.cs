using Stock.DAL.DTOs;
using Stock.DAL.IRepositories;

namespace Stock.DAL.Repositories
{
    public class HandbookRepository : GenericRepository<HandbookDTO>, IHandbookRepository
    {
        public HandbookRepository(ApplicationContext context) : base(context)
        {
        }

    }
}
