using BOM.BLL.IHelpers;
using BOM.DAL.DTOs;

namespace BOM.BLL.Helpers
{
    public class BOMCategoryLinkHelper : IBOMCategoryLinkHelper
    {
        public Task<bool> AddMaterialAsync(BOMMaterialLinkDTO model)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AddPropertyAsync(BOMPropertyLinkDTO model)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteMaterialByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeletePropertyByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<BOMMaterialLinkDTO>> GetMaterialListByBomCategoryIdAsync(Guid bomCategoryId)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<BOMPropertyLinkDTO>> GetPropertyListByBomCategoryIdAsync(Guid bomCategoryId)
        {
            throw new NotImplementedException();
        }
    }
}
