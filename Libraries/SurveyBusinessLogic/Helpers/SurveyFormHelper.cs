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

        public async Task<bool> CreateAsync(SurveyFormDTO model, string? userName = null)
        {
            //using (var transaction = _unitOfWork.BeginTransaction())
            //{
                try
                {
                    //var questionGroups = model.QuestionGroups;
                    //var questions = model.Questions;

                    model.Create(userName);
                    model.Name = model.Name.Trim();
                    model.TitleEN = model.TitleEN.Trim();
                    model.TitleVN = model.TitleVN.Trim();
                    model.DescriptionEN = model.DescriptionEN.Trim();
                    model.DescriptionVN = model.DescriptionVN.Trim();
                    model.Note = model.Note?.Trim();
                    //model.QuestionGroups = [];
                    //model.Questions = [];

                await _unitOfWork.SurveyFormRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                //if (questionGroups != null && questionGroups.Count() > 0)
                //{
                //    foreach (var item in questionGroups)
                //    {
                //        item.SurveyFormId = model.Id;
                //        _unitOfWork.QuestionGroupRepository.Create(item);
                //    }
                //}
                //if (questions != null && questions.Count() > 0)
                //{
                //    foreach (var item in questions)
                //    {
                //        item.SurveyFormId = model.Id;
                //        _unitOfWork.QuestionRepository.Create(item);
                //    }
                //}
                //_unitOfWork.SaveChanges();
                //transaction.Commit();

                return true;
                }
                catch
                {

                    //transaction.Rollback();
                    return false;
                }
            //}
        }

        public async Task<bool> UpdateAsync(SurveyFormDTO model, string? userName = null)
        {
            try
            {
                var data = await _unitOfWork.SurveyFormRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.Update(userName);
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
            var data = await _unitOfWork.SurveyFormRepository.GetEagerSurveyFormByIdAsync(id);

            data?.QuestionGroups.OrderBy(s => s.Priority);
            data?.QuestionGroups.ToList().ForEach(s =>
            {
                s?.Questions.OrderBy(p => p.Priority);
                s?.Questions.ToList().ForEach(p => p.PredefinedAnswers.OrderBy(o => o.Priority));

            });
            data?.Questions.OrderBy(s => s.Priority);
            data?.Questions.ToList().ForEach(p => p.PredefinedAnswers.OrderBy(o => o.Priority));
            return data;
        }
    }
}
