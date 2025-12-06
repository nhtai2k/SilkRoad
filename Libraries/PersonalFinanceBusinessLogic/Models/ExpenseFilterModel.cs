using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceBusinessLogic.Helpers
{
    public class ExpenseFilterModel
    {
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public int UserId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public int? CategoryId { get; set; }
        public int? SubCategoryId { get; set; }
        public string? SearchText { get; set; }
    }
}
