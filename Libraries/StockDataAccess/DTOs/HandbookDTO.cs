using System;
using System.Collections.Generic;
using System.Text;

namespace StockDataAccess.DTOs
{
    public class HandbookDTO : BaseDTO
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
    }
}
