using Microsoft.EntityFrameworkCore;
using PersonalFinanceBusinessLogic.IHelpers;
using PersonalFinanceBusinessLogic.Models;
using PersonalFinanceDataAccess;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace PersonalFinanceBusinessLogic.Helpers
{
    public class ReportHelper : IReportHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public ReportHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<ICollection<ColoumnModel>> GetColoumnChartByMonth(DateTime month, int userId)
        {
            List<ColoumnModel> coloumns = new List<ColoumnModel>();
            //Reset month to first day
            DateTime start = new DateTime(month.Year, month.Month, 1);
            int daysInMonth = DateTime.DaysInMonth(start.Year, start.Month);
            DateTime end = start.AddMonths(1);
            // data
            var data = await _unitOfWork.ExpenseRepository.Query(s => s.Date >= start && s.Date < end && s.UserId == userId).AsNoTracking().ToListAsync();
            if(data == null || data.Count == 0)
            {
                return coloumns;
            }
            for (int i = 1; i <= daysInMonth; i++)
            {
                DateTime dateTime = new DateTime(start.Year, start.Month, i);
                var temp = data.Where(s => s.Date.Date == dateTime.Date).ToList();
                var temp2 = temp.Where(s => s.HasRefund).ToList();
                double sumAmount = (double)temp.Sum(s => s.Amount) - (double)temp2.Sum(s => s.RefundAmount ?? 0);
                ColoumnModel coloumn = new ColoumnModel()
                { 
                    Category = dateTime.ToString("dd/MM/yyyy"), 
                    Value = sumAmount 
                };

                coloumns.Add(coloumn);
            }

            return coloumns;
        }

        public async Task<ICollection<ColoumnModel>> GetColoumnChartByMonth(int year, int userId)
        {
            List<ColoumnModel> coloumns = new List<ColoumnModel>();
            List<string> labels = new List<string>() { "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"};
            //Render months
            for (int month = 1; month <= 12; month++)
            {
                DateTime start = new DateTime(year, month, 1);
                //int daysInMonth = DateTime.DaysInMonth(start.Year, start.Month);
                DateTime end = start.AddMonths(1);
                // data
                var data = await _unitOfWork.ExpenseRepository.Query(s => s.Date >= start && s.Date < end && s.UserId == userId).AsNoTracking().ToListAsync();
                if (data == null || data.Count == 0)
                {
                    ColoumnModel coloumnEmpty = new ColoumnModel()
                    {
                        Category = labels[month-1],
                        Value = 0
                    };
                    coloumns.Add(coloumnEmpty);
                    continue;
                }
                var temp2 = data.Where(s => s.HasRefund).ToList();
                double sumAmount = (double)data.Sum(s => s.Amount) - (double)temp2.Sum(s => s.RefundAmount ?? 0);
                ColoumnModel coloumn = new ColoumnModel()
                {
                    Category = labels[month-1],
                    Value = sumAmount
                };
                coloumns.Add(coloumn);
            }
            return coloumns;
        }
    }
}
