using Stock.DAL.DTOs;
using Stock.DAL.IRepositories;

namespace Stock.DAL.Repositories
{
    public class TradeHistoryRepository : GenericRepository<TradeHistoryDTO>, ITradeHistoryRepository
    {
        public TradeHistoryRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
