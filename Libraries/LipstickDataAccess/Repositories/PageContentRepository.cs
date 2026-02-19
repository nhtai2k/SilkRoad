using Lipstick.DAL.DTOs;
using Lipstick.DAL.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Lipstick.DAL.Repositories
{
    public class PageContentRepository : GenericRepository<PageContentDTO>, IPageContentRepository
    {
        private readonly DbSet<PageContentDTO> _inforPage;
        public PageContentRepository(ApplicationContext context) : base(context)
        {
            _inforPage = context.Set<PageContentDTO>();
        }

        public PageContentDTO? GetFirstDataByPageTypeId(int pageTypeId)
        {
            return _inforPage.Where(s => !s.IsDeleted && s.IsActive && s.PageTypeId == pageTypeId).OrderBy(s => s.ModifiedOn).FirstOrDefault();
        }
    }
}
