using BOM.DAL.DTOs;
using System.Share.Models;

namespace BOM.BLL.IHelpers
{
    public interface IBOMConfigurationHelper : IBaseAsyncHelper<BOMConfigurationDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
