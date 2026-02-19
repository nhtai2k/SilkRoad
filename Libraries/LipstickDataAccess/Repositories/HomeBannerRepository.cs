using Lipstick.DAL.DTOs;
using Lipstick.DAL.IRepositories;

namespace Lipstick.DAL.Repositories
{
    public class HomeBannerRepository : GenericRepository<HomeBannerDTO>, IHomeBannerRepository
    {
        public HomeBannerRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
