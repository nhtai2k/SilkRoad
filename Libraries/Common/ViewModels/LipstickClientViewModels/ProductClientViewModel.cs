namespace System.Share.ViewModels.LipstickClientViewModels
{
    public class ProductClientViewModel
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public int BrandId { get; set; }
        public int SizeId { get; set; }
        public int ColorId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Details { get; set; }
        public List<string> Images { get; set; }
        public string? Avatar { get; set; }
        public string? BackgroundImage { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public int? DiscountPercent { get; set; }
        public DateTime? StartDiscountDate { get; set; }
        public DateTime? EndDiscountDate { get; set; }
        public bool SaleOff { get; set; }
        public bool IsFavorited { get; set; }
        public double? SalePrice { get; set; }
        public string? BrandName { get; set; }

    }
}
