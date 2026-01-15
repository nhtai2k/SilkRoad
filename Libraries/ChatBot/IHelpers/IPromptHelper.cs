using ChatBot.Models;
using Common.Models;

namespace ChatBot.IHelpers
{
    public interface IPromptHelper
    {
        public Task<PromptModel?> GetByIdAsync(int id);
        public Task<Pagination<PromptModel>> GetAllAsync(int pageIndex, int pageSize);
        public Task<List<OptionModel>> GetOptionListAsync();
    }
}
