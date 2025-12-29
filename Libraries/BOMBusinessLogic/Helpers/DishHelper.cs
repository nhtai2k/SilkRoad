using BOMBusinessLogic.IBOMHelpers;
using BOMDataAccess;
using BOMDataAccess.DTOs;
using Common;
using Common.Models;
using Common.Models.BOMModels;
using Common.Services.FileStorageServices;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
namespace BOMBusinessLogic.BOMHelpers
{
    public class DishHelper : IDishHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFileStorageService _fileStorageService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public DishHelper(IUnitOfWork unitOfWork,
            IWebHostEnvironment webHostEnvironment,
            IFileStorageService fileStorageService)
        {
            _unitOfWork = unitOfWork;
            _fileStorageService = fileStorageService;
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task<Pagination<DishDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.DishRepository.GetAllAsync(x => !x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<DishDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }
        public async Task<Pagination<DishDTO>> GetByFilterAsync(DishFilterModel model)
        {
            var allItems = _unitOfWork.DishRepository.Query(x => !x.IsDeleted);
            if (model.DishGroupId > 0)
            {
                allItems = allItems.Where(x => x.DishGroupId == model.DishGroupId);
            }
            if (!string.IsNullOrEmpty(model.Name))
            {
                allItems = allItems.Where(x => x.Name.Contains(model.Name));
            }
            if (!string.IsNullOrEmpty(model.Code))
            {
                allItems = allItems.Where(x => x.Code.Contains(model.Code));
            }
            int totalItems = await allItems.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)model.PageSize);
            if (model.PageIndex > totalPages)
                model.PageIndex = totalPages > 0 ? totalPages : 1;
            var items = await allItems.Skip((model.PageIndex - 1) * model.PageSize).Take(model.PageSize).ToListAsync();
            return new Pagination<DishDTO>
            {
                PageIndex = model.PageIndex,
                PageSize = model.PageSize,
                CurrentPage = model.PageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<IEnumerable<OptionModel>> GetOptionListAsync()
        {
            return (await _unitOfWork.DishRepository.GetAllAsync(x => !x.IsDeleted && x.IsActive))
                .Select(x => new OptionModel
                {
                    Id = x.Id,
                    Name = x.Name
                });
        }

        // public async Task<Pagination<DishDTO>> GetAllActiveAsync(int pageIndex, int pageSize, string? search = null)
        // {
        //     var allItems = _unitOfWork.DishRepository.Query(x => !x.IsDeleted && x.IsActive);
        //     if (!string.IsNullOrEmpty(search))
        //     {
        //         allItems = allItems.Where(x => x.Name.Contains(search));
        //     }
        //     int totalItems = await allItems.CountAsync();
        //     int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        //     if (pageIndex > totalPages)
        //         pageIndex = totalPages > 0 ? totalPages : 1;
        //     var items = await allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
        //     return new Pagination<DishDTO>
        //     {
        //         PageIndex = pageIndex,
        //         PageSize = pageSize,
        //         CurrentPage = pageIndex,
        //         TotalItems = totalItems,
        //         TotalPages = totalPages,
        //         Items = items
        //     };
        // }

        public async Task<Pagination<DishDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.DishRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<DishDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<DishDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.DishRepository.GetByIdAsync(id);
        }

        public async Task<bool> CreateAsync(DishDTO model, string? username = null)
        {
            try
            {
                model.Create(username);
                model.Code = model.Code.Trim();
                model.Name = model.Name.Trim();
                model.Note = model.Note?.Trim();
                if (model.ImageFile != null)
                {
                    if (!_fileStorageService.IsImageFile(model.ImageFile))
                        return false;
                    model.ImagePath = _fileStorageService.SaveImageFile([EBOMFolders.Kitchens.ToString()], model.ImageFile);
                }
                await _unitOfWork.DishRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(DishDTO model, string? username = null)
        {
            try
            {
                var data = await _unitOfWork.DishRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.Update(username);
                data.IsActive = model.IsActive;
                data.Name = model.Name.Trim();
                data.Note = model.Note?.Trim();
                if (model.ImageFile != null)
                {
                    if (!_fileStorageService.IsImageFile(model.ImageFile))
                        return false;
                    // Delete old image if exists
                    if (!string.IsNullOrEmpty(data.ImagePath))
                    {
                        _fileStorageService.DeleteFile(data.ImagePath);
                    }
                    data.ImagePath = _fileStorageService.SaveImageFile([EBOMFolders.Kitchens.ToString()], model.ImageFile);
                }
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> SoftDeleteAsync(int id, string? username = null)
        {
            var entity = await _unitOfWork.DishRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? username = null)
        {
            var entity = await _unitOfWork.DishRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.DishRepository.DeleteAsync(id);
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
        public async Task<bool> IsCodeExistsAsync(string code)
        {
            return await _unitOfWork.DishRepository.IsCodeExistsAsync(code);
        }

        public string ExportExcelAsync()
        {
            try
            {
                var data = _unitOfWork.DishRepository.ExportDataAsync().Result;

                string path = Path.Combine(_webHostEnvironment.WebRootPath, EBOMFolders.Templates.ToString(), "Dish.xlsx");
                // Remove the file if it exists
                if (File.Exists(path))
                {
                    File.Delete(path);
                }
                ExcelPackage.License.SetNonCommercialPersonal("NonCommercial Personal");
                using (var package = new ExcelPackage(path))
                {
                    var sheet = package.Workbook.Worksheets.Add("Data");
                    int row = 1;
                    int startIndex = 4;
                    // Merge cells from row 1, column 5 to row 1, column 10
                    sheet.Cells[1, 1, 1, 10].Merge = true;

                    // Set the value and apply formatting
                    sheet.Cells[1, 1].Value = "Danh Sách Món Ăn";
                    sheet.Cells[1, 1].Style.Font.Bold = true;
                    sheet.Cells[1, 1].Style.Font.Size = 20;
                    sheet.Cells[1, 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                    sheet.Cells[startIndex, 1].Value = "STT";
                    sheet.Cells[startIndex, 1].Style.Font.Bold = true;
                    sheet.Cells[startIndex, 2].Value = "Mã";
                    sheet.Cells[startIndex, 2].Style.Font.Bold = true;
                    sheet.Cells[startIndex, 3].Value = "Tên";
                    sheet.Cells[startIndex, 3].Style.Font.Bold = true;
                    sheet.Cells[startIndex, 4].Value = "Tên Nhóm";
                    sheet.Cells[startIndex, 4].Style.Font.Bold = true;
                    sheet.Cells[startIndex, 5].Value = "Ghi Chú";
                    sheet.Cells[startIndex, 5].Style.Font.Bold = true;

                    foreach (var item in data)
                    {
                        sheet.Cells[startIndex + row, 1].Value = row;
                        sheet.Cells[startIndex + row, 2].Value = item.Code;
                        sheet.Cells[startIndex + row, 3].Value = item.Name;
                        sheet.Cells[startIndex + row, 4].Value = item.GroupName;
                        sheet.Cells[startIndex + row, 6].Value = item.Note;
                        row++;
                    }
                    // Save to file
                    package.Save();
                }

                return path;
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                Console.WriteLine($"Error exporting Excel: {ex.Message}");
                return string.Empty;
            }
        }

    }
}
