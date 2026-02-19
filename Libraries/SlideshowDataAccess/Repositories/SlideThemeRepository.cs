using Slideshow.DAL.DTOs;
using Slideshow.DAL.IRepositories;

namespace Slideshow.DAL.Repositories
{
    public class SlideThemeRepository : GenericRepository<SlideThemeDTO, ApplicationContext>, ISlideThemeRepository
    {
        public SlideThemeRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
