using System.ComponentModel.DataAnnotations;

namespace System.Share.ViewModels.LipstickViewModels
{
    public class SubCategoryViewModel
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public required string NameEN { get; set; }
        public required string NameVN { get; set; }
        public string? Note { get; set; }
        [Range(1, 9999)]
        public int Priority { get; set; }
        public bool InNavbar { get; set; }
        public bool IsActive { get; set; }
        public SubCategoryViewModel()
        {
            IsActive = true;
        }

    }
}
