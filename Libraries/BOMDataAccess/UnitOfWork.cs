using BOMDataAccess.IRepositories;
using BOMDataAccess.Repositories;
using Microsoft.EntityFrameworkCore.Storage;
namespace BOMDataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationContext context;
        private IDbContextTransaction? _transaction;
        private bool disposed = false;

        #region BOM
        //public IAreaRepository AreaRepository { get; private set; }
        public IBOMConfigurationRepository BOMConfigurationRepository { get; private set; }
        public IBOMCategoryRepository BOMCategoryRepository { get; private set; }
        public IBOMRepository BOMRepository { get; private set; }
        public IBOMMaterialLinkRepository BOMMaterialLinkRepository { get; private set; }
        //public IBOMProcedureLinkRepository BOMProcedureLinkRepository { get; private set; }
        public IBOMPropertyLinkRepository BOMPropertyLinkRepository { get; private set; }
        //public IEmployeeRepository EmployeeRepository { get; private set; }
        public IKitchenRepository KitchenRepository { get; private set; }
        //public ILocationRepository LocationRepository { get; private set; }
        //public IMallRepository MallRepository { get; private set; }
        public IMaterialRepository MaterialRepository { get; private set; }
        public IMaterialGroupRepository MaterialGroupRepository { get; private set; }
        //public IProcedureRepository ProcedureRepository { get; private set; }
        public IPropertyRepository PropertyRepository { get; private set; }
        public IPropertyTypeRepository PropertyTypeRepository { get; private set; }
        public IRankRepository RankRepository { get; private set; }
        //public IRentalRepository RentalRepository { get; private set; }
        public IEnergyRepository EnergyRepository { get; private set; }
        public IUnitRepository UnitRepository { get; private set; }
        public IUnitGroupRepository UnitGroupRepository { get; private set; }
        public IDishGroupRepository DishGroupRepository { get; private set; }
        public IDishRepository DishRepository { get; private set; }
        public IDepartmentRepository DepartmentRepository { get; private set; }
        public IMaterialCategoryRepository MaterialCategoryRepository { get; private set; }
        public IMaterialUnitRepository MaterialUnitRepository { get; private set; }
        #endregion

        public UnitOfWork(ApplicationContext context)
        {
            this.context = context;
            #region BOM
            //AreaRepository = new AreaRepository(context);
            BOMConfigurationRepository = new BOMConfigurationRepository(context);
            BOMCategoryRepository = new BOMCategoryRepository(context);
            BOMRepository = new BOMRepository(context);
            BOMMaterialLinkRepository = new BOMMaterialLinkRepository(context);
            //BOMProcedureLinkRepository = new BOMProcedureLinkRepository(context);
            BOMPropertyLinkRepository = new BOMPropertyLinkRepository(context);
            //EmployeeRepository = new EmployeeRepository(context);
            KitchenRepository = new KitchenRepository(context);
            //LocationRepository = new LocationRepository(context);
            //MallRepository = new MallRepository(context);
            MaterialRepository = new MaterialRepository(context);
            MaterialGroupRepository = new MaterialGroupRepository(context);
            //ProcedureRepository = new ProcedureRepository(context);
            PropertyRepository = new PropertyRepository(context);
            PropertyTypeRepository = new PropertyTypeRepository(context);
            RankRepository = new RankRepository(context);
            //RentalRepository = new RentalRepository(context);
            EnergyRepository = new EnergyRepository(context);
            UnitRepository = new UnitRepository(context);
            UnitGroupRepository = new UnitGroupRepository(context);
            DishGroupRepository = new DishGroupRepository(context);
            DishRepository = new DishRepository(context);
            DepartmentRepository = new DepartmentRepository(context);
            MaterialCategoryRepository = new MaterialCategoryRepository(context);
            MaterialUnitRepository = new MaterialUnitRepository(context);
            #endregion

        }
        public void SaveChanges()
        {
            context.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        public IDbContextTransaction BeginTransaction()
        {
            _transaction = context.Database.BeginTransaction();
            return _transaction;
        }
        public void Commit()
        {
            try
            {
                _transaction?.Commit();
            }
            catch
            {
                Rollback();
                throw;
            }
            finally
            {
                _transaction?.Dispose();
                _transaction = null;
            }
        }
        public void Rollback()
        {
            try
            {
                _transaction?.Rollback();
            }
            finally
            {
                _transaction?.Dispose();
                _transaction = null;
            }
        }
        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
