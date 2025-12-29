//using BusinessLogic.IBOMHelpers;
//using Common.Models;
//using DataAccess;
//using DataAccess.BOMDTOs;
//using Microsoft.EntityFrameworkCore;
//namespace BusinessLogic.BOMHelpers
//{
//    public class ProcedureHelper : IProcedureHelper
//    {
//        private readonly IUnitOfWork _unitOfWork;
//        public ProcedureHelper(IUnitOfWork unitOfWork)
//        {
//            _unitOfWork = unitOfWork;
//        }

//        public async Task<Pagination<ProcedureDTO>> GetAllAsync(int pageIndex, int pageSize)
//        {
//            var allItems = await _unitOfWork.ProcedureRepository.GetAllAsync(x => !x.IsDeleted);
//            int totalItems = allItems.Count();
//            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
//            if (pageIndex > totalPages)
//                pageIndex = totalPages > 0 ? totalPages : 1;
//            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
//            return new Pagination<ProcedureDTO>
//            {
//                PageIndex = pageIndex,
//                PageSize = pageSize,
//                CurrentPage = pageIndex,
//                TotalItems = totalItems,
//                TotalPages = totalPages,
//                Items = items
//            };
//        }

//        // public async Task<Pagination<ProcedureDTO>> GetAllActiveAsync(int pageIndex, int pageSize, string? search = null)
//        // {
//        //     var allItems = _unitOfWork.ProcedureRepository.Query(x => !x.IsDeleted && x.IsActive);
//        //     if (!string.IsNullOrEmpty(search))
//        //     {
//        //         allItems = allItems.Where(x => x.Name.Contains(search));
//        //     }
//        //     int totalItems = await allItems.CountAsync();
//        //     int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
//        //     if (pageIndex > totalPages)
//        //         pageIndex = totalPages > 0 ? totalPages : 1;
//        //     var items = await allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
//        //     return new Pagination<ProcedureDTO>
//        //     {
//        //         PageIndex = pageIndex,
//        //         PageSize = pageSize,
//        //         CurrentPage = pageIndex,
//        //         TotalItems = totalItems,
//        //         TotalPages = totalPages,
//        //         Items = items
//        //     };
//        // }

//        public async Task<IEnumerable<OptionModel>> GetOptionListAsync()
//        {
//            return (await _unitOfWork.ProcedureRepository.GetAllAsync(x => !x.IsDeleted && x.IsActive)).Select(x => new OptionModel
//            {
//                Id = x.Id,
//                Name = x.Name
//            });
//        }

//        public async Task<Pagination<ProcedureDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
//        {
//            var allItems = await _unitOfWork.ProcedureRepository.GetAllAsync(x => x.IsDeleted);
//            int totalItems = allItems.Count();
//            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
//            if (pageIndex > totalPages)
//                pageIndex = totalPages > 0 ? totalPages : 1;
//            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
//            return new Pagination<ProcedureDTO>
//            {
//                PageIndex = pageIndex,
//                PageSize = pageSize,
//                CurrentPage = pageIndex,
//                TotalItems = totalItems,
//                TotalPages = totalPages,
//                Items = items
//            };
//        }
//        public async Task<ProcedureDTO?> GetByIdAsync(int id)
//        {
//            return await _unitOfWork.ProcedureRepository.GetByIdAsync(id);
//        }

//        public async Task<bool> CreateAsync(ProcedureDTO model, string? username = null)
//        {
//            try
//            {
//                model.Create(username);
//                model.Code = model.Code.Trim();
//                model.Name = model.Name.Trim();
//                model.Note = model.Note?.Trim();
//                await _unitOfWork.ProcedureRepository.CreateAsync(model);
//                await _unitOfWork.SaveChangesAsync();
//                return true;
//            }
//            catch
//            {
//                return false;
//            }
//        }

//        public async Task<bool> UpdateAsync(ProcedureDTO model, string? username = null)
//        {
//            try
//            {
//                var data = await _unitOfWork.ProcedureRepository.GetByIdAsync(model.Id);
//                if (data == null) return false;
//                data.Update(username);
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
//            var entity = await _unitOfWork.ProcedureRepository.GetByIdAsync(id);
//            if (entity == null) return false;
//            entity.SoftDelete(username);
//            await _unitOfWork.SaveChangesAsync();
//            return true;
//        }

//        public async Task<bool> RestoreAsync(int id, string? username = null)
//        {
//            var entity = await _unitOfWork.ProcedureRepository.GetByIdAsync(id);
//            if (entity == null) return false;
//            entity.Restore(username);
//            await _unitOfWork.SaveChangesAsync();
//            return true;
//        }

//        public async Task<bool> DeleteAsync(int id)
//        {
//            try
//            {
//                bool deleteResult = await _unitOfWork.ProcedureRepository.DeleteAsync(id);
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


//    }
//}
