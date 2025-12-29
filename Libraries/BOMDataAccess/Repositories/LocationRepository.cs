//using DataAccess.BOMDTOs;
//using DataAccess.IBOMRepositories;
//using DataAccess.Repositories;
//using Microsoft.EntityFrameworkCore;

//namespace DataAccess.BOMRepositories
//{
//    public class LocationRepository : GenericRepository<LocationDTO>, ILocationRepository
//    {
//        public LocationRepository(ApplicationContext context) : base(context) { }
//        public async Task<bool> IsCodeExistsAsync(string code)
//        {
//            return await _dbSet.AnyAsync(unit => unit.Code.ToLower() == code.Trim().ToLower());
//        }
//    }
//}
