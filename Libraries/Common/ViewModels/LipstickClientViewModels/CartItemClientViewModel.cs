namespace System.Share.ViewModels.LipstickClientViewModels
{
    public class CartItemClientViewModel
    {
        public int ProductId { get; set; }
        public required string ProductName { get; set; }
        public double Price { get; set; }
        public double? SalePrice { get; set; }
        public bool SaleOff { get; set; }
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }
        public string? ImageUrl { get; set; }
    }
}
