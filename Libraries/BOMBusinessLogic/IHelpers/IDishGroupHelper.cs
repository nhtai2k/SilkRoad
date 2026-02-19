using BOM.DAL.DTOs;
using System.Share.Models;

namespace BOM.BLL.IHelpers
{
    public interface IDishGroupHelper : IBaseAsyncHelper<DishGroupDTO>
    {
        public Task<DishGroupDTO?> GetEagerByIdAsync(int Id);
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<bool> IsCodeExistsAsync(string code);


    }
}
