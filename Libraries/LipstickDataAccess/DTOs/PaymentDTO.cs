using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LipstickDataAccess.DTOs
{
    public class PaymentDTO
    {
        public Guid Id { get; set; }
        public int PaymentTypeId { get; set; }
        public int StatusId { get; set; }
        public double Amount { get; set; }
        public string? SepayObject { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string? CreatedBy { get; set; }
        public string? ModifiedBy { get; set; }
        public PaymentDTO()
        {
            CreatedOn = DateTime.Now;
            ModifiedOn = DateTime.Now;
            CreatedBy = "System";
        }
    }
}
