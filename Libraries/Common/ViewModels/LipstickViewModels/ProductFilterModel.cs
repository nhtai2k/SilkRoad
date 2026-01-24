namespace System.Share.ViewModels.LipstickViewModels
{
    public class ProductFilterModel
    {
        public string? NameVN { get; set; }
        public string? NameEN { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public int BrandId { get; set; }
        public int SizeId { get; set; }
        public int ColorId { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
    }
}
