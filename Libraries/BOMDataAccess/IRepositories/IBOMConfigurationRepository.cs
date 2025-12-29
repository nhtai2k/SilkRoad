using BOMDataAccess.DTOs;

namespace BOMDataAccess.IRepositories
{
    public interface IBOMConfigurationRepository : IGenericRepository<BOMConfigurationDTO>
    {

        public Task<ICollection<BOMConfigurationDTO>?> GetChildrenByParentId(int parentId);
    }
}
