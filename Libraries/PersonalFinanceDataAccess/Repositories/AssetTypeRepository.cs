using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceDataAccess.Repositories
{
    public class AssetTypeRepository : GenericRepository<DTOs.AssetTypeDTO>, IRepositories.IAssetTypeRepository
    {
        public AssetTypeRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
