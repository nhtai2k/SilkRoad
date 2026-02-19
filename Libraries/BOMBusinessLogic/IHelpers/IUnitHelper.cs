using BOM.DAL.DTOs;
using System.Share.Models;

namespace BOM.BLL.IHelpers
{
    public interface IUnitHelper : IBaseAsyncHelper<UnitDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<IEnumerable<OptionModel>> GetTreeOptionListAsync();
        public Task<bool> IsSymbolExistsAsync(string name);
    }
}
