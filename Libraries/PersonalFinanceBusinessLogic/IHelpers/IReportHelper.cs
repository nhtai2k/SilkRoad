using PersonalFinanceBusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceBusinessLogic.IHelpers
{
    public interface IReportHelper
    {
        public Task<ICollection<ColoumnModel>> GetColoumnChartByMonth(string month, int userId);
    }
}
