using Microsoft.EntityFrameworkCore;
using PersonalFinanceBusinessLogic.IHelpers;
using PersonalFinanceBusinessLogic.Models;
using PersonalFinanceDataAccess;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceBusinessLogic.Helpers
{
    public class AssetReportHelper : IAssetReportHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public AssetReportHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Get total value of assets by category
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<ICollection<ColoumnModel>> GetColoumnChartAsync(int userId)
        {
            var coloumnModels = await _unitOfWork.AssetRepository
                .Query(a => a.UserId == userId, includeProperties: "AssetType")
                .AsNoTracking()
                .Where(a => a.AssetType != null)
                .GroupBy(a => new { a.TypeId, a.AssetType!.Name })
                .Select(g => new ColoumnModel
                {
                    Category = g.Key.Name,
                    Value = (double)g.Sum(a => a.Amount)
                })
                .ToListAsync();

            return coloumnModels;
        }

        /// <summary>
        /// Debt-to-equity ratio
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<ICollection<PieModel>> GetPieChartAsync(int userId)
        {
            var assetsSummary = await _unitOfWork.AssetRepository
                .Query(a => a.UserId == userId)
                .AsNoTracking()
                .GroupBy(a => 1)
                .Select(g => new
                {
                    TotalAssets = g.Sum(a => a.Amount),
                    TotalLoan = g.Where(a => a.HasLoan).Sum(a => a.LoanAmount ?? 0)
                })
                .FirstOrDefaultAsync();

            var pies = new List<PieModel>(2);

            if (assetsSummary == null || assetsSummary.TotalAssets <= 0)
            {
                return pies;
            }

            double debtPercentage = (double)((assetsSummary.TotalLoan / assetsSummary.TotalAssets) * 100);
            double realAssetsPercentage = 100 - debtPercentage;

            pies.Add(new PieModel
            {
                Category = "Debt",
                Value = Math.Round(debtPercentage, 2)
            });
            pies.Add(new PieModel
            {
                Category = "Real Assets",
                Value = Math.Round(realAssetsPercentage, 2)
            });

            return pies;
        }
    }
}
