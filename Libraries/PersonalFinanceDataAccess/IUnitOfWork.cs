using Microsoft.EntityFrameworkCore.Storage;
using PersonalFinanceDataAccess.IRepositories;

namespace PersonalFinanceDataAccess
{
    public interface IUnitOfWork : IDisposable
    {

        public ICategoryRepository CategoryRepository { get; }
        public ISubCategoryRepository SubCategoryRepository { get; }
        public IResourceRepository ResourceRepository { get; }
        public IResourceTypeRepository ResourceTypeRepository { get; }
        public IAssetRepository AssetRepository { get; }
        public IAssetTypeRepository AssetTypeRepository { get; }
        public IExpenseRepository ExpenseRepository { get; }
        IDbContextTransaction BeginTransaction();
        void Commit();
        void Rollback();
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
