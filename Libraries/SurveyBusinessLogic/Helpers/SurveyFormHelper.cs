using Common.Models;
using SurveyBusinessLogic.IHelpers;
using SurveyDataAccess;
using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.Helpers
{
    public class SurveyFormHelper : ISurveyFormHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public SurveyFormHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Pagination<SurveyFormDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.SurveyFormRepository.GetAllAsync(x => !x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<SurveyFormDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<Pagination<SurveyFormDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.SurveyFormRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<SurveyFormDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<SurveyFormDTO?> CreateAsync(SurveyFormDTO model, string? userName = null)
        {
            try
            {
                model.Create(userName);
                model.Name = model.Name.Trim();
                model.TitleEN = model.TitleEN.Trim();
                model.TitleVN = model.TitleVN.Trim();
                model.DescriptionEN = model.DescriptionEN.Trim();
                model.DescriptionVN = model.DescriptionVN.Trim();
                model.Note = model.Note?.Trim();

                await _unitOfWork.SurveyFormRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();

                return model;
            }
            catch
            {
                return null;
            }

        }

        public async Task<bool> UpdateAsync(SurveyFormDTO model, string? userName = null)
        {
            try
            {
                var data = await _unitOfWork.SurveyFormRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.Update(userName);
                data.FormStyleId = model.FormStyleId;
                data.IsLimited = model.IsLimited;
                data.IsActive = data.IsActive;
                data.MaxParticipants = model.MaxParticipants;
                data.Name = model.Name.Trim();
                data.TitleEN = model.TitleEN.Trim();
                data.TitleVN = model.TitleVN.Trim();
                data.DescriptionEN = model.DescriptionEN.Trim();
                data.DescriptionVN = model.DescriptionVN.Trim();
                data.Note = model.Note?.Trim();
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
            var entity = await _unitOfWork.SurveyFormRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? userName = null)
        {
            var entity = await _unitOfWork.SurveyFormRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.SurveyFormRepository.DeleteAsync(id);
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

        public async Task<SurveyFormDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.SurveyFormRepository.GetByIdAsync(id);
        }

        public async Task<SurveyFormDTO?> GetEagerLoadingByIdAsync(int id)
        {
            var data = await _unitOfWork.SurveyFormRepository.GetByIdAsync(id);
            var questionGroups = await _unitOfWork.QuestionGroupRepository.GetEagerLoadingBySurveyFormIdAsync(id);
            var questions = await _unitOfWork.QuestionRepository.GetEagerLoadingBySurveyFormIdAsync(id);
            if (data == null) return null;
            if (questionGroups == null) questionGroups = new List<QuestionGroupDTO>();
            if (questions == null) questions = new List<QuestionDTO>();
            data.QuestionGroups = questionGroups.ToList();
            data.Questions = questions.ToList();
            return data;
        }

        public async Task<bool> PublishAsync(int id, string? userName = null)
        {
            var data = await _unitOfWork.SurveyFormRepository.GetByIdAsync(id);
            if(data == null) return false;
            data.IsPublished = true;
            data.Update(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }
    }
}
