namespace System.Share.ViewModels.LipstickViewModels
{
    public class OrderViewModel
    {
        public Guid Id { get; set; }
        public int UserId { get; set; }
        public int PaymentMethodId { get; set; }
        public int OrderStatusId { get; set; }
        public int PaymentStatusId { get; set; }
        public required string FullName { get; set; }
        public required string PhoneNumber { get; set; }
        public string? Email { get; set; }
        public required string ShippingAddress { get; set; }
        public int ProvinceId { get; set; }
        public int DistrictId { get; set; }
        public DateTime? ShippingDate { get; set; }
        public DateTime? ReceiveDate { get; set; }
        public string? Note { get; set; }
        public double Amount { get; set; }
        public int TotalQuantity { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string? CreatedBy { get; set; }
        public string? ModifiedBy { get; set; }
        public List<OrderDetailViewModel> OrderDetails { get; set; }
        public OrderViewModel()
        {
            FullName = string.Empty;
            PhoneNumber = string.Empty;
            Email = string.Empty;
            ShippingAddress = string.Empty;
            OrderDetails = new List<OrderDetailViewModel>();
        }
    }
}
