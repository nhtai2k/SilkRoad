using PersonalFinance.DAL.DTOs;
using System.Share.Models;

namespace PersonalFinance.BLL.IHelpers
{
    public interface IAssetTypeHelper : IBaseAsyncHelper<AssetTypeDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
