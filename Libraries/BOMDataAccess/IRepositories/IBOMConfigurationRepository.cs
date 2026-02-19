using BOM.DAL.DTOs;

namespace BOM.DAL.IRepositories
{
    public interface IBOMConfigurationRepository : IGenericRepository<BOMConfigurationDTO>
    {

        public Task<ICollection<BOMConfigurationDTO>?> GetChildrenByParentId(int parentId);
    }
}
