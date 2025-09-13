using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockDataAccess.DTOs
{
    public class IndustryDTO : BaseDTO
    {
        public int Id { get; set; }
        public int Priority { get; set; }
        public required string Name { get; set; }
    }
}
