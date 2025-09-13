using LipstickDataAccess.DTOs;

namespace LipstickDataAccess.IRepositories
{
    public interface IPageIntroRepository : IGenericRepository<PageIntroDTO>
    {
        PageIntroDTO? GetFirstDataByPageTypeId(int pageTypeId);
    }
}
