using Lipstick.DAL.DTOs;
using Lipstick.DAL.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Lipstick.DAL.Repositories
{
    public class PageIntroRepository : GenericRepository<PageIntroDTO>, IPageIntroRepository
    {
        private readonly DbSet<PageIntroDTO> _pageIntro;
        public PageIntroRepository(ApplicationContext context) : base(context)
        {
            _pageIntro = context.Set<PageIntroDTO>();
        }

        public PageIntroDTO? GetFirstDataByPageTypeId(int pageTypeId)
        {
            return _pageIntro.Where(s => !s.IsDeleted && s.IsActive && s.PageTypeId == pageTypeId).OrderBy(s => s.ModifiedOn).FirstOrDefault();
        }
    }
}
