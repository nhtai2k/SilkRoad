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
        public async Task<ICollection<ResourceMonthReportModel>> GetClusteredColumnChartAsync(int year, int userId)
        {

            int months = 12;
            DateTime dateTime = DateTime.Now;
            List<ResourceMonthReportModel> coloumns = new List<ResourceMonthReportModel>();
            List<string> labels = new List<string>() { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
            if(year == dateTime.Year)
            {
                months = dateTime.Month;
            }
            //Render months
            for (int month = 1; month <= months; month++)
            {
                decimal inflow = 0;
                decimal outflow = 0;
                DateTime start = new DateTime(year, month, 1);
                //int daysInMonth = DateTime.DaysInMonth(start.Year, start.Month);
                DateTime end = start.AddMonths(1);
                // data
                var data = await _unitOfWork.ResourceRepository.Query(s => s.Date >= start && s.Date < end && s.UserId == userId).AsNoTracking().ToListAsync();
                if (data != null && data.Count > 0)
                {
                    inflow = data.Where(s => s.Inflow).Sum(s => s.Amount);
                    outflow = data.Where(s => !s.Inflow).Sum(s => s.Amount);
                }
                
                ResourceMonthReportModel coloumn = new ResourceMonthReportModel()
                {
                    Month = labels[month - 1],
                    Inflow = inflow,
                    Outflow = outflow,
                    NetIncome = inflow - outflow
                };
                coloumns.Add(coloumn);
            }
            return coloumns;
        }
    }
}
