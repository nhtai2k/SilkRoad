using PersonalFinanceBusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceBusinessLogic.IHelpers
{
    public interface IReportHelper
    {
        public Task<ICollection<ColoumnModel>> GetColoumnChartByMonth(DateTime month, int userId);
        public Task<ICollection<ColoumnModel>> GetColoumnChartByMonth(int year, int userId);
    }
}
