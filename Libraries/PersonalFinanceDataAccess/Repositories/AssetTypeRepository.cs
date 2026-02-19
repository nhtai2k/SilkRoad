using PersonalFinance.DAL.IRepositories;

namespace PersonalFinance.DAL.Repositories
{
    public class AssetTypeRepository : GenericRepository<DTOs.AssetTypeDTO>, IAssetTypeRepository
    {
        public AssetTypeRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
