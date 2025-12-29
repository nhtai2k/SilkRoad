using BOMDataAccess.DTOs;

namespace BOMDataAccess.IRepositories;

public interface IDepartmentRepository : IGenericRepository<DepartmentDTO>
{
    public Task<bool> IsCodeExistsAsync(string code);
}
