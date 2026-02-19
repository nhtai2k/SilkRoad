using BOM.DAL.DTOs;
using System.Share.Models;

namespace BOM.BLL.IHelpers;

public interface IDepartmentHelper : IBaseAsyncHelper<DepartmentDTO>
{
    public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    public Task<bool> IsCodeExistsAsync(string code);

}
