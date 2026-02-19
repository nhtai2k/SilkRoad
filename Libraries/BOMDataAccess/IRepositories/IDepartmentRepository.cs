using BOM.DAL.DTOs;

namespace BOM.DAL.IRepositories;

public interface IDepartmentRepository : IGenericRepository<DepartmentDTO>
{
    public Task<bool> IsCodeExistsAsync(string code);
}
