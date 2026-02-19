using Lipstick.DAL.DTOs;

namespace Lipstick.DAL.IRepositories
{
    public interface IPageIntroRepository : IGenericRepository<PageIntroDTO>
    {
        PageIntroDTO? GetFirstDataByPageTypeId(int pageTypeId);
    }
}
