using Common.Models;
using SurveyBusinessLogic.IHelpers;
using SurveyDataAccess;
using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.Helpers
{
    public class QuestionGroupLibraryHelper : IQuestionGroupLibraryHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public QuestionGroupLibraryHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Pagination<QuestionGroupLibraryDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.QuestionGroupLibraryRepository.GetAllAsync(x => !x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<QuestionGroupLibraryDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<Pagination<QuestionGroupLibraryDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.QuestionGroupLibraryRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<QuestionGroupLibraryDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<bool> CreateAsync(QuestionGroupLibraryDTO model, string? userName = null)
        {
            try
            {
                model.Create(userName);
                model.NameEN = model.NameEN.Trim();
                model.NameVN = model.NameVN.Trim();
                model.Note = model.Note?.Trim();
                await _unitOfWork.QuestionGroupLibraryRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(QuestionGroupLibraryDTO model, string? userName = null)
        {
            try
            {
                var data = await _unitOfWork.QuestionGroupLibraryRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.Update(userName);
                data.NameEN = model.NameEN.Trim();
                data.NameVN = model.NameVN.Trim();
                data.Note = model.Note?.Trim();
                data.IsActive = model.IsActive;
                data.Priority = model.Priority;
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
            var entity = await _unitOfWork.QuestionGroupLibraryRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? userName = null)
        {
            var entity = await _unitOfWork.QuestionGroupLibraryRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.QuestionGroupLibraryRepository.DeleteAsync(id);
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

        public async Task<QuestionGroupLibraryDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.QuestionGroupLibraryRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<OptionModel>> GetOptionListAsync()
        {
            return (await _unitOfWork.QuestionGroupLibraryRepository.GetAllAsync(x => !x.IsDeleted && x.IsActive)).Select(x => new OptionModel
            {
                Id = x.Id,
                Name = x.NameVN
            });
        }

        public async Task<IEnumerable<OptionModel>> GetTreeOptionListAsync()
        {
            var data = await _unitOfWork.QuestionGroupLibraryRepository.GetEagerLoadingAsync();
            
            return data
                .Where(x => x.QuestionLibraries != null && x.QuestionLibraries.Any()) // Safe null check
                .Select(x => new OptionModel
                {
                    Id = x.Id,
                    Name = x.NameVN,
                    Children = x.QuestionLibraries!
                        .Where(q => !q.IsDeleted && q.IsActive) // Filter active question libraries
                        .Select(q => new OptionModel
                        {
                            Id = q.Id,
                            Name = q.NameVN
                        }).ToList()
                });
        }
    }
}
