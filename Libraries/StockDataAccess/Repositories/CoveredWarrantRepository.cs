using Stock.DAL.DTOs;
using Stock.DAL.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Stock.DAL.Repositories
{
    public class CoveredWarrantRepository : GenericRepository<CoveredWarrantDTO>, ICoveredWarrantRepository
    {
        public CoveredWarrantRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
