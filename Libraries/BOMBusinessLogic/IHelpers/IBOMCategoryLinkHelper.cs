using BOMDataAccess.DTOs;

namespace BOMBusinessLogic.IBOMHelpers
{
    public interface IBOMCategoryLinkHelper
    {
        public Task<ICollection<BOMMaterialLinkDTO>> GetMaterialListByBomCategoryIdAsync(Guid bomCategoryId);
        public Task<bool> AddMaterialAsync(BOMMaterialLinkDTO model);
        public Task<ICollection<BOMPropertyLinkDTO>> GetPropertyListByBomCategoryIdAsync(Guid bomCategoryId);
        public Task<bool> AddPropertyAsync(BOMPropertyLinkDTO model);
        public Task<bool> DeleteMaterialByIdAsync(Guid id);
        public Task<bool> DeletePropertyByIdAsync(Guid id);
    }
}
