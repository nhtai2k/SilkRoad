using Common.Models;
using SurveyBusinessLogic.IHelpers;
using SurveyDataAccess;
using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.Helpers
{
    public class QuestionLibraryHelper : IQuestionLibraryHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public QuestionLibraryHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Pagination<QuestionLibraryDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.QuestionLibraryRepository.GetAllAsync(x => !x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<QuestionLibraryDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<Pagination<QuestionLibraryDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.QuestionLibraryRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<QuestionLibraryDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<QuestionLibraryDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.QuestionLibraryRepository.GetByIdAsync(id);
        }

        public async Task<bool> CreateAsync(QuestionLibraryDTO model, string? userName = null)
        {
            try
            {
                model.CreatedBy = userName;
                model.ModifiedBy = userName;
                model.NameEN = model.NameEN.Trim();
                model.NameVN = model.NameVN.Trim();
                model.Note = model.Note?.Trim();
                await _unitOfWork.QuestionLibraryRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(QuestionLibraryDTO model, string? userName = null)
        {
            try
            {
                var data = await _unitOfWork.QuestionLibraryRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.ModifiedBy = userName;
                data.IsActive = model.IsActive;
                data.NameEN = model.NameEN.Trim();
                data.NameVN = model.NameVN.Trim();
                data.Note = model.Note?.Trim();
                data.QuestionGroupLibraryId = model.QuestionGroupLibraryId;
                data.QuestionTypeId = model.QuestionTypeId;
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> SoftDeleteAsync(int id, string? userName = null)
        {
            var entity = await _unitOfWork.QuestionLibraryRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.IsDeleted = true;
            entity.ModifiedBy = userName;
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? userName = null)
        {
            var entity = await _unitOfWork.QuestionLibraryRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.IsDeleted = false;
            entity.ModifiedBy = userName;
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.QuestionLibraryRepository.DeleteAsync(id);
                if (deleteResult)
                {
                    await _unitOfWork.SaveChangesAsync();
                }
                return deleteResult;
            }
            catch
            {
                return false;
            }
        }
    }
}
