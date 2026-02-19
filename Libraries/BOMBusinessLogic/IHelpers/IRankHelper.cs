using BOM.DAL.DTOs;
using System.Share.Models;

namespace BOM.BLL.IHelpers
{
    public interface IRankHelper : IBaseAsyncHelper<RankDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<bool> IsCodeExistsAsync(string code);

    }
}
