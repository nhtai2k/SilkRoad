using PersonalFinance.BLL.Models;

namespace PersonalFinance.BLL.IHelpers
{
    public interface IAssetReportHelper
    {
        public Task<ICollection<ColoumnModel>> GetColoumnChartAsync(int userId);
        public Task<ICollection<PieModel>> GetPieChartAsync(int userId);

    }
}
