using Member.DAL.DTOs;

namespace Member.DAL.IRepositories
{
    public interface IFavoriteRepository : IGenericRepository<FavoriteDTO>
    {
        public Task<bool> CheckFavoriteProductAsync(int productId, int userId);
        public FavoriteDTO? GetFavoriteProduct(int productId, int userId);
    }
}
