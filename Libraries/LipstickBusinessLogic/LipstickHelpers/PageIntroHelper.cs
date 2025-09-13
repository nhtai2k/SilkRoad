using AutoMapper;
using Common;
using Common.Models;
using Common.Services.FileStorageServices;
using Common.ViewModels.LipstickViewModels;
using LipstickBusinessLogic.ILipstickHelpers;
using LipstickDataAccess;
using LipstickDataAccess.DTOs;

namespace LipstickBusinessLogic.LipstickHelpers
{
    public class PageIntroHelper : IPageIntroHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private IMapper _mapper;
        private IFileStorageService _fileStorageService;
        public PageIntroHelper(IUnitOfWork unitOfWork, IMapper mapper, IFileStorageService fileStorageService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _fileStorageService = fileStorageService;
        }
        public bool Create(PageIntroViewModel model)
        {
            var data = _mapper.Map<PageIntroDTO>(model);
            if (model.ImageFile != null)
            {
                data.ImageUrl = _fileStorageService.SaveImageFile([EModules.Lipstick.ToString(), EFolderNames.PageIntros.ToString()], model.ImageFile);
            }
            _unitOfWork.PageIntroRepository.Create(data);
            _unitOfWork.SaveChanges();
            return true;
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<PageIntroViewModel> GetAllActive()
        {
            var data = _unitOfWork.PageContentRepository.GetAll(filter: s => !s.IsDeleted && s.IsActive);
            return _mapper.Map<IEnumerable<PageIntroViewModel>>(data);
        }

        public async Task<Pagination<PageIntroViewModel>> GetAllAsync(int pageTypeId, int pageIndex, int pageSize)
        {
            var model = new Pagination<PageIntroViewModel>();
            if (pageSize < 1)
                pageSize = model.PageSize;
            var data = await _unitOfWork.PageIntroRepository.GetAllAsync(filter: s => 
            !s.IsDeleted && s.IsActive &&
            (pageTypeId == -1 ? true : s.PageTypeId == pageTypeId)
            );
            model.TotalItems = data.Count();
            model.CurrentPage = pageIndex;
            model.TotalPages = (int)Math.Ceiling(model.TotalItems / (double)pageSize);
            data = data.Skip((pageIndex - 1) * pageSize).Take(pageSize);
            IEnumerable<PageIntroViewModel> viewModels = _mapper.Map<IEnumerable<PageIntroViewModel>>(data);
            model.Items = viewModels;
            return model;
        }

        public PageIntroViewModel GetById(int id)
        {
            var data = _unitOfWork.PageIntroRepository.GetById(id);
            return _mapper.Map<PageIntroViewModel>(data);
        }

        public bool Restore(int id)
        {
            throw new NotImplementedException();
        }

        public bool SoftDelete(int id)
        {
            var data = _unitOfWork.PageIntroRepository.GetById(id);
            if (data == null)
            {
                return false;
            }
            data.IsDeleted = true;
            _unitOfWork.SaveChanges();
            return true;
        }

        public bool Update(PageIntroViewModel model)
        {
            var data = _unitOfWork.PageIntroRepository.GetById(model.Id);
            if (data == null)
            {
                return false;
            }
            data.TitleEN = model.TitleEN;
            data.TitleVN = model.TitleVN;
            data.ContentEN = model.ContentEN;
            data.ContentVN = model.ContentVN;
            data.PageTypeId = model.PageTypeId;
            data.IsActive = model.IsActive;
            data.ModifiedOn = DateTime.Now;
            if (model.ImageFile != null)
            {
                data.ImageUrl = _fileStorageService.SaveImageFile([EModules.Lipstick.ToString(), EFolderNames.PageIntros.ToString()], model.ImageFile);
            }
            _unitOfWork.SaveChanges();
            return true;
        }
    }
}
