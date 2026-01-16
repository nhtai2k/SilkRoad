using Common.Models;
using PersonalFinanceDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceBusinessLogic.IHelpers
{
    public interface IResourceTypeHelper : IBaseAsyncHelper<ResourceTypeDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
