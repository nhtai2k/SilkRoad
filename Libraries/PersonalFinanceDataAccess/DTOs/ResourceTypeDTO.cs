
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceDataAccess.DTOs
{
    public class ResourceTypeDTO
    {
        public int Id { get; set; }
        public int Priority { get; set; }
        public required string Name { get; set; }
    }
}
