using Lipstick.ViewModels;
using Newtonsoft.Json;

namespace Lipstick._Convergence.Helpers
{
    public class ProvinceHelper
    {
        private const string webContentFilePath = @".\_Convergence\LocalData\Provinces.json";
        private List<ProvinceViewModel> _provinces = new List<ProvinceViewModel>();
        public ProvinceHelper()
        {
            using StreamReader reader = new(webContentFilePath);
            string json = reader.ReadToEnd();
            _provinces = JsonConvert.DeserializeObject<List<ProvinceViewModel>>(json);
        }
        public List<ProvinceViewModel> GetProvinces()
        {
            return _provinces;
        }
        //public List<DistrictViewModel> GetDistrictsByProvinceId(int provinceId)
        //{
        //    var province = _provinces.FirstOrDefault(p => p.Id == provinceId);
        //    if (province != null)
        //    {
        //        return province.Districts.ToList();
        //    }
        //    return new List<DistrictViewModel>();
        //}
    }
}
