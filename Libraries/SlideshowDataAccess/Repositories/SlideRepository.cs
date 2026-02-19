using Slideshow.DAL.DTOs;
using Slideshow.DAL.IRepositories;

namespace Slideshow.DAL.Repositories
{
    public class SlideRepository : GenericRepository<SlideDTO, ApplicationContext>, ISlideRepository
    {
        public SlideRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
