using PersonalFinanceBusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceBusinessLogic.IHelpers
{
    public interface IAssetReportHelper
    {
        public Task<ICollection<ColoumnModel>> GetColoumnChartAsync(int userId);
        public Task<ICollection<PieModel>> GetPieChartAsync(int userId);

    }
}
