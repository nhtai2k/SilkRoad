using ChatBot.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
