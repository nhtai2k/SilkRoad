using BOM.DAL.DTOs;
using BOM.DAL.QureyModels;

namespace BOM.DAL.IRepositories
{
    public interface IEnergyRepository : IGenericRepository<EnergyDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
        public Task<ICollection<EnergyQueryModel>> ExportDataAsync();
    }
}
