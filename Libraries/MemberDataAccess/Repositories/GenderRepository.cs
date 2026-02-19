using Member.DAL.DTOs;
using Member.DAL.IRepositories;

namespace Member.DAL.Repositories
{
    public class GenderRepository : GenericRepository<GenderDTO>, IGenderRepository
    {
        public GenderRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
