using Member.DAL.DTOs;
using Member.DAL.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Member.DAL.Repositories
{
    public class FavoriteRepository : GenericRepository<FavoriteDTO>, IFavoriteRepository
    {
        private DbSet<FavoriteDTO> _favoriteProducts;
        public FavoriteRepository(ApplicationContext dbContext) : base(dbContext)
        {
            _favoriteProducts = dbContext.Set<FavoriteDTO>();
        }

        public async Task<bool> CheckFavoriteProductAsync(int productId, int userId)
        {
            return await _favoriteProducts.AnyAsync(f => f.ProductId == productId && f.UserId == userId);
        }

        public FavoriteDTO? GetFavoriteProduct(int productId, int userId)
        {
            return _favoriteProducts
                .Where(f => f.ProductId == productId && f.UserId == userId)
                .FirstOrDefault();
        }
    }
}
