using Lipstick.DAL.DTOs;

namespace Lipstick.DAL.IRepositories
{
    public interface IPageContentRepository : IGenericRepository<PageContentDTO>
    {
        PageContentDTO? GetFirstDataByPageTypeId(int pageTypeId);
    }
}
