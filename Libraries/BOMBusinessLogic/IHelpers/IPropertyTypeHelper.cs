using BOMDataAccess.DTOs;
using Common.Models;

namespace BOMBusinessLogic.IBOMHelpers
{
    public interface IPropertyTypeHelper : IBaseAsyncHelper<PropertyTypeDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<bool> IsCodeExistsAsync(string code);

    }
}
