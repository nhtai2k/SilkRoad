//using DataAccess.BOMDTOs;
//using DataAccess.IBOMRepositories;
//using DataAccess.Repositories;
//using Microsoft.EntityFrameworkCore;

//namespace DataAccess.BOMRepositories
//{
//    public class MallRepository : GenericRepository<MallDTO>, IMallRepository
//    {

//        public MallRepository(ApplicationContext context) : base(context) { }

//        public async Task<MallDTO?> GetEagerByIdAsync(int Id)
//        {
//            return await _dbSet
//            .Include(m => m.Locations!)
//            .ThenInclude(l => l.Areas)
//            .FirstOrDefaultAsync(m => m.Id == Id);
//        }
//        public async Task<bool> IsCodeExistsAsync(string code)
//        {
//            return await _dbSet.AnyAsync(unit => unit.Code.ToLower() == code.Trim().ToLower());
//        }
//    }
//}
