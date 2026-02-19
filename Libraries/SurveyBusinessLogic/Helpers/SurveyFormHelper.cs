using Microsoft.EntityFrameworkCore;
using Survey.BLL.IHelpers;
using Survey.BLL.Models;
using Survey.DAL;
using Survey.DAL.DTOs;
using System.Share.Models;

namespace Survey.BLL.Helpers
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
        public async Task<Pagination<SurveyFormDTO>> FilterAsync(SurveyFormFilterModel filter)
        {

            var query = _unitOfWork.SurveyFormRepository.Query(x => !x.IsDeleted).AsNoTracking();
            if (filter.StoreId != -1)
            {
                query = query.Where(s => s.StoreId == filter.StoreId);
            }
            if (filter.FormStyleId != -1)
            {
                query = query.Where(s => s.FormStyleId == filter.FormStyleId);
            }
            if (filter.IsActive != null)
            {
                query = query.Where(s => s.IsActive == filter.IsActive);
            }
            if (filter.IsLimited != null)
            {
                query = query.Where(s => s.IsLimited == filter.IsLimited);
            }
            if (filter.IsPublished != null)
            {
                query = query.Where(s => s.IsPublished == filter.IsPublished);
            }
            if (!string.IsNullOrWhiteSpace(filter.SearchText))
            {
                var search = filter.SearchText.Trim().ToLower();
                query = query.Where(s =>
                    s.Name.ToLower().Contains(search) ||
                    s.TitleEN.ToLower().Contains(search) ||
                    s.TitleVN.ToLower().Contains(search));
            }

            int totalItems = await query.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)filter.PageSize);
            if (filter.PageIndex > totalPages)
                filter.PageIndex = totalPages > 0 ? totalPages : 1;
            var items = await query.Skip((filter.PageIndex - 1) * filter.PageSize).Take(filter.PageSize).ToListAsync();
            return new Pagination<SurveyFormDTO>
            {
                PageIndex = filter.PageIndex,
                PageSize = filter.PageSize,
                CurrentPage = filter.PageIndex,
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
            if (data == null) return false;
            data.IsPublished = true;
            data.Update(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        /// <summary>
        /// Unpublishes a survey form by its identifier.
        /// </summary>
        /// <remarks>A survey form cannot be unpublished if it does not exist or if it has any
        /// participants associated with it.</remarks>
        /// <param name="id">The unique identifier of the survey form to unpublish.</param>
        /// <param name="userName">The name of the user performing the operation. This parameter is optional and can be null.</param>
        /// <returns><see langword="true"/> if the survey form was successfully unpublished; otherwise,  <see langword="false"/>
        /// if the survey form does not exist or has participants associated with it.</returns>
        public async Task<bool> UnpublishAsync(int id, string? userName = null)
        {
            var data = await _unitOfWork.SurveyFormRepository.GetByIdAsync(id);
            bool hasAnyParticipants = await _unitOfWork.ParticipantRepository.HasAnyParticipantsAsync(id);
            if (data == null || hasAnyParticipants) return false;
            data.IsPublished = false;
            data.Update(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeactivateAsync(int Id, string? userName)
        {
            var data = await _unitOfWork.SurveyFormRepository.GetByIdAsync(Id);

            if (data == null)
                return false;

            data.IsActive = false;
            data.ModifiedAt = DateTime.Now;
            data.ModifiedBy = userName;

            _unitOfWork.SaveChanges();
            return true;
        }

        public async Task<bool> ActivateAsync(int Id, string? userName)
        {
            var data = await _unitOfWork.SurveyFormRepository.GetByIdAsync(Id);

            if (data == null)
                return false;

            data.IsActive = true;
            data.ModifiedAt = DateTime.Now;
            data.ModifiedBy = userName;

            _unitOfWork.SaveChanges();
            return true;
        }

        public async Task<SurveyFormDTO?> GetReviewFormByIdAsync(int id)
        {
            var data = await _unitOfWork.SurveyFormRepository.GetEagerLoadingByIdAsync(id);
            return data;
        }

        /// <summary>
        /// Gets a public survey form by its identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the survey form.</param>
        /// <returns>The public survey form if found; otherwise, <see langword="null"/>.</returns>
        public async Task<SurveyFormDTO?> GetPublicFormByIdAsync(int id)
        {
            // Get data by id
            var data = await _unitOfWork.SurveyFormRepository.GetEagerLoadingByIdAsync(id);
            // Check published status
            if (data == null || !data.IsPublished) return null;
            // Check limited participant
            if (data.IsLimited)
            {
                var query = _unitOfWork.ParticipantRepository.Query(s => s.SurveyFormId == id && s.IsCompleted && !s.IsRejected && !s.IsReviewMode).AsNoTracking();
                int countParticipants = await query.CountAsync();
                // If reach max participants, return null
                if (countParticipants >= data.MaxParticipants)
                {
                    return null;
                }
            }
            return data;
        }
    }
}
