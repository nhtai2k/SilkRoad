using StockDataAccess.DTOs;
using StockDataAccess.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace StockDataAccess.Repositories
{
    public class HandbookRepository : GenericRepository<HandbookDTO>, IHandbookRepository
    {
        public HandbookRepository(ApplicationContext context) : base(context)
        {
        }
    
    }
}
