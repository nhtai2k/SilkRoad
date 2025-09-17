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
                //model.Create(userName);
                //model.Code = model.Code.Trim();
                //model.Name = model.Name.Trim();
                //model.Note = model.Note?.Trim();
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
                //data.Update(userName);
                //data.IsActive = model.IsActive;
                //data.Name = model.Name.Trim();
                //data.Note = model.Note?.Trim();
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
            //entity.SoftDelete(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? userName = null)
        {
            var entity = await _unitOfWork.QuestionGroupLibraryRepository.GetByIdAsync(id);
            if (entity == null) return false;
            //entity.Restore(userName);
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
            // Placeholder: implement tree structure if needed, otherwise return flat list
            return (await _unitOfWork.QuestionGroupLibraryRepository.GetAllAsync(x => !x.IsDeleted && x.IsActive)).Select(x => new OptionModel
            {
                Id = x.Id,
                Name = x.NameVN
            });
        }
    }
}
