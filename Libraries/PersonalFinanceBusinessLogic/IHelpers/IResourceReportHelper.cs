using PersonalFinance.BLL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinance.BLL.IHelpers
{
    public interface IResourceReportHelper
    {
        public Task<ICollection<ColoumnModel>> GetColoumnChartByMonth(int year, int userId);

    }
}
