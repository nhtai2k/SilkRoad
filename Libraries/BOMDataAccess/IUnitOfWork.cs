using BOMDataAccess.IRepositories;
using Microsoft.EntityFrameworkCore.Storage;

namespace BOMDataAccess
{
    public interface IUnitOfWork : IDisposable
    {
        #region BOM
        //IAreaRepository AreaRepository { get; }
        IBOMConfigurationRepository BOMConfigurationRepository { get; }
        IBOMCategoryRepository BOMCategoryRepository { get; }
        IBOMRepository BOMRepository { get; }
        IBOMMaterialLinkRepository BOMMaterialLinkRepository { get; }
        // IBOMProcedureLinkRepository BOMProcedureLinkRepository { get; }
        IBOMPropertyLinkRepository BOMPropertyLinkRepository { get; }
        //IEmployeeRepository EmployeeRepository { get; }
        IKitchenRepository KitchenRepository { get; }
        //ILocationRepository LocationRepository { get; }
        //IMallRepository MallRepository { get; }
        IMaterialRepository MaterialRepository { get; }
        IMaterialGroupRepository MaterialGroupRepository { get; }
        //IProcedureRepository ProcedureRepository { get; }
        IPropertyRepository PropertyRepository { get; }
        IPropertyTypeRepository PropertyTypeRepository { get; }
        IRankRepository RankRepository { get; }
        //IRentalRepository RentalRepository { get; }
        IEnergyRepository EnergyRepository { get; }
        IUnitRepository UnitRepository { get; }
        IUnitGroupRepository UnitGroupRepository { get; }
        IDishGroupRepository DishGroupRepository { get; }
        IDishRepository DishRepository { get; }
        IDepartmentRepository DepartmentRepository { get; }
        IMaterialCategoryRepository MaterialCategoryRepository { get; }
        IMaterialUnitRepository MaterialUnitRepository { get; }
        #endregion

        IDbContextTransaction BeginTransaction();
        void Commit();
        void Rollback();
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
