using Microsoft.EntityFrameworkCore;
using Stock.BLL.IHelpers;
using Stock.DAL;
using Stock.DAL.DTOs;
using System;
using System.Collections.Generic;
using System.Share.Models;
using System.Text;

namespace Stock.BLL.Helpers
{
    public class CoveredWarrantHelper : ICoveredWarrantHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public CoveredWarrantHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Pagination<CoveredWarrantDTO>> GetAllAsync(int pageIndex, int pageSize, int companyId)
        {
            var allItems = await _unitOfWork.CoveredWarrantRepository.GetAllAsync(x => !x.IsDeleted && x.CompanyId == companyId);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<CoveredWarrantDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<bool> CreateAsync(CoveredWarrantDTO model, string? userName = null)
        {
            try
            {
                model.Name = model.Name.Trim();
                model.Create(userName);
                await _unitOfWork.CoveredWarrantRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }


        public async Task<CoveredWarrantDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.CoveredWarrantRepository.GetByIdAsync(id);
        }

        public async Task<bool> UpdateAsync(CoveredWarrantDTO model, string? userName = null)
        {
            try
            {
                var data = await _unitOfWork.CoveredWarrantRepository.GetByIdAsync(model.Id);
                if (data == null)
                    return false;
                data.Name = model.Name.Trim();
                data.Price = model.Price;
                data.Coefficient = model.Coefficient;
                data.ExercisePrice = model.ExercisePrice;
                data.ExpirationDate = model.ExpirationDate;
                data.Update(userName);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
