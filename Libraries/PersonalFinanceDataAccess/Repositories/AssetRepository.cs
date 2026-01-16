using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceDataAccess.Repositories
{
    public class AssetRepository : GenericRepository<DTOs.AssetDTO>, IRepositories.IAssetRepository
    {
        public AssetRepository(ApplicationContext context) : base(context)
        {
        }
    
    }
}
