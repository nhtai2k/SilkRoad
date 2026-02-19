using ChatBot.Models;

namespace ChatBot.IServices
{
    public interface IPromptService
    {
        Task<IEnumerable<PromptModel>> GetAllAsync();
        Task<PromptModel> GetByIdAsync(int Id);
        Task CreateAsync(PromptModel entity);
        Task UpdateAsync(PromptModel entity);
        Task DeleteAsync(int Id);
    }
}
