using BOM.DAL.DTOs;
using System.Share.Models;
using System.Share.Models.BOMModels;

namespace BOM.BLL.IHelpers
{
    public interface IPropertyHelper : IBaseAsyncHelper<PropertyDTO>
    {
        public Task<Pagination<PropertyDTO>> GetByFilterAsync(PropertyFilterModel model);
        //public Task<IEnumerable<PropertyDTO>> GetByPropertyTypeIdAsync(int propertyTypeId);
        public Task<bool> IsCodeExistsAsync(string code);

    }
}
