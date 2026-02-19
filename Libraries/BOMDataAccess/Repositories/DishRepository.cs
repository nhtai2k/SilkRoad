using BOM.DAL.DTOs;
using BOM.DAL.IRepositories;
using BOM.DAL.QureyModels;
using Microsoft.EntityFrameworkCore;

namespace BOM.DAL.Repositories
{
    public class DishRepository : GenericRepository<DishDTO>, IDishRepository
    {
        public DishRepository(ApplicationContext context) : base(context)
        { }
        public async Task<bool> IsCodeExistsAsync(string code)
        {
            return await _dbSet.AnyAsync(unit => unit.Code.ToLower() == code.Trim().ToLower());
        }

        public async Task<ICollection<DishQueryModel>> ExportDataAsync()
        {
            var sql = @"select dishes.Code, dishes.[Name], dishGroups.[Name] as 'GroupName', dishes.Note
                        from Table_Dishes as dishes left join Table_DishGroups as dishGroups 
                        on dishes.DishGroupId = dishGroups.Id
                        where dishes.IsActive = 1 and dishes.IsDeleted = 0";
            var data = await _context.Database.SqlQueryRaw<DishQueryModel>(sql).ToListAsync();

            return data;
        }
    }
}
