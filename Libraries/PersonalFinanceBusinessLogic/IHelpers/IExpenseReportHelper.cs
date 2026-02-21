using PersonalFinance.BLL.Models;

namespace PersonalFinance.BLL.IHelpers
{
    public interface IExpenseReportHelper
    {
        public Task<ICollection<ColoumnModel>> GetColoumnChartAsync(DateTime month, int userId);
        public Task<ICollection<ColoumnModel>> GetColoumnChartAsync(int year, int userId);
    }
}
