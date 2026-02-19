using BOM.DAL.DTOs;
using System.Share.Models;
using System.Share.Models.BOMModels;

namespace BOM.BLL.IHelpers
{
    public interface IMaterialHelper : IBaseAsyncHelper<MaterialDTO>
    {
        public Task<Pagination<MaterialDTO>> GetByFilterAsync(MaterialFilterModel model);
        public Task<IEnumerable<OptionModel>> GetByMaterialGroupIdAsync(int materialGroupId);
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
