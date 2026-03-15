using Newtonsoft.Json;
using System.BLL.IHelpers.ISystemHelpers;
using System.Share.Models;

namespace System.BLL.Helpers.SystemHelpers
{
    public class NavigationHelper : INavigationHelper
    {
        private ICollection<NavigationModel>? _data;
        private const string webConfigurationPath = @".\LocalData\NavItems.json";
        public NavigationHelper()
        {
            using (StreamReader reader = new StreamReader(webConfigurationPath))
            {
                string json = reader.ReadToEnd();
                _data = JsonConvert.DeserializeObject<List<NavigationModel>>(json);
                _data = _data?.OrderBy(x => x.Priority).ToList();
            }
        }

        public ICollection<NavigationModel>? GetAll()
        {
            return _data;
        }

        public NavigationModel? GetByName(string name)
        {
            return _data?.FirstOrDefault(x => x.Name == name);
        }

        public bool Update(NavigationModel model)
        {
            var data = _data?.FirstOrDefault(x => x.Name == model.Name);
            if (data != null)
            {
                data.Priority = model.Priority;
                string json = JsonConvert.SerializeObject(_data, Formatting.Indented);
                File.WriteAllText(webConfigurationPath, json);
                return true;
            }
            return false;
        }
    }
}
