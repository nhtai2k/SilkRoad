using Common.Models;
using RestaurantDataAccess.DTOs;

namespace RestaurantBusinessLogic.IHelpers
{
    public interface ICategoryHelper : IBaseAsyncHelper<CategoryDTO>
    {
        public Task<CategoryDTO?> GetEagerByIdAsync(int Id);
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<IEnumerable<OptionModel>> GetTreeOptionListAsync();
        //public Task<bool> IsCodeExistsAsync(string code);
    }
}
