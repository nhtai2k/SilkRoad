using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockDataAccess.DTOs
{
    public class StockPriceDTO
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public long Date { get; set; }
        public double Open { get; set; }
        public double High { get; set; }
        public double Low { get; set; }
        public double Close { get; set; }
        public double Volume { get; set; }
        public CompanyDTO? Company { get; set; }
    }
}
