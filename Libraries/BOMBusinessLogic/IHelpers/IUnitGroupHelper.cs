using BOM.DAL.DTOs;
using System.Share.Models;

namespace BOM.BLL.IHelpers
{
    public interface IUnitGroupHelper : IBaseAsyncHelper<UnitGroupDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        //public Task<IEnumerable<OptionModel>> GetTreeOptionListAsync();
        public Task<bool> IsNameExistsAsync(string name);
    }
}
