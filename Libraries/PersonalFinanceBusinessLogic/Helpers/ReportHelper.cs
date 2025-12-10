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
        public async Task<ICollection<ColoumnModel>> GetColoumnChartByMonth(string month, int userId)
        {
            List<ColoumnModel> coloumns = new List<ColoumnModel>();
            //time 
            DateTime start = DateTime.ParseExact(month, "yyyy-MM", CultureInfo.InvariantCulture);
            int daysInMonth = DateTime.DaysInMonth(start.Year, start.Month);
            DateTime end = new DateTime(start.Year, start.Month, daysInMonth);
            // data
            var data = await _unitOfWork.ExpenseRepository.Query(s => s.Date >= start && s.Date < end && s.UserId == userId).AsNoTracking().ToListAsync();

            for (int i = 1; i <= daysInMonth; i++)
            {
                DateTime dateTime = new DateTime(start.Year, start.Month, i);
                var temp = data.Where(s => s.Date.ToString("dd/MM/yyyy") == dateTime.ToString("dd/MM/yyyy")).ToList();
                double sumAmount = temp.Sum(s => s.Amount);
                ColoumnModel coloumn = new ColoumnModel()
                { 
                    Category = dateTime.ToString("dd/MM/yyyy"), 
                    Value = sumAmount 
                };

                coloumns.Add(coloumn);
            }

            return coloumns;
        }
    }
}
