using Microsoft.EntityFrameworkCore;
using PersonalFinance.BLL.IHelpers;
using PersonalFinance.BLL.Models;
using PersonalFinance.DAL;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinance.BLL.Helpers
{
    public class ResourceReportHelper : IResourceReportHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public ResourceReportHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<ICollection<ColoumnModel>> GetColoumnChartByMonth(int year, int userId)
        {
            List<ColoumnModel> coloumns = new List<ColoumnModel>();
            List<string> labels = new List<string>() { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
            //Render months
            for (int month = 1; month <= 12; month++)
            {
                DateTime start = new DateTime(year, month, 1);
                //int daysInMonth = DateTime.DaysInMonth(start.Year, start.Month);
                DateTime end = start.AddMonths(1);
                // data
                var data = await _unitOfWork.ResourceRepository.Query(s => s.Date >= start && s.Date < end && s.UserId == userId).AsNoTracking().ToListAsync();
                if (data == null || data.Count == 0)
                {
                    ColoumnModel coloumnEmpty = new ColoumnModel()
                    {
                        Category = labels[month - 1],
                        Value = 0
                    };
                    coloumns.Add(coloumnEmpty);
                    continue;
                }
                var temp2 = data.Where(s => s.Inflow).ToList();
                double sumAmount = (double)data.Sum(s => s.Amount);
                ColoumnModel coloumn = new ColoumnModel()
                {
                    Category = labels[month - 1],
                    Value = sumAmount
                };
                coloumns.Add(coloumn);
            }
            return coloumns;
        }
    }
}
