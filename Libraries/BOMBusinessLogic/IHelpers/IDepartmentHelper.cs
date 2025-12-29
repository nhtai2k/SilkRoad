using BOMDataAccess.DTOs;
using Common.Models;

namespace BOMBusinessLogic.IBOMHelpers;

public interface IDepartmentHelper : IBaseAsyncHelper<DepartmentDTO>
{
    public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    public Task<bool> IsCodeExistsAsync(string code);

}
