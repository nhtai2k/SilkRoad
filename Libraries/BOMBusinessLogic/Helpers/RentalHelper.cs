//using BusinessLogic.IBOMHelpers;
//using Common.Models;
//using DataAccess;
//using DataAccess.BOMDTOs;
//using Microsoft.EntityFrameworkCore;
//namespace BusinessLogic.BOMHelpers
//{
//    public class RentalHelper : IRentalHelper
//    {
//        private readonly IUnitOfWork _unitOfWork;
//        public RentalHelper(IUnitOfWork unitOfWork)
//        {
//            _unitOfWork = unitOfWork;
//        }

//        public async Task<Pagination<RentalDTO>> GetAllAsync(int pageIndex, int pageSize)
//        {
//            var allItems = await _unitOfWork.RentalRepository.GetAllAsync(x => !x.IsDeleted);
//            int totalItems = allItems.Count();
//            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
//            if (pageIndex > totalPages)
//                pageIndex = totalPages > 0 ? totalPages : 1;
//            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
//            return new Pagination<RentalDTO>
//            {
//                PageIndex = pageIndex,
//                PageSize = pageSize,
//                CurrentPage = pageIndex,
//                TotalItems = totalItems,
//                TotalPages = totalPages,
//                Items = items
//            };
//        }
//        public Task<Pagination<RentalDTO>> GetAllActiveAsync(int pageIndex, int pageSize, string? search = null)
//        {
//            throw new NotImplementedException("Method not implemented yet.");
//        }

//        public async Task<Pagination<RentalDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
//        {
//            var allItems = await _unitOfWork.RentalRepository.GetAllAsync(x => x.IsDeleted);
//            int totalItems = allItems.Count();
//            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
//            if (pageIndex > totalPages)
//                pageIndex = totalPages > 0 ? totalPages : 1;
//            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
//            return new Pagination<RentalDTO>
//            {
//                PageIndex = pageIndex,
//                PageSize = pageSize,
//                CurrentPage = pageIndex,
//                TotalItems = totalItems,
//                TotalPages = totalPages,
//                Items = items
//            };
//        }
//        public async Task<RentalDTO?> GetByIdAsync(int id)
//        {
//            return await _unitOfWork.RentalRepository.GetByIdAsync(id);
//        }

//        public async Task<bool> CreateAsync(RentalDTO model, string? username = null)
//        {
//            try
//            {
//                model.Create(username);
//                await _unitOfWork.RentalRepository.CreateAsync(model);
//                await _unitOfWork.SaveChangesAsync();
//                return true;
//            }
//            catch
//            {
//                return false;
//            }
//        }

//        public async Task<bool> UpdateAsync(RentalDTO model, string? username = null)
//        {
//            try
//            {
//                model.Update(username);
//                bool updateResult = await _unitOfWork.RentalRepository.UpdateAsync(model, model.Id);
//                if (updateResult)
//                    await _unitOfWork.SaveChangesAsync();
//                return updateResult;
//            }
//            catch
//            {
//                return false;
//            }
//        }

//        public async Task<bool> SoftDeleteAsync(int id, string? username = null)
//        {
//            var entity = await _unitOfWork.RentalRepository.GetByIdAsync(id);
//            if (entity == null) return false;
//            entity.SoftDelete(username);
//            await _unitOfWork.SaveChangesAsync();
//            return true;
//        }

//        public async Task<bool> RestoreAsync(int id, string? username = null)
//        {
//            var entity = await _unitOfWork.RentalRepository.GetByIdAsync(id);
//            if (entity == null) return false;
//            entity.Restore(username);
//            await _unitOfWork.SaveChangesAsync();
//            return true;
//        }

//        public async Task<bool> DeleteAsync(int id)
//        {
//            try
//            {
//                bool deleteResult = await _unitOfWork.RentalRepository.DeleteAsync(id);
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
