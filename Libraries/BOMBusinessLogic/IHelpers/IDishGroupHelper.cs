using BOMDataAccess.DTOs;
using Common.Models;

namespace BOMBusinessLogic.IBOMHelpers
{
    public interface IDishGroupHelper : IBaseAsyncHelper<DishGroupDTO>
    {
        public Task<DishGroupDTO?> GetEagerByIdAsync(int Id);
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<bool> IsCodeExistsAsync(string code);


    }
}
