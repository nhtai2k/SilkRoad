using System.ComponentModel.DataAnnotations;

namespace Common.ViewModels.LipstickClientViewModels
{
    public class OrderClientViewModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [Range(1, 2)]
        public int PaymentMethodId { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        [Required]
        public string ShippingAddress { get; set; }
        [Range(1,63)]
        public int ProvinceId { get; set; }
        [Range(1, 999)]
        public int DistrictId { get; set; }
        public int StatusId { get; set; }
        public DateTime? ShippingDate { get; set; }
        public DateTime? ReceiveDate { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedOn { get; set; }
        public CartClientViewModel Cart { get; set; }
        public OrderClientViewModel()
        {
            FullName = string.Empty;
            PhoneNumber = string.Empty;
            Email = string.Empty;
            ShippingAddress = string.Empty;
            ProvinceId = -1;
            DistrictId = -1;
            PaymentMethodId = -1;
            Cart = new CartClientViewModel();
            CreatedOn = DateTime.Now;
        }
    }
}