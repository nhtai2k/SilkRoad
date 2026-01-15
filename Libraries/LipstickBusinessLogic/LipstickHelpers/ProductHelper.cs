using AutoMapper;
using Common;
using Common.Models;
using Common.Services.FileStorageServices;
using Common.ViewModels.LipstickViewModels;
using LipstickBusinessLogic.ILipstickHelpers;
using LipstickDataAccess;
using LipstickDataAccess.DTOs;
using Microsoft.EntityFrameworkCore;
namespace LipstickBusinessLogic.LipstickHelpers
{
    public class ProductHelper : IProductHelper
    {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;
        private IFileStorageService _fileStorageService;
        public ProductHelper(IMapper mapper, IUnitOfWork unitOfWork, IFileStorageService fileStorageService)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _fileStorageService = fileStorageService;

        }

        public async Task<bool> CreateAsync(ProductViewModel model)
        {
            var data = _mapper.Map<ProductDTO>(model);
            if (model.ImageFiles != null)
            {
                for (int i = 0; i < model.ImageFiles.Count; i++)
                {
                    var fileName = _fileStorageService.SaveImageFile([EModules.Lipstick.ToString(), EFolderNames.Products.ToString()], model.ImageFiles[i]);
                    if (i == model.ImageFiles.Count() - 1)
                    {
                        data.Images = string.Concat(data.Images, fileName);
                    }
                    else
                    {
                        data.Images = string.Concat(data.Images, fileName, ";");
                    }
                }
            }
            if (model.AvatarFile != null)
            {
                data.Avatar = _fileStorageService.SaveImageFile([EModules.Lipstick.ToString(), EFolderNames.Products.ToString()], model.AvatarFile);
            }
            if (model.BackgroundFile != null)
            {
                data.BackgroundImage = _fileStorageService.SaveImageFile([EModules.Lipstick.ToString(), EFolderNames.Products.ToString()], model.BackgroundFile);
            }
            _unitOfWork.ProductRepository.Create(data);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ProductViewModel>> GetAllAsync()
        {
            var data = await _unitOfWork.ProductRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ProductViewModel>>(data);
        }

        public async Task<Pagination<ProductViewModel>> GetAllAsync(int pageIndex)
        {
            var model = new Pagination<ProductViewModel>();
            var data = await _unitOfWork.ProductRepository.GetAllAsync(filter: s => !s.IsDeleted && s.IsActive);
            model.TotalItems = data.Count();
            model.CurrentPage = pageIndex;
            model.TotalPages = (int)Math.Ceiling(model.TotalItems / (double)model.PageSize);

            data = data.Skip((pageIndex - 1) * model.PageSize).Take(model.PageSize);

            IEnumerable<ProductViewModel> viewModels = _mapper.Map<IEnumerable<ProductViewModel>>(data);
            model.Items = viewModels;
            return model;
        }

        public async Task<Pagination<ProductViewModel>> GetByFilterAsync(ProductFilterModel filter)
        {
            var model = new Pagination<ProductViewModel>();

            if (filter.PageSize > 0)
                model.PageSize = filter.PageSize;

            // Start the query
            var query = _unitOfWork.ProductRepository.Query(s => !s.IsDeleted && s.IsActive);

            // Apply dynamic filters
            if (!string.IsNullOrEmpty(filter.NameVN))
                query = query.Where(s => s.NameVN.Contains(filter.NameVN));
            if (!string.IsNullOrEmpty(filter.NameEN))
                query = query.Where(s => s.NameEN.Contains(filter.NameEN));
            if (filter.CategoryId != -1)
                query = query.Where(s => s.CategoryId == filter.CategoryId);
            if (filter.SubCategoryId != -1)
                query = query.Where(s => s.SubCategoryId == filter.SubCategoryId);
            if (filter.BrandId != -1)
                query = query.Where(s => s.BrandId == filter.BrandId);
            if (filter.SizeId != -1)
                query = query.Where(s => s.SizeId == filter.SizeId);
            if (filter.ColorId != -1)
                query = query.Where(s => s.ColorId == filter.ColorId);

            // Count total items
            model.TotalItems = await query.CountAsync();
            model.CurrentPage = filter.PageIndex;
            model.TotalPages = (int)Math.Ceiling(model.TotalItems / (double)model.PageSize);
            // Apply pagination
            var data = await query.Skip((filter.PageIndex - 1) * model.PageSize)
                                  .Take(model.PageSize)
                                  .ToListAsync();
            // Map to view models
            model.Items = _mapper.Map<IEnumerable<ProductViewModel>>(data);

            return model;
        }


        public async Task<ProductViewModel> GetByIdAsync(int id)
        {
            var data = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            return _mapper.Map<ProductViewModel>(data);
        }

        public Task<bool> RestoreAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SoftDeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ProductViewModel>> SuggestProductBySearchTextAsync(string language, string searchText, int quantity = 10)
        {
            if (string.IsNullOrEmpty(searchText)) return new List<ProductViewModel>();

            return language switch
            {
                var lang when string.Equals(lang, ELanguages.EN.ToString()) => await GetProductByTextAsync(searchText, true, quantity),
                var lang when string.Equals(lang, ELanguages.VN.ToString()) => await GetProductByTextAsync(searchText, false, quantity),
                _ => new List<ProductViewModel>()
            };
        }
        private async Task<List<ProductViewModel>> GetProductByTextAsync(string searchText, bool isEnglish, int quantity)
        {
            var data = await _unitOfWork.ProductRepository
                .Query(x => (isEnglish
                        ? x.NameEN.ToLower().Contains(searchText.ToLower()) || x.DescriptionEN.ToLower().Contains(searchText.ToLower())
                        : x.NameVN.ToLower().Contains(searchText.ToLower()) || x.DescriptionVN.ToLower().Contains(searchText.ToLower())))
                .Take(quantity)
                .ToListAsync();

            return _mapper.Map<List<ProductViewModel>>(data);
        }

        public async Task<bool> UpdateAsync(ProductViewModel model)
        {
            var data = _unitOfWork.ProductRepository.GetById(model.Id);
            if (data == null)
            {
                return false;
            }
            data.CategoryId = model.CategoryId;
            data.SubCategoryId = model.SubCategoryId;
            data.BrandId = model.BrandId;
            data.SizeId = model.SizeId;
            data.ColorId = model.ColorId;
            data.NameEN = model.NameEN;
            data.NameVN = model.NameVN;
            data.DescriptionEN = model.DescriptionEN;
            data.DescriptionVN = model.DescriptionVN;
            data.DetailsEN = model.DetailsEN;
            data.DetailsVN = model.DetailsVN;
            data.IsRecommended = model.IsRecommended;
            data.Price = model.Price;
            data.Quantity = model.Quantity;
            data.DiscountPercent = model.DiscountPercent;
            data.SalePrice = model.SalePrice;
            data.StartDiscountDate = model.StartDiscountDate;
            data.EndDiscountDate = model.EndDiscountDate;
            data.SaleOff = model.SaleOff;
            data.ModifiedOn = DateTime.Now;
            data.IsActive = model.IsActive;
            data.Images = model.Images ?? string.Empty;
            if (model.ImageFiles != null)
            {
                data.Images = (data.Images != null ? data.Images : string.Concat(data.Images, ";"));
                for (int i = 0; i < model.ImageFiles.Count; i++)
                {
                    var fileName = _fileStorageService.SaveImageFile([EModules.Lipstick.ToString(), EFolderNames.Products.ToString()], model.ImageFiles[i]);
                    if (i == model.ImageFiles.Count() - 1)
                    {
                        data.Images = string.Concat(data.Images, fileName);
                    }
                    else
                    {
                        data.Images = string.Concat(data.Images, fileName, ";");
                    }
                }
            }
            if (model.AvatarFile != null)
            {
                data.Avatar = _fileStorageService.SaveImageFile([EModules.Lipstick.ToString(), EFolderNames.Products.ToString()], model.AvatarFile);
            }
            if (model.BackgroundFile != null)
            {
                data.BackgroundImage = _fileStorageService.SaveImageFile([EModules.Lipstick.ToString(), EFolderNames.Products.ToString()], model.BackgroundFile);
            }
            await _unitOfWork.SaveChangesAsync();
            return true;
        }
    }
}
