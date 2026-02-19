using Microsoft.EntityFrameworkCore.Storage;
using Stock.DAL.IRepositories;

namespace Stock.DAL
{
    public interface IUnitOfWork : IDisposable
    {
        ICompanyRepository CompanyRepository { get; }
        IStockPriceRepository StockPriceRepository { get; }
        IIndustryRepository IndustryRepository { get; }
        ITradeHistoryRepository TradeHistoryRepository { get; }
        IHandbookRepository HandbookRepository { get; }
        IDbContextTransaction BeginTransaction();
        void Commit();
        void Rollback();
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
