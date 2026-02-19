using BOM.DAL.DTOs;
using System.Share.Models;
using System.Share.Models.BOMModels;

namespace BOM.BLL.IHelpers
{
    public interface IDishHelper : IBaseAsyncHelper<DishDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<Pagination<DishDTO>> GetByFilterAsync(DishFilterModel model);
        public Task<bool> IsCodeExistsAsync(string code);
        public string ExportExcelAsync();

    }
}
