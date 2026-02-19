using Restaurant.BLL.Models;
using Restaurant.DAL.DTOs;
using System.Share.Models;

namespace Restaurant.BLL.IHelpers
{
    public interface IDishHelper : IBaseAsyncHelper<DishDTO>
    {
        // public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<Pagination<DishDTO>> GetByFilterAsync(DishFilterModel model);
        //public Task<bool> IsCodeExistsAsync(string code);
        //public string ExportExcelAsync();
    }
}
