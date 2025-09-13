namespace Lipstick.ViewModels
{
    public class ProvinceViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<DistrictViewModel> Districts { get; set; }
        public ProvinceViewModel()
        {
            Name = string.Empty;
            Districts = new List<DistrictViewModel>();
        }
    }
}
