using BOMBusinessLogic.IBOMHelpers;
using BOMDataAccess;
using BOMDataAccess.DTOs;
using Microsoft.EntityFrameworkCore;

namespace BOMBusinessLogic.BOMHelpers
{
    public class BOMCommandHelper : IBOMCommandHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public BOMCommandHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BOMDTO?> CreateAsync(BOMDTO model, string? username = null)
        {
            using (var transaction = _unitOfWork.BeginTransaction())
            {
                try
                {
                    model.Create(username);
                    model.Code = model.Code.Trim();
                    model.Name = model.Name.Trim();
                    model.Note = model.Note?.Trim();
                    await _unitOfWork.BOMRepository.CreateAsync(model);
                    await _unitOfWork.SaveChangesAsync();
                    var categories = await GetBOMCategoryAsync(model.Id);
                    categories.ToList().ForEach(c =>
                        _unitOfWork.BOMCategoryRepository.Create(c)
                    );
                    await _unitOfWork.SaveChangesAsync();
                    _unitOfWork.Commit();
                    return model;
                }
                catch (Exception ex)
                {
                    _unitOfWork.Rollback();
                    // Log the exception if necessary
                    Console.WriteLine($"Error creating BOM: {ex.Message}");
                    return null;
                }

            }
        }

        public async Task<bool> UpdateAsync(BOMDTO model, string? username = null)
        {
            try
            {
                model.Update(username);
                model.Name = model.Name.Trim();
                model.Note = model.Note?.Trim();
                bool updateResult = await _unitOfWork.BOMRepository.UpdateAsync(model, model.Id);
                if (updateResult)
                    await _unitOfWork.SaveChangesAsync();
                return updateResult;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> SoftDeleteAsync(int id, string? username = null)
        {
            var entity = await _unitOfWork.BOMRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? username = null)
        {
            var entity = await _unitOfWork.BOMRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.BOMRepository.DeleteAsync(id);
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
        /// <summary>
        /// Get BOM categories by Configuration
        /// </summary>
        /// <param name="bomId"></param>
        /// <returns></returns>
        private async Task<ICollection<BOMCategoryDTO>> GetBOMCategoryAsync(int bomId)
        {
            List<BOMCategoryDTO> bomCategoryLinks = new List<BOMCategoryDTO>();
            var bomCategories = await _unitOfWork.BOMConfigurationRepository.Query(s => !s.IsDeleted && s.IsActive && s.ParentId == null).ToListAsync();
            foreach (var category in bomCategories)
            {
                var tempLink = new BOMCategoryDTO
                {
                    BOMId = bomId,
                    Priority = category.Priority,
                    Code = category.Code,
                    Name = category.Name,
                    Tag = category.Tag,
                    Children = (await GetBOMCategoryByParentIdAsync(category.Id, bomId)).ToList()
                };
                bomCategoryLinks.Add(tempLink);
            }
            return bomCategoryLinks;
        }

        private async Task<ICollection<BOMCategoryDTO>> GetBOMCategoryByParentIdAsync(int parentId, int bomId)
        {
            var categories = await _unitOfWork.BOMConfigurationRepository.Query(c => c.ParentId == parentId && !c.IsDeleted && c.IsActive).ToListAsync();
            var categoryLinks = new List<BOMCategoryDTO>();
            foreach (var category in categories)
            {
                var link = new BOMCategoryDTO
                {
                    BOMId = bomId,
                    Code = category.Code,
                    Name = category.Name,
                    Tag = category.Tag,
                    Children = (await GetBOMCategoryByParentIdAsync(category.Id, bomId)).ToList()
                };
                categoryLinks.Add(link);
            }
            return categoryLinks;
        }

    }
}
