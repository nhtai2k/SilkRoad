using MemberDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberDataAccess.IRepositories
{
    public interface IFavoriteRepository : IGenericRepository<FavoriteDTO>
    {
        public Task<bool> CheckFavoriteProductAsync(int productId, int userId);
        public FavoriteDTO? GetFavoriteProduct(int productId, int userId);
    }
}
