using PersonalFinance.BLL.Models;

namespace PersonalFinance.BLL.IHelpers
{
    public interface IExpenseReportHelper
    {
        public Task<ICollection<ColoumnModel>> GetColoumnChartByMonth(DateTime month, int userId);
        public Task<ICollection<ColoumnModel>> GetColoumnChartByMonth(int year, int userId);
    }
}
