namespace Lipstick.DAL.DTOs
{
    public class OrderDetailDTO
    {
        public Guid Id { get; set; }
        public Guid OrderId { get; set; }
        public int ProductId { get; set; }
        public string NameEN { get; set; }
        public string NameVN { get; set; }
        public string Avatar { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public bool SaleOff { get; set; }
        public int? DiscountPercent { get; set; }
        public double? SalePrice { get; set; }
        public bool IsDeleted { get; set; } = false;
        public OrderDTO Order { get; set; }
        //public ProductDTO Product { get; set; }
    }
}
