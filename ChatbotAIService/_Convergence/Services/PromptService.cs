using ChatbotAIService.Models;
using Newtonsoft.Json;

namespace ChatbotAIService._Convergence.Services
{
    public class PromptService
    {
        private readonly string configFilePath = "./_Convergence/Services/beeConfig.json";
        private List<BeeConfigModel> _beeConfigs = new List<BeeConfigModel>();
        public PromptService()
        {
            using (StreamReader reader = new StreamReader(configFilePath))
            {
                string json = reader.ReadToEnd();
                _beeConfigs = JsonConvert.DeserializeObject<List<BeeConfigModel>>(json);
               
            }
        }

        public BeeConfigModel? GetBeeConfig(int id)
        {
            return _beeConfigs.FirstOrDefault(x => x.Id == id) ?? new BeeConfigModel();
        }
        public List<BeeConfigModel> GetAllBeeConfigs()
        {
            return _beeConfigs;
        }
    }
}
