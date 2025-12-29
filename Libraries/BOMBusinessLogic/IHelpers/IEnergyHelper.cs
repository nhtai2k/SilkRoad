using BOMDataAccess.DTOs;
using Common.Models;

namespace BOMBusinessLogic.IBOMHelpers
{
    public interface IEnergyHelper : IBaseAsyncHelper<EnergyDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<bool> IsCodeExistsAsync(string code);
        public string ExportExcelAsync();
    }
}
