using Microsoft.EntityFrameworkCore;
using Survey.BLL.IHelpers;
using Survey.BLL.Models;
using Survey.DAL;
using Survey.DAL.DTOs;
using System.Share.Models;

namespace Survey.BLL.Helpers
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
            var allItems = await _unitOfWork.QuestionLibraryRepository.GetAllAsync(x => !x.IsDeleted, orderBy: p => p.OrderBy(s => s.Priority));
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            foreach (var item in items)
            {
                item.PredefinedAnswerLibraries = await _unitOfWork.PredefinedAnswerLibraryRepository.GetByQuestionLibraryIdAsync(item.Id);
            }
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


        public async Task<Pagination<QuestionLibraryDTO>> GetByFilterAsync(QuestionLibraryFilterModel filter)
        {
            var query = _unitOfWork.QuestionLibraryRepository.Query(orderBy: p => p.OrderBy(s => s.Priority)).AsNoTracking();
            if (!string.IsNullOrEmpty(filter.SearchText))
            {
                string searchText = filter.SearchText.Trim().ToLower();
                query = query.Where(x => x.NameEN.ToLower().Contains(searchText) || x.NameVN.ToLower().Contains(searchText));
            }
            if (filter.QuestionGroupId > 0)
            {
                query = query.Where(x => x.QuestionGroupLibraryId == filter.QuestionGroupId);
            }
            if (filter.QuestionTypeId > 0)
            {
                query = query.Where(x => x.QuestionTypeId == filter.QuestionTypeId);
            }

            int totalItems = query.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)filter.PageSize);
            if (filter.PageIndex > totalPages)
                filter.PageIndex = totalPages > 0 ? totalPages : 1;
            var items = query.Skip((filter.PageIndex - 1) * filter.PageSize).Take(filter.PageSize).ToList();
            foreach (var item in items)
            {
                item.PredefinedAnswerLibraries = await _unitOfWork.PredefinedAnswerLibraryRepository.GetByQuestionLibraryIdAsync(item.Id);
            }
            return new Pagination<QuestionLibraryDTO>
            {
                PageIndex = filter.PageIndex,
                PageSize = filter.PageSize,
                CurrentPage = filter.PageIndex,
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

        public async Task<QuestionLibraryDTO?> GetEagerLoadingByIdAsync(int id)
        {
            return await _unitOfWork.QuestionLibraryRepository.GetEagerLoadingByIdAsync(id);
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
            //using (var transaction = _unitOfWork.BeginTransaction())
            //{
            try
            {
                //bool deletePredefinedAnswerResult = await _unitOfWork.PredefinedAnswerLibraryRepository.DeleteByQuestionLibraryIdAsync(model.Id);
                //if (!deletePredefinedAnswerResult)
                //{
                //    _unitOfWork.Rollback();
                //    return false;
                //}
                var data = await _unitOfWork.QuestionLibraryRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.IsActive = model.IsActive;
                data.NameEN = model.NameEN.Trim();
                data.NameVN = model.NameVN.Trim();
                data.Note = model.Note?.Trim();
                data.Priority = model.Priority;
                data.QuestionGroupLibraryId = model.QuestionGroupLibraryId;
                data.QuestionTypeId = model.QuestionTypeId;
                data.Update(userName);
                await _unitOfWork.SaveChangesAsync();

                //if (model.PredefinedAnswerLibraries != null)
                //{
                //    foreach (var item in model.PredefinedAnswerLibraries)
                //    {
                //        item.Id = Guid.NewGuid();
                //        item.QuestionLibraryId = model.Id;
                //        item.NameEN = item.NameEN.Trim();
                //        item.NameVN = item.NameVN.Trim();
                //        _unitOfWork.PredefinedAnswerLibraryRepository.Create(item);
                //    }
                //}
                //await _unitOfWork.SaveChangesAsync();
                //_unitOfWork.Commit();

                return true;
            }
            catch
            {
                //_unitOfWork.Rollback();
                return false;
            }
            //}
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
