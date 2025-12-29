//using BusinessLogic.IBOMHelpers;
//using Common.Models;
//using Common.Models.BOMModels;
//using DataAccess;
//using DataAccess.BOMDTOs;
//using Microsoft.EntityFrameworkCore;

//namespace BusinessLogic.BOMHelpers
//{
//    public class EmployeeHelper : IEmployeeHelper
//    {
//        private readonly IUnitOfWork _unitOfWork;
//        public EmployeeHelper(IUnitOfWork unitOfWork)
//        {
//            _unitOfWork = unitOfWork;
//        }
//        public async Task<Pagination<EmployeeDTO>> GetAllAsync(EmployeeFilterModel model)
//        {
//            var allItems = _unitOfWork.EmployeeRepository.Query(x => !x.IsDeleted);

//            if (model.DepartmentId > 0)
//                allItems = allItems.Where(x => x.DepartmentId == model.DepartmentId);
//            if (model.RankId > 0)
//                allItems = allItems.Where(x => x.RankId == model.RankId);
//            if (!string.IsNullOrEmpty(model.SearchText))
//                allItems = allItems.Where(x => x.Name.Contains(model.SearchText) || x.Code.Contains(model.SearchText));


//            int totalItems = await allItems.CountAsync();
//            int totalPages = (int)Math.Ceiling(totalItems / (double)model.PageSize);
//            if (model.PageIndex > totalPages)
//                model.PageIndex = totalPages > 0 ? totalPages : 1;

//            var items = totalItems <= 0 ? null : allItems.Skip((model.PageIndex - 1) * model.PageSize).Take(model.PageSize).ToList();
//            return new Pagination<EmployeeDTO>
//            {
//                PageIndex = model.PageIndex,
//                PageSize = model.PageSize,
//                CurrentPage = model.PageIndex,
//                TotalItems = totalItems,
//                TotalPages = totalPages,
//                Items = items
//            };
//        }

//        public async Task<Pagination<EmployeeDTO>> GetAllAsync(int pageIndex, int pageSize)
//        {
//            var allItems = await _unitOfWork.EmployeeRepository.GetAllAsync(x => !x.IsDeleted);
//            int totalItems = allItems.Count();
//            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
//            if (pageIndex > totalPages)
//                pageIndex = totalPages > 0 ? totalPages : 1;
//            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
//            return new Pagination<EmployeeDTO>
//            {
//                PageIndex = pageIndex,
//                PageSize = pageSize,
//                CurrentPage = pageIndex,
//                TotalItems = totalItems,
//                TotalPages = totalPages,
//                Items = items
//            };
//        }

//        // public async Task<Pagination<EmployeeDTO>> GetAllActiveAsync(int pageIndex, int pageSize, string? search = null)
//        // {
//        //     var allItems = _unitOfWork.EmployeeRepository.Query(x => !x.IsDeleted && x.IsActive);
//        //     if (!string.IsNullOrEmpty(search))
//        //     {
//        //         allItems = allItems.Where(x => x.Name.Contains(search));
//        //     }
//        //     int totalItems = await allItems.CountAsync();
//        //     int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
//        //     if (pageIndex > totalPages)
//        //         pageIndex = totalPages > 0 ? totalPages : 1;
//        //     var items = await allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
//        //     return new Pagination<EmployeeDTO>
//        //     {
//        //         PageIndex = pageIndex,
//        //         PageSize = pageSize,
//        //         CurrentPage = pageIndex,
//        //         TotalItems = totalItems,
//        //         TotalPages = totalPages,
//        //         Items = items
//        //     };
//        // }

//        public async Task<Pagination<EmployeeDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
//        {
//            var allItems = await _unitOfWork.EmployeeRepository.GetAllAsync(x => x.IsDeleted);
//            int totalItems = allItems.Count();
//            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
//            if (pageIndex > totalPages)
//                pageIndex = totalPages > 0 ? totalPages : 1;
//            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
//            return new Pagination<EmployeeDTO>
//            {
//                PageIndex = pageIndex,
//                PageSize = pageSize,
//                CurrentPage = pageIndex,
//                TotalItems = totalItems,
//                TotalPages = totalPages,
//                Items = items
//            };
//        }

//        public async Task<IEnumerable<EmployeeDTO>> GetByDepartmentIdNRankIdAsync(int departmentId, int rankId)
//        {
//            var query = _unitOfWork.EmployeeRepository.Query(x => !x.IsDeleted && x.IsActive);

//            if (departmentId > 0)
//                query = query.Where(s => s.DepartmentId == departmentId);
//            if (rankId > 0)
//                query = query.Where(s => s.RankId == rankId);

//            return await query.ToListAsync();
//        }

//        public async Task<EmployeeDTO?> GetByIdAsync(int id)
//        {
//            return await _unitOfWork.EmployeeRepository.GetByIdAsync(id);
//        }

//        public async Task<bool> CreateAsync(EmployeeDTO model, string? username = null)
//        {
//            try
//            {
//                model.Create(username);
//                model.Code = model.Code.Trim();
//                model.Name = model.Name.Trim();
//                model.Note = model.Note?.Trim();
//                await _unitOfWork.EmployeeRepository.CreateAsync(model);
//                await _unitOfWork.SaveChangesAsync();
//                return true;
//            }
//            catch
//            {
//                return false;
//            }
//        }

//        public async Task<bool> UpdateAsync(EmployeeDTO model, string? username = null)
//        {
//            try
//            {
//                var data = await _unitOfWork.EmployeeRepository.GetByIdAsync(model.Id);
//                if (data == null) return false;
//                data.Update(username);
//                data.DepartmentId = model.DepartmentId;
//                data.RankId = model.RankId;
//                data.IsActive = model.IsActive;
//                data.Name = model.Name.Trim();
//                data.Note = model.Note?.Trim();
//                await _unitOfWork.SaveChangesAsync();
//                return true;
//            }
//            catch
//            {
//                return false;
//            }
//        }

//        public async Task<bool> SoftDeleteAsync(int id, string? username = null)
//        {
//            var entity = await _unitOfWork.EmployeeRepository.GetByIdAsync(id);
//            if (entity == null) return false;
//            entity.SoftDelete(username);
//            await _unitOfWork.SaveChangesAsync();
//            return true;
//        }

//        public async Task<bool> RestoreAsync(int id, string? username = null)
//        {
//            var entity = await _unitOfWork.EmployeeRepository.GetByIdAsync(id);
//            if (entity == null) return false;
//            entity.Restore(username);
//            await _unitOfWork.SaveChangesAsync();
//            return true;
//        }

//        public async Task<bool> DeleteAsync(int id)
//        {
//            try
//            {
//                bool deleteResult = await _unitOfWork.EmployeeRepository.DeleteAsync(id);
//                if (deleteResult)
//                {
//                    await _unitOfWork.SaveChangesAsync();
//                }
//                return deleteResult;
//            }
//            catch
//            {
//                return false;
//            }
//        }

//        public async Task<bool> IsCodeExistsAsync(string code)
//        {
//            return await _unitOfWork.EmployeeRepository.IsCodeExistsAsync(code);
//        }
//    }
//}
