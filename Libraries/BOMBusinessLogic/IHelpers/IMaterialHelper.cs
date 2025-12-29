using BOMDataAccess.DTOs;
using Common.Models;
using Common.Models.BOMModels;

namespace BOMBusinessLogic.IBOMHelpers
{
    public interface IMaterialHelper : IBaseAsyncHelper<MaterialDTO>
    {
        public Task<Pagination<MaterialDTO>> GetByFilterAsync(MaterialFilterModel model);
        public Task<IEnumerable<OptionModel>> GetByMaterialGroupIdAsync(int materialGroupId);
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
