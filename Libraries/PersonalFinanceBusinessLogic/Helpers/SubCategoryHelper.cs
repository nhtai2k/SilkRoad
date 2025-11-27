using Common.Models;
using PersonalFinanceBusinessLogic.IHelpers;
using PersonalFinanceDataAccess;
using PersonalFinanceDataAccess.DTOs;

namespace PersonalFinanceBusinessLogic.Helpers
{
    public class SubCategoryHelper : ISubCategoryHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public SubCategoryHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public Task<bool> CreateAsync(SubCategoryDTO model, string? userName = null)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Pagination<SubCategoryDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<Pagination<SubCategoryDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<SubCategoryDTO?> GetByIdAsync(int id)
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

        public Task<bool> UpdateAsync(SubCategoryDTO model, string? userName = null)
        {
            throw new NotImplementedException();
        }
    }
}
