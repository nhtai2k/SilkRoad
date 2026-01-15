using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceBusinessLogic.Models
{
    public class OverviewReportModel
    {
        //Show total expense of this month  
        public decimal TotalExpenseThisMonth { get; set; }
        //Show total expense of previous month
        public decimal TotalExpensePreviousMonth { get; set; }
        
    }
}
