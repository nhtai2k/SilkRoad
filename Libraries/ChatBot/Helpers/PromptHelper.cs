using ChatBot.IHelpers;
using ChatBot.IServices;
using ChatBot.Models;
using Common.Models;
using Newtonsoft.Json;

namespace ChatBot.Helpers
{
    public class PromptHelper : IPromptHelper
    {
        //private readonly string configFilePath = "./LocalData/beeConfig.json";
        //private List<PromptModel> _beeConfigs = new List<PromptModel>();
        private readonly IPromptService _promptService;
        public PromptHelper(IPromptService promptService)
        {
            _promptService = promptService;
            //using (StreamReader reader = new StreamReader(configFilePath))
            //{            //    string json = reader.ReadToEnd();
            //    _beeConfigs = JsonConvert.DeserializeObject<List<PromptModel>>(json);

            //}
        }

        //private async Task InitialDB()
        //{
        //    var getAll = await _promptService.GetAllAsync();
        //    // Fix: GetAllAsync returns IEnumerable<PromptModel>, so use .Any() to check for empty
        //    if (getAll == null || !getAll.Any())
        //    {
        //        foreach (var item in _beeConfigs)
        //        {
        //            // Fix: Use CreateAsync instead of AddAsync, matching IPromptService signature
        //            await _promptService.CreateAsync(item);
        //        }
        //    }
        //}

        public async Task<Pagination<PromptModel>> GetAllAsync(int pageIndex, int pageSize)
        {
            //await InitialDB();
            var allItems = await _promptService.GetAllAsync();
            var filteredItems = allItems.Where(x => x.GetType().GetProperty("IsDeleted") != null ? !(bool)x.GetType().GetProperty("IsDeleted")!.GetValue(x)! : true)
                                        .Where(x => x.GetType().GetProperty("ParentId") == null || x.GetType().GetProperty("ParentId")!.GetValue(x) == null)
                                        .ToList();
            int totalItems = filteredItems.Count;
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = filteredItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            // If you need to fetch children, you can add logic here
            return new Pagination<PromptModel>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<PromptModel?> GetByIdAsync(int id)
        {
            var item = await _promptService.GetByIdAsync(id);
            if (item != null && (item.GetType().GetProperty("IsDeleted") == null || !(bool)item.GetType().GetProperty("IsDeleted")!.GetValue(item)!))
            {
                return item;
            }
            return null;
        }

        public async Task<List<OptionModel>> GetOptionListAsync()
        {
            var allItems = await _promptService.GetAllAsync();
            var filteredItems = allItems.Where(x => x.GetType().GetProperty("IsDeleted") != null ? !(bool)x.GetType().GetProperty("IsDeleted")!.GetValue(x)! : true)
                                        .Where(x => x.GetType().GetProperty("ParentId") == null || x.GetType().GetProperty("ParentId")!.GetValue(x) == null)
                                        .ToList();
            return filteredItems.Select(x => new OptionModel
            {
                Id = x.Id,
                Name = x.Name
            }).ToList();
        }
        //public List<PromptModel> GetAll()
        //{
        //    return _beeConfigs;
        //}

        //public PromptModel? GetById(int id)
        //{
        //    return _beeConfigs.FirstOrDefault(x => x.Id == id);
        //}

        //public List<OptionModel> GetOptionList()
        //{
        //    return _beeConfigs.Select(x => new OptionModel
        //    {
        //        Id = x.Id,
        //        Name = x.Name
        //    }).ToList();
        //}
    }
}
