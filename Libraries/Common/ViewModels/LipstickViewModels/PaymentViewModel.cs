using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;

namespace Common.ViewModels.LipstickViewModels
{
    public class PaymentViewModel
    {
        public Guid Id { get; set; }
        public int PaymentTypeId { get; set; }
        public int StatusId { get; set; }
        public double Amount { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string? SepayObject { get; set; }
        public SepayModel? SepayModel { get; set; }
    }
}
