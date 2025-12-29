using BOMDataAccess.DTOs;
using Common.Models;
using Common.Models.BOMModels;

namespace BOMBusinessLogic.IBOMHelpers
{
    public interface IPropertyHelper : IBaseAsyncHelper<PropertyDTO>
    {
        public Task<Pagination<PropertyDTO>> GetByFilterAsync(PropertyFilterModel model);
        //public Task<IEnumerable<PropertyDTO>> GetByPropertyTypeIdAsync(int propertyTypeId);
        public Task<bool> IsCodeExistsAsync(string code);

    }
}
