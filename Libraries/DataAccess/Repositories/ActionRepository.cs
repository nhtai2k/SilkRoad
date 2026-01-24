using System.DAL.DTOs;
using System.DAL.IRepositories;

namespace System.DAL.Repositories
{
    public class ActionRepository : GenericRepository<ActionDTO>, IActionRepository
    {
        public ActionRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
