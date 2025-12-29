using BOMDataAccess.DTOs;
using Common.Models;
using Common.Models.BOMModels;

namespace BOMBusinessLogic.IBOMHelpers
{
    public interface IDishHelper : IBaseAsyncHelper<DishDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<Pagination<DishDTO>> GetByFilterAsync(DishFilterModel model);
        public Task<bool> IsCodeExistsAsync(string code);
        public string ExportExcelAsync();

    }
}
