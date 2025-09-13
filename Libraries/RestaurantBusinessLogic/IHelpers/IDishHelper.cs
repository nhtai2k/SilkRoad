using Common.Models;
using RestaurantBusinessLogic.Models;
using RestaurantDataAccess.DTOs;

namespace RestaurantBusinessLogic.IHelpers
{
    public interface IDishHelper : IBaseAsyncHelper<DishDTO>
    {
        // public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<Pagination<DishDTO>> GetByFilterAsync(DishFilterModel model);
        //public Task<bool> IsCodeExistsAsync(string code);
        //public string ExportExcelAsync();
    }
}
