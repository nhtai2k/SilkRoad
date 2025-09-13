using Microsoft.EntityFrameworkCore.Storage;
using StockDataAccess.IRepositories;

namespace StockDataAccess
{
    public interface IUnitOfWork : IDisposable
    {
        ICompanyRepository CompanyRepository { get; }
        IStockPriceRepository StockPriceRepository { get; }
        IIndustryRepository IndustryRepository { get; }
        IDbContextTransaction BeginTransaction();
        void Commit();
        void Rollback();
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
