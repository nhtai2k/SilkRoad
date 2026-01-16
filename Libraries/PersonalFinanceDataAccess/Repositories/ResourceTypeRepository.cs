using PersonalFinanceDataAccess.DTOs;
using PersonalFinanceDataAccess.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceDataAccess.Repositories
{
    public class ResourceTypeRepository : GenericRepository<ResourceTypeDTO>, IResourceTypeRepository
    {
        public ResourceTypeRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
