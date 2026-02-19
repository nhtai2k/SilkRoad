using Lipstick.DAL.DTOs;
using Lipstick.DAL.IRepositories;

namespace Lipstick.DAL.Repositories
{
    public class ColorRepository : GenericRepository<ColorDTO>, IColorRepository
    {
        public ColorRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}