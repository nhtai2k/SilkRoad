using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberDataAccess.DTOs
{
    public class GenderDTO
    {
        public int Id { get; set; }
        public required string NameEN { get; set; }
        public required string NameVN { get; set; }

    }
}
