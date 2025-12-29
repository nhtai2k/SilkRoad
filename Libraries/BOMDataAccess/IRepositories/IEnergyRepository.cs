using BOMDataAccess.DTOs;
using BOMDataAccess.QureyModels;

namespace BOMDataAccess.IRepositories
{
    public interface IEnergyRepository : IGenericRepository<EnergyDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
        public Task<ICollection<EnergyQueryModel>> ExportDataAsync();
    }
}
