namespace PersonalFinance.DAL.Repositories
{
    public class AssetRepository : GenericRepository<DTOs.AssetDTO>, IRepositories.IAssetRepository
    {
        public AssetRepository(ApplicationContext context) : base(context)
        {
        }

    }
}
