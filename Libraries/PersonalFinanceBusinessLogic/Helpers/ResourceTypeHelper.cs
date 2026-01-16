using Common.Models;
using PersonalFinanceBusinessLogic.IHelpers;
using PersonalFinanceDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceBusinessLogic.Helpers
{
    public class ResourceTypeHelper : IResourceTypeHelper
    {
        public Task<bool> CreateAsync(ResourceTypeDTO model, string? userName = null)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Pagination<ResourceTypeDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<Pagination<ResourceTypeDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<ResourceTypeDTO?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OptionModel>> GetOptionListAsync()
        {
            throw new NotImplementedException();
        }

        public Task<bool> RestoreAsync(int id, string? userName = null)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SoftDeleteAsync(int id, string? userName = null)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(ResourceTypeDTO model, string? userName = null)
        {
            throw new NotImplementedException();
        }
    }
}
