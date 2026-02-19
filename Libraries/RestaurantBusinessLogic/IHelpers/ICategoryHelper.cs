using Restaurant.DAL.DTOs;
using System.Share.Models;

namespace Restaurant.BLL.IHelpers
{
    public interface ICategoryHelper : IBaseAsyncHelper<CategoryDTO>
    {
        public Task<CategoryDTO?> GetEagerByIdAsync(int Id);
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<IEnumerable<OptionModel>> GetTreeOptionListAsync();
        //public Task<bool> IsCodeExistsAsync(string code);
    }
}
