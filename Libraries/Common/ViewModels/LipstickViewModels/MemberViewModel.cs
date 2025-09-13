namespace Common.ViewModels.LipstickViewModels
{
    public class MemberViewModel
    {
        public int Id { get; set; }

        public byte GenderId { get; set; }

        public int ProvinceId { get; set; }

        public int DistrictId { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public string FullName { get; set; }

        public DateTime Birthday { get; set; }

        public DateTime CreatedOn { get; set; }

        public bool IsActive { get; set; }
    }
}
