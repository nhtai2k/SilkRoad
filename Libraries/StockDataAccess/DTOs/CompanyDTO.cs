using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockDataAccess.DTOs
{
    public class CompanyDTO : BaseDTO
    {
        public int Id { get; set; }
        public int? IndustryId { get; set; }
        public required string Symbol { get; set; }
        public required string Name { get; set; }
        public required DateTime IPODate { get; set; }
        public ICollection<StockPriceDTO>? StockHistories { get; set; }
    }
}
