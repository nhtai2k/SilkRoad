using Common.Models;
using Common;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Lipstick._Convergence.Helpers
{
    public class WebContentHelper
    {
        private const string webContentFilePath = @".\_Convergence\LocalData\WebContent.json";
        private  List<WebContentModel> webContents = new List<WebContentModel>();
        public WebContentHelper()
        {
            using StreamReader reader = new(webContentFilePath);
            string json = reader.ReadToEnd();
            webContents = JsonConvert.DeserializeObject<List<WebContentModel>>(json);
        }
        public  string GetWebContentValueByKey(Enum key, string language)
        {
            WebContentModel data = webContents.FirstOrDefault(s => string.Equals(s.Key, key.ToString()));
            if (data == null)
            {
                return "";
            }
            return language == ELanguages.EN.ToString() ? data.EN : data.VN;
        }
        //public  void UpdateUIVOCPageContent(WebContentModel model)
        //{
        //    WebContentModel data = webContents.FirstOrDefault(s => string.Equals(s.Key, model.Key));
        //    if (data == null)
        //    {
        //        return;
        //    }
        //    data.EN = data.EN;
        //    data.VN = data.VN;
        //    string json = JsonConvert.SerializeObject(webContents);
        //    File.WriteAllText(webContentFilePath, json);
        //}
       
    }
}
