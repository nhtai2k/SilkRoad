using Microsoft.EntityFrameworkCore.Storage;
using PersonalFinanceDataAccess.IRepositories;

namespace PersonalFinanceDataAccess
{
    public interface IUnitOfWork : IDisposable
    {

        public ICategoryRepository CategoryRepository { get; }
        public ISubCategoryRepository SubCategoryRepository { get; }
        public IIncomeRepository IncomeRepository { get; }
        public IExpenseRepository ExpenseRepository { get; }
        IDbContextTransaction BeginTransaction();
        void Commit();
        void Rollback();
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
